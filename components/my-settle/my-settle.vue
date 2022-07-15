<template>
	<view>
		<view class="my-settle-container">
			<!-- 全选 -->
			<label class="radio" @click="changeAllState">
				<radio value="" color="#C00000" :checked="isFullCheck"/><text>全选</text>
			</label>
			
			<!-- 合计 -->
			<view class="amount-box">
				合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
				
			</view>
			
			
			<!-- 结算按钮 -->
			
			
			<view class="btn-settle">
				结算({{checkedCount}})
				
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('cart',['checkedCount','total','checkedGoodsAmount'])
		},
		methods:{
			...mapMutations('cart',['updateAllGoods']),
			isFullCheck(){
				return this.total === this.checkedCount
			},
			changeAllState(){
				this.updateAllGoods(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container{
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: white;
	font-size: 14px;
	padding-left: 5px;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color: #C00000;
			font-weight: bold;
		}
	}
	.btn-settle{
		background-color: #C00000;
		height: 50px;
		color: white;
		line-height: 50px;
		padding: 0 10px;
		min-width: 100px;
		text-align: center;
	}
	
}
</style>