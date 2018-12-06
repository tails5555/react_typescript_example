import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { MusicEditView } from '../component/04_Redux_Music_Box';

import { GenreState } from '../reducer/reducer_genre';
import { PublisherState } from '../reducer/reducer_publisher';
import { MusicState } from '../reducer/reducer_music';

interface Props extends RouteComponentProps {
    music : MusicState,
    genre : GenreState,
    publisher : PublisherState,
    fetchGenres : () => void,
    fetchPublishers : () => void,
}

class ReduxMusicCreatePage extends React.Component<Props, {}> {
    constructor(props : any){
        super(props);
    }

    public componentDidMount() {
        const { fetchGenres, fetchPublishers } = this.props;
        fetchGenres();
        fetchPublishers();
    }

    public render() {
        const { genre, publisher, history, location, match } = this.props;

        return(
            <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
                <div id="music_view">
                    <MusicEditView 
                        history={history} location={location} match={match} music={null}
                        genres={genre.genres} genreLoading={genre.loading} genreError={genre.error}
                        publishers={publisher.publishers} publisherLoading={publisher.loading} publisherError={publisher.error}
                    />
                </div>
            </div>
        );
    }
}

export default ReduxMusicCreatePage;