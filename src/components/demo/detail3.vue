<template>
	<div class="wrap">
		<div class="board">
			<canvas id="my-board"></canvas>
			<div class="bg">
				<img class="bg-img" src="">
			</div>
		</div>
		<div class="tools">
			<ul>
				<li :class="item.active?'active':''" v-for="(item,index) in tool" @click="draw(item.func)" :key="index">{{item.name}}</li>
				<li>
					<label for="upload">上传</label>
					<input type="file" id="upload" />
				</li>
				<li>
					<ul class="color">
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { DrawBoard } from '../../assets/js/index.js'
	export default {
		data() {
			return {
				board:null,
				tool:[
					{name:'铅笔',func:'usePenTool',active:true},
					{name:'清空',func:'clearAll',active:false},
					{name:'线条',func:'useLineTool',active:false},
					{name:'圆形',func:'useCircleTool',active:false},
					{name:'矩形',func:'useRectTool',active:false},
					{name:'橡皮擦',func:'useEraser',active:false},
					{name:'撤销',func:'backspace',active:false},
					{name:'下载',func:'download',active:false},
					// {name:'上传',func:'usePenTool',active:false},
				]
			}
		},
		mounted() {
			this.init();
		},
		methods:{
			init() {
				this.board = new DrawBoard({
					element: 'my-board',
					width: 960,
					height: 600,
					canDraw: 1
				})
			},
			draw(func) {
				this.tool.map(v => {
					if(v.func == func) v.active = true;
					else v.active = false
				})
				eval(`this.board.${func}()`)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	body {
		touch-action: none;
		-ms-touch-action: none;
	}
	.wrap {
		width: 100%;
		height: 100vh;
		display: flex;
	}

	#my-board {
		/* 		width: 100%;
				height: 100%; */
		border: 1px solid #000000;
	}

	.tools {
		width: 960px;
	}

	.board {
		width: 960px;
		/* 				width: 1100px; */
		position: relative;
	}

	ul>li {
		list-style: none;
		padding: 10px;
		border: 1px solid #DDDDDD;
		margin-bottom: 10px;
		width: 50px;
		text-align: center;
		cursor: pointer;
	}

	ul>li.active {
		background-color: yellow;
	}

	#upload {
		opacity: 0;
		height: 0;
	}

	.bg {
		/* 	width: 960px;
					height: 600px; */
		position: absolute;
		top: 1px;
		left: 1px;
		z-index: -1;
	}

	.bg-img {
		width: 960px;
		height: 600px;
		border: none;
		display: none;
	}

	.color>li {
		width: 32px;
		height: 32px;
		border-radius: 100%;
	}

	.color>li:nth-child(1) {
		background-color: #000000;
	}

	.color>li:nth-child(2) {
		background-color: #FFFFFF;
	}

	.color>li:nth-child(3) {
		background-color: #f00056;
	}

	.color>li:nth-child(4) {
		background-color: #FFAA00;
	}

	.color>li:nth-child(5) {
		background-color: #FFE600;
	}
</style>
