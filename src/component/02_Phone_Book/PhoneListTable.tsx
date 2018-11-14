import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { findAll, deleteAll } from './PhoneAction';
import PhoneModel from './PhoneModel';
import PhoneDataRow from './PhoneDataRow';

interface Props extends RouteComponentProps<any> {

}

interface State {
    phones : PhoneModel[];
}

class PhoneListTable extends React.Component<Props, State> {
    constructor(props : any){
        super(props);
        this.state = { phones : [] };
    }

    public componentDidMount() {
        const newPhones = findAll();
        this.setState({
            phones : newPhones
        });
    }

    public handleClickAllDelete = () => {
        const { history } = this.props;
        const isDelete = window.confirm('현재 모든 연락처를 삭제합니다. 계속 진행 하시겠습니까?');
        if(isDelete) {
            const message = deleteAll();
            alert(message);
            history.push('/example/phone_list/_refresh');
        }
    }
    
    public render(){
        const { history, location, match } = this.props;
        const { phones } = this.state;
        const phoneBodyRows = 
            phones.length > 0 ?
                phones.map((eachPhone, idx) => <PhoneDataRow key={`phone_row_${idx}`} phone={eachPhone} history={history} location={location} match={match} />) :
                <tr>
                    <td colSpan={4}>현재 저장된 전화 번호가 없습니다.</td>
                </tr>
        return(
            <React.Fragment>
                <table className="table text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">이름</th>
                            <th scope="col">주소</th>
                            <th scope="col">대표전화</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phoneBodyRows}
                    </tbody>
                </table>
                <button onClick={() => this.handleClickAllDelete()} className="btn btn-danger btn-block" style={{ marginTop : '10px', marginBottom : '10px' }}>전체 삭제</button>
            </React.Fragment>
        )
    }
} 

export default PhoneListTable;