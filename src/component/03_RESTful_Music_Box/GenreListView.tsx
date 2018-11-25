import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { genre_find_all } from './action/action_genre';
import { GenreModel } from './model';

interface Props extends RouteComponentProps<any> {

}

interface State {
    genres : GenreModel[];
}

class GenreListView extends React.Component<Props, State> {
    private static isMounted : boolean;
    
    constructor(props : any){
        super(props);
        GenreListView.isMounted = false;
        this.state = { genres : [] };
    }

    public componentDidMount(){
        GenreListView.isMounted = true;
        this.getGenreInfo();
    }

    public async getGenreInfo() {
        genre_find_all().then((response : any) => {
            const { data } = response;
            const genreData : GenreModel[] = data.map((genre : any) => new GenreModel(genre.id, genre.name));
            if(GenreListView.isMounted){
                this.setState({
                    genres : genreData
                });
            }
        })
    }

    public componentWillUnmount() {
        GenreListView.isMounted = false;
    }

    public handleClickPushEdit = (id : number) => {
        const { history } = this.props;
        history.push(`./genre_update/${id}`);
    }

    public render() {
        const { genres } = this.state;
        const genreBodyRows : any = genres.map((genre, idx) => <tr key={`genre_key_${idx}`} onClick={() => this.handleClickPushEdit(genre.getId)}><td>{genre.getId}</td><td>{genre.getName}</td></tr>);
        return (
            <React.Fragment>
                <table className="table text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genreBodyRows}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default GenreListView;