<template>
	<div>
		<ul class="live-type">
			<li v-for="(item,index) in type" :key="item+index" v-items @left="left(index)">
				<span>{{item.name}}</span>
				<span>{{item.num}}</span>
			</li>
		</ul>
		<live-box></live-box>
	</div>
</template>

<script>
	import liveBox from './component/live-box.vue'
	export default {
		data() {
			return {
				type:[
					{name:'全部',num:28,actvie:true},
					{name:'同步课堂',num:12,actvie:false},
					{name:'教研',num:6,actvie:false},
					{name:'会议',num:10,actvie:false},
				]
			}
		},
		components:{
			liveBox
		},
		methods:{
			left(index) {
				if(index == 1) {
					this.$service.move(this.$service.items[9])
				}else {
					this.$service.move('left')
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import "../../focus.scss";
	.live-type {
		display: flex;
	}
	
	.live-type>li {
		width: calc(25% - 25px);
		height: 132px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 40px;
		background-color: rgba(255,255,255,.12);
		margin-right: 36px;
		border-radius: 4px;
	}
	
	.live-type>li:last-child {
		margin-right: 0;
	}
	
	.live-type>li>span {
		font-size: 38px;
		font-weight: 700;
		color: rgba(255,255,255,0.90);
	}
	
	.live-type>li>span:first-child {
		margin-right: 20px;
	}
</style>
