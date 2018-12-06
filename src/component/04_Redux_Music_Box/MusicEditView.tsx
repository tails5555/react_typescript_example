import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { MusicForm } from './model';
import { MusicError } from './error';

import { InputRender, SelectRender } from './form';
import { MusicModel, GenreModel, PublisherModel } from './../../action/model';

interface Props extends RouteComponentProps<any> {
    music : MusicModel | null;
    genres : GenreModel[];
    genreLoading : boolean;
    genreError : string | null;
    publishers : PublisherModel[];
    publisherLoading : boolean;
    publisherError : string | null;
}

interface State {
    musicForm : MusicForm;
    musicError : MusicError
}

class MusicEditView extends React.Component<Props, State> {
    constructor(props : any){
        super(props);
        this.state = { musicForm : new MusicForm('', '', '', 1, 1), musicError : new MusicError('', '', '') };
        this.handleSubmitData = this.handleSubmitData.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
    }

    public componentDidMount() {
        const { location, match } = this.props;
        if(location.pathname.includes('update')) {
            const { id } = match.params;
            if(!isNaN(id)){
                alert(id);
            }
        }
    }

    public handleSubmitData = (event : any) => {
        event.preventDefault();

        let hasError = false;
        const { musicError, musicForm } = this.state;

        if(musicForm.getTitle.trim() === ''){
            musicError.setTitleMessage = '노래 제목을 입력하시길 바랍니다.';
            hasError = true;
        } else {
            musicError.setTitleMessage = '';
        }

        if(musicForm.getSinger.trim() === ''){
            musicError.setSingerMessage = '가수를 입력하셔야 됩니다.';
            hasError = true;
        } else {
            musicError.setSingerMessage = '';
        }

        if(typeof musicForm.getYear === "string" && musicForm.getYear.trim() === '') {
            musicError.setYearMessage = '연도를 입력하셔야 됩니다.';
            hasError = true;
        } else if(typeof musicForm.getYear === "string" && isNaN(Number(musicForm.getYear))) {
            musicError.setYearMessage = '연도는 숫자로만 입력하시길 바랍니다.';
            hasError = true;
        } else {
            musicError.setYearMessage = '';
        }

        if(hasError) {
            this.setState({musicError});
        } else {
            const { pathname } = location;
            if(pathname.includes('create')) {
                alert('추가 완료');              
            } else {
                alert('수정 완료');
            }
        }
    }

    public handleChangeData = (event : any) => {
        const { musicForm } = this.state;
        switch(event.target.name){
            case 'title' :
                musicForm.setTitle = event.target.value;
                break;
            case 'singer' :
                musicForm.setSinger = event.target.value;
                break;
            case 'year' :
                musicForm.setYear = event.target.value;
                break;
            case 'genreId' :
                musicForm.setGenreId = event.target.value;
                break;
            case 'publisherId' :
                musicForm.setPublisherId = event.target.value;
                break;
        }

        this.setState({ musicForm });
    }

    public handleClickDeleteElement = () => {
        const { musicForm } = this.state;
        const isDelete = window.confirm(`${musicForm.getTitle} 음악을 삭제 합니다. 계속 진행 하시겠습니까?`);
        if(isDelete){
            alert('삭제 완료!');
        }
    }

    public handleClickBack = () => {
        const { history } = this.props;
        history.push('./music_list');
    }

    public render(){
        const { location, genres, genreLoading, genreError, publishers, publisherLoading, publisherError } = this.props;
        const { musicForm, musicError } = this.state;
        const genreState = 
            genreLoading ? 
                <p><i className="fas fa-spinner fa-spin" /> 장르를 불러오는 중입니다...</p> :
            genreError !== null ? 
                <p><i className="fas fa-exclamation-triangle" /> 오류 : {genreError}</p> : null;
        
        const publisherState = 
                publisherLoading ? 
                    <p><i className="fas fa-spinner fa-spin" /> 배급사를 불러오는 중입니다...</p> :
                publisherError !== null ? 
                    <p><i className="fas fa-exclamation-triangle" /> 오류 : {publisherError}</p> : null;
        
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
                    <InputRender label="노래 제목" value={musicForm.getTitle} name="title" onChange={this.handleChangeData} error={musicError.getTitleMessage} />
                    <InputRender label="가수" value={musicForm.getSinger} name="singer" onChange={this.handleChangeData} error={musicError.getSingerMessage} />
                    <InputRender label="연도" value={musicForm.getYear} name="year" onChange={this.handleChangeData} error={musicError.getYearMessage} />
                    <SelectRender label="장르" value={musicForm.getGenreId} name="genreId" onChange={this.handleChangeData} options={genreOptions} />
                    { genreState }
                    <SelectRender label="배급사" value={musicForm.getPublisherId} name="publisherId" onChange={this.handleChangeData} options={publisherOptions} />
                    { publisherState }
                    <br/>
                    <button type="submit" className="btn btn-primary btn-block"><i className="fas fa-check" /> { location.pathname.includes('create') ? '추가' : '수정' } 완료</button>
                    <br/>
                    <button type="button" className="btn btn-info btn-block" onClick={() => this.handleClickBack()}><i className="fas fa-arrow-left" /> 이전으로</button>
                </form>
            </React.Fragment>
        );
    }
}

export default MusicEditView;