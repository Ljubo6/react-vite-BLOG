import { useStore } from 'react-redux';
import { useEffect } from 'react';

export const useResetForm = (reset) => {
	const store = useStore();
	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;
		const unsubscribe = store.subscribe(() => {
			let previousWaqsLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== previousWaqsLogout) {
				reset();
			}
		});
		return unsubscribe;
	}, [reset, store]);
};
