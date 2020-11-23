<template>
	<div id="app">
		<el-scrollbar :native="false" ref="scrollbar">
			<div class="app-wrap">
				<router-view></router-view>
			</div>
		</el-scrollbar>
	</div>
</template>

<script>
	export default {
		name: 'App',
	}
</script>

<style>
	.app-wrap{
		height: calc(100vh - 1px);
	}
</style>
