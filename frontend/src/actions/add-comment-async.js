import { request } from '../utils/index.js';
import { addComment } from './add-comment.js';

export const addCommentAsync = (postId, content) => (dispatch) => {
	request(`/posts/${postId}/comments`,'POST', { content }).then((comment) => {
		dispatch(addComment(comment.data));
	});
};
