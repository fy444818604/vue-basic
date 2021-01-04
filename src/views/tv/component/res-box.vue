<template>
	<ul class="model-row-4">
		<li v-for="(item,index) in res" v-items :key="item+index">
			<div class="play-icon">
				<div class="triangle"></div>
			</div>
			<div class="img-wrap">
				<img src="../../../assets/tv/demo.png" alt="">
			</div>
			<div class="res-name text-overflow">
				{{item.name}}
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		name:'res-box',
		data() {
			return {
				res:[
					{pic:'',name:'相交线与平行线'},
					{pic:'',name:'七年级道德与法治上册第四大阿萨德按时'},
					{pic:'',name:'九年级历史上册第1课《古阿萨德阿萨德撒的按时'},
					{pic:'',name:'“会议倦怠”不容忽视'},
					{pic:'',name:'相交线与平行线'},
					{pic:'',name:'七年级道德与法治上册第四大阿萨德按时'},
					{pic:'',name:'九年级历史上册第1课《古阿萨德阿萨德撒的按时'},
					{pic:'',name:'“会议倦怠”不容忽视'},
				],
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import "../../../focus.scss";
	.model-row-4 {
		display: flex;
		flex-wrap: wrap;
	}
	
	.model-row-4>li {
		margin-right: 36px;
		margin-bottom: 20px;
		width:calc(25% - 30px);
		position: relative;
	}
	
	.model-row-4>li:nth-child(4n) {
		margin-right: 0;
	}
	
	.model-row-4>li>.img-wrap>img{
		width: 100%;
	}
	
	.model-row-4>li>.res-name{
		font-size: 30px;
		font-weight: 400;
		color: rgba(255,255,255,0.90);
		padding: 20px 0;
	}
</style>
