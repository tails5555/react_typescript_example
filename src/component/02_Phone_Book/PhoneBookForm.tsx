import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { create, update, deleteById, findOne } from './PhoneAction';
import PhoneForm from './PhoneForm';
import PhoneError from './PhoneError';
import InputRender from './InputRender';
import ArrayInputRender from './ArrayInputRender';

interface Props extends RouteComponentProps<any> {

}

interface State {
    phone : PhoneForm;
    error : PhoneError;
}

class PhoneBookForm extends React.Component<Props, State> {
    constructor(props : any){
        super(props);
        this.state = { phone : new PhoneForm('', '', ['']), error : new PhoneError('', '', ['']) };
        this.handleSubmitData = this.handleSubmitData.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleChangeArrayData = this.handleChangeArrayData.bind(this);
    }

    public componentDidMount() {
        const { match, location } = this.props;
        if(location.pathname.includes('update')) {
            const { id } = match.params;
            if(id !== 0){
                const phoneForm = findOne(id * 1);
                if(phoneForm !== null){
                    const tmpPhones = phoneForm.getPhone;
                    const tmpPhoneErrors : string[] = Array(tmpPhones.length).fill('');
                    this.setState({ error : new PhoneError('', '', tmpPhoneErrors), phone : new PhoneForm(phoneForm.getName, phoneForm.getAddress, phoneForm.getPhone) });
                }
            }
        }    
    }

    public handleSubmitData = (event : any) => {
        event.preventDefault();
        let hasError = false;
        const { error, phone } = this.state;
        const { match, location, history } = this.props;

        if(phone.getName.trim() === ''){
            error.setNameMessage = '이름을 입력하셔야 됩니다.';
            hasError = true;
        } else {
            error.setNameMessage = '';
        }

        if(phone.getAddress.trim() === ''){
            error.setAddressMessage = '도시를 입력하셔야 됩니다.';
            hasError = true;
        } else {
            error.setAddressMessage = '';
        }

        const tmpPhonesError : string[] = error.getPhonesMessage;
        const numberRegex = /[0-9]/g;
        for(let k=0;k<phone.getPhones.length;k++){
            if(phone.getPhones[k] === '' || phone.getPhones[k].trim() === '') {
                tmpPhonesError[k] = '전화번호를 입력하셔야 됩니다.';
            }
            else if(!phone.getPhones[k].match(numberRegex)){
                tmpPhonesError[k] = '전화번호는 숫자로만 입력하시길 바랍니다.';
            } else {
                tmpPhonesError[k] = '';
            }
        }

        for (const tmpErrorText of tmpPhonesError) {
            if(tmpErrorText !== ''){
                hasError = true;
                break;
            }
        }
        
        error.setPhonesMessage = tmpPhonesError;

        if(hasError) {
            this.setState({error});
        } else {
            const { pathname } = location;
            if(pathname.includes('create')) {
                alert(create(phone));
                history.push('/example/phone_list');
            } else {
                const { id } = match.params;
                alert(update(id * 1, phone));
                history.push('/example/phone_list');
            }
        }
    }

    public handleChangeData = (event : any) => {
        const { phone } = this.state;
        switch(event.target.name){
            case 'name' :
                phone.setName = event.target.value;
                break;
            case 'address' :
                phone.setAddress = event.target.value;
                break;
        }
        this.setState({ phone });
    }

    public handleChangeArrayData = (event : any) => {
        const { phone } = this.state;
        const tmpPhones = phone.getPhones.slice();
        tmpPhones[event.target.id] = event.target.value;
        phone.setPhones = tmpPhones;
        this.setState({ phone });
    }

    public handleClickAddPhone = () => {
        const { phone, error } = this.state;

        const tmpPhones : string[] = phone.getPhones.slice();
        const tmpErrors : string[] = error.getPhonesMessage.slice();

        tmpPhones.push('');
        tmpErrors.push('');

        phone.setPhones = tmpPhones;
        error.setPhonesMessage = tmpErrors;

        this.setState({ error, phone });
    }
    
    public handleClickDeletePhone = (idx : number) => {
        const { phone, error } = this.state;

        const tmpPhones = phone.getPhones.slice();
        const tmpErrors = error.getPhonesMessage.slice();

        tmpPhones.splice(idx, 1);
        tmpErrors.splice(idx, 1);

        phone.setPhones = tmpPhones;
        error.setPhonesMessage = tmpErrors;
        
        this.setState({ error, phone });
    }

    public handleClickDeleteElement = () => {
        const { match, history } = this.props;
        const { phone } = this.state;
        const isDelete = window.confirm(`${phone.getName} 님의 연락처를 삭제 합니다. 계속 진행 하시겠습니까?`);
        if(isDelete){
            const { id } = match.params;
            alert(deleteById(id * 1));
            history.push('/example/phone_list');
        }
    }

    public render(){
        const { location } = this.props;
        const { error, phone } = this.state;
        return(
            <React.Fragment>
                <h1>연락처 { location.pathname.includes('create') ? '추가' : '수정' }</h1>
                <hr/>
                {
                    location.pathname.includes('update') ? 
                        <div className="text-right">
                            <button type="button" className="btn btn-danger" onClick={() => this.handleClickDeleteElement()}>삭제</button>
                        </div> : null 
                }
                <form onSubmit={this.handleSubmitData}>
                    <InputRender label="이름" value={phone.getName} name="name" onChange={this.handleChangeData} error={error.getNameMessage} />
                    <InputRender label="주소" value={phone.getAddress} name="address" onChange={this.handleChangeData} error={error.getAddressMessage} />
                    <ArrayInputRender label="연락처" value={phone.getPhones} name="phones" onChange={this.handleChangeArrayData} error={error.getPhonesMessage} onClickCreate={() => this.handleClickAddPhone()} onClickDelete={this.handleClickDeletePhone} />
                    <br/>
                    <button type="submit" className="btn btn-primary btn-block">편집 완료</button>
                </form>
            </React.Fragment>
        )
    }
}

export default PhoneBookForm;