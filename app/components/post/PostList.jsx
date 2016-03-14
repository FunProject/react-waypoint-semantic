import React from 'react';
import Waypoint from 'react-waypoint';

import Post from './Post.jsx';

class PostList extends React.Component {

    constructor(props) {
        super(props);
    }

    loadMoreItems() {
        this.props.actions.requestPostsAsync(this.props.user, this.props.posts.lastLoadedPage + 1, 5);
    }

    renderWaypoint() {
        if (!this.props.posts.areLoading && !this.props.posts.allAreLoaded) {
            return (
                <Waypoint
                    onEnter={this.loadMoreItems.bind(this)}
                />
            );
        }
    }

    renderAllPostsAreLoaded() {
        if (this.props.posts.allAreLoaded) {
            return (
                <div className="alert alert-success" role="alert">
                    <p className="text-center">The end</p>
                </div>
            );
        }
    }

    renderAreLoadingSpinner() {
        if (this.props.posts.areLoading) {
            return (
                <div className="load-spin-ball"></div>
            );
        }
    }

    render() {

        let postNodes = this.props.posts.data.map((post) => {
            return (
                <Post key={post.id} post={post} actions={this.props.actions}>
                    {post.body}
                </Post>
            );
        });

        return (
            <div className="ui one cards">
                {postNodes}
                {this.renderWaypoint()}
                {this.renderAreLoadingSpinner()}
                {this.renderAllPostsAreLoaded()}
            </div>
        );

    }

}

export default PostList;
