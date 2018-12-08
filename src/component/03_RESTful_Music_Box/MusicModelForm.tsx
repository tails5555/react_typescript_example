import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';

import { music_find_one, music_create, music_update, music_delete } from './action/action_music';
import { genre_find_all } from './action/action_genre';
import { publisher_find_all } from './action/action_publisher';

import { PublisherModel, GenreModel } from './model';
import { MusicForm } from './form';
import { MusicError } from './error';

import { InputRender, SelectRender } from './form_render';

interface Props extends RouteComponentProps<any> {

}

interface State {
    music : MusicForm;
    error : MusicError;
    genres : GenreModel[];
    publishers : PublisherModel[];
}

class MusicModelForm extends React.Component<Props, State> {
    constructor(props : any){
        super(props);
        this.state = { music : new MusicForm('', '', '', 1, 1), error : new MusicError('', '', ''), genres : [], publishers : [] };
        this.handleSubmitData = this.handleSubmitData.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
    }

    public componentDidMount() {
        const { match, location } = this.props;
        axios.all([genre_find_all(), publisher_find_all()]).then(
            axios.spread((genreResponse, publisherResponse) => {
                const genreData = genreResponse.data;
                const publisherData = publisherResponse.data;
                this.setState({
                    genres : genreData.map((genre : any) => new GenreModel(genre.id, genre.name)),
                    publishers : publisherData.map((publisher : any) => new PublisherModel(publisher.id, publisher.name))
                });
            })
        );
        if(location.pathname.includes('update')) {
            const { id } = match.params;
            if(!isNaN(id)){
                music_find_one(id).then((response : any) => {
                    const musicData = response.data;
                    const { music } = this.state;
                    music.setTitle = musicData.title;
                    music.setSinger = musicData.singer;
                    music.setYear = musicData.year;
                    music.setGenreId = musicData.genre;
                    music.setPublisherId = musicData.publisher;
                    this.setState({ music });
                })
            }
        }
    }

    public handleSubmitData = (event : any) => {
        event.preventDefault();

        let hasError = false;
        const { history, match } = this.props;
        const { error, music } = this.state;

        if(music.getTitle.trim() === ''){
            error.setTitleMessage = '노래 제목을 입력하시길 바랍니다.';
            hasError = true;
        } else {
            error.setTitleMessage = '';
        }

        if(music.getSinger.trim() === ''){
            error.setSingerMessage = '가수를 입력하셔야 됩니다.';
            hasError = true;
        } else {
            error.setSingerMessage = '';
        }

        if(typeof music.getYear === "string" && music.getYear.trim() === '') {
            error.setYearMessage = '연도를 입력하셔야 됩니다.';
            hasError = true;
        } else if(typeof music.getYear === "string" && isNaN(Number(music.getYear))) {
            error.setYearMessage = '연도는 숫자로만 입력하시길 바랍니다.';
            hasError = true;
        } else {
            error.setYearMessage = '';
        }

        if(hasError) {
            this.setState({error});
        } else {
            const { pathname } = history.location;
            if(pathname.includes('create')) {
                music_create(music).then((response : any) => {
                    const { status } = response;
                    if(status === 201){
                        alert(`음악 ${music.getTitle} 이(가) 추가 되었습니다.`);
                        history.push('/example/music_list/_refresh');
                    }
                });                
            } else {
                const { id } = match.params;
                music_update(Number(id), music).then((response : any) => {
                    const { status } = response;
                    if(status === 200){
                        alert(`음악 ${music.getTitle} 이(가) 수정 되었습니다.`);
                        history.push('/example/music_list/_refresh');
                    }
                });
            }
        }
    }

    public handleChangeData = (event : any) => {
        const { music } = this.state;
        switch(event.target.name){
            case 'title' :
                music.setTitle = event.target.value;
                break;
            case 'singer' :
                music.setSinger = event.target.value;
                break;
            case 'year' :
                music.setYear = event.target.value;
                break;
            case 'genreId' :
                music.setGenreId = event.target.value;
                break;
            case 'publisherId' :
                music.setPublisherId = event.target.value;
                break;
        }

        this.setState({ music });
    }

    public handleClickDeleteElement = () => {
        const { history, match } = this.props;
        const { music } = this.state;
        const isDelete = window.confirm(`${music.getTitle} 음악을 삭제 합니다. 계속 진행 하시겠습니까?`);
        if(isDelete){
            const { id } = match.params;
            music_delete(Number(id)).then((response : any) => {
                const { status } = response;
                if(status === 204){
                    alert(`음악 ${music.getTitle} 이(가) 삭제 되었습니다.`);
                    history.push('/example/music_list/_refresh');
                }
            });
        }
    }

    public render(){
        const { location } = this.props;
        const { music, error, genres, publishers } = this.state;
        const genreOptions = genres.length > 0 ? genres.map(genre => <option key={`genre_option_${genre.getId}`} value={genre.getId}>{genre.getName}</option>) : [ <option value={1} key="genre_option_1">--장르 선택--</option> ];
        const publisherOptions = publishers.length > 0 ? publishers.map(publisher => <option key={`publisher_option_${publisher.getId}`} value={publisher.getId}>{publisher.getName}</option>) : [ <option value={1} key="publisher_option_1">-- 배급사 선택 --</option> ];
        
        return (
            <React.Fragment>
                <h1>음악 { location.pathname.includes('create') ? '추가' : '수정' }</h1>
                <hr/>
                {
                    location.pathname.includes('update') ? 
                        <div className="text-right">
                            <button type="button" className="btn btn-danger" onClick={() => this.handleClickDeleteElement()}>삭제</button>
                        </div> : null 
                }
                <form onSubmit={this.handleSubmitData}>
                    <InputRender label="노래 제목" value={music.getTitle} name="title" onChange={this.handleChangeData} error={error.getTitleMessage} />
                    <InputRender label="가수" value={music.getSinger} name="singer" onChange={this.handleChangeData} error={error.getSingerMessage} />
                    <InputRender label="연도" value={music.getYear} name="year" onChange={this.handleChangeData} error={error.getYearMessage} />
                    <SelectRender label="장르" value={music.getGenreId} name="genreId" onChange={this.handleChangeData} options={genreOptions} />
                    <SelectRender label="배급사" value={music.getPublisherId} name="publisherId" onChange={this.handleChangeData} options={publisherOptions} />
                    <br/>
                    <button type="submit" className="btn btn-primary btn-block">{ location.pathname.includes('create') ? '추가' : '수정' } 완료</button>
                </form>
            </React.Fragment>
        );
    }
}

export default MusicModelForm;