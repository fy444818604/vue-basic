<template>
	<div class="main-bg">
		<div class="note-wrap">
			<div class="note-title">{{title}}</div>
			<div class="note-tip">
				<div>{{author}}</div>
				<div class="seg"> · </div>
				<div>{{time}}</div>
			</div>
			<div class="note-main" v-html="content">
				
			</div>
			<div></div>
		</div>
	</div>
</template>

<script>
	import { dateFormat } from '@/utils/time.js'
	export default {
		data() {
			return {
				id:this.$route.params.id,
				title:'剪影流觞，光影华年',
				author: '云淡风轻',
				time: '2020-12-12',
				content: ''
			}
		},
		created() {
			this.search();
		},
		methods:{
			search() {
				this.$api.noteSearchById(this.id).then(res => {
					const value = res.data
					this.title = value.title
					this.time = dateFormat(new Date(value.createTime),'yyyy-MM-dd')
					this.content = value.content
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.main-bg {
		position: relative;
		background-color: $bg;
		min-height: calc(100vh - 1px);
		display: flex;
		justify-content: center;
		padding: 50px 0;
	}
	
	.note-wrap {
		width: $width;
		border-radius: $radius;
		background-color: #FFFFFF;
		min-height: 70vh;
		padding: 60px 70px;
	}
	
	.note-title {
		font-size: 2.25rem;
		font-weight: normal;
		letter-spacing: 2px;
		line-height: 1.25;
		margin-bottom: 30px;
		color: #262626;
	}
	
	.note-tip {
		display: flex;
		margin-bottom: 30px;
	}
	
	.seg {
		margin: 0 5px;
	}
	
	.note-tip>div {
		font-size: .875rem;
		line-height: 1.4;
		color: $color2;
	}
</style>
