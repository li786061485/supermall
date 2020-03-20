<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<tab-control :titles="['流行', '新款', '精选']"
			@tabClick="tabClick"
			ref="tabcontrol1" class="tab-control" v-show="isTabFixed"></tab-control>
		<scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
			<home-recommend :recommedns="recommends"></home-recommend>
			<feature-view></feature-view>
			<tab-control :titles="['流行', '新款', '精选']" 
				@tabClick="tabClick"
				ref="tabcontrol2"></tab-control>
			<goods-list :goods="showGoods"></goods-list>
		</scroll>
		
		<back-top @click.native="backTopClick" v-show="isShowBackUp"></back-top>
	</div>
</template>

<script>
	import HomeSwiper from "./childComps/HomeSwiper.vue"
	import HomeRecommend from "./childComps/HomeRecommend.vue"
	import FeatureView from "./childComps/FeatureView.vue"
	
	import NavBar from "components/common/navbar/NavBar.vue"
	import Scroll from 'components/common/scroll/Scroll.vue'
	
	import TabControl from "components/content/tabControl/TabControl.vue"
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import BackTop from 'components/content/backTop/BackTop.vue'
	
	
	
	import {getHomeMultidata,getHomeGoods} from "network/home.js"
	
	export default {
	  name: 'Home',
	  components:{
		  HomeSwiper,
		  HomeRecommend,
		  FeatureView,
		  NavBar,
		  Scroll,
		  TabControl,
		  GoodsList,
		  BackTop
	  },
	  data(){
		  return {
			  banners: [],
			  recommends: [],
			  goods:{
				  pop:{page:0, list:[]},
				  new:{page:0, list:[]},
				  sell:{page:0, list:[]}
			  },
			  currentType: 'pop',
			  isShowBackUp: false,
			  tabOffsetTop: 0,
			  isTabFixed:false
		  }
	  },
	  computed:{
		  showGoods(){
			  return this.goods[this.currentType].list
		  }
	  },
	  created(){
		  //1.请求多个数据
		  this.getHomeMultidata();
		  
		  this.getHomeGoods('pop');
		  this.getHomeGoods('new');
		  this.getHomeGoods('sell');
		  
	  },
	  mounted(){
		  //事件总线，接受图片加载完消息
		  //this.$refs最好写在mounted监听中
		  const refresh = this.debounce(this.$refs.scroll.refresh, 200);
		  this.$bus.$on("itemImageLoad", ()=>{
		  		refresh() //此处无参，防抖函数args无值
		  })
	  },
	  methods:{
		  /**
		   * 事件监听相关
		   */
		  debounce(func, delay){ //防抖函数
			  let timer = null
			  
			  return function(...args){
				  if(timer) clearTimeout(timer)
				  
				  timer = setTimeout(() => {
					  func.apply(this, args)
				  }, delay);
			  }
		  },
		  tabClick(index){
			  switch(index){
				  case 0:
					this.currentType = 'pop'
					break
				  case 1:
					this.currentType = 'new'
					break
				  case 2:
					this.currentType = 'sell'
					break
			  }
			  this.$refs.tabcontrol1.currentIndex = index;
			  this.$refs.tabcontrol2.currentIndex = index;
		  },
		  contentScroll(position){
			  //滚动监听
			  this.isShowBackUp = (-position.y) > 1000
			  
			  //决定tabcontroll是否吸顶（position:fixed）
			  this.isTabFixed = (-position.y) > this.tabOffsetTop
		  },
		  loadMore(){
			  //下拉显示更多
			  console.log("xiala")
			  this.getHomeGoods(this.currentType)
			  
		  },
		  backTopClick(){
			  this.$refs.scroll.scrollTo(0, 0, 500)
		  },
		  swiperImageLoad(){
			  //获取tabcontrol的offsettop
			  //所有的组件都有一个属性$el，用来获取组件中的元素
			  console.log(this.$refs.tabcontrol2.$el.offsetTop)
			  this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
		  },
		  
		  /**
		   * 网络请求相关
		   */
		  getHomeMultidata(){
			  getHomeMultidata().then(res => {
				  this.banners = res.data.data.banner.list
				  this.recommends = res.data.data.recommend.list
			  })
		  },
		  getHomeGoods(type){
			  const page = this.goods[type].page + 1;
			  getHomeGoods(type, page).then(res => {
				  this.goods[type].list.push(...res.data.data.list)
				  this.goods[type].page +=1
				  
				  //此处不finishPullUp只能下拉加载一次
				  this.$refs.scroll.finishPullUp()
			  }).catch(err=>{
				  console.log(err)
			  })
		  }
	  }
	}
</script>

<style scoped>
	#home{
		/* 视口高度，限制home div被撑大 */
		height: 100vh;
		position:relative
	}
	.home-nav{
		background-color: var(--color-tint);
		color: #FFFFFF;
		
		/* 在使用浏览器原生滚动，为了是导航不跟随滚动使用，使用better-scroll局部滚动后不需要了 */
		/* position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 2; */
	}
	.content {
	    overflow: hidden;
	
	    position: absolute;
	    top: 44px;
	    bottom: 49px;
	    left: 0;
	    right: 0;
	  }
	  
	  /* .content {
	      height: calc(100% - 93px);
	      overflow: hidden;
	      margin-top: 44px;
	   } */
	   
	   .tab-control{
		   position: relative;
		   z-index: 9;
	   }
</style>
