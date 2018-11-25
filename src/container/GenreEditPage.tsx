import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { GenreModelForm } from '../component/03_RESTful_Music_Box';

const GenreEditPage : React.StatelessComponent<RouteComponentProps<any>> = ({history, location, match}) => (
    <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
        <div id="genre_model_form" style={{ marginTop : '10px', marginBottom : '10px' }}>
            <GenreModelForm history={history} location={location} match={match} />
        </div>
        <Link to="/example/genre_list">
            <button className="btn btn-info btn-block" style={{ marginTop : '10px', marginBottom : '10px' }}>이전으로</button>
        </Link>
    </div>
)

export default GenreEditPage;