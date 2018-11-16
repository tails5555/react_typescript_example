import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { MusicModelForm } from '../component/03_RESTful_Music_Box';

const MusicEditPage : React.StatelessComponent<RouteComponentProps<any>> = ({history, location, match}) => (
    <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
        <div id="music_model_form" style={{ marginTop : '10px', marginBottom : '10px' }}>
            <MusicModelForm history={history} location={location} match={match} />
        </div>
        <Link to="/example/music_list">
            <button className="btn btn-info btn-block" style={{ marginTop : '10px', marginBottom : '10px' }}>이전으로</button>
        </Link>
    </div>
)

export default MusicEditPage;