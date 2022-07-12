<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" focus="true"></uni-search-bar>
		</view>
	<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>	
	<!-- 历史记录 -->
	<view class="history-box" v-else>
		<!-- 标题 -->
		<view class="history-title">
			<text>搜索历史</text>
			<uni-icons type="trash" zie="17" @click="clean"></uni-icons>
		</view>
		<!-- 记录区域 -->
		<view class="history-list">
			<uni-tag :text="item" v-for="(item,index) in historys" :key="index" inverted="true" custom-style="border-color:#9c9592;margin:0 5px" @click="gotoGoodsList(item)"></uni-tag>
		</view>
		
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,	//延时器
				kw:'', //搜索词
				searchResults:[] ,//搜索的结果列表
				historyList:[] //历史记录列表
			};
		},
		computed:{
			historys(){
				return [...this.historyList].reverse()
			}
		},
		methods:{
			input(e){
				
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.kw = e
					this.getSearchList()
				},500)
			},
			gotoDetail(item){
				// console.log(item.goods_id)
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			async getSearchList(){
				if(this.kw.trim() === ''){
					this.searchResults=[]
					return
				}
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				this.saveSearchHistory()

			},
			saveSearchHistory(){
				// this.historyList.push(this.kw)
				const set = new Set(this.historyList)
				set.delete((this.kw))
				set.add(this.kw)
				this.historyList = Array.from(set)
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			clean(){
				this.historyList = []
				uni.setStorageSync('kw',[])
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + item
				})
			}
		},
		mounted() {
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		}
	}
</script>

<style lang="scss">
	.search-box{
		background-color: #C00000;
		position: sticky;
		top: 0;
		z-index: 999;
		
	}
	.sugg-list{
		padding: 0 5px;
		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.goods-name{
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}
	.history-box{
		padding: 0 5px;
		.history-title{
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
			margin-bottom: 10px;
			.history-list {
				display: flex;
				flex-wrap: wrap;
			}
		}
	}
</style>
