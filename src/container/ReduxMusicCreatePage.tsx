import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { MusicEditView } from '../component/04_Redux_Music_Box';

import { GenreState } from '../reducer/reducer_genre';
import { PublisherState } from '../reducer/reducer_publisher';
import { MusicState } from '../reducer/reducer_music';
import { MusicForm } from '../action/form';

interface Props extends RouteComponentProps {
    musicState : MusicState;
    genreState : GenreState;
    publisherState : PublisherState;
    fetchGenres : () => void;
    fetchPublishers : () => void;
    createMusic : (form : MusicForm) => void;
    resetSaveMusic : () => void;
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

    public componentDidUpdate(prevProps : any, prevState : any){
        const { musicState, resetSaveMusic, history } = this.props;
        const { music, error } = musicState;
        if(music !== null && prevProps.musicState.music !== music){
            alert(`음악이 새로 추가 되었습니다.\n음악 제목 : ${music.getTitle}`);
            resetSaveMusic();
            history.push('./music_list');
        } else if(error !== null && prevProps.musicState.error !== error){
            alert(error);
            resetSaveMusic();
            history.push('./music_list');
        }
    }

    public render() {
        const { musicState, genreState, publisherState, createMusic, history, location, match } = this.props;
        const { loading } = musicState;
        const loadingState = (loading) ? 
            <div className="text-center">
                <h2><i className="fas fa-spinner fa-spin" /> 음악을 저장하는 중입니다...</h2>
            </div> : null;

        return(
            <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
                <div id="music_view" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <MusicEditView 
                        history={history} location={location} match={match} music={null} handleCreate={createMusic}
                        genres={genreState.genres} genreLoading={genreState.loading} genreError={genreState.error}
                        publishers={publisherState.publishers} publisherLoading={publisherState.loading} publisherError={publisherState.error}
                    />
                </div>
                <div id="music_create_loading" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    { loadingState }
                </div>
            </div>
        );
    }
}

export default ReduxMusicCreatePage;