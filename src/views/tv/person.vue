<template>
	<div class="wrap">
		<div class="login-wrap">
			<div class="logo-img">
				<img src="../../assets/image/123.jpg" alt="">
			</div>
			<div class="login-name">{{name}}</div>
			<div class="login-org">{{org}}</div>
			<div class="login-out" v-items>退出登录</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'person',
		data() {
			return {
				name:'李洋洋',
				org: '成都元素中学武侯分校'
			}
		},
		methods:{
			serviceBack(){
				this.$router.go(-1) 
			}
		},
		mounted() {
			this.$service.move(this.$service.pointer)
			// window.myHistory()
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import "../../focus.scss";
	.wrap {
		padding: 3.066666rem 4.466666rem;
		background-image: url('../../assets/tv/bg.png');
		min-height: calc(200vh - 2px);
		overflow: auto;
		zoom: .5;
	}
	
	.login-wrap {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.logo-img {
		width: 240px;
		height: 240px;
		margin-bottom: 56px;
	}
	
	.logo-img > img {
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
	
	.login-name {
		font-size: 44px;
		font-weight: 700;
		color: rgba(255,255,255,0.90);
		margin-bottom: 40px;
	}
	
	.login-org {
		font-size: 40px;
		font-weight: 400;
		color: rgba(255,255,255,0.70);
		margin-bottom: 80px;
	}
	
	.login-out {
		width: 360px;
		height: 120px;
		background-color: rgba(255,255,255,.12);
		border-radius: 20px;
		font-size: 38px;
		font-weight: 400;
		color: rgba(255,255,255,0.50);
		line-height: 120px;
		text-align: center;
	}
</style>
