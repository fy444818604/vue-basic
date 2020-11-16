<template>
	<div class="main-bg">
		<div class="main-wrap">
			<header>
				<div class="main-box flex-x-center header">
					<div class="flex-x-center">
						<img class="auth-photo" :src="require('@/assets/image/123.jpg')" alt="">
						<div class="header-name">
							<div class="auth-name">云淡风轻</div>
							<div>云淡风轻的DEMO站</div>
						</div>
					</div>
					<div>
						<i class="iconfont icon-folding"></i>
					</div>
				</div>
			</header>
			<main>
				<div class="main-body flex">
					<water-item v-for="(item,index) in list" :note="item" :key="index"></water-item>
				</div>
			</main>
		</div>
		<vue-particles color="#FF0000" :particleOpacity="0.7" :particlesNumber="30" shapeType="star" :particleSize="5"
		 linesColor="#FF0000" :linesWidth="2" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3"
		 :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push"></vue-particles>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					type: 1,
					time: '01/20',
					name: '1234',
					imgList: [
						'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
					]
				}, {
					type: 2,
					time: '01/20',
					name: '2234',
					imgList: [
						'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}, {
					type: 3,
					time: '01/20',
					name: '3234',
					imgList: [
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}, {
					type: 4,
					time: '01/20',
					name: '4234',
					imgList: [
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					]
				}, ]
			}
		},
		components: {
			waterItem: () => import('@/components/water-item'),
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.main-bg {
		background-color: #f1f2f9;
		min-height: 100vh;
	}

	header {
		display: flex;
		align-items: center;
	}

	.header {
		padding: 15px 20px;
		margin-top: 100px;
		margin-bottom: 20px;
		min-width: 400px;
		justify-content: space-between;
	}

	.auth-photo {
		width: 50px;
		height: 50px;
		border-radius: 100%;
	}

	.header-name {
		padding: 0 15px;
	}

	.auth-name {
		font: {
			size: 18px;
			weight: 600;
		}
	}
	
	.main-body{
		align-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
	}
</style>
