import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { genre_find_one } from './action/action_genre';
import { publisher_find_one } from './action/action_publisher';
import { MusicModel, GenreModel, PublisherModel } from './model';

interface Props extends RouteComponentProps<any> {
    music : MusicModel;
}

interface State {
    music : MusicModel;
    genre : GenreModel | null;
    publisher : PublisherModel | null;
}

class MusicBriefInfo extends React.Component<Props, State> {
    public static getDerivedStateFromProps(nextProps : Props, prevState : State) : State | null {
        if(
            nextProps.music !== prevState.music
        ) {
            return {
                music : nextProps.music,
                genre : prevState.genre,
                publisher : prevState.publisher
            }
        }
        return null;
    }

    constructor(props : Props){
        super(props);
        this.state = { music : props.music, genre : null, publisher : null };
    }

    public componentDidMount() {
        const { music } = this.state;
        axios.all([
            genre_find_one(music.getGenreId),
            publisher_find_one(music.getPublisherId)
        ]).then(
            axios.spread((genreResponse, publisherResponse) => {
                const genreData : any = genreResponse.data;
                const publisherData : any = publisherResponse.data;
                if(genreData !== null) {
                    this.setState({
                        genre : new GenreModel(genreData.id, genreData.name)
                    });
                }
                if(publisherData !== null) {
                    this.setState({
                        publisher : new PublisherModel(publisherData.id, publisherData.name)
                    });
                }
            })
        );
    }

    public handleClickPushing = (id : number) => {
        const { history } = this.props;
        history.push(`/example/music_update/${id}`);
    }

    public render() {
        const { music, genre, publisher } = this.state;
        return (
            <tr onClick={() => this.handleClickPushing(music.getId)}>
                <td>{music.getId}</td>
                <td>{music.getTitle}</td>
                <td>{music.getSinger}</td>
                <td>{genre && genre.getName}</td>
                <td>{publisher && publisher.getName}</td>
                <td>{music.getYear}</td>
            </tr>
        )
    }
}

export default MusicBriefInfo;