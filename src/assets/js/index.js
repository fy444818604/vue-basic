export function DrawBoard(params) {
	for (var key in this.constructor.prototype) {
	    this[key] = this[key].bind(this);
	}
	this.onOff = true
	this.startX = 0
	this.startY = 0
	this.canDraw = params.canDraw || 1
	this.Hoffset = params.Hoffset || 0
	this.Woffset = params.Woffset || 0
	this.element = document.getElementById(params.element);
	this.element.width = params.width || document.documentElement.clientWidth;
	this.element.height = params.height || document.documentElement.clientHeight;
	this.context = this.element.getContext('2d');
	this.data = [];
	this.toolState = {
		color: params.color || '#f00056',
		lineWidth: params.lineWidth || 5,
		typeIndex: 0,
		eraserCount: 0
	};
	if (this.canDraw == 1) {
		this.usePenTool();
	}
}

DrawBoard.prototype.setColor = function(color) {
	this.toolState.color = color;
};

DrawBoard.prototype.setLineWidth = function(width) {
	this.toolState.lineWidth = width;
};

DrawBoard.prototype.clearAll = function() {
	this.data = [];
	this.context.clearRect(0, 0, this.element.width, this.element.height);
};

DrawBoard.prototype.usePenTool = function() {
	var that = this;
	
	// this.element.addEventListener('mousedown', this._mouseDown);
	// this.element.addEventListener('mouseout', this._mouseUp);
	// this.element.addEventListener('mouseup', this._mouseUp);
	
	this.element.removeEventListener('touchstart', this._touchStartEraser);
	this.element.removeEventListener('touchend', this._touchEndEraser);
	this.element.removeEventListener('touchcancel', this._touchCancelEraser);
	this.element.removeEventListener('touchleave', this._touchLeaveEraser);
	this.element.addEventListener('touchstart', this._touchStart);
	this.element.addEventListener('touchend', this._touchEnd);
	this.element.addEventListener('touchcancel', this._touchCancel);
	this.element.addEventListener('touchleave', this._touchLeave);

	that.element.onmousedown = function(ev) {
		var ev = ev || event;
		var startX = ev.clientX;
		var startY = ev.clientY;
		that.toolState.typeIndex++;
		var onOff = true;
		ev.preventDefault()
		ev.stopPropagation()

		that.element.onmousemove = function(ev) {
			if (!onOff) {
				return;
			}
			onOff = false;
			setTimeout(function() {
				onOff = true;
			}, 15);
			var ev = ev || event;
			var index = that.data.length;
			ev.preventDefault()
			ev.stopPropagation()

			that.data[index] = {
				type: 'point-line',
				typeIndex: that.toolState.typeIndex,
				startX: startX,
				startY: startY,
				endX: ev.clientX,
				endY: ev.clientY,
				color: that.toolState.color,
				lineWidth: that.toolState.lineWidth,
				Hoffset: that.Hoffset,
				Woffset: that.Woffset,
				width: that.element.width,
				height: that.element.height
			};

			that.context.beginPath();
			that.context.moveTo(startX - that.Woffset, startY - that.Hoffset);
			that.context.lineTo(ev.clientX - that.Woffset, ev.clientY - that.Hoffset);
			that.context.closePath();
			that.context.strokeStyle = that.toolState.color;
			that.context.lineJoin = 'round';
			that.context.lineCap = 'round';
			that.context.lineWidth = that.toolState.lineWidth;
			that.context.stroke();

			startX = ev.clientX;
			startY = ev.clientY;
		};

		that.element.onmouseup = function() {
			that.element.onmousemove = null;
			// socket.send(
			// 	JSON.stringify({event: 'canvas', data: JSON.stringify({c: 10000, i: [], p: that.p, e: that.e, l: false })})
			// )
			
			// socket.send(
			// 	JSON.stringify({
			// 		event: 'canvas',
			// 		data: JSON.stringify(that.data),
			// 	}),
			// );
		};
		
		that.element.onmouseleave = function() {
			
		}
		return false;
	};
	
	// that.element.ontouchstart = function(ev) {
	// 		console.log(2)
	// 	var ev = ev.targetTouches[0] || event.targetTouches[0];
	// 	var startX = ev.clientX;
	// 	var startY = ev.clientY;
	// 	that.toolState.typeIndex++;
	// 	var onOff = true;
	
	// 	that.element.ontouchmove = function(ev) {
	// 		if (!onOff) {
	// 			return;
	// 		}
	// 		onOff = false;
	// 		setTimeout(function() {
	// 			onOff = true;
	// 		}, 15);
	// 		var ev = ev.targetTouches[0] || event.targetTouches[0];
	// 		var index = that.data.length;
	// 		that.data[index] = {
	// 			type: 'point-line',
	// 			typeIndex: that.toolState.typeIndex,
	// 			startX: startX,
	// 			startY: startY,
	// 			endX: ev.clientX,
	// 			endY: ev.clientY,
	// 			color: that.toolState.color,
	// 			lineWidth: that.toolState.lineWidth,
	// 			Hoffset: that.Hoffset,
	// 			Woffset: that.Woffset,
	// 			width: that.element.width,
	// 			height: that.element.height
	// 		};
	
	// 		that.context.beginPath();
	// 		that.context.moveTo(startX - that.Woffset, startY - that.Hoffset);
	// 		that.context.lineTo(ev.clientX - that.Woffset, ev.clientY - that.Hoffset);
	// 		that.context.closePath();
	// 		that.context.strokeStyle = that.toolState.color;
	// 		that.context.lineJoin = 'round';
	// 		that.context.lineCap = 'round';
	// 		that.context.lineWidth = that.toolState.lineWidth;
	// 		that.context.stroke();
	
	// 		startX = ev.clientX;
	// 		startY = ev.clientY;
	// 	};
	
	// 	that.element.ontouchend = function() {
	// 		that.element.ontouchmove = null;
	// 		socket.send(
	// 			JSON.stringify({
	// 				event: 'canvas',
	// 				data: JSON.stringify(that.data),
	// 			}),
	// 		);
	// 	};
	// 	return false;
	// };
	
	// that.element.addEventListener('touchstart', function(ev) { 
	// 		if (ev.targetTouches.length == 1) {
	// 			var ev = ev.targetTouches[0] || event.targetTouches[0];
	// 			var startX = ev.clientX;
	// 			var startY = ev.clientY;
	// 			that.toolState.typeIndex++;
	// 			var onOff = true;
				
	// 			function penMove(ev) {
	// 				if (!onOff) {
	// 					return;
	// 				}
	// 				onOff = false;
	// 				setTimeout(function() {
	// 					onOff = true;
	// 				}, 15);
	// 				var ev = ev.targetTouches[0] || event.targetTouches[0];
	// 				var index = that.data.length;
				
	// 				that.data[index] = {
	// 					type: 'point-line',
	// 					typeIndex: that.toolState.typeIndex,
	// 					startX: startX,
	// 					startY: startY,
	// 					endX: ev.clientX,
	// 					endY: ev.clientY,
	// 					color: that.toolState.color,
	// 					lineWidth: that.toolState.lineWidth,
	// 					Hoffset: that.Hoffset,
	// 					Woffset: that.Woffset,
	// 					width: that.element.width,
	// 					height: that.element.height
	// 				};
				
	// 				that.context.beginPath();
	// 				that.context.moveTo(startX - that.Woffset, startY - that.Hoffset);
	// 				that.context.lineTo(ev.clientX - that.Woffset, ev.clientY - that.Hoffset);
	// 				that.context.closePath();
	// 				that.context.strokeStyle = that.toolState.color;
	// 				that.context.lineJoin = 'round';
	// 				that.context.lineCap = 'round';
	// 				that.context.lineWidth = that.toolState.lineWidth;
	// 				that.context.stroke();
				
	// 				startX = ev.clientX;
	// 				startY = ev.clientY;
	// 			}

	// 			that.element.addEventListener('touchmove', penMove, false)
	// 			that.element.addEventListener('touchend', function(ev) {
				
	// 					that.element.removeEventListener('touchmove', penMove, false)
	// 					socket.send(
	// 						JSON.stringify({
	// 							event: 'canvas',
	// 							data: JSON.stringify(that.data),
	// 						}),
	// 					);
	// 			}, false)
	// 	}
	// }, false)

};

