import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';

import configureStore from '../redux/store.js';
import actions from '../redux/actions.js';
import PostIndex from './post/PostIndex.jsx';

class App extends React.Component {

    render () {
        return (
            <div className="ui container">
                <PostIndex actions={this.props.actions} posts={this.props.posts} user={this.props.user} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
