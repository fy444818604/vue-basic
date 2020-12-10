<template>
	<ul class="photos-wrap">
		<li class="floating" v-for="item in list" :key="item.id">
			<div class="cover-wrap">
				<img :src="item.cover==''?'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg':item.cover" alt="">
				<div class="photo-tip flex-x-center">
					<div class="glass" :style="{backgroundImage:`url(${item.cover==''?'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg':item.cover})`}"></div>
					<i class="iconfont icontupian"></i>
					<div class="photos-num">{{item.photos.length}}</div>
				</div>
			</div>
			<div class="photos-msg">
				<div class="photos-name">{{item.name}}</div>
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		created() {
			this.search()
		},
		methods:{
			search() {
				this.$api.photoSearch({
					user:''
				}).then(res => {
					this.list = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.photos-wrap {
		display: flex;
		flex-wrap: wrap;
	}
	
	.photos-wrap>li {
		margin: 0 10px 20px;
		width: calc(25% - 20px);
		box-shadow: $shadow1;
		background-color: #fff;
		position: relative;
	}
	
	.photos-wrap>li:hover {
		box-shadow: $shadow;
		transform: translateY(-1px);
	}
	
	.cover-wrap {
		width: 100%;
		height: 203px;
		overflow: hidden;
		position: relative;
	}
	
	.cover-wrap:hover img {
		// transform: scale(1.1);
	}
	
	.cover-wrap:hover .photo-tip{
		display: flex;
	}
	
	.cover-wrap>img {
		width: 100%;
		height: 100%;
		object-fit: fill;
		transition: transform .5s;
	}
	
	.photos-msg {
		padding: 0 15px;
	}
	
	.photos-num {
		color: #fff;
		margin-left: 5px;
		font-size: 12px;
		font-weight: bold;
		position: relative;
		z-index: 2;
	}
	
	.icontupian {
		color: #fff;
		position: relative;
		z-index: 2;
	}
	
	.photos-name {
		color: $color1;
		font-size: 15px;
		height: 30px;
		line-height: 30px;
	}
	
	.photo-tip {
		position: absolute;
		right: 15px;
		bottom: 10px;
		padding: 10px;
		display: none;
		overflow: hidden;
		border-radius: $radius;
	}
	
	.glass {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		filter: blur(5px);
		z-index: 1;
		margin: -10px;
		background-position: center top;
		background-size: 280px 203px;
		background-attachment: fixed;
	}
</style>