DrawBoard.prototype.useLineTool = function() {
	var that = this;

	that.element.onmousedown = function(ev) {
		var ev = ev || event;
		var startX = ev.clientX;
		var startY = ev.clientY;
		var index = that.data.length;

		that.element.onmousemove = function(ev) {
			var ev = ev || event;
			that.data[index] = {
				type: 'line',
				startX: startX,
				startY: startY,
				endX: ev.clientX,
				endY: ev.clientY,
				lineWidth: that.toolState.lineWidth,
				color: that.toolState.color
			}
			console.log(that.data[index]);
			that.render();
		}

		that.element.onmouseup = function() {
			that.element.onmousemove = null;
			// socket.send(
			// 	JSON.stringify({
			// 		event: 'canvas',
			// 		data: JSON.stringify(that.data),
			// 	}),
			// );
		};
		return false;
	};
};

DrawBoard.prototype.useCircleTool = function() {
	var that = this;

	that.element.onmousedown = function(ev) {
		var ev = ev || event;
		var startX = ev.clientX;
		var startY = ev.clientY;
		var index = that.data.length;

		that.element.onmousemove = function(ev) {
			var ev = ev || event;
			var centerX = ev.clientX - startX;
			var centerY = ev.clientY - startY;

			that.data[index] = {
				type: 'circle',
				centerX: centerX / 2 + startX,
				centerY: centerY / 2 + startY,
				radius: Math.sqrt(centerX * centerX + centerY * centerY) / 2,
				color: that.toolState.color
			};
			that.render();
		};

		that.element.onmouseup = function() {
			that.element.onmousemove = null;
			// socket.send(
			// 	JSON.stringify({
			// 		event: 'canvas',
			// 		data: JSON.stringify(that.data),
			// 	}),
			// );
		};
		return false;
	};
};

