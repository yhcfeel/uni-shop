<template>
	<view class="mybgc">
		<my-login v-if="!token"></my-login>
		
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {mapState} from 'vuex'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				
			};
		},
		computed:{
			
		}
	}
</script>

<style lang="scss">
.mybgc{
	background-color: #fff;
	height: 750px
}
</style>
