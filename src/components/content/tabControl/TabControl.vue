<template>
	<div class="tab-control">
		<div v-for="(item, index) in titles" class="tab-control-item"
			:class="{active: index==currentIndex}"
			@click="itemClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:'TabControl',
		//外层向里层传参
		props:{
			titles:{
				type: Array,
				default(){
					return [];
				}
			}
		},
		data(){
			return {
				currentIndex: 0
			}
		},
		methods:{
			itemClick(index){
				this.currentIndex = index
				//向外层传参
				this.$emit('tabClick', index)
			}
		}
	}
</script>

<style>
	.tab-control{
		display: flex;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #fff;
	}
	
	.tab-control-item{
		flex: 1;
	}
	
	.tab-control-item span{
		font-size: 14px;
		padding: 3px;
	}
	
	.active span{
		color: var(--color-high-text);
		border-bottom: 2px solid var(--color-high-text);
	}
</style>