DrawBoard.prototype.useRectTool = function() {
	var that = this;

	that.element.onmousedown = function(ev) {
		var ev = ev || event;
		var startX = ev.clientX;
		var startY = ev.clientY;
		var index = that.data.length;

		that.element.onmousemove = function(ev) {
			var ev = ev || event;
			that.data[index] = {
				type: 'rect',
				startX: startX,
				startY: startY,
				width: ev.clientX - startX,
				height: ev.clientY - startY,
				color: that.toolState.color
			};
			that.render();
		};

		that.element.onmouseup = function() {
			that.element.onmousemove = null;
			// socket.send(
			// 	JSON.stringify({
			// 		event: 'canvas',
			// 		data: JSON.stringify(that.data),
			// 	}),
			// );
		};
		return false;
	};
};

DrawBoard.prototype.useEraser = function() {
	var that = this;
	++that.toolState.typeIndex;
	//移除
	this.element.removeEventListener('touchstart', this._touchStart);
	this.element.removeEventListener('touchend', this._touchEnd);
	this.element.removeEventListener('touchcancel', this._touchCancel);
	this.element.removeEventListener('touchleave', this._touchLeave);
	
	this.element.addEventListener('touchstart', this._touchStartEraser);
	this.element.addEventListener('touchend', this._touchEndEraser);
	this.element.addEventListener('touchcancel', this._touchCancelEraser);
	this.element.addEventListener('touchleave', this._touchLeaveEraser);
	
	that.element.onmousedown = function() {
		that.element.onmousemove = function(ev) {
			var ev = ev || event;
			var index = that.data.length;
			
			that.data[index] = {
				type: 'clear-rect',
				typeIndex: that.toolState.typeIndex,
				startX: ev.clientX - 15,
				startY: ev.clientY - 15,
				width1: 30,
				height1: 30,
				color: '#fff',
				lineWidth: that.toolState.lineWidth,
				Hoffset: that.Hoffset,
				Woffset: that.Woffset,
				width: that.element.width,
				height: that.element.height
			};

			that.context.save()
			that.context.beginPath()
			that.context.moveTo(that.data[index].startX - that.Woffset, that.data[index].startY - that.Hoffset)
			that.context.lineTo(that.data[index].startX + 30 - that.Woffset, that.data[index].startY - that.Hoffset)
			that.context.lineTo(that.data[index].startX + 30 - that.Woffset, that.data[index].startY + 30 - that.Hoffset)
			that.context.lineTo(that.data[index].startX - that.Woffset, that.data[index].startY + 30 - that.Hoffset)
			that.context.closePath()
			that.context.clip()
			that.context.clearRect(0, 0, that.element.width, that.element.height);
			that.context.restore();
		};

		that.element.onmouseup = function() {
			that.element.onmousemove = null;
			// socket.send(
			// 	JSON.stringify({
			// 		event: 'canvas',
			// 		data: JSON.stringify(that.data),
			// 	}),
			// );
		};
		return false;
	};
	
	// that.element.ontouchstart = function() {
	// 	that.element.ontouchmove = function(ev) {
	// 		var ev = ev.targetTouches[0] || event.targetTouches[0];
	// 		var index = that.data.length;
			
	// 		console.log(888)
	// 		that.data[index] = {
	// 			type: 'clear-rect',
	// 			typeIndex: that.toolState.typeIndex,
	// 			startX: ev.clientX - 15,
	// 			startY: ev.clientY - 15,
	// 			width1: 30,
	// 			height1: 30,
	// 			color: '#fff',
	// 			lineWidth: that.toolState.lineWidth,
	// 			Hoffset: that.Hoffset,
	// 			Woffset: that.Woffset,
	// 			width: that.element.width,
	// 			height: that.element.height
	// 		};
	
	// 		that.context.save()
	// 		that.context.beginPath()
	// 		that.context.moveTo(that.data[index].startX - that.Woffset, that.data[index].startY - that.Hoffset)
	// 		that.context.lineTo(that.data[index].startX + 30 - that.Woffset, that.data[index].startY - that.Hoffset)
	// 		that.context.lineTo(that.data[index].startX + 30 - that.Woffset, that.data[index].startY + 30 - that.Hoffset)
	// 		that.context.lineTo(that.data[index].startX - that.Woffset, that.data[index].startY + 30 - that.Hoffset)
	// 		that.context.closePath()
	// 		that.context.clip()
	// 		that.context.clearRect(0, 0, that.element.width, that.element.height);
	// 		that.context.restore();
	// 	};
	
	// 	that.element.onmouseup = function() {
	// 		that.element.ontouchmove = null;
	// 		socket.send(
	// 			JSON.stringify({
	// 				event: 'canvas',
	// 				data: JSON.stringify(that.data),
	// 			}),
	// 		);
	// 	};
	// 	return false;
	// };
	
	// that.element.addEventListener('touchstart', function(ev) {
	// 		if (ev.targetTouches.length == 1) {
	// 			var ev = ev.targetTouches[0] || event.targetTouches[0];
	// 			function eraserMove(ev) {
	// 				var index = that.data.length;
					
	// 				that.data[index] = {
	// 					type: 'clear-rect',
	// 					typeIndex: that.toolState.typeIndex,
	// 					startX: ev.clientX - 15,
	// 					startY: ev.clientY - 15,
	// 					width1: 30,
	// 					height1: 30,
	// 					color: '#fff',
	// 					lineWidth: that.toolState.lineWidth,
	// 					Hoffset: that.Hoffset,
	// 					Woffset: that.Woffset,
	// 					width: that.element.width,
	// 					height: that.element.height
	// 				};
					
	// 				that.context.save()
	// 				that.context.beginPath()
	// 				that.context.moveTo(that.data[index].startX - that.Woffset, that.data[index].startY - that.Hoffset)
	// 				that.context.lineTo(that.data[index].startX + 30 - that.Woffset, that.data[index].startY - that.Hoffset)
	// 				that.context.lineTo(that.data[index].startX + 30 - that.Woffset, that.data[index].startY + 30 - that.Hoffset)
	// 				that.context.lineTo(that.data[index].startX - that.Woffset, that.data[index].startY + 30 - that.Hoffset)
	// 				that.context.closePath()
	// 				that.context.clip()
	// 				that.context.clearRect(0, 0, that.element.width, that.element.height);
	// 				that.context.restore();
	// 			}
	// 			that.element.addEventListener('touchmove', eraserMove, false)
	// 			that.element.addEventListener('touchend', function(ev) {
	// 					that.element.removeEventListener('touchmove', eraserMove, false)
	// 					console.log(that.element.touchmove)
	// 					socket.send(
	// 						JSON.stringify({
	// 							event: 'canvas',
	// 							data: JSON.stringify(that.data),
	// 						}),
	// 					);
	// 			}, false)
	// 	}
	// }, false)
}

