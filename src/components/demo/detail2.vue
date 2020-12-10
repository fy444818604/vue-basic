<template>
	<div>
		<div id="excel"></div>
		<div class="flex">
			<input type="file" @change="getWorkbook">
			<button class="out-btn" @click="exportJson">导出json</button>
			<button class="out-btn" @click="exportExcel">导出xlsx</button>
		</div>
	</div>
</template>

<script>
	import Spreadsheet from "x-data-spreadsheet";
	import zhCN from 'x-data-spreadsheet/dist/locale/zh-cn';
	import XLSX from 'xlsx'
	
	Spreadsheet.locale('zh-cn', zhCN);
	//设置中文
	export default {
		data() {
			return {
				grid: null
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.grid = new Spreadsheet('#excel', {
					showToolbar: true,
					showGrid: true
				})
				.loadData([{}]).change((cdata) => {
					// console.log('|||', cdata);
					console.log('>>>', this.grid.getData());
				});
				
				setTimeout(() => {
					this.grid.cellText(5, 5, 'xxxx').cellText(6, 5, 'yyy').reRender();
				},5000)
					

				this.grid.on('cell-selected', (cell, ri, ci) => {
					console.log('cell:', cell, ', ri:', ri, ', ci:', ci);
				}).on('cell-edited', (text, ri, ci) => {
					console.log('text:', text, ', ri: ', ri, ', ci:', ci);
					console.log('>>>', this.grid)
				});

			},
			/**
			 *导出excel
			 */
			exportExcel() {
				var new_wb = this.xtos(this.grid.getData());
				/* generate download */
				XLSX.writeFile(new_wb, "SheetJS.xlsx");
			},
			exportJson() {
				console.log(this.grid.getData())
			},
			xtos(sdata) {
				var out = XLSX.utils.book_new();
				sdata.forEach(function(xws) {
					var aoa = [
						[]
					];
					var rowobj = xws.rows;
					for (var ri = 0; ri < rowobj.len; ++ri) {
						var row = rowobj[ri];
						if (!row) continue;
						aoa[ri] = [];
						Object.keys(row.cells).forEach(function(k) {
							var idx = +k;
							if (isNaN(idx)) return;
							aoa[ri][idx] = row.cells[k].text;
						});
					}
					var ws = XLSX.utils.aoa_to_sheet(aoa);
					XLSX.utils.book_append_sheet(out, ws, xws.name);
				});
				return out;
			},
			stox(wb) {
				var out = [];
				wb.SheetNames.forEach(function(name) {
					var o = {
						name: name,
						rows: {}
					};
					var ws = wb.Sheets[name];
					var aoa = XLSX.utils.sheet_to_json(ws, {
						raw: false,
						header: 1
					});
					aoa.forEach(function(r, i) {
						var cells = {};
						r.forEach(function(c, j) {
							cells[j] = ({
								text: c
							});
						});
						o.rows[i] = {
							cells: cells
						};
					})
					out.push(o);
				});
				return out;
			},
			/**
			 * 获取文件
			 * @param fileSelected
			 */
			getWorkbook(fileSelected) {
				let file = fileSelected.target.files[0]
				let reader = new FileReader()
				reader.onload = e => {
					let data = e.target.result,
						fixedData = this.fixData(data),
						workbook = XLSX.read(btoa(fixedData), {
							type: 'base64'
						})
					this.grid.loadData(this.stox(workbook));
				}
				reader.readAsArrayBuffer(file)
				// return workbook
			},
			fixData(data) {
				var o = "",
					l = 0,
					w = 10240
				for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w +
					w)))
				o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
				return o
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.out-btn {
		height: 40px;
		width: 60px;
	}
	.flex {
		position: absolute;
		right: 0;
		top: 0;
	}
</style>
