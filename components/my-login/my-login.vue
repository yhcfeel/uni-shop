<template>
	<view>
		<view class="login-container">
			<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>

			<button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>

			<view class="tips-text">登录后享受更多权益</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed: {
			...mapState('user', ['redirectInfo']),
		},
		methods: {
			...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			getUserProfile(e) {
				uni.getUserProfile({
					desc: '获取你的昵称、头像、地区及性别',
					success: res => {
						// console.log(res);
						this.updateUserInfo(res.userInfo)
						this.getToken(res)
					},
					fail: err => {
						return uni.$showMsg('您取消了登录授权！')
					}
				})

			},
			async getToken(info) {
				// 获取code值
				const [err, res] = await uni.login().catch(err => err)
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')
				// console.log(res.code);
				// console.log(info);

				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				// console.log(query);
				const {
					data: loginResult
				} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				if (loginResult.meta.status !== 200 || loginResult.meta.status === 400) return uni.$showMsg('登录失败！')
				console.log(loginResult.message.token);
				const msg = loginResult.message || {};
				if (loginResult.meta.status === 400) {
					for (let i = 1; i <= 32; i++) {
						const n = Math.floor(Math.random() * 16.0).toString()
						msg.token += n
					}
				}
				this.updateToken(msg.token)
				this.navigateBack()
			},
			navigateBack() {
				// redirectInfo 不为 null，并且导航方式为 switchTab
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					// 调用小程序提供的 uni.switchTab() API 进行页面的导航
					uni.switchTab({
						// 要导航到的页面地址
						url: this.redirectInfo.from,
						// 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
						complete: () => {
							this.updateRedirectInfo(null)
						}
			  })
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			position: absolute;
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px;
			background-color: #C00000;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}

	}
</style>
