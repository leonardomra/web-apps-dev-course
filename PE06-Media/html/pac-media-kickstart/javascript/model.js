/************************** responsible for fetching, processing, and defining data  **************************/
var Model = {
	


	/*----------------------------------------------------------- BALL -----------------------------------------------------------*/
	


	Ball: {
		view: null,
		init: function(stage) {
			this.view = Object.create(View.Ball);
			this.view.init(this.xPos(stage.getBoundingClientRect().width), this.yPos(stage.getBoundingClientRect().height), stage);
		},
		xPos: function(width) {
			return this.generateRandomPositionForElement(width);
		},
		yPos: function(height) {
			return this.generateRandomPositionForElement(height);
		},
		generateRandomPositionForElement: function(size) {
			return Math.floor((Math.random() * size));
		},
	},
	


	/*----------------------------------------------------------- AUDIO ----------------------------------------------------------*/



	AudioChannel: {
		view: null,
		init: function() {
		},
	},



	/*----------------------------------------------------------- VIDEO ----------------------------------------------------------*/



	VideoChannel: {
		view: null,
		init: function() {
		},
	},



	/*----------------------------------------------------------- PACMAN ---------------------------------------------------------*/
	


	Pacman: {
		view: null,
		stage: null,
		observedBiscuits: null,
		horizontalPosition: null,
		verticalPosition: null,
		horizontalFaceStatus: "frozen",
		verticalFaceStatus: "frozen",
		init: function(stage) {
			this.stage = stage;
			this.view = Object.create(View.Pacman);
			this.view.init(stage);
			var initialXPos = this.calculateHorizontalCenterOfElementOnStage(this.view.element, stage);
			var initialYPos = this.calculateVerticalCenterOfElementOnStage(this.view.element, stage);
			this.view.setPosition(initialXPos, initialYPos);
		},
		// Event Handler's function - this function is triggered many times when the device is turned around 
		handleOrientation: function(e) {
			this.model.view.setPosition(this.model.horizontalPos(e.gamma), this.model.verticalPos(e.beta));
			this.model.digest();
		},
		detectWhenStopped: function(currentHorizontalPosition, currentVerticalPosition) {
			if (Math.floor(this.horizontalPosition) === Math.floor(this.view.element.getBoundingClientRect().left)) {
				this.horizontalFaceStatus = "frozen";
			}
			if (Math.floor(this.verticalPosition) === Math.floor(this.view.element.getBoundingClientRect().top)) {
				this.verticalFaceStatus = "frozen";
			}
		},
		// Placing the Pacman on the center of the screen
		calculateHorizontalCenterOfElementOnStage: function(element, stage) {
			return (stage.getBoundingClientRect().width/2) - (element.getBoundingClientRect().width/2);
		},
		calculateVerticalCenterOfElementOnStage: function(element, stage) {
			return (stage.getBoundingClientRect().height/2) - (element.getBoundingClientRect().height/2);
		},
		// Calculeting the horizontal and vertical positon of the Pacman & face direction
		horizontalPos: function(gamma) {
			var horizontalAdjustmentScale = (this.stage.getBoundingClientRect().width/2)/90;
			var lastHorizontalPosition = (this.horizontalPosition === null)? 0 : this.horizontalPosition;
			this.horizontalPosition = this.calculateHorizontalCenterOfElementOnStage(this.view.element, this.stage) + (gamma * horizontalAdjustmentScale);
			this.horizontalFaceStatus = this.detectFaceDirection(lastHorizontalPosition, this.horizontalPosition, "horizontal");
			return this.horizontalPosition;
		},
		verticalPos: function(beta) {
			var verticalAdjustmentScale = (this.stage.getBoundingClientRect().height/2)/90;
			var lastVerticalPosition = (this.verticalPosition === null)? 0 : this.verticalPosition;
			this.verticalPosition = this.calculateVerticalCenterOfElementOnStage(this.view.element, this.stage) + (beta * verticalAdjustmentScale);
			this.verticalFaceStatus = this.detectFaceDirection(lastVerticalPosition, this.verticalPosition, "vertical");
			return this.verticalPosition;
		},
		detectFaceDirection: function(lastPos, currentPos, plane) {
			var _lastPos = Math.round(lastPos);
			var _currentPos = Math.round(currentPos);
			var faceStatus = "frozen";
			if(_lastPos > _currentPos) {
				if(plane === "horizontal") {
					faceStatus = "left";
				} else if (plane === "vertical") {
					faceStatus = "up";
				}
			} else if(_lastPos < _currentPos){
				if(plane === "horizontal") {
					faceStatus = "right";
				} else if (plane === "vertical") {
					faceStatus = "down";
				}
			}
			return faceStatus;
		},
		// Detecting collision between the Pacman and the Balls
		digest: function() {
			var eaterRadius = this.view.element.offsetWidth/2;
			for (var b in this.observedBiscuits) {
				var biscuitRadius = this.observedBiscuits[b].model.view.element.offsetWidth/2;
				var eaterCurrentXPos = this.view.element.getBoundingClientRect().left;
				var eaterCurrentYPos = this.view.element.getBoundingClientRect().top;
				var biscuitCurrentXPos = this.observedBiscuits[b].model.view.element.getBoundingClientRect().left;
				var biscuitCurrentYPos = this.observedBiscuits[b].model.view.element.getBoundingClientRect().top;
				var dx = (eaterCurrentXPos + eaterRadius) - (biscuitCurrentXPos + biscuitRadius);
				var dy = (eaterCurrentYPos + eaterRadius) - (biscuitCurrentYPos + biscuitRadius);
				var distance = Math.sqrt(dx * dx + dy * dy);
				if (distance < (eaterRadius + biscuitRadius)) {
					// collision detected!
					console.log("eater is eating biscuit");
					this.observedBiscuits[b].toBeEaten();
				}
			}
		},
		// Canvas Management
		canvasParams: {
			canvasWidth: 0,
			canvasHeight: 0,
			currentFrame: 0,
			context: null,
			sprite: null,
		},
		prepareCanvas: function() {
			this.canvasParams.canvasWidth = this.view.element.width;
			this.canvasParams.canvasHeight = this.view.element.height;
			this.canvasParams.context = this.view.element.getContext("2d");
			this.canvasParams.sprite = new Image();
			this.canvasParams.sprite.src = 'images/pacman_sprites.png';
		},
		drawOnCanvasContext: function() {
			this.canvasParams.context.clearRect(0, 0, this.canvasParams.canvasWidth, this.canvasParams.canvasHeight);
			this.canvasParams.context.drawImage(
				this.canvasParams.sprite,
				this.canvasParams.canvasWidth * this.canvasParams.currentFrame,
				0,
				this.canvasParams.canvasWidth,
				this.canvasParams.canvasHeight,
				0,
				0,
				this.canvasParams.canvasWidth,
				this.canvasParams.canvasHeight
			);
			var firstFrame = this.pacmanFrameMap()[0];
			var lastFrame = this.pacmanFrameMap()[this.pacmanFrameMap().length - 1];
			if (this.canvasParams.currentFrame < firstFrame || this.canvasParams.currentFrame >= lastFrame) {
				this.canvasParams.currentFrame = this.pacmanFrameMap()[0];
			} else {
				this.canvasParams.currentFrame++;
			}
		},
		pacmanFrameMap: function() {
			if (this.horizontalFaceStatus === "right" && this.verticalFaceStatus === "frozen") {
				return [1, 2];
			} else if (this.horizontalFaceStatus === "left" && this.verticalFaceStatus === "frozen") {
				return [3, 4];
			} else if (this.horizontalFaceStatus === "frozen" && this.verticalFaceStatus === "up") {
				return [5, 6];
			} else if (this.horizontalFaceStatus === "frozen" && this.verticalFaceStatus === "down") {
				return [7, 8];
			} else if (this.horizontalFaceStatus === "right" && this.verticalFaceStatus === "up") {
				return [9, 10];
			} else if (this.horizontalFaceStatus === "right" && this.verticalFaceStatus === "down") {
				return [11, 12];
			} else if (this.horizontalFaceStatus === "left" && this.verticalFaceStatus === "up") {
				return [13, 14];
			} else if (this.horizontalFaceStatus === "left" && this.verticalFaceStatus === "down") {
				return [15, 16];
			} else {
				return [0];
			}
		},
		startCanvas: function() {
			if (this.canvasParams.context === null) {
				this.prepareCanvas();
			}
			setInterval(this.drawOnCanvasContext.bind(this), 80);
			setInterval(this.detectWhenStopped.bind(this), 500);
		}
	},
};