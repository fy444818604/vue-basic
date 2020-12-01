<template>
	<header>
		<div class="main-box flex-x-center header" :class="fixed?'fixed':''">
			<router-link :to="'/'">
				<div class="flex-x-center floating">
					<img class="auth-photo" :src="require('@/assets/image/123.jpg')" alt="">
					<div class="header-name">
						<div class="auth-name">云淡风轻</div>
						<div>云淡风轻的DEMO站</div>
					</div>
				</div>
			</router-link>
			<ul class="header-menu floating" :style="menuHeight">
				<li v-for="item in menu" :key="item.url" :class="item.active?'active':''">
					<router-link :to="item.url">{{item.name}}</router-link>
				</li>
			</ul>
			<div class="floating folder-wrap" @click="folder = !folder" v-show="!fixed">
				<div class="folder" :class="folder?'open':''"></div>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		data() {
			return {
				folder: false,
				fixed: false,
				menuHeight: {
					width: "1px",
				}
			}
		},
		props: {
			menu: {
				type: Array,
				default () {
					return [{
						name: '心情随笔',
						url: '/note',
						active: false
					}, {
						name: '前端组件',
						url: '/component',
						active: false
					}, {
						name: '我的相册',
						url: '/photos',
						active: false
					}, {
						name: '关于作者',
						url: '4',
						active: false
					}, {
						name: '系统管理',
						url: '5',
						active: false
					}]
				}
			},
		},
		mounted() {
			this.navItem()
			let scrollbarEl = this.$root.$children[0].$refs.scrollbar.wrap
			scrollbarEl.onscroll = () => {
				let scrollTop = scrollbarEl.scrollTop
				scrollTop >= 290 ? this.fixed = true : this.fixed = false
			}
		},
		watch: {
			'$route.path'() {
				this.navItem()
			},
			folder(val) {
				val ? this.menuHeight.width = "361px" : this.menuHeight.width = "1px"
			},
			fixed(val) {
				if(val) {
					this.folder = true
				}
			}
		},
		methods:{
			navItem() {
				this.menu.map(v => {
					if(this.$route.path == v.url) v.active = true
					else v.active = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
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
	
	.header-menu>li>a {
		color: $color2;
	}
	
	.header-menu>li:hover a {
		color: $color1;
	}
	
	.header-menu>li.active>a {
		color: $color;
	}

	.folder-wrap {
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

	.folder.open {
		background: transparent;
	}

	.folder.open::before {
		transform: translateY(0) rotate(45deg);
		background: #999;
	}

	.folder.open::after {
		transform: translateY(0) rotate(-45deg);
		background: #999;
	}

	.folder-wrap:hover .folder.open::after,
	.folder-wrap:hover .folder.open::before {
		transform: translateY(0) rotate(0deg);
		background: #53555c;
	}

	.header-menu {
		display: flex;
		overflow: hidden;
		align-items: center;
		height: 50px;
		width: 1px;
		transition: width ease-out 0.2s;
	}

	.header-menu>li {
		padding: 0 15px;
		display: flex;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}

	.header.fixed {
		position: fixed;
		top: 0;
		left: 50%;
		z-index: 2;
		margin: 0;
		transform: translate(-50%,0);
		max-width: ($width - 20px);
		width: ($width - 20px);
	}
</style>
