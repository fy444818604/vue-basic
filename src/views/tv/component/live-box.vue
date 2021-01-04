<template>
	<ul class="live-model" v-group>
		<li v-for="(item,index) in live" :class="item.status == 2?'prepare':''" @left="left(index)" :ref="'middle'+index" :key="item+index" v-items>
			<div class="status" :class="item.status==2?'pre':''">
				{{status[item.status]}}
				<img style="width: 30px;height: 30px;" v-if="item.status==1" src="../../../assets/tv/3.gif" alt="">
			</div>
			<div class="live-name">{{item.name}}</div>
			<div class="live-time" v-show="item.status==2">
				2020-12-26&nbsp;&nbsp;16:00&nbsp; &nbsp;开始
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		name:'live-box',
		data() {
			return {
				live:[
					{status:1,name:'初中作文全程导学《认识文章》',time:''},
					{status:1,name:'曹县第三区域教研联盟开展教研活动',time:''},
					{status:2,name:'七年级历史上册第二单元第1课《古代埃及古...',time:''},
				],
				status:{
					1:'直播中',
					2:'直播预告'
				},
				index:0
			}
		},
		methods:{
			left(index) {
				if(index == 1) {
					if(this.$route.path == '/component/detail/4/live') {
						this.index = 13
					}else {
						this.index = 9
					}
					this.$service.move(this.$service.items[this.index])
				}else {
					this.$service.move('left')
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import "../../../focus.scss";
	.live-model{
		display: flex;
		flex-wrap: wrap;
	}
	
	.live-model>li {
		width: calc(33.33% - 25px);
		margin-right: 37px;
		height: 304px;
		background-image: url(../../../assets/tv/pic.png);
		background-size: cover;
		background-repeat: no-repeat;
		padding: 0 48px;
		margin-bottom: 40px;
		position: relative;
		border-radius: 8px;
	}
	
	.live-model>li:last-child{
		margin-right: 0;
	}
	
	.live-model>li>.status {
		position: absolute;
		left: 20px;
		top: 20px;
		border-radius: 6px;
		background: linear-gradient(180deg,#87e96a, #46ef7f);
		padding: 6px 16px;
		color: #FFFFFF;
	}
	
	.live-model>li>.status.pre {
		background: linear-gradient(179deg,#fdd562 1%, #ffb46c 100%);
	}
	
	.live-model>li.prepare {
		background-image: url(../../../assets/tv/pic1.png);
	}
	
	.live-name {
		margin-top: 88px;
		font-size: 40px;
		font-weight: 400;
		color: rgba(255,255,255,0.90);
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 64px;
	}
	
	.live-time {
		padding: 6px 24px;
		border-radius: 24px;
		color: rgba(255,255,255,.9);
		background: rgba(255,255,255,.2);
		display: flex;
		width: 369px;
		margin-top: 14px;
	}
</style>
