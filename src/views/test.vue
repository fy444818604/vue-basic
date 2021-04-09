<template>
	<div>
		<test>
			<template slot="icon" slot-scope="data">
				<span>{{data.text}}</span>
			</template>
		</test>
		<button v-on:click="show = !show">
			Toggle
		</button>
		<transition name="slide-fade">
			<p v-if="show">hello</p>
		</transition>
		<input v-focus v-model.number="number" type="number" step="20">
		<div v-clickOutSide="ccc">
			123213121
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: {
					label: '开',
					value: 1,
				},
				aaa: [1, 2, 3],
				show: true,
				number: 1
			}
		},
		components: {
			test: () => import('./testComponent')
		},
		created() {
			console.log(this.aaa[8]);
		},
		provide() {
			return {
				aaa: this.aaa,
				onFocus: this.onFocus
			}
		},
		methods: {
			onFocus() {
				console.log(this.aaa[2]);
			},
			ccc() {
				console.log(999);
			}
		},
		directives: {
			focus: {
				inserted: function(el) {
					// 聚焦元素
					el.focus()
				}
			},
			clickOutSide: {
				bind(el, binding, vnode) {
					console.log(el);
					console.log(binding);
					console.log(vnode);
				  el.handler = function(e) {
						console.log(e.target);
				    if (el.contains(e.target)) {
				      return false
				    }
				    binding.value()
				  }
				  el.stopProp = function(event) {
				    event.stopPropagation()
				  }
				  el.addEventListener("click", el.stopProp)
				  document.body.addEventListener("click", el.handler)
				},
				unbind(el, binding) {
				  el.removeEventListener("click", el.stopProp)
				  document.body.removeEventListener("click", el.handler)
				},
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */
	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter,
	.slide-fade-leave-to

	/* .slide-fade-leave-active for below version 2.1.8 */
		{
		transform: translateX(10px);
		opacity: 0;
	}
</style>