DrawBoard.prototype.backspace = function() {
	if (this.data.length === 0) {
		console.warn('当前画板没有绘制数据');
		return false;
	}
	var type = this.data[this.data.length - 1].type;
	switch (type) {
		case 'line':
		case 'circle':
		case 'rect':
			this.data.pop();
			break;
		case 'point-line':
		case 'clear-rect':
			var typeIndex = this.data[this.data.length - 1].typeIndex;
			for (var i = this.data.length - 1; i >= 0; i--) {
				if (type == this.data[i].type && typeIndex == this.data[i].typeIndex) {
					this.data.pop();
				} else {
					break;
				}
			}
			break;
	}
	this.render();
	// socket.send(
	// 	JSON.stringify({
	// 		event: 'canvas',
	// 		data: JSON.stringify(this.data),
	// 	}),
	// );
	return true;
};

DrawBoard.prototype.download = function(fileName) {
	var imgURL = this.element.toDataURL('image/png');
	var aElement = document.createElement('a');
	aElement.download = fileName || 'image';
	aElement.href = imgURL;
	aElement.dataset.downloadurl = ['image/png', fileName, imgURL].join(':');
	document.body.appendChild(aElement);
	aElement.click();
	document.body.removeChild(aElement);
};

DrawBoard.prototype.render = function() {
	this.context.clearRect(0, 0, this.element.width, this.element.height);
	for (var i = 0; i < this.data.length; i++) {

		var scaleX = this.element.width / this.data[i].width
		var scaleY = this.element.height / this.data[i].height
		switch (this.data[i].type) {
			case 'image':
				this.loadImageAsync().then(img => {
					var pattern = this.context.createPattern(img, "no-repeat")
					this.context.fillStyle = pattern;
					this.context.fillRect(0, 0, 960, 600);
				})
				break;
			case 'clear-rect':
				this.context.save()
				this.context.beginPath()
				this.context.moveTo((this.data[i].startX - this.data[i].Woffset) * scaleX, (this.data[i].startY - this.data[i].Hoffset) *
					scaleY)
				this.context.lineTo((this.data[i].startX + 30 - this.data[i].Woffset) * scaleX, (this.data[i].startY - this.data[i]
					.Hoffset) * scaleY)
				this.context.lineTo((this.data[i].startX + 30 - this.data[i].Woffset) * scaleX, (this.data[i].startY + 30 - this.data[
					i].Hoffset) * scaleY)
				this.context.lineTo((this.data[i].startX - this.data[i].Woffset) * scaleX, (this.data[i].startY + 30 - this.data[i]
					.Hoffset) * scaleY)
				this.context.closePath()
				this.context.clip()
				this.context.clearRect(0, 0, this.element.width, this.element.height);
				this.context.restore();
				break;
			case 'rect':
				this.context.fillStyle = this.data[i].color;
				this.context.beginPath();
				this.context.fillRect(this.data[i].startX, this.data[i].startY, this.data[i].width, this.data[i].height);
				this.context.closePath();
				this.context.fill();
				break;
			case 'circle':
				this.context.beginPath();
				this.context.arc(this.data[i].centerX, this.data[i].centerY, this.data[i].radius, 0, 2 * Math.PI, false);
				this.context.closePath();
				this.context.fillStyle = this.data[i].color;
				this.context.fill();
				break;
			case 'point-line':
			case 'line':
				this.context.beginPath();
				this.context.moveTo((this.data[i].startX - this.data[i].Woffset) * scaleX, (this.data[i].startY - this.data[i].Hoffset) *
					scaleY);
				this.context.lineTo((this.data[i].endX - this.data[i].Woffset) * scaleX, (this.data[i].endY - this.data[i].Hoffset) *
					scaleY);
				this.context.closePath();
				this.context.lineJoin = 'round';
				this.context.lineCap = 'round';
				this.context.strokeStyle = this.data[i].color;
				this.context.lineWidth = this.data[i].lineWidth * scaleX;
				this.context.stroke();
				break;
		}
	}
};

