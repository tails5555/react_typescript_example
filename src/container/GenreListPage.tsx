import * as React from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';
import { GenreListView } from '../component/03_RESTful_Music_Box';

const GenreListPage : React.StatelessComponent<RouteComponentProps<any>> = ({history, location, match}) => (
    <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
        <h1>장르 목록 조회</h1>
        <hr/>
        <div id="button_list" className="text-right" style={{ marginTop : '10px', marginBottom : '10px' }}>
            <Link to="./genre_create">
                <button className="btn btn-primary" style={{ marginLeft : '10px', marginRight : '10px' }}>장르 추가</button>
            </Link>
        </div>
        <div id="genre_table" style={{ marginTop : '10px', marginBottom : '10px' }}>
            <GenreListView history={history} location={location} match={match} />
        </div>
        <Link to="/">
            <button className="btn btn-info btn-block" style={{ marginTop : '10px', marginBottom : '10px' }}>이전으로</button>
        </Link>
    </div>
)

export default GenreListPage;