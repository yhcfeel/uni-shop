export default {
	namespaced: true,


	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorage('token') || '',
		userInfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		redirectInfo: null
	}),

	mutations: {
		updateRedirectInfo(state, info) {
			state.redirectInfo = info
		},
		updateAddress(state, address) {
			state.address = address
			this.commit('user/saveAddressToStorage')
		},

		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		updateUserInfo(state, userinfo) {
			state.userInfo = userinfo
			this.commit('user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userInfo))
		},
		updateToken(state, token) {
			state.token = token
			this.commit('user', 'saveTokenToStorage')
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		}
	},

	getters: {
		addstr(state) {
			if (!state.address.provinceName) return ''

			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	}
}