DrawBoard.prototype.loadImageAsync = function() {
	return new Promise((resolve, reject) => {
		var img = new Image;
		img.src = this.data[0].img;
		img.onload = () => {
			resolve(img);
		}
	})
}

DrawBoard.prototype.drawToCanvas = function(imgData) {
	var index = this.data.length;
	var img = new Image;
	img.src = imgData;
	this.data.filter(item => {
		return item.type != "image"
	})
	this.data.unshift({
		type: 'image',
		typeIndex: -1,
		img: img.src
	})
	// this.data[index] = {
	// 	type: 'image',
	// 	typeIndex: -1,
	// 	img: img.src
	// }
	// socket.send(
	// 	JSON.stringify({
	// 		event: 'canvas',
	// 		data: JSON.stringify(this.data),
	// 	}),
	// );
	this.render()

}


DrawBoard.prototype._mouseDown = function(ev) {
	var ev = ev || event;
	this.startX = ev.clientX;
	this.startY = ev.clientY;
	this.toolState.typeIndex++;
	this.onOff = true;
	this.element.addEventListener('mousemove', this._mouseMove)
}

DrawBoard.prototype._mouseUp = function(ev) {
	// socket.send(
	// 	JSON.stringify({
	// 		event: 'canvas',
	// 		data: JSON.stringify(this.data),
	// 	}),
	// );
	this.element.removeEventListener('mousemove', this._mouseMove);
}

