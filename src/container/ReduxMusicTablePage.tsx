import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { MusicState } from '../reducer/reducer_music';
import { MusicModel } from '../action/model';

interface Props extends RouteComponentProps {
    music : MusicState,
    fetchMusics : () => void
}

class ReduxMusicTablePage extends React.Component<Props, {}> {
    constructor(props : any){
        super(props);
    }

    public componentDidMount() {
        const { fetchMusics } = this.props;
        fetchMusics();
    }

    public render() {
        const { music } = this.props;
        const { loading, error, musics } = music;
        
        let musicView = null;
        if(loading){
            musicView = <h1>음악 목록을 불러오는 중입니다...</h1>;
        } else if(error !== null) {
            musicView = (
                <div className="text-center">
                    <h1>음악을 불러오는 도중 오류가 발생했습니다.</h1>
                    <h2>{error}</h2>
                </div>
            )
        } else {
            musicView = musics.map((music : MusicModel, idx : number) => <h1 key={`music_${idx}`}>{music.getTitle}</h1>);
        }

        return(
            <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
                <h1>음반 목록</h1>
                <hr/>
                <div id="button_list" className="text-right" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <Link to="./music_create">
                        <button className="btn btn-primary" style={{ marginLeft : '10px', marginRight : '10px' }}>음반 추가</button>
                    </Link>
                </div>
                <div id="music_view">
                    {musicView}
                </div>
                <Link to="/">
                    <button className="btn btn-info btn-block" style={{ marginTop : '10px', marginBottom : '10px' }}>이전으로</button>
                </Link>
            </div>
        );
    }
}

export default ReduxMusicTablePage;