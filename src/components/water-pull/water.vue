<template>
	<div class="main-body flex">
		<div class="grid" v-for="(item,index) in list" :key="index">
			<water-item :note="item"></water-item>
		</div>
	</div>
</template>

<script>
	import Masonry from "masonry-layout";
	export default {
		props:{
			type:{
				type: String,
				default:''
			},
			title: {
				type: String,
				default:''
			},
			labelId: {
				type: String,
				default:'0'
			}
		},
		data() {
			return {
				currentPage: 0,
				list: [],
				searchLock:true
			}
		},
		components:{
			waterItem: () => import('@/components/water-pull/water-item'),
		},
		methods:{
			waterPull() {
				let cont = document.querySelector('.main-body')
				this.water = new Masonry(cont, {
					itemSelector: ".grid",
				})
				// setTimeout(() => {
				// 	this.adapt()
				// }, 100)
			},
			adapt() {
				document.querySelector('#particles-js').style.height = document.querySelector('.main-bg').clientHeight + "px"
				this.$parent.$parent.$refs.particles.init()
			},
			search() {
				if(!this.searchLock){
					return
				}
				this.currentPage++
				this.searchLock = false
				let data = {current: this.currentPage}
				if(this.labelId != '0') Object.assign(data,{labelId:this.labelId})
				if(this.title != '') Object.assign(data,{title:this.title})
				// if(this.title != '' || this.labelId != ''){
				// 	this.currentPage = 1
				// }
				this.$api.noteSearch(data).then(res => {
					this.searchLock = true
					if(this.currentPage == 1) this.list = res.data[0]
					else this.list = [...this.list, ...res.data[0]]
					this.$nextTick(() => {
						this.waterPull()
					})
				})
			}
		},
		created() {
			this.search()
		},
		mounted(){
			// let scrollbarEl = this.$root.$children[0].$refs.scrollbar.wrap
			let scrollbarEl = this.$parent.$parent.$refs.wrap
			scrollbarEl.onscroll = () => {
				let scrollTop = scrollbarEl.scrollTop
				let scrollHeight = scrollbarEl.scrollHeight
				let clientHeight = window.innerHeight || document.documentElement.clientHeight
				if (scrollTop >= scrollHeight - clientHeight - 20) {
					this.search()
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.main-body {
		align-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		z-index: 1;
	}
	
	.grid:hover {
		box-shadow: $shadow;
		transform:translateY(-1px);
	}
</style>