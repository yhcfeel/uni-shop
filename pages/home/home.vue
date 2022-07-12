<template>
	<view>
		<view class="search-box">
			<my-search @click.native="gotoSearch"></my-search>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">

			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<!-- 动态绑定图片的src属性 -->
					<image :src="item.image_src"></image>

				</navigator>
			</swiper-item>

		</swiper>


		<!-- 分类导航区 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index">
				<image :src="item.image_src" @click="navClickHandler(item)"></image>
			</view>
		</view>
		
		<!-- 楼层区 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 标题图片 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 商品图片 -->
				<view class="floor-img-box">
					<!-- 左侧图片 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧4个盒子 -->
					<view class="right-img-box">
						<navigator  class="right-img-item" v-for="(item2,index2) in item.product_list" :key="index2" v-if="index2 !== 0" :url="item2.url">
							<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix"></image>
							
						</navigator>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图数据列表
				swiperList: [],
				//分类数据列表
				navList: [],
				//数据楼层列表
				floorList: []
			};
		},
		onLoad() {
			//调用方法，获取轮播图数据
			this.getSwiperList()
			//调用方法，获取导航数据
			this.getNavList()
			//获取楼层数据
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const res = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.statusCode !== 200) return uni.$showMsg()
				this.swiperList = res.data.message
				// uni.$showMsg('数据请求成功')
			},
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return unni.$showMsg()
				this.navList = res.message
			},
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.floorList = res.message
				//对图片的导航链接进行处理
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list' + "?" + prod.navigator_url.split('?')[1]
					})
				})
			},
			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				} else if (item.name === '秒杀拍') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				} else if (item.name === '超市购') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				} else if (item.name === '母婴品') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-item image {
			width: 128rpx;
			height: 140rpx;
		}
	}
	.floor-title{
		height: 60rpx;
		width: 100%;
		display: flex;
	}
	.right-img-box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		
	}
	.floor-img-box{
		display: flex;
		padding-left: 10rpx;
	}
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
