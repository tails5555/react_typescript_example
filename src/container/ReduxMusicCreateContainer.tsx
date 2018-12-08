import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as MusicActions from '../action/action_music';
import * as GenreActions from '../action/action_genre';
import * as PublisherActions from '../action/action_publisher';

import { ReducerState } from '../reducer';
import ReduxMusicCreatePage from './ReduxMusicCreatePage';

const mapStateToProps = (state : ReducerState) => ({
    musicState : state.music,
    genreState : state.genre,
    publisherState : state.publisher
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
    createMusic : bindActionCreators(MusicActions.createMusicElementAction, dispatch),
    resetSaveMusic : bindActionCreators(MusicActions.resetCreateMusicElementAction, dispatch),
    fetchGenres : bindActionCreators(GenreActions.fetchGenreListAction, dispatch),
    fetchPublishers : bindActionCreators(PublisherActions.fetchPublisherListAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxMusicCreatePage);