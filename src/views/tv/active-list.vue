<template>
	<div>
		<live-box></live-box>
		<res-box></res-box>
	</div>
</template>

<script>
	import liveBox from './component/live-box.vue'
	import resBox from './component/res-box.vue'
	export default {
		components:{
			liveBox,
			resBox
		},
		watch:{
			$route: {
				handler: function(val, oldVal){
					console.log(val.query.id);
				},
				// 深度观察监听
				deep: true
			}
		},
		created() {
			console.log(this.$route.query.id);
		}
	}
</script>

<style lang="scss" scoped="scoped">
</style>
