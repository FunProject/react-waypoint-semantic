import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

const constants = {
    REQUEST_POSTS: 'REQUEST_POSTS',
    RECEIVE_POSTS: 'RECEIVE_POSTS',
    ADD_POST: 'ADD_POST',
    PIN_UNPIN_POST: 'PIN_UNPIN_POST',
    DELETE_POST: 'DELETE_POST',
};

let actions = {

    requestPosts() {
        return {
            type: constants.REQUEST_POSTS,
            areLoading: true
        };
    },

    receivePosts(posts, lastLoadedPage) {
        return {
            type: constants.RECEIVE_POSTS,
            posts: posts,
            areLoading: false,
            lastLoadedPage: lastLoadedPage,
            allAreLoaded: jQuery.isEmptyObject(posts) ? true : false
        };
    },

    requestPostsAsync(user, page, perPage) {

        if (user.isAuthenticated) {
            return (dispatch, getState) => {

                let state = getState();

                page = page ? page : state.posts.lastLoadedPage;
                perPage = perPage ? perPage : 10;

                if (!state.posts.areLoading && !state.posts.allAreLoaded) {
                    dispatch(actions.requestPosts());
                    $.ajax({
                        url: `/api/web/api/v1/posts?expand=comments&page=${page}&per-page=${perPage}`,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        },
                        success : (posts) => {
                            dispatch(actions.receivePosts(posts, page));
                        }
                    });
                }
            };
        }

    },

    addPost(post, user) {
        return {
            type: constants.ADD_POST,
            body: post.body,
            pinned: post.pinned,
            created_at: (new Date()).toISOString(),
            updated_at: (new Date()).toISOString(),
            created_by: user.data
        }
    },

    pinUnpinPost(id) {
        return {
            type: constants.PIN_UNPIN_POST,
            id: id
        }
    },

    deletePost(id) {
        return {
            type: constants.DELETE_POST,
            id: id
        }
    },

};

export default actions;
