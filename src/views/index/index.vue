<template>
	<div class="main-bg">
		<div class="main-wrap">
			<header>
				<div class="main-box flex-x-center header">
					<div class="flex-x-center">
						<img class="auth-photo" :src="require('@/assets/image/123.jpg')" alt="">
						<div class="header-name">
							<div class="auth-name">云淡风轻</div>
							<div>云淡风轻的DEMO站</div>
						</div>
					</div>
					<div class="floating folder-wrap">
						<div class="folder"></div>
					</div>
				</div>
			</header>
			<main>
				<div class="main-body flex">
					<div class="grid" v-for="(item,index) in list" :key="index">
						<water-item :note="item"></water-item>
					</div>
				</div>
			</main>
		</div>
		<vue-particles v-if="show" color="#FF0000" :particleOpacity="0.7" :particlesNumber="30" shapeType="star"
		 :particleSize="5" linesColor="#FF0000" :linesWidth="2" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
		 :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" class="lizi" ref="particles"></vue-particles>
	</div>
</template>

<script>
	import Masonry from "masonry-layout";
	export default {
		data() {
			return {
				water: Object,
				currentPage: 1,
				show: true,
				list: [{
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
					type: 2,
					time: '01/20',
					name: '2234',
					imgList: [
						'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}, {
					type: 3,
					time: '01/20',
					name: '3234',
					imgList: [
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}, {
					type: 4,
					time: '01/20',
					name: '4234',
					imgList: [
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}],
				list1: [{
					type: 1,
					time: '01/20',
					name: '1234',
					imgList: [
						'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
					]
				}, {
					type: 2,
					time: '01/20',
					name: '2234',
					imgList: [
						'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}, {
					type: 3,
					time: '01/20',
					name: '3234',
					imgList: [
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}, {
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
		components: {
			waterItem: () => import('@/components/water-item'),
		},
		methods: {
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
				this.$refs.particles.init()
				console.log(this.$refs)
			},
			search() {
				this.list = [...this.list, ...this.list1]
				this.$nextTick(() => {
					this.show = true
					this.waterPull()
				})
			}
		},
		mounted() {
			this.waterPull()
			let scrollbarEl = this.$root.$children[0].$refs.scrollbar.wrap
			scrollbarEl.onscroll = () => {
				let scrollTop = scrollbarEl.scrollTop
				let scrollHeight = scrollbarEl.scrollHeight
				let clientHeight = window.innerHeight || document.documentElement.clientHeight
				if (scrollTop >= scrollHeight - clientHeight - 20) {
					this.show = false
					this.currentPage++
					this.search()
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.main-bg {
		position: relative;
		background-color: #f1f2f9;
		min-height: 100vh;
	}

	header {
		display: flex;
		align-items: center;
	}

	.header {
		padding: 15px 20px;
		margin-left: 10px;
		margin-top: 100px;
		margin-bottom: 20px;
		min-width: 400px;
		justify-content: space-between;
	}

	.auth-photo {
		width: 50px;
		height: 50px;
		border-radius: 100%;
	}

	.header-name {
		padding: 0 15px;
	}

	.auth-name {
		font: {
			size: 18px;
			weight: 600;
		}
	}

	.main-body {
		align-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		z-index: 1;
	}
	
	.folder-wrap{
		display: block;
		width: 50px;
		height: 50px;
		cursor: pointer;
		position: relative;
	}
	
	.folder-wrap:hover .folder::before {
		transform: translateY(0) rotate(90deg)
	}
	
	.folder-wrap:hover .folder::after {
		transform: translateY(0) rotate(90deg)
	}

	.folder {
		background: #53555c;
		position: absolute;
		top: 50%;
		left: 15px;
		width: 20px;
		height: 2px;
		transition: all 0.3s cubic-bezier(0, 0.99, 0.2, 1);
	}

	.folder::before {
		transform: translateY(-300%);
	}

	.folder::after {
		transform: translateY(300%);
	}

	.folder::after,
	.folder::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		background: #53555c;
		transition: all 0.3s cubic-bezier(0, 0.99, 0.2, 1);
	}
</style>