DrawBoard.prototype._mouseMove = function(ev) {
	var that = this
	if (!that.onOff) {
		return;
	}
	that.onOff = false;
	setTimeout(function() {
		that.onOff = true;
	}, 15);
	var ev = ev || event;
	var index = that.data.length;
	ev.preventDefault()
	ev.stopPropagation()
	
	that.data[index] = {
		type: 'point-line',
		typeIndex: that.toolState.typeIndex,
		startX: that.startX,
		startY: that.startY,
		endX: ev.clientX,
		endY: ev.clientY,
		color: that.toolState.color,
		lineWidth: that.toolState.lineWidth,
		Hoffset: that.Hoffset,
		Woffset: that.Woffset,
		width: that.element.width,
		height: that.element.height
	};
	
	that.context.beginPath();
	that.context.moveTo(that.startX - that.Woffset, that.startY - that.Hoffset);
	that.context.lineTo(ev.clientX - that.Woffset, ev.clientY - that.Hoffset);
	that.context.closePath();
	that.context.strokeStyle = that.toolState.color;
	that.context.lineJoin = 'round';
	that.context.lineCap = 'round';
	that.context.lineWidth = that.toolState.lineWidth;
	that.context.stroke();
	
	that.startX = ev.clientX;
	that.startY = ev.clientY;
}

DrawBoard.prototype._touchStart = function(ev) {
		var ev = ev.targetTouches[0] || event.targetTouches[0];
		this.startX = ev.clientX;
		this.startY = ev.clientY;
		this.toolState.typeIndex++;
		this.onOff = true;
    this.element.addEventListener('touchmove', this._touchMove, false);
};

