<template>
	<div class="main-bg">
		<el-scrollbar :native="false" ref="scrollbar">
			<div class="main-cont">
				<div class="main-wrap">
					<header-menu></header-menu>
					<main>
						<router-view></router-view>
					</main>
				</div>
			</div>
		</el-scrollbar>
		<vue-particles v-if="show" color="#FF0000" :particleOpacity="0.7" :particlesNumber="30" shapeType="star"
		:particleSize="5" linesColor="#FF0000" :linesWidth="2" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
		:moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" class="lizi" ref="particles"></vue-particles>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				water: Object,
				show: true,
			}
		},
		components: {
			headerMenu: () => import('@/components/common-layout/header')
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.main-bg {
		position: relative;
		background-color: $bg;
		min-height: 100vh;
	}
	
	.main-cont {
		height: calc(100vh - 1px);
		// position: relative;
		// z-index: 2;
	}
</style>
