import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { PhoneListTable } from '../component/02_Phone_Book';

const PhoneBookPage : React.StatelessComponent<RouteComponentProps<any>> = ({history, location, match}) => (
    <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
        <h1>React Phone Book Example</h1>
        <hr/>
        <div id="button_list" className="text-right" style={{ marginTop : '10px', marginBottom : '10px' }}>
            <Link to="./phone_create">
                <button className="btn btn-primary" style={{ marginLeft : '10px', marginRight : '10px' }}>연락처 추가</button>
            </Link>
        </div>
        <div id="phone_book_table" style={{ marginTop : '10px', marginBottom : '10px' }}>
            <PhoneListTable history={history} location={location} match={match} />
        </div>
        <Link to="/">
            <button className="btn btn-info btn-block" style={{ marginTop : '10px', marginBottom : '10px' }}>이전으로</button>
        </Link>
    </div>
)

export default PhoneBookPage;