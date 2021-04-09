<template>
	<div>
		<slot name="icon" :text="text"></slot>
		<slot :text1="text1"></slot>
		<test1></test1>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				text: "我是子组件asd ads ",
				text1: {
					a:'213123',
					b:'1'
				}
			}
		},
		components:{
			'test1': () => import('./test1')
		}
	}
</script>

<style>
</style>
