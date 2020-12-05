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
			}
		},
		data() {
			return {
				currentPage: 1,
				list: [],
				list1: [{
					id:1,
					type: 1,
					time: '01/20',
					name: '1234',
					imgList: [
						'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
					]
				}, {
					id:1,
					type: 2,
					time: '01/20',
					name: '2234',
					imgList: [
						'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}, {
					id:1,
					type: 3,
					time: '01/20',
					name: '3234',
					imgList: [
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}, {
					id:1,
					type: 4,
					time: '01/20',
					name: '4234',
					imgList: [
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}]
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
				setTimeout(() => {
					this.adapt()
				}, 100)
			},
			adapt() {
				document.querySelector('#particles-js').style.height = document.querySelector('.main-bg').clientHeight + "px"
				this.$parent.$parent.$refs.particles.init()
			},
			search() {
				let data = {current: this.currentPage}
				if(this.type) Object.assign(data,{type:this.type})
				this.$api.noteSearch(data).then(res => {
					if(this.currentPage == 1) this.list = res.data[0]
					else this.list = [...this.list, ...res.data[0]]
				})
				// todo
				// this.list = [...this.list, ...this.list1]
				// this.$nextTick(() => {
				// 	this.show = true
				// 	this.waterPull()
				// })
			}
		},
		created() {
			this.search()
		},
		mounted(){
			this.waterPull()
			let scrollbarEl = this.$root.$children[0].$refs.scrollbar.wrap
			// scrollbarEl.onscroll = () => {
			// 	let scrollTop = scrollbarEl.scrollTop
			// 	let scrollHeight = scrollbarEl.scrollHeight
			// 	let clientHeight = window.innerHeight || document.documentElement.clientHeight
			// 	if (scrollTop >= scrollHeight - clientHeight - 20) {
			// 		this.show = false
			// 		this.currentPage++
			// 		this.search()
			// 	}
			// }
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
	}
</style>
<!-- [{
					id:1,
					type: 1,
					time: '01/20',
					name: '1234',
					imgList: [
						'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
						'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
						'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
					]
				}, {
					id:2,
					type: 2,
					time: '01/20',
					name: '2234',
					imgList: [
						'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}, {
					id:3,
					type: 3,
					time: '01/20',
					name: '3234',
					imgList: [
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}, {
					id:4,
					type: 4,
					time: '01/20',
					name: '4234',
					imgList: [
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}] -->
				<!-- {"url":"https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"},
				    {"url":"https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg"},
				    {"url":"https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"},
				    {"url":"https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg"} -->