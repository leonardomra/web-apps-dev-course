/************************** responsible for fetching, processing, and defining data  **************************/
var Model = {



	/*----------------------------------------------------------- CLOCK ---------------------------------------------------------*/
	


	Clock: {
		view: null,
		stage: null,
		init: function(stage) {
			this.stage = stage;
			this.view = Object.create(View.Clock);
			this.view.init(stage);
		},
		canvasParams: {
			canvasWidth: null,
			canvasHeight: null,
			context: null,
		},
		prepareCanvas: function(){
			this.canvasParams.canvasWidth = this.view.element.width;
			this.canvasParams.canvasHeight = this.view.element.height;
			this.canvasParams.context = this.view.element.getContext("2d");
		},
		drawOnCanvasContext: function(){
			//Center coordinates of the canvas
			var centerX = this.canvasParams.canvasWidth/2;
			var centerY = this.canvasParams.canvasHeight/2;
			var pointerSize = 30;
			// clock's frame
			this.canvasParams.context.beginPath();
			var radius =  (this.canvasParams.canvasWidth/2)-5;
			this.canvasParams.context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
			this.canvasParams.context.lineWidth = 10;
			this.canvasParams.context.strokeStyle = "green";
			this.canvasParams.context.stroke();
			// 12 o'clock
			this.canvasParams.context.beginPath();
			this.canvasParams.context.moveTo(centerX, 0);
			this.canvasParams.context.lineTo(centerX, pointerSize);
			this.canvasParams.context.lineWidth = 5;
			this.canvasParams.context.lineCap = "round";
			this.canvasParams.context.strokeStyle = "green";
			this.canvasParams.context.stroke();
			// 3 o'clock
			this.canvasParams.context.beginPath();
			this.canvasParams.context.moveTo(this.canvasParams.canvasWidth, centerY);
			this.canvasParams.context.lineTo(this.canvasParams.canvasWidth - pointerSize, centerY);
			this.canvasParams.context.lineWidth = 5;
			this.canvasParams.context.lineCap = "round";
			this.canvasParams.context.strokeStyle = "green";
			this.canvasParams.context.stroke();
			// 6 o'clock
			this.canvasParams.context.beginPath();
			this.canvasParams.context.moveTo(centerX, this.canvasParams.canvasWidth);
			this.canvasParams.context.lineTo(centerX, this.canvasParams.canvasWidth - pointerSize);
			this.canvasParams.context.lineWidth = 5;
			this.canvasParams.context.lineCap = "round";
			this.canvasParams.context.strokeStyle = "green";
			this.canvasParams.context.stroke();
			// 9 o'clock
			this.canvasParams.context.beginPath();
			this.canvasParams.context.moveTo(0, centerY);
			this.canvasParams.context.lineTo(pointerSize, centerY);
			this.canvasParams.context.lineWidth = 5;
			this.canvasParams.context.lineCap = "round";
			this.canvasParams.context.strokeStyle = "green";
			this.canvasParams.context.stroke();
			// hour pointer
			this.canvasParams.context.beginPath();
			this.canvasParams.context.moveTo(centerX, centerY);
			this.canvasParams.context.lineTo(centerX - 30, centerY - 10);
			this.canvasParams.context.lineWidth = 8;
			this.canvasParams.context.lineCap = "round";
			this.canvasParams.context.strokeStyle = "red";
			this.canvasParams.context.stroke();
			// minute pointer
			this.canvasParams.context.beginPath();
			this.canvasParams.context.moveTo(centerX, centerY);
			this.canvasParams.context.lineTo(centerX + 60, centerY - 20);
			this.canvasParams.context.lineWidth = 5;
			this.canvasParams.context.lineCap = "round";
			this.canvasParams.context.strokeStyle = "orange";
			this.canvasParams.context.stroke();
		},
		startCanvas: function(){
			this.prepareCanvas();
			this.drawOnCanvasContext();
		},
	},
};
