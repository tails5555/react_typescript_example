import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as MusicActions from '../action/action_music';
import * as GenreActions from '../action/action_genre';
import * as PublisherActions from '../action/action_publisher';

import { ReducerState } from '../reducer';
import ReduxMusicUpdatePage from './ReduxMusicUpdatePage';

const mapStateToProps = (state : ReducerState) => ({
    musicState : state.music,
    genreState : state.genre,
    publisherState : state.publisher
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
    fetchMusic : bindActionCreators(MusicActions.fetchMusicElementAction, dispatch),
    resetFetchMusic : bindActionCreators(MusicActions.resetFetchMusicElementAction, dispatch),
    updateMusic : bindActionCreators(MusicActions.updateMusicElementAction, dispatch),
    resetSaveMusic : bindActionCreators(MusicActions.resetSaveMusicElementAction, dispatch),
    fetchGenres : bindActionCreators(GenreActions.fetchGenreListAction, dispatch),
    fetchPublishers : bindActionCreators(PublisherActions.fetchPublisherListAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxMusicUpdatePage);