<template>
	<div class="wrap">
		<head-tips></head-tips>
		<main>
			<ul class="menu">
				<li v-for="(item,index) in nav" @left="navLeft(index)" v-items :key="item+index" :class="item.active?'active':''"
				 @focus="menuChange(index)">
					{{item.name}}
					<img style="width: 48px;height: 48px;" v-if="index == 1" src="../../assets/tv/2.gif" alt="">
				</li>
			</ul>
			<router-view></router-view>
		</main>
	</div>
</template>

<script>
	import headTips from './component/head.vue'
	export default {
		data() {
			return {
				nav: [{
						name: '我的',
						active: false
					},
					{
						name: '直播',
						active: false
					},
					{
						name: '资源',
						active: true,
						type: 1
					},
					{
						name: '同步课堂',
						active: false,
						type: 2
					},
					{
						name: '教研',
						active: false,
						type: 3
					},
					{
						name: '会议',
						active: false,
						type: 4
					},
				],
			}
		},
		components: {
			headTips,
		},
		methods: {
			menuChange(index) {
				this.nav.map((v, i) => {
					if (index == i) v.active = true
					else v.active = false
				})
				if (index == 0) {
					this.$router.push({
						path: '/person'
					})
				} else if (index == 1) {
					if (this.$route.path != '/component/detail/4/live') {
						this.$router.push({
							path: './live'
						})
					}
				} else {
					if (this.$route.path == '/component/detail/4/active' && this.$route.query.id == this.nav[index].type) {

					} else {
						this.$router.push({
							path: 'active?id=' + this.nav[index].type
						})
					}

				}
				this.$nextTick(() => {
					this.$service.pointer.$el.classList.add("focus")
				})
			},
			navLeft(index) {
				if (index == 2) {
					this.$service.move(this.$service.items[4])
				} else {
					this.$service.move('left')
				}
			},

		},
		mounted() {
			this.$service.move(this.$service.pointer);
			document.addEventListener('UniAppJSBridgeReady', function() {
				uni.postMessage({
					data: {
						message: '我是来自H5的消息'
					}
				})
			})
			window.myHistory = () => {
				var path = this.$route.path
				window.history.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import "../../focus.scss";

	.wrap {
		padding: 3.066666rem 4.466666rem;
		background-image: url('../../assets/tv/bg.png');
		min-height: calc(200vh - 2px);
		zoom: .5;
	}

	.focus {
		// transform: scale(1.1);
		// outline: 5px solid yellow;
		position: relative;
		z-index: 99;
	}

	.menu {
		display: flex;
		margin-top: 29px;
		margin-bottom: 39px;
	}

	.menu>li {
		font-size: 40px;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.70);
		padding: 16px 34px;
		margin-right: 52px;
		display: flex;
		align-items: center;
	}

	.menu>li.active {
		color: #FFFFFF;
		position: relative;
	}

	.menu>li.active::after {
		content: '';
		height: 8px;
		width: calc(100% - 96px);
		position: absolute;
		bottom: 0;
		left: 50px;
		background: linear-gradient(128deg, #5af5de 12%, #4b90ef 88%);
		border-radius: 4px;
	}

	.menu>li:nth-child(2).active::after {
		width: calc(100% - 148px);
	}
</style>
