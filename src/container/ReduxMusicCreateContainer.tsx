import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as GenreActions from '../action/action_genre';
import * as PublisherActions from '../action/action_publisher';

import { ReducerState } from '../reducer';
import ReduxMusicCreatePage from './ReduxMusicCreatePage';

const mapStateToProps = (state : ReducerState) => ({
    music : state.music,
    genre : state.genre,
    publisher : state.publisher
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
    fetchGenres : bindActionCreators(GenreActions.fetchGenreListAction, dispatch),
    fetchPublishers : bindActionCreators(PublisherActions.fetchPublisherListAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxMusicCreatePage);