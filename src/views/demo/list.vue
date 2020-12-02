<template>
	<div>
		<ul class="card-ul">
			<li class="floating" v-for="item in list" :key="item.id">
				<router-link :to="`/component/item/${item.id}`">
					<div class="card-name">{{item.name}}</div>
					<div class="card-wrap">{{item.instruction}}</div>
					<div class="card-tips">
						<i class="iconfont icon-eyes"></i>
						<div>123</div>
						<i class="iconfont icon-heart"></i>
						<div>111</div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{id:1,name:'聊天室',instruction:'这是一款即时聊天功能组件这是一款即时聊天功能组件这是一款即时聊天功能组件这是一款即时聊天功能组件'},
					{id:2,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:3,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:4,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:5,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:6,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:7,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:8,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:8,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:8,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:8,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:8,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:8,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:8,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:8,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:8,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:8,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
					{id:8,name:'聊天室',instruction:'这是一款即时聊天功能组件'},
				]
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.card-ul {
		display: flex;
		flex-wrap: wrap;
	}
	
	.card-ul>li {
		margin: 0 10px 20px;
		width: calc(25% - 20px);
		background-color: #FFFFFF;
		border-radius: $radius;
		cursor: pointer;
	}
	
	.card-ul>li:hover {
		box-shadow: $shadow;
		transform: translateY(-1px);
	}
	
	.card-name {
		padding: 0 15px;
		height: 42px;
		line-height: 42px;
		border-bottom: $divider;
	}
	
	.card-wrap {
		line-height: 1.4;
		padding: 10px 15px;
		height: 160px;
		color: $color2;
	}
	
	.card-tips {
		height: 43px;
		display: flex;
		align-items: center;
		border-top: $divider;
		padding: 0 15px;
	}
	
	.card-tips>i,.card-tips>div {
		color: $color2;
		margin-right: 5px;
	}
</style>
