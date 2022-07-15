<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<my-address></my-address>
		
		<!-- 标题 -->
		<view class="cart-title">
			<uni-icons type = "shop" size = "18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		
		<!-- 商品列表 -->		
		<uni-swipe-action>
			<block v-for="(goods,index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options"  @click="swipeItemClickHandler(goods)" @change="">
					<my-goods :goods="goods" showRadio="true" @radio-change="radioChangeHandler" :showNum="true" @numChange="numberChangeHandler"></my-goods>
				</uni-swipe-action-item>>
			</block>
		</uni-swipe-action>
		
		
		<!-- 结算组件 -->
		<my-settle></my-settle>
	</view>

	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				options:[
        {
            text: '删除',
            style: {
                backgroundColor: '#C00000'
            }
        }
      ]

			};
		},
		mixins:[badgeMix],
		computed:{
			...mapState('cart',['cart'])
		},
		methods:{
			...mapMutations('cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
			radioChangeHandler(e){
				this.updateGoodsState(e)
			},
			numberChangeHandler(e){
				this.updateGoodsCount(e)
			},
			swipeItemClickHandler(goods){
				this.removeGoodsById(goods.goods_id)
			}
		}
		
	}
</script>

<style lang="scss">
.cart-title{
	height: 40px;
	display: flex;
	align-items: center;
	margin-left: 5px;
	border-bottom:1px solid #efefef ;
	.cart-title-text{
		font-size: 14px;
		margin-left: 10px;
	}
}
.cart-container{
	padding-bottom: 50px;
}
.empty-cart{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	.empty-img{
		width: 90px;
		height: 90px;
	}
	.tip-text{
		font-size: 12px;
		color: gray;
		margin-top: 15px;
	}
}
</style>
