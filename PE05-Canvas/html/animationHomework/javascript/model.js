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
			var lastHorizontalPosition = (this.horizontalPosition === null)? 0 : this.horizontalPosition;  // <-- added
			this.horizontalPosition = this.calculateHorizontalCenterOfElementOnStage(this.view.element, this.stage) + (gamma * horizontalAdjustmentScale);  // <-- added
			this.horizontalFaceStatus = this.detectFaceDirection(lastHorizontalPosition, this.horizontalPosition, "horizontal");  // <-- added
			console.log(this.horizontalFaceStatus);
			return this.horizontalPosition;
		},
		verticalPos: function(beta) {
			var verticalAdjustmentScale = (this.stage.getBoundingClientRect().height/2)/90;
			var lastVerticalPosition = (this.verticalPosition === null)? 0 : this.verticalPosition;  // <-- added
			this.verticalPosition = this.calculateVerticalCenterOfElementOnStage(this.view.element, this.stage) + (beta * verticalAdjustmentScale);  // <-- added
			this.verticalFaceStatus = this.detectFaceDirection(lastVerticalPosition, this.verticalPosition, "vertical");  // <-- added
			console.log(this.verticalFaceStatus);
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

		// CANVAS MANAGEMENT
		canvasParams: {  // Declaring and initializing necessary parameters for our canvas element
			canvasWidth: 0,
			canvasHeight: 0,
			currentFrame: 0,
			context: null,
			sprite: null,
		},
		prepareCanvas: function() {  // Setting necessary values of "canvasParams" that I have access only when the Pacman is instanciated
			this.canvasParams.canvasWidth = this.view.element.width;
			this.canvasParams.canvasHeight = this.view.element.height;
			this.canvasParams.context = this.view.element.getContext("2d");
			this.canvasParams.sprite = new Image();
			this.canvasParams.sprite.src = 'images/pacman_sprites.png';
		},
		/********************************************************************/
		/* HOMEWORK 2 - Regarding the function 'drawOnCanvasContext', place */
		/* the following comments next to their respective commands.        */
		/********************************************************************/
		// set the x position of the visible window inside of the context of the canvas element.
		// get the last element of the array that is returned by the 'pacmanFrameMap' function (this function takes into account the direction of the pacman's face to return the right array).
		// check if the 'currentFrame' is not within the range determined by the specifications of the 'pacmanFrameMap'.
		// update to the 'currentFrame' to the first frame available relative to the 'pacmanFrameMap' function.
		// set the height of the source image on the canvas. This allows scaling of the source image.
		// get the first element of the array that is returned by the 'pacmanFrameMap' function (this function takes into account the direction of the pacman's face to return the right array).
		// set the height of the visible window of the context of the canvas element.
		// set the x position of the entire source image within the canvas element.
		// if not...
		// update to the current frame to the next frame
		// set the y position of the visible window inside of the context of the canvas element.
		// Erasing and drawing on context and managing animation  ** this function is executed repeatedly by the setInterval in the 'startCanvas' function.
		// resposible for erasing the old drawings on the context of the canvas element.
		// responsible for drawing an image on the canvas element.
		// set the source image that will be used on the context of the canvas element.
		// set the y position of the entire source image within the canvas element.
		// set the width of the source image on the canvas. This allows scaling of the source image.
		// set the width of the visible window of the context of the canvas element.
		/********************************************************************/
		
		drawOnCanvasContext: function() {  // Comment 01 
			
			// Comment 02
			this.canvasParams.context.clearRect(0, 0, this.canvasParams.canvasWidth, this.canvasParams.canvasHeight);
			
			// Comment 03
			this.canvasParams.context.drawImage(
				this.canvasParams.sprite,  // Comment 04
				this.canvasParams.canvasWidth * this.canvasParams.currentFrame,  // Comment 05
				0,  // Comment 06
				this.canvasParams.canvasWidth,  // Comment 07
				this.canvasParams.canvasHeight,  // Comment 08
				0,  // Comment 09
				0,  // Comment 10
				this.canvasParams.canvasWidth,  // Comment 11
				this.canvasParams.canvasHeight  // Comment 12
			);

			var firstFrame = this.pacmanFrameMap()[0];  // Comment 13
			var lastFrame = this.pacmanFrameMap()[this.pacmanFrameMap().length - 1];  // Comment 14
			if (this.canvasParams.currentFrame < firstFrame || this.canvasParams.currentFrame >= lastFrame) {  // Comment 15
				this.canvasParams.currentFrame = this.pacmanFrameMap()[0];  // Comment 16
			} else {  // Comment 17
				this.canvasParams.currentFrame++;  // Comment 18
			}
		},
		/********************************************************************/
		/* HOMEWORK 3 - Implement other facial turns inside the following   */
		/* function 'pacmanFrameMap'                                        */
		/********************************************************************/
		pacmanFrameMap: function() {
			if (this.horizontalFaceStatus === "right" && this.verticalFaceStatus === "frozen") {
				return [1, 2];
			} else if (this.horizontalFaceStatus === "left" && this.verticalFaceStatus === "frozen") {
				return [3, 4];
			} else if (this.horizontalFaceStatus === "frozen" && this.verticalFaceStatus === "up") {
				return [5, 6];
			} else if (this.horizontalFaceStatus === "frozen" && this.verticalFaceStatus === "down") {
				return [7, 8];
			} else {
				return [0];
			}
		},
		startCanvas: function() {
			if (this.canvasParams.context === null) {
				this.prepareCanvas();
			}
			setInterval(this.drawOnCanvasContext.bind(this), 80);
		}
	},
};