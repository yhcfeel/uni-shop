export default {
	namespaced:'true',	
	state:() => ({
		
		// 购物车信息
		// goods_id:商品id,
		// goods_name:商品名字,
		// goods_price:商品价格,
		// goods_count
		// goods_small_log
		// goods_state
		cart:JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations:{
		addToCart(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			// 判断购物车里有这件商品
			if(!findResult){	//取反后为true，说明购物车没有，push添加id
				state.cart.push(goods)
			}else {		//购物车有这件商品，给他的件数++
				findResult.goods_count++
			}
			this.commit('cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		//更新购物车商品勾选情况
		updateGoodsState(state,goods){
			const fondResult = state.cart.find(x => x.goods_id === goods)
			if(findResult){
				findResult.goods_state = goods.goods_state
				this.commit('cart/saveToStorage')
			}
		},
		//更新商品数量
		updateGoodsCount(state,goods){
			const finResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.count = goods.goods_count
				this.commit('cart/saveToStorage')
			}
		},
		removeGoodsById(state,goods_id){
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			
			this.commit('cart/saveToStorage')
		},
		updateAllGoods(state,newState){
			state.cart.forEach(x => x.goods_state = newState)
			
			this.commit('cart/saveToStorage')
		}
	},
	
	getters: {
		total(state){
			// let c = 0
			// // 循环统计商品的数量
			// state.cart.forEach(goods => c += goods.goods_count)
			// return c
			
			return state.cart.reduce((total,item) => total += item.goods_count,0)
		},
		checkedCount(state){
			return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count,0)
		},
		checkedGoodsAmount(state){
			return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count * item.goods_price,0).toFixed(2)
		}
		
	}
}