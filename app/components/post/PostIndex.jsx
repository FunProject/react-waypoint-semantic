import React from 'react';
import { browserHistory } from 'react-router';

import PostList from './PostList.jsx';

class PostIndex extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="post-index">
                <PostList actions={this.props.actions} user={this.props.user} posts={this.props.posts} />
            </div>
        );
    };

}

export default PostIndex;
