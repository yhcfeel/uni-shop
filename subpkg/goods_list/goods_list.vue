<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods,index) in goodsList" :key="index" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				// 商品列表数据
				goodsList:[],
				//总数量，用来实现分页
				total:0,
				//节流阀
				isLoading:false
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		methods:{
			async getGoodsList(cb){
				this.isLoading=true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				this.isLoading=false
				if (res.meta.status !== 200)return uni.$showMsg()
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
				cb && cb()
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		onReachBottom() {
			
			// 判断是否还有数据
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
			//重新获取列表数据
			if(this.isLoading) return
			//让页码自增1
			this.queryObj.pagenum += 1
			this.getGoodsList()
		},
		onPullDownRefresh(){
			// 重置关键数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = false
			this.goodsList = []
			
			//重新发起请求
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
</style>