DrawBoard.prototype._touchEnd = function(event) {
    event.preventDefault();
		// socket.send(
		// 	JSON.stringify({
		// 		event: 'canvas',
		// 		data: JSON.stringify(this.data),
		// 	}),
		// );
		console.log(this.data)
    this.element.removeEventListener('touchmove', this._touchMove);
};

DrawBoard.prototype._touchCancel = function(event) {
    event.preventDefault();
    this.element.removeEventListener('touchmove', this._touchMove);
};

DrawBoard.prototype._touchLeave = function(event) {
    this.element.removeEventListener('touchmove', this._touchMove);
};

DrawBoard.prototype._touchMove = function(ev) {
   	
		var that = this
		if (!that.onOff) {
			return;
		}
		that.onOff = false;
		setTimeout(function() {
			that.onOff = true;
		}, 15);
		var ev = ev.targetTouches[0] || event.targetTouches[0];
		var index = that.data.length;
		event.preventDefault()
		event.stopPropagation()
		
		that.data[index] = {
			type: 'point-line',
			typeIndex: that.toolState.typeIndex,
			startX: that.startX,
			startY: that.startY,
			endX: ev.clientX,
			endY: ev.clientY,
			color: that.toolState.color,
			lineWidth: that.toolState.lineWidth,
			Hoffset: that.Hoffset,
			Woffset: that.Woffset,
			width: that.element.width,
			height: that.element.height
		};
		
		that.context.beginPath();
		that.context.moveTo(that.startX - that.Woffset, that.startY - that.Hoffset);
		that.context.lineTo(ev.clientX - that.Woffset, ev.clientY - that.Hoffset);
		that.context.closePath();
		that.context.strokeStyle = that.toolState.color;
		that.context.lineJoin = 'round';
		that.context.lineCap = 'round';
		that.context.lineWidth = that.toolState.lineWidth;
		that.context.stroke();
		
		that.startX = ev.clientX;
		that.startY = ev.clientY;
		console.log(that.data[index])
};

DrawBoard.prototype._touchStartEraser = function(ev) {
    this.element.addEventListener('touchmove', this._touchMoveEraser, false);
};

DrawBoard.prototype._touchEndEraser = function(event) {
    event.preventDefault();
		// socket.send(
		// 	JSON.stringify({
		// 		event: 'canvas',
		// 		data: JSON.stringify(this.data),
		// 	}),
		// );
    this.element.removeEventListener('touchmove', this._touchMoveEraser);
};

DrawBoard.prototype._touchCancelEraser = function(event) {
    event.preventDefault();
    this.element.removeEventListener('touchmove', this._touchMoveEraser);
};

DrawBoard.prototype._touchLeaveEraser = function(event) {
    this.element.removeEventListener('touchmove', this._touchMoveEraser);
};

DrawBoard.prototype._touchMoveEraser = function(ev) {
   	var that = this;
		var ev = ev.targetTouches[0] || event.targetTouches[0];
		var index = that.data.length;
		
		console.log(999)
		that.data[index] = {
			type: 'clear-rect',
			typeIndex: that.toolState.typeIndex,
			startX: ev.clientX - 15,
			startY: ev.clientY - 15,
			width1: 30,
			height1: 30,
			color: '#fff',
			lineWidth: that.toolState.lineWidth,
			Hoffset: that.Hoffset,
			Woffset: that.Woffset,
			width: that.element.width,
			height: that.element.height
		};
		
		that.context.save()
		that.context.beginPath()
		that.context.moveTo(that.data[index].startX - that.Woffset, that.data[index].startY - that.Hoffset)
		that.context.lineTo(that.data[index].startX + 30 - that.Woffset, that.data[index].startY - that.Hoffset)
		that.context.lineTo(that.data[index].startX + 30 - that.Woffset, that.data[index].startY + 30 - that.Hoffset)
		that.context.lineTo(that.data[index].startX - that.Woffset, that.data[index].startY + 30 - that.Hoffset)
		that.context.closePath()
		that.context.clip()
		that.context.clearRect(0, 0, that.element.width, that.element.height);
		that.context.restore();
		console.log(that.data[index])
};
