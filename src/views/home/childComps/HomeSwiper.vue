<template>
	<swiper>
		<swiper-item v-for="item in banners">
			<a :href="item.link">
				<img :src="item.image" @load="imageLoad"/>
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
	import Swiper from "components/common/swiper/Swiper.vue"
	import SwiperItem from "components/common/swiper/SwiperItem.vue"
	
	export default{
		name:'HomeSwiper',
		data(){
			return {
				flag:false
			}
		},
		props:{
			banners:{
				type: Array,
				default(){
					return []
				}
			}
		},
		components:{
			Swiper,
			SwiperItem
		},
		methods:{
			imageLoad(){
				if(!this.flag){
					//消息发送给上一层
					this.$emit("swiperImageLoad")
					this.flag = true
				}
			}
		}
	}
</script>

<style>
</style>
