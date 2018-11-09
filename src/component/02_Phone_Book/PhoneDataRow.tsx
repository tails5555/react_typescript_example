import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PhoneModel from './PhoneModel';
import './table_style.css';

interface Props extends RouteComponentProps<any> {
    phone : PhoneModel;
}

const PhoneDataRow : React.StatelessComponent<Props> = ({phone, history}) => (
    <tr onClick={() => history.push(`./phone_update/${phone.getId}`)}>
        <td>{phone.getId}</td>
        <td>{phone.getName}</td>
        <td>{phone.getAddress}</td>
        <td>{phone.getPhone[0]}</td>
    </tr>
);

export default PhoneDataRow;