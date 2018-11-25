import * as React from 'react';
import { music_find_by_genre } from './action/action_music';
import { MusicModel } from './model';

interface Props {
    genreId : number;
}

interface State {
    musics : MusicModel[];
}

class GenreMusicListView extends React.Component<Props, State> {
    private static isMounted : boolean;
    
    constructor(props : Props){
        super(props);
        GenreMusicListView.isMounted = false;
        this.state = { musics : [] };
    }

    public componentDidMount() {
        GenreMusicListView.isMounted = true;
        const { genreId } = this.props;
        if(genreId !== 0) {
            this.getMusicsByGenre(genreId);
        }
    }

    public async getMusicsByGenre(genreId : number){
        music_find_by_genre(genreId).then((response : any) => {
            const { data } = response;
            const musicData = data.map((music : any) => new MusicModel(music.id, music.title, music.singer, music.year, music.genreId, music.publisherId));
            if(GenreMusicListView.isMounted){
                this.setState({
                    musics : musicData
                });
            }
        });
    }

    public componentWillUnmount() {
        GenreMusicListView.isMounted = false;
    }

    public render(){
        const { musics } = this.state;
        const musicBodyRows = 
            musics.length > 0 ?
                musics.map((music : MusicModel, idx : number) => (
                    <tr key={`music_body_tr_${idx}`}>
                        <td>{music.getId}</td>
                        <td>{music.getTitle}</td>
                        <td>{music.getSinger}</td>
                        <td>{music.getYear}</td>
                    </tr>
                )) :
                (
                    <tr>
                        <td colSpan={4}>해당하는 음악이 존재하지 않습니다.</td>
                    </tr>
                );
        return(
            <React.Fragment>
                <table className="table text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">제목</th>
                            <th scope="col">가수</th>
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

export default GenreMusicListView;