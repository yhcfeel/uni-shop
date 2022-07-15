<template>
	<view>
		<my-search @click.native="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height:wh + 'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view :class="['left-scroll-view-item',index === active ? 'active' : '']" @click="activeChange(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view scroll-y="true" :style="{height:wh + 'px'}" class="rightview" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,index2) in cateLevel2" :key="index2">
					<!-- 二级分类标题 -->
					<view class="cate-lv2-title">/{{item2.cat_name}}/</view>
					<!-- 三级分类盒子 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)">
							<!-- 三级分类元素图片 -->
							<image :src="item3.cat_icon" mode=""></image>
							<!-- 三级分类元素图片文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
					<!-- 三级分类 -->
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
		import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				wh: 0 ,//设备可用高度
				cateList:[] ,//列表数据
				cateLevel2:[],//二级列表数据
				active:0 ,//默认激活的标签
				scrollTop:0	//滚动条位置
			};
		},
		onLoad() {
			// 获取设备信息
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getCateList()
		},
		methods:{
			async getCateList(){
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children
				// console.log(this.cateLevel2)
			},
			activeChange(index){
				this.active = index
				
				//重新为二级分类复制
				this.cateLevel2 = this.cateList[index].children
				
				//重置滚动条位置
				this.scrollTop = this.scrollTop === 0 ? 1 : 0 //如果直接设为0，那么切换时scroll没变化，vue不会解析模板
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
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
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;
		}
	}
	.left-scroll-view-item{
		background-color: #f7f7f7;
		line-height: 60px;
		text-align: center;
		font-size: 12px;
		&.active {
			background-color: #ffffff;
			position: relative;
			&::before {
				content: '';
				display: block;
				width: 3px;
				height: 30px;
				background-color: #c00000;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}
		}
	}
	.cate-lv2-title{
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	.cate-lv3-list{
		display: flex;
		flex-wrap: wrap;
		.cate-lv3-item{
			width: 33%;
			display:flex;
			flex-direction: column;
			justify-content: center;
			align-items:center;
			margin-bottom: 10px;
			image{
				width: 60px;
				height: 60px;
			}
			text{
				font-size: 12px;
			}
		}
		
	}
	.rightview{
		background-color: #fff;
	}
</style>
