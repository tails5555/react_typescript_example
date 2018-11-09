import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { create } from './PhoneAction';
import PhoneForm from './PhoneForm';
import InputRender from './InputRender';
import ArrayInputRender from './ArrayInputRender';

interface Props extends RouteComponentProps<any> {

}

interface State {
    phone : PhoneForm;
    error : any
}

class PhoneBookForm extends React.Component<Props, State> {
    constructor(props : any){
        super(props);
        this.state = { phone : new PhoneForm('', '', ['']), error : { name : '', address : '', phones : [''] } };
        this.handleSubmitData.bind(this);
        this.handleChangeData.bind(this);
    }

    public handleSubmitData = (event : any) => {
        event.preventDefault();
        let hasError = false;
        const { error, phone } = this.state;
        const { location } = this.props;
        if(!phone.getName || phone.getName.trim() === ''){
            error.name = '이름을 입력하셔야 됩니다.';
            hasError = true;
        } else {
            error.name = '';
            hasError = false;
        }
        if(!phone.getAddress || phone.getAddress.trim() === ''){
            error.address = '도시를 입력하셔야 됩니다.';
            hasError = true;
        } else {
            error.address = '';
            hasError = false;
        }
        if(phone.getPhones.length === 0){
            error.phones[0] = '전화 번호를 입력하셔야 됩니다.';
            hasError = true;
        } else {
            const numberRegex = /[^0-9]/g;
            for(let k=0;k<phone.getPhones.length;k++){
                if(!phone.getPhones[k] || phone.getPhones[k].trim() === '') {
                    error.phones[k] = '전화번호를 입력하셔야 됩니다.';
                    hasError = true;
                }
                else if(!phone.getPhones[k].match(numberRegex)){
                    error.phones[k] = '전화번호는 숫자로만 입력하시길 바랍니다.';
                    hasError = true;
                } else {
                    error.phones[k] = '';
                    hasError = false;
                }
            }
        }
        if(hasError) {
            this.setState({error});
        } else {
            const { pathname } = location;
            if(pathname.includes('create')) {
                alert(create(phone));
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
        this.setState({phone});
    }

    public handleChangeArrayData = (idx : number, value : string) => {
        const { phone } = this.state;
        const tmpPhones = phone.getPhones.slice();
        tmpPhones[idx] = value;
        phone.setPhones = tmpPhones;
        this.setState({phone});
    }

    public handleClickAddPhone = () => {
        const { phone, error } = this.state;
        const tmpPhones : string[] = phone.getPhones.slice();
        const tmpErrors : string[] = error.phones.slice();
        tmpPhones.push('');
        tmpErrors.push('');
        phone.setPhones = tmpPhones;
        error.phones = tmpErrors;
        this.setState({
            error, phone
        });
    }
    
    public handleClickDeletePhone = (idx : number) => {
        const { phone, error } = this.state;
        const tmpPhones = phone.getPhones.slice();
        const tmpErrors = error.phones.slice();
        tmpPhones.splice(idx, 1);
        tmpErrors.splice(idx, 1);
        phone.setPhones = tmpPhones;
        error.phones = tmpErrors;
        this.setState({
            error, phone
        });
    }

    public render(){
        const { error, phone } = this.state;
        return(
            <form onSubmit={this.handleSubmitData}>
                <InputRender label="이름" value={phone.getName} name="name" onChange={this.handleChangeData} error={error.name} />
                <InputRender label="주소" value={phone.getAddress} name="address" onChange={this.handleChangeData} error={error.address} />
                <ArrayInputRender label="연락처" value={phone.getPhones} name="phones" onChange={this.handleChangeArrayData} error={error.phones} onClickCreate={() => this.handleClickAddPhone()} onClickDelete={this.handleClickDeletePhone} />
                <br/>
                <button type="submit" className="btn btn-primary btn-block">편집 완료</button>
            </form>
        )
    }
}

export default PhoneBookForm;