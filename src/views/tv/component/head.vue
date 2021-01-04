<template>
	<div class="main-top">
		<div class="main-top-left">
			<div class="logo-wrap">
				<img src="../../../assets/tv/logo.png" alt="">
				<div class="device-name">优师课堂</div>
			</div>
			<div class="normal-model" v-items>
				<img class="normal" src="../../../assets/tv/photo.png" alt="">
				<img class="white" src="../../../assets/tv/photo1.png" alt="">
				<div>登录</div>
			</div>
		</div>
		<div class="main-top-right">
			<div class="normal-model" v-items>
				<i class="iconfont iconsousuo"></i>
				<div>搜索</div>
			</div>
			<div class="normal-model" v-items>
				<i class="iconfont iconshezhi3"></i>
				<div>设置</div>
			</div>
			<div class="time-wrap">
				{{time}}
			</div>
		</div>
	</div>
</template>

<script>
	import {
		dateFormat
	} from '@/utils/time.js'
	export default {
		name:'head-tips',
		data() {
			return {
				timer:null,
				time:'',
			}
		},
		mounted() {
			this.getTime();
		},
		methods:{
			getTime() {
				this.timer = setInterval(() => {
					this.time = dateFormat(new Date(), 'hh:mm')
				}, 1000)
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import "../../../focus.scss";
	.main-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.main-top-left {
		display: flex;
		align-items: center;
	}
	
	.device-name {
		color: rgba(255,255,255,0.90);
	}
	
	.normal-model {
		display: flex;
		align-items: center;
		background: rgba(255,255,255,.08);
		border-radius: 28px;
		margin-left: 33px;
		height: 56px;
		width: 148px;
	}
	
	.normal-model>div {
		padding: 0 16px;
		color: rgba(255,255,255,0.70);
		font-size: 1.866666rem;
	}
	
	.normal-model>i{
		font-size: 28px;
		margin-left: 20px;
	}
	
	.normal-model>.white {
		display: none;
	}
	
	.logo-wrap {
		display: flex;
		align-items: center;
	}
	
	.logo-wrap>img {
		margin-right: 16px;
	}
	
	.logo-wrap>div {
		font-size: 32px;
	}
	
	.main-top-right {
		display: flex;
		align-items: center;
	}
	
	.time-wrap {
		margin-left: 33px;
		font-size: 32px;
		font-weight: 400;
		color: rgba(255,255,255,0.90);
	}
</style>
