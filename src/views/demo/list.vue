<template>
	<div>
		<ul class="card-ul">
			<li class="floating" v-for="item in list" :key="item.id">
				<router-link :to="`/component/detail/${item.url}`">
					<div class="card-name">{{item.title}}</div>
					<div class="card-wrap">{{item.describe}}</div>
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
				current:1,
				total:1,
				list:[]
			}
		},
		created() {
			this.search()
		},
		methods:{
			search() {
				this.$api.componentSearch({
					current: this.current,
					pageSize: 10
				}).then(res => {
					this.list = [...this.list,...res.data[0]]
					this.total = res.data[1]
				})
			}
		},
		mounted() {
			
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
