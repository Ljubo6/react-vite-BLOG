import { ACTION_TYPE } from './action-type.js';
import { request } from '../utils/index.js';

export const logout = () => {
	// server.logout(operations);
	request('/logout','POST');
	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
