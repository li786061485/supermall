<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 1.创建BScroll对象
	  // this.$refs.wrapper获取有ref="wrapper"属性的dom元素
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true, //用于控制content内部div等元素是否可以点击
        probeType: this.probeType, //probeType为3才能实时监听位置
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })

      // 3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
	  //bscroll调用次方法会重新计算滚动距离
	  refresh(){
		  console.log("==========")
		  this.scroll && this.scroll.refresh()
	  }
    }
  }
</script>

<style scoped>

</style>
