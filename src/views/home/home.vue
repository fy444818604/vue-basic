<template>
	<waterPull></waterPull>
</template>

<script>
	export default {
		components:{
			waterPull: () => import('@/components/water-pull/water')
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.main-body {
		align-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		z-index: 1;
	}
</style>
