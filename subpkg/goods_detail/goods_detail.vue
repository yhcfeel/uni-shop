<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息区 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goods_info.goods_price}}</view>
			<!-- 信息主题区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递，免运费</view>
		</view>

		<!-- 商品详细信息 该标签能识别html结构并解析-->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>

		<!-- 商品导航 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		
		data() {
			return {
				goods_info: {}, //商品信息,
				//左侧按钮信息
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]

			};
		},
		computed: {
			...mapState('cart', ['cart']),
			...mapGetters('cart', ['total'])
		},
		watch: {
			total: {
				handler(newValue) {
					const findResult = this.options.find(x => x.text === '购物车')
					if (findResult) {
						findResult.info = newValue
					}
				},
				immediate:true
			}
		},
		methods: {
			
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()

				// 因为传过来的介绍结构图片直接有空格,这里用正则替换部分字符串结构
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;"').replace(/webp/g, 'jpg')
				//赋值
				this.goods_info = res.message
			},
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					//判断是否点击的时加入购物车按钮
					const goods = {
						goods_id: this.goods_info.goods_id, //商品id
						goods_name: this.goods_info.goods_name, //名称
						goods_price: this.goods_info.goods_price, //价格
						goods_count: 1, //数量
						goods_small_logo: this.goods.goods_small_logo, //商品图片
						goods_state: true, //购物车中商品勾选状态

					}
					this.addToCart(goods)

				}
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			preview(index) {
				//调用接口预览图片
				uni.previewImage({
					//图片索引
					current: index,
					//所有图片地址(数组)
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			...mapMutations('cart', ['addToCart'])
		},
		onLoad(options) {
			const goods_id = options.goods_id //获取传入的商品id
			// 调用获取商品详情数据
			this.getGoodsDetail(goods_id)
			
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #C00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				margin-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}

	.goods_nav {
		position: fixed;
		bottom: 0%;
		left: 0;
		width: 100%;
	}

	.goods-detail-container {
		padding-bottom: 50px;
	}
</style>
