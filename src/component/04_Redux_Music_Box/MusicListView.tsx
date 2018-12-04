import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { MusicModel } from '../../action/model';
import MusicBriefInfo from './MusicBriefInfo';

interface Props extends RouteComponentProps<any> {
    musics : MusicModel[];
    loading : boolean;
    error : string | null;
}

interface State {
    musics : MusicModel[];
    loading : boolean;
    error : string | null;
}

class MusicListView extends React.Component<Props, State> {
    public static getDerivedStateFromProps(nextProps : Props, prevState : State) : State | null {
        const { musics, loading, error } = nextProps;
        if(
            prevState.musics !== musics ||
            prevState.loading !== loading ||
            prevState.error !== error
        ) {
            return {
                musics, loading, error
            }
        }
        return null;
    }

    constructor(props : any){
        super(props);
        this.state = { musics : [], loading : false, error : null };
    }

    public render() {
        const { history, location, match } = this.props;
        const { musics, loading, error } = this.state;
        let musicView : any = null;
        
        if(loading){
            musicView = (
                <tr>
                    <td colSpan={6}>
                        <div className="text-center">
                            <h1><i className="fa fa-spinner fa-spin" /> 음악 목록을 불러오는 중입니다...</h1>
                        </div>
                    </td>
                </tr>
            );
        } else if(error !== null) {
            musicView = (
                <tr>
                    <td colSpan={6}>
                        <div className="text-center">
                            <h1>음악을 불러오는 도중 오류가 발생했습니다.</h1>
                            <h2>{error}</h2>
                        </div>
                    </td>
                </tr>
            )
        } else {
            musicView = musics.map((music, idx) => <MusicBriefInfo music={music} key={`music_key_${idx}`} history={history} location={location} match={match} />);
        }

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
                        {musicView}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default MusicListView;