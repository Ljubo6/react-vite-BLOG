import { ACTION_TYPE } from '../actions/index.js';

const initialPostsState = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
	comments: [],
};

export const postsReducer = (state = initialPostsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_COMMENT:
			return {
				...state,
				comments:[
					...state.comments,
					action.payload,
				]
			};
		case ACTION_TYPE.REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(comment => comment.id !== action.payload),
			};
		case ACTION_TYPE.SET_POST_DATA:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
