<template>
	<div class="water-box">
		<div class="water-box-top">
			<div :class="`water-type-`+note.type">{{typeList[note.type]}}</div>
			<div class="water-time">{{note.time}}</div>
		</div>
		<div class="water-name">{{note.name}}</div>
		<div class="water-img">
			<div class="water-img-item" v-for="item1 in note.imgList" :key="item1">
				<el-image :src="item1" lazy></el-image>
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
		}
	}
</script>

<style lang="scss" scoped="scoped">
	$color:#ffcd26,#22e9e6,#3cdd7f,#ff7701;
	
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
		$i:index($color,$c);
		.water-type-#{$i} {
			@extend .water-type;
			background-color: $c;
		}
	}

	.water-time{
		color: #999;
		margin-left: 10px;
	}
	
	.water-name{
		font-size: 18px;
		padding: 10px 0;
	}
</style>
