<template>
  <!-- <fm-making-form 
    ref="makingform" 
    style="height: 100vh;" 
    preview 
    generate-code 
    generate-json
  >
    <template slot="action">
			<button>123</button>
    </template>
  </fm-making-form> -->
	<avue-form-design style="height: 100vh;"
	                  :options="options"
	                  storage
	                  @submit="handleSubmit"></avue-form-design>
</template>

<script>
	export default {
		data() {
			return {
				options:{}
			}
		},
		methods: {
			handleSubmit(data) {
			          this.$message.success("查看控制台")
			          console.log(data)
			        }
		}
	}
</script>

<style lang="scss" scoped="scoped">
</style>
