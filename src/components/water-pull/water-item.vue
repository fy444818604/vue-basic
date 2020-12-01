<template>
	<div class="water-box">
		<div class="water-box-top">
			<div :class="`water-type-`+note.type">{{typeList[note.type]}}</div>
			<div class="water-time">{{note.time}}</div>
		</div>
		<div class="water-name">
			<router-link :to="`/detail/${note.id}`">{{note.name}}</router-link>
		</div>
		<div :class="`water-img-` + note.imgList.length" v-if="note.imgList.length != 0">
			<div class="water-img-item" v-for="item1 in note.imgList" :key="item1">
				<el-image :src="item1" fit="cover" lazy @load="load" :preview-src-list="note.imgList"></el-image>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				typeList: {
					1: '心情随笔',
					2: '旅行日记',
					3: '工作笔记',
					4: '胡吃海塞'
				}
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
		methods: {
			load() {
				this.$parent.water.layout()
			}
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
	}

	.water-type {
		padding: 0 10px;
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
