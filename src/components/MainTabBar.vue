<template>
	<tab-bar>
		<tab-bar-item path="/home" activeColor="deepPink">
			<img slot="item-icon" src="~assets/img/1.jpg" />
			<img slot="item-icon-active" src="~assets/img/1-active.png" />
			<div slot="item-text">首页</div>
		</tab-bar-item>
		<tab-bar-item path="/category" activeColor="deepPink">
			<img slot="item-icon" src="~assets/img/2.png" />
			<img slot="item-icon-active" src="~assets/img/2-active.png" />
			<div slot="item-text">分类</div>
		</tab-bar-item>
		<tab-bar-item path="/cart" activeColor="deepPink">
			<img slot="item-icon" src="~assets/img/3.png" />
			<img slot="item-icon-active" src="~assets/img/3-active.png" />
			<div slot="item-text">购物车</div>
		</tab-bar-item>
		<tab-bar-item path="/profile" activeColor="deepPink">
			<img slot="item-icon" src="~assets/img/4.png" />
			<img slot="item-icon-active" src="~assets/img/4-active.png" />
			<div slot="item-text">我的</div>
		</tab-bar-item>
	</tab-bar>
</template>

<script>
	import TabBar from "components/tabbar/TabBar.vue"
	import TabBarItem from "components/tabbar/TabBarItem.vue"
	
	export default {
	  name: 'MainTabBar',
	  components:{
		  TabBar,
		  TabBarItem
	  }
	}
</script>

<style>
</style>
