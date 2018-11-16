import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { MusicListView } from '../component/03_RESTful_Music_Box';

const MusicTablePage : React.StatelessComponent<RouteComponentProps<any>> = ({history, location, match}) => (
    <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
        <h1>음반 목록</h1>
        <hr/>
        <div id="button_list" className="text-right" style={{ marginTop : '10px', marginBottom : '10px' }}>
            <Link to="./music_create">
                <button className="btn btn-primary" style={{ marginLeft : '10px', marginRight : '10px' }}>음반 추가</button>
            </Link>
        </div>
        <div id="music_table" style={{ marginTop : '10px', marginBottom : '10px' }}>
            <MusicListView history={history} location={location} match={match} />
        </div>
        <Link to="/">
            <button className="btn btn-info btn-block" style={{ marginTop : '10px', marginBottom : '10px' }}>이전으로</button>
        </Link>
    </div>
)

export default MusicTablePage;