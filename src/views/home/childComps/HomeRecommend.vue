<template>
	<div class="home-recommend">
		<div v-for="item in recommedns" class="home-recommend-item">
			<a :href="item.link">
				<img :src="item.image" />
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default{
		name:'HomeRecommend',
		props:{
			recommedns:{
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	.home-recommend{
		text-align: center;
		display: flex;
		padding: 15px 0 15px;
		border-bottom: 8px solid #eee;
	}
	.home-recommend-item{
		flex: 1;
		font-size: 12px;
	}
	.home-recommend-item img{
		width: 70px;
		height: 70px;
	}
</style>
