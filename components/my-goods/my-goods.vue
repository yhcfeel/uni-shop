<template>
		<view class="goods-item" >
			<view class="goods-item-left"> <!-- //logo盒子 -->
				<radio :checked="goods.goods_status" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
				<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
			</view>
			<view class="goods-item-right"> <!-- //简介盒子 -->
				<view class="goods-name">{{goods.goods_name}}</view>	<!-- //简介 -->
				<view class="goods-info-box">
					<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
					<uni-number-box :min="1" :value="goods.goods_count" :v-if="showNum" @change="numChangeHandler"></uni-number-box>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		name:"my-goods",
		data() {
			return {
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
				
			};
		},
		methods:{
			radioClickHandler(){
				this.$emit('radioChangeHandler',{
					goods_id:this.good_id,
					goods_state:!this.goods.goods_state
				})
			},
			numChangeHandler(val){
				this.$emit('@numChange',{
					goods_id:this.goods.good_id,
					goods_count:+val
					})
			}
		},
		props:{
			goods:{
				type:Object,
				default:{}
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showNum:{
				type:Boolean,
				default:false
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	width: 750px;
	box-sizing: border-box;
	
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.goods-item-left{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
			margin-right: 5px;
		}
	}
	.goods-item-right{
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
		}
		.goods-info-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-price{
				color: #c00000;
				font-size: 16px;
			}
		}
	}
}
</style>