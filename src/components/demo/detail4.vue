<template>
	<div class="wrap" id="wrap" @mouseup="bbb">
		<div class="nav">
			<div>我是标题1111111111111111111111111111111111111</div>
			<div class="flex nav-right">
				<div v-items id="search" @click="search">我是搜索</div>
				<div v-items>我是设置</div>
				<div id="time">
					{{time}}
				</div>
			</div>
		</div>
		<ul class="tab">
			<li v-for="(item,index) in tab" :key="item+index" :class="item.active?'active':''" v-items @click="tabChange(index)">{{item.name}}</li>
		</ul>
		<!-- <div style="position: relative;">
			<video :src="src" ref="video" v-items @click="play" style="width: 400px;height: 200px;" autoplay="autoplay" controls="controls"></video>
			<div style="position: absolute;top: 100px;left: 100px;">我是弹幕</div>
		</div> -->
		<div class="container">
			<ul class="type-wrap">
				<li v-for="(item,index) in type1" :key="item+index" v-items :class="item.active?'active':''" @click="typeChange(index)">{{item.name}}</li>
			</ul>
			<ul class="box-list">
				<li v-for="(item1,index) in 50" :key="item1" v-items="{default:index==0?true:false}" class="grid" @click="itemClick(index)"></li>
			</ul>
		</div>

		<!-- <div class="grid" v-items="{default:true}"></div>
		<div class="grid" v-items></div>
		<div class="grid" v-items></div> -->
	</div>
</template>

<script>
	import {
		dateFormat
	} from '@/utils/time.js'
	export default {
		data() {
			return {
				src: require('@/assets/3.mp4'),
				timer: null,
				time: '',
				tab: [{
						name: '我的日程',
						active: false
					},
					{
						name: '点播',
						active: true
					},
					{
						name: '直播',
						active: false
					}
				],
				type1: [{
						name: '全部',
						active: true
					},
					{
						name: '录播',
						active: false
					},
					{
						name: '同步课',
						active: false
					},
					{
						name: '教研',
						active: false
					},
					{
						name: '会议',
						active: false
					}
				]
			}
		},
		methods: {
			getTime() {
				this.timer = setInterval(() => {
					this.time = dateFormat(new Date(), 'hh:mm')
				}, 1000)
			},
			bbb() {
				return false
			},
			aaa() {
				document.documentElement.blur()
			},
			search() {
				// if(event.which != 13){
				// 	return
				// }
				alert('我是搜索')
			},
			itemClick(index) {
				if(event.which != 13){
					return
				}
				alert(`点击了第${index+1}个`)
			},
			tabChange(index) {
				if(event.which != 13){
					return
				}
				this.tab.map((v, i) => {
					if (i == index) v.active = true
					else v.active = false
				})
				this.$nextTick(() => {
					this.$service.move(this.$service.pointer)
				})
			},
			typeChange(index) {
				if(event.which != 13){
					return
				}
				this.type1.map((v, i) => {
					if (i == index) v.active = true
					else v.active = false
				})
				this.$nextTick(() => {
					this.$service.move(this.$service.pointer)
				})
			},
			play() {
				this.$refs.video.play();
			}
		},
		mounted() {
			setTimeout(() => {
				console.log(document.getElementById('qqq'))
				document.getElementById('qqq').focus()
				console.log(123);
				this.$service.move(this.$service.pointer)
				this.getTime();
			},5000)
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
	* {
		font-size: 1.866666rem;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.wrap {
		padding: 20px;
		background-color: #f1f2f9;
		min-height: 200vh;
		zoom: .5;
	}

	.grid {
		width: 200px;
		height: 200px;
		background-color: red;
		margin: 0 20px 20px 20px;
	}

	.focus {
		transform: scale(1.2);
		outline: 5px solid yellow;
	}

	.nav {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.nav-right>div {
		margin-right: 20px;
	}

	.tab {
		display: flex;
		margin-top: 30px;
	}

	.tab>li {
		margin-right: 40px;
		padding: 10px 0;
	}

	.tab>li.active {
		border-bottom: 4px solid #DDDDDD;
	}

	.type-wrap {
		display: flex;
		flex-direction: column;
		width: 8.5rem;
		margin-right: 4rem;
	}

	.type-wrap>li {
		margin-bottom: 20px;
		padding: 20px;
		text-align: center;
	}

	.type-wrap>li.active {
		background-color: #DDDDDD;
		color: #FFFFFF;
		border-radius: 8px;
	}

	.container {
		margin-top: 40px;
		display: flex;
	}

	.box-list {
		width: calc(100% - 12.5rem);
		display: flex;
		flex-wrap: wrap;
	}
</style>
