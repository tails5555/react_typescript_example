import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { music_find_all } from './action/action_music';
import { MusicModel } from './model';
import MusicBriefInfo from './MusicBriefInfo';

interface Props extends RouteComponentProps<any> {

}

interface State {
    musics : MusicModel[];
}

class MusicListView extends React.Component<Props, State> {
    private static isMounted : boolean;
    
    constructor(props : any){
        super(props);
        MusicListView.isMounted = false;
        this.state = { musics : [] };
    }

    public componentDidMount(){
        MusicListView.isMounted = true;
        this.getMusicInfo();
    }

    public async getMusicInfo() {
        music_find_all().then((response : any) => {
            const { data } = response;
            const musicData : MusicModel[] = data.map((music : any) => new MusicModel(music.id, music.title, music.singer, music.year, music.genre, music.publisher));
            if(MusicListView.isMounted){
                this.setState({
                    musics : musicData
                });
            }
        })
    }

    public componentWillUnmount() {
        MusicListView.isMounted = false;
    }

    public render() {
        const { history, location, match } = this.props;
        const { musics } = this.state;
        const musicBodyRows : any = musics.map((music, idx) => <MusicBriefInfo music={music} key={`music_key_${idx}`} history={history} location={location} match={match} />);
        return (
            <React.Fragment>
                <table className="table text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">제목</th>
                            <th scope="col">가수</th>
                            <th scope="col">장르</th>
                            <th scope="col">배급사</th>
                            <th scope="col">발매년도</th>
                        </tr>
                    </thead>
                    <tbody>
                        {musicBodyRows}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default MusicListView;