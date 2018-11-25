import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

// import { music_find_by_genre } from './action/action_music';
import { genre_create, genre_update, genre_delete, genre_find_one } from './action/action_genre';

import { MusicModel } from './model';
import { GenreForm } from './form';
import { GenreError } from './error';

import { InputRender } from './form_render';

interface Props extends RouteComponentProps<any> {

}

interface State {
    genre : GenreForm;
    error : GenreError;
    musics : MusicModel[];
}

class GenreModelForm extends React.Component<Props, State> {
    constructor(props : any){
        super(props);
        this.state = { genre : new GenreForm(''), error : new GenreError(''), musics : [] };
        this.handleSubmitData = this.handleSubmitData.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
    }

    public componentDidMount() {
        const { match, location } = this.props;
        if(location.pathname.includes('update')) {
            const { id } = match.params;
            if(!isNaN(id)){
                genre_find_one(id).then((response : any) => {
                    const genreData = response.data;
                    const { genre } = this.state;
                    genre.setName = genreData.name;
                    this.setState({ genre });
                })
            }
        }
    }

    public handleSubmitData = (event : any) => {
        event.preventDefault();

        let hasError = false;
        const { history, match } = this.props;
        const { error, genre } = this.state;

        if(genre.getName.trim() === ''){
            error.setNameMessage = '장르 이름을 입력하시길 바랍니다.';
            hasError = true;
        } else {
            error.setNameMessage = '';
        }

        if(hasError) {
            this.setState({ error });
        } else {
            const { pathname } = location;
            if(pathname.includes('create')) {
                genre_create(genre).then((response : any) => {
                    const { status } = response;
                    if(status === 201){
                        alert(`장르 ${genre.getName} 이(가) 추가 되었습니다.`);
                        history.push('/example/genre_list/_refresh');
                    }
                });                
            } else {
                const { id } = match.params;
                genre_update(Number(id), genre).then((response : any) => {
                    const { status } = response;
                    if(status === 200){
                        alert(`장르 ${genre.getName} 이(가) 수정 되었습니다.`);
                        history.push('/example/genre_list/_refresh');
                    }
                });
            }
        }
    }

    public handleChangeData = (event : any) => {
        const { genre } = this.state;
        switch(event.target.name){
            case 'name' :
                genre.setName = event.target.value;
                break;
        }

        this.setState({ genre });
    }

    public handleClickDeleteElement = () => {
        const { history, match } = this.props;
        const { genre } = this.state;
        const isDelete = window.confirm(`장르 ${genre.getName} 을(를) 삭제 합니다. 계속 진행 하시겠습니까?`);
        if(isDelete){
            const { id } = match.params;
            genre_delete(Number(id)).then((response : any) => {
                const { status } = response;
                if(status === 204){
                    alert(`장르 ${genre.getName} 이(가) 삭제 되었습니다.`);
                    history.push('/example/genre_list/_refresh');
                }
            });
        }
    }

    public render(){
        const { location } = this.props;
        const { genre, error } = this.state;
        
        return (
            <React.Fragment>
                <h1>장르 { location.pathname.includes('create') ? '추가' : '수정' }</h1>
                <hr/>
                {
                    location.pathname.includes('update') ? 
                        <div className="text-right">
                            <button type="button" className="btn btn-danger" onClick={() => this.handleClickDeleteElement()}>삭제</button>
                        </div> : null 
                }
                <form onSubmit={this.handleSubmitData}>
                    <InputRender label="장르 이름" value={genre.getName} name="name" onChange={this.handleChangeData} error={error.getNameMessage} />
                    <br/>
                    <button type="submit" className="btn btn-primary btn-block">{ location.pathname.includes('create') ? '추가' : '수정' } 완료</button>
                </form>
            </React.Fragment>
        );
    }
}

export default GenreModelForm;