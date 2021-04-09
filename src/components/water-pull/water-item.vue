<template>
	<div class="water-box">
		<div class="water-box-top">
			<div :class="`water-type-`+typeList[note.label.id]">{{note.label.name}}</div>
			<div class="water-time">{{format(note.createTime)}}</div>
		</div>
		<div class="water-name">
			<router-link :to="`/detail/${note.id}`">{{note.title}}</router-link>
		</div>
		<div :class="`water-img-` + note.photos.length" v-if="note.photos.length != 0">
			<div class="water-img-item" v-for="item1 in note.photos" :key="item1.id">
				<el-image :src="item1.url | urlFormat" fit="cover" @load="load" :preview-src-list="getArray(note.photos)"></el-image>
			</div>
		</div>
	</div>
</template>

<script>
	import { dateFormat } from '@/utils/time.js'
	export default {
		data() {
			return {
				typeList: Object,
			}
		},
		props: {
			note: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		filters:{
			urlFormat(val) {
				if(val.indexOf('http') != -1){
					return val
				}else {
					return process.env.VUE_APP_baseUrl + val
				}
			}
		},
		created() {
			this.labelSearch()
		},
		methods: {
			load() {
				this.$parent.water.layout()
			},
			getArray(obj) {
				let array = []
				obj.map(v => {
					if(v.url.indexOf('http') != -1){
						array = [...array,v.url]
					}else {
						array = [...array,process.env.VUE_APP_baseUrl + v.url]
					}
				})
				return array
			},
			format(val){
				return dateFormat(new Date(val),'yyyy-MM-dd')
			},
			labelSearch() {
				if(!this.$parent.$parent.tags){
					return
				}
				let data = this.$parent.$parent.tags.filter(v => {
					return v.id != 0
				})
				data.map((v, i) => {
					this.typeList[v.id] = (i%4)+1
				})
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	$color:#ffcd26,
	#22e9e6,
	#3cdd7f,
	#ff7701;

	.water-box-top {
		display: flex;
		align-items: center;
	}

	.water-type {
		padding: 3px 10px;
		color: #ffffff;
		border-radius: 3px;
		font-size: 12px;
		display: flex;
	}

	@each $c in $color {
		$i: index($color, $c);

		.water-type-#{$i} {
			@extend .water-type;
			background-color: $c;
		}
	}

	.water-img-3,
	.water-img-4 {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		position: relative;
	}

	.water-img-item {
		display: flex;
		margin-bottom: 15px;
		width: 100%;
		max-height: 200px;
		
		/deep/ .el-image {
			width: 100%;
		}
	}
	
	.water-img-3>.water-img-item:nth-child(1) {
		height: 200px;
	}

	.water-img-3>.water-img-item:nth-child(2) {
		height: 150px;
		width: calc(50% - 8px);
	}

	.water-img-3>.water-img-item:nth-child(3) {
		height: 150px;
		width: calc(50% - 8px);
		margin-left: 16px;
	}
	
	.water-img-4>.water-img-item:nth-child(1) {
		height: 150px;
	}

	.water-img-4>.water-img-item:nth-child(2) {
		height: 200px;
		width: calc(50% - 8px);
	}

	.water-img-4>.water-img-item:nth-child(3),.water-img-4>.water-img-item:nth-child(4) {
		height: 92px;
		width: calc(50% - 8px);
		margin-left: 16px;
	}
	
	.water-img-4>.water-img-item:nth-child(4){
		position: absolute;
		right: 0;
		bottom: 0;
	}

	.water-time {
		color: #999;
		margin-left: 10px;
	}

	.water-name {
		font-size: 18px;
		padding: 10px 0;
		cursor: pointer;
	}
</style>