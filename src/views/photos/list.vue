<template>
	<ul>
		<li v-for="item in list" :key="item.id">
			<div>
				<img :src="item.cover" alt="">
			</div>
			<div>{{item.name}}</div>
			<div>
				<i class="iconfont "></i>
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{id:1,cover:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',name:''}
				]
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
</style>
