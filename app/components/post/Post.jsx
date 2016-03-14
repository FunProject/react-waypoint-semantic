import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import ReactEmoji from 'react-emoji';

class Post extends React.Component {

    constructor(props) {
        super(props);
    };

    handlePinUnpin() {
        this.props.actions.pinUnpinPost(this.props.post.id);
    };

    handleDelete() {
        this.props.actions.deletePost(this.props.post.id);
    };

    render() {
        return (
            <div className="ui card">
                <div className="content">
                    <img className="ui avatar image" src="#" />
                    {this.props.post.created_by.name} {this.props.post.created_by.surname}
                </div>
                <div className="content">
                    {ReactEmoji.emojify(this.props.children.toString())}
                </div>
            </div>
        );
    };

}

export default Post;
