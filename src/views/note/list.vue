<template>
	<div>
		<div class="screening floating">
			<div>
				<el-tag class="tags" v-for="tag in tags" :key="tag.name" :type="tag.type">
					{{tag.name}}
				</el-tag>
			</div>
			<div class="search-wrap">
				<el-input class="search-input" ref="input" @blur="search = false" @keypress.native.enter="searchData" v-model="name" placeholder="请输入内容" :class="search?'open':''"></el-input>
				<i class="iconfont icon-search-1" @click="search = !search" v-show="!search"></i>
			</div>
		</div>
		<waterPull></waterPull>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tags: [],
				enum: ['', 'success', 'info', 'warning', 'danger'],
				search: false,
				name: ''
			}
		},
		created() {
			this.labelSearch()
		},
		watch:{
			search(val) {
				if(val){
					this.$nextTick(() => {
						this.$refs.input.focus()
					})
				} 
			}
		},
		methods: {
			labelSearch() {
				this.$api.labelSearch().then(res => {
					res.data = [{id: 0,name: '全部'},...res.data]
					res.data.map((v, i) => {
						Object.assign(v, {
							type: this.enum[i % this.enum.length]
						})
					})
					this.tags = res.data
				})
			},
			searchData() {
				this.search = false
			}
		},
		components: {
			waterPull: () => import('@/components/water-pull/water')
		}
	}
</script>

<style>
	.el-input__inner{
		border-top: none;
		border-left: none;
		border-right: none;
		border-radius: 0;
	}
</style>
<style lang="scss" scoped="scoped">
	.main-body {
		align-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		z-index: 1;
	}

	.screening {
		margin: 0 10px 20px;
		background-color: #FFFFFF;
		padding: 15px 0;
		border-radius: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tags{
		margin-left: 15px;
		cursor: pointer;
	}
	
	.icon-search-1{
		font-size: 20px;
		cursor: pointer;
		color: #999;
		transition: display ease-out 0.2s;
	}
	
	.icon-search-1:hover {
		color: #666;
	}
	
	.search-wrap{
		display: flex;
		margin-right: 15px;
		overflow: hidden;
		align-items: center;
	}
	
	.search-input{
		width: 0px;
		overflow: hidden;
		border-top: none;
		transition: width ease-out 0.5s;
	}
	
	.search-wrap>.open {
		width: 210px;
	}
</style>
