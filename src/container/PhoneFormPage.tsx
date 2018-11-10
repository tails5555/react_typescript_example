import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { PhoneBookForm } from '../component/02_Phone_Book';

const PhoneFormPage : React.StatelessComponent<RouteComponentProps<any>> = ({history, location, match}) => (
    <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
        <div id="phone_book_table" style={{ marginTop : '10px', marginBottom : '10px' }}>
            <PhoneBookForm history={history} location={location} match={match} />
        </div>
        <Link to="/example/phone_list">
            <button className="btn btn-info btn-block" style={{ marginTop : '10px', marginBottom : '10px' }}>이전으로</button>
        </Link>
    </div>
)

export default PhoneFormPage;