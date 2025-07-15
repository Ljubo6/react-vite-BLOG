import { request } from '../utils/index.js';

export const removePostAsync = (id) => () =>
	request(`/posts/${id}`,'DELETE');
