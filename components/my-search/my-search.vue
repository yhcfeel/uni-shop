<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}">
		<view class="my-search-box" :style="{'border-radius':radius + 'px'}">
			<!-- uni-ui -->
			<uni-icons type = "search" size="17"></uni-icons>
			<text class="placeHolder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{//自定义背景和圆角
			bgcolor:{
				type:String,
				default:'#C00000'
			},
			radius: {
				type:Number,
				default:18
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.my-search-container{
		height: 50px;
		// background-color: #C00000;
		display: flex;
		align-items: center;
		padding: 0 10px;
		
		.my-search-box{
			height: 36px;
			width: 100%;
			background-color: #fff;
			// border-radius: 18px;
			display: flex;
			justify-content: center;
			align-items: center;
			:placeHolder{
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}
</style>