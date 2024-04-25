import Cookies from 'js-cookie';
import { defineStore } from 'pinia';

export const useAuth = defineStore({
	id: 'auth',
	state: () => ({
		token: Cookies.get('token'),
	}),
	getters: {
		getToken: (state) => state.token,
	},
	actions: {
		setToken(token) {
			this.token = token;
			Cookies.set('token', token);
		},
		setUserFailure() {
			this.token = null;
			Cookies.remove('token');
		},
		async login(token) {
			this.setToken(token);
		},
		async logout() {
			this.setUserFailure();
			return true;
		},
	},
});
