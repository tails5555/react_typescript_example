import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { MusicEditView } from '../component/04_Redux_Music_Box';

import { GenreState } from '../reducer/reducer_genre';
import { PublisherState } from '../reducer/reducer_publisher';
import { MusicState } from '../reducer/reducer_music';
import { MusicForm } from '../action/form';

interface Props extends RouteComponentProps<any> {
    musicState : MusicState;
    genreState : GenreState;
    publisherState : PublisherState;
    fetchMusic : (id : number) => void;
    resetFetchMusic : () => void;
    fetchGenres : () => void;
    fetchPublishers : () => void;
    updateMusic : (id : number, form : MusicForm) => void;
    resetSaveMusic : () => void;
}

class ReduxMusicUpdatePage extends React.Component<Props, {}> {
    constructor(props : any){
        super(props);
    }

    public componentDidMount() {
        const { fetchMusic, fetchGenres, fetchPublishers, match } = this.props;
        const { id } = match.params;
        if(id !== null){
            fetchMusic(id);
        }
        fetchGenres();
        fetchPublishers();
    }

    public componentDidUpdate(prevProps : Props, prevState : any){
        const { musicState, resetSaveMusic, history } = this.props;
        const { music, error, type } = musicState;
        if(music !== null && type === 'UPDATE'){
            alert(`음악이 수정 되었습니다.\n음악 제목 : ${music.getTitle}`);
            resetSaveMusic();
            history.push('/example/ts_redux/music_list');
        } else if(error !== null && prevProps.musicState.error !== error){
            alert(error);
            resetSaveMusic();
            history.push('/example/ts_redux/music_list');
        }
    }

    public componentWillUnmount(){
        const { resetFetchMusic, resetSaveMusic } = this.props;
        resetFetchMusic();
        resetSaveMusic();
    }

    public render() {
        const { musicState, genreState, publisherState, updateMusic, history, location, match } = this.props;
        const { loading, music } = musicState;
        const loadingState = 
            (loading === true) ?
                (music !== null) ? 
                    <div className="text-center">
                        <h2><i className="fas fa-spinner fa-spin" /> 음악을 저장하는 중입니다...</h2>
                    </div> : 
                    <div className="text-center">
                        <h2><i className="fas fa-spinner fa-spin" /> 음악을 불러오는 중입니다...</h2>
                    </div> 
                : null

        return(
            <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
                <div id="music_view" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <MusicEditView 
                        history={history} location={location} match={match} music={musicState.music} handleCreate={null} handleUpdate={updateMusic}
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

export default ReduxMusicUpdatePage;