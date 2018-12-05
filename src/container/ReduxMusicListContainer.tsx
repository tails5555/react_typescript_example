import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as MusicActions from '../action/action_music';
import { ReducerState } from '../reducer';
import ReduxMusicListPage from './ReduxMusicListPage';

const mapStateToProps = (state : ReducerState) => ({
    music : state.music
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
    fetchMusics : bindActionCreators(MusicActions.fetchMusicListAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxMusicListPage);