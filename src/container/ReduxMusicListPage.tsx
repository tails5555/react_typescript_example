import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { MusicListView } from '../component/04_Redux_Music_Box';
import { MusicState } from '../reducer/reducer_music';

interface Props extends RouteComponentProps {
    musicState : MusicState,
    fetchMusics : () => void
}

class ReduxMusicListPage extends React.Component<Props, {}> {
    constructor(props : any){
        super(props);
    }

    public componentDidMount() {
        const { fetchMusics } = this.props;
        fetchMusics();
    }

    public render() {
        const { musicState, history, location, match } = this.props;
        const { loading, error, musics } = musicState;

        return(
            <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
                <h1>음반 목록</h1>
                <hr/>
                <div id="button_list" className="text-right" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <Link to="./music_create">
                        <button className="btn btn-primary" style={{ marginLeft : '10px', marginRight : '10px' }}><i className="fas fa-plus" /> 음반 추가</button>
                    </Link>
                </div>
                <div id="music_view">
                    <MusicListView loading={loading} error={error} musics={musics} history={history} location={location} match={match} />
                </div>
                <Link to="/">
                    <button className="btn btn-info btn-block" style={{ marginTop : '10px', marginBottom : '10px' }}><i className="fas fa-arrow-left" /> 이전으로</button>
                </Link>
            </div>
        );
    }
}

export default ReduxMusicListPage;