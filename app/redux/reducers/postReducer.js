function getId(posts) {
    return posts.reduce((maxId, post) => {
            return Math.max(post.id, maxId)
        }, -1) + 1
}

let postReducer = function (state = {}, action) {
    switch (action.type) {

        case 'REQUEST_POSTS':
            return {
                areLoading: action.areLoading,
                lastLoadedPage: state.lastLoadedPage,
                data: state.data
            };

        case 'RECEIVE_POSTS':
            return {
                areLoading: action.areLoading,
                lastLoadedPage: action.allAreLoaded ? action.lastLoadedPage - 1 : action.lastLoadedPage,
                allAreLoaded: action.allAreLoaded,
                data: state.data.concat(action.posts)
            };

        case 'ADD_POST':
            return {
                areLoading: state.areLoading,
                lastLoadedPage: state.lastLoadedPage,
                data: [{
                    id: getId(state.data),
                    body: action.body,
                    pinned: action.pinned,
                    created_at: action.created_at,
                    updated_at: action.updated_at,
                    created_by: action.created_by
                }, ...state.data]
            };

        case 'PIN_UNPIN_POST':
            return {
                areLoading: state.areLoading,
                lastLoadedPage: state.lastLoadedPage,
                data: state.data.map((post) => {
                    return post.id === action.id ? Object.assign({}, post, {pinned: !post.pinned}) : post;
                })
            };

        case 'DELETE_POST':
            return {
                areLoading: state.areLoading,
                lastLoadedPage: state.lastLoadedPage,
                data: state.data.filter((post) => {
                    return post.id !== action.id;
                })
            };

        default:
            return state;

    }
};

export default postReducer;