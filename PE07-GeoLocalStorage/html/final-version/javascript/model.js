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
			return this.generateRandomPositionForElement(width - 20);
		},
		yPos: function(height) {
			return this.generateRandomPositionForElement(height - 20);
		},
		generateRandomPositionForElement: function(size) {
			return Math.floor((Math.random() * size));
		},
	},
	


	/*----------------------------------------------------------- AUDIO ----------------------------------------------------------*/



	AudioChannel: {
		view: null,
		init: function(label) {
			this.view = Object.create(View.AudioChannel);
			this.view.init(label);
		},
	},



	/*----------------------------------------------------------- VIDEO ----------------------------------------------------------*/



	VideoChannel: {
		view: null,
		videoStatus: null,
		init: function(stage, label) {
			this.view = Object.create(View.VideoChannel);
			this.view.init(stage, label);
		},
		updateVideoStatus: function(e) {
			this.videoStatus = e.type;
			if (this.videoStatus == 'play') {
				this.view.removeMessage();
			}
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
		eatSound: null,
		moveSound: null,
		eatenCookies: 0,
		leftCookies: 1,
		timerDelegate: null,
		init: function(stage) {
			this.stage = stage;
			this.view = Object.create(View.Pacman);
			this.view.init(stage);
			var initialXPos = this.calculateHorizontalCenterOfElementOnStage(this.view.element, stage);
			var initialYPos = this.calculateVerticalCenterOfElementOnStage(this.view.element, stage);
			this.view.setPosition(initialXPos, initialYPos);
			// audio
			this.eatSound = Object.create(Controller.AudioChannel);
			this.eatSound.init('eatcookie');
			this.moveSound = Object.create(Controller.AudioChannel);
			this.moveSound.init('wakawaka');
			this.moveSound.volumeChannel(0.3);
		},
		// Event Handler's function - this function is triggered many times when the device is turned around 
		handleOrientation: function(e) {
			this.model.view.setPosition(this.model.horizontalPos(e.gamma), this.model.verticalPos(e.beta));
			if (this.model.horizontalFaceStatus != 'frozen' && this.model.verticalFaceStatus != 'frozen') {
				this.model.digest();
				this.model.moveSound.playChannel();
			}
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
					// audio
					this.eatSound.restartChannel();
					// points
					this.calculateCookiesInBelly();
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
			setInterval(this.detectWhenStopped.bind(this), 400);
		},
		calculateCookiesInBelly: function() {
			this.eatenCookies = 0;
			this.leftCookies = 0;
			for (var i in this.observedBiscuits) {
				if (this.observedBiscuits[i].model.view.element.className == 'ball') {
					if (this.observedBiscuits[i].model.view.element.parentNode === null) {
						this.eatenCookies += 1;
					} else {
						this.leftCookies += 1;
					}
				}
			}
			if (this.leftCookies === 0) {
				this.timerDelegate.stopAndFinish();
			}
		},
	},



	/*----------------------------------------------------------- GEO ----------------------------------------------------------*/



	GeoWatcher: {
		view: null,
		latitude: null,
		longitude: null,
		optionsLocation: {
			enableHighAccuracy: true,
			timeout: 5000,
		},
		init: function(stage) {
			this.view = Object.create(View.InfoBox);
			this.view.init(stage);
		},
		informLocation: function(pos) {
			// add code here
			var crd = pos.coords;
			this.latitude = crd.latitude;
			this.longitude = crd.longitude;

			var jump = "\n";
			var info = 'Your current position is:';
			info += jump;
			info += 'Latitude : ' + crd.latitude;
			info += jump;
			info += 'Longitude : ' + crd.longitude;
			info += jump;
			info += '+- ' + crd.accuracy + ' meters.';

			this.view.update(info);
		},
		errorLocation: function(error) {
			var errorMessage = 'ERROR(' + error.code + '): ' + error.message;
			this.view.update(errorMessage);
			console.warn(errorMessage);
		},
	},



	/*----------------------------------------------------------- GHOST ----------------------------------------------------------*/
	


	Ghost: {
		view: null,
		latitude: null,
		longitude: null,
		area: null,
		init: function(stage, latitude, longitude, area, image, speed, top) {
			this.view = Object.create(View.Ghost);
			this.view.init(stage, image, speed, top);
			this.latitude = latitude;
			this.longitude = longitude;
			this.area = area;
		},
		setGhostVisibility: function(value) {
			if (Math.floor(value) < this.area) {
				this.view.elementVisibility(true);
			} else {
				this.view.elementVisibility(false);
			}
		},
	},



	/*------------------------------------------------------ DISTANCE MESSAGER ---------------------------------------------------*/



	DistanceMessager: {
		view: null,
		watcher: null,
		ghost: null,
		init: function(stage, watcher, ghost) {
			this.view = Object.create(View.InfoBox);
			this.view.init(stage);
			this.watcher = watcher;
			this.ghost = ghost;
		},
		calculateDistance: function (latA, lonA, latB, lonB) {
			var r = 6371000; // earth radius in meters
			var dLat = this.toRadians(latB - latA);
			var dLon = this.toRadians(lonB - lonA);
			var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
					Math.cos(this.toRadians(latA)) * Math.cos(this.toRadians(latB)) *
					Math.sin(dLon / 2) * Math.sin(dLon / 2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			var d = r * c;
			this.view.update("distance to destination: \n" + d);
			this.ghost.evaluateWithDistance(d);
		},
		toRadians: function(value) {
			return value * Math.PI / 180;
		},
	},



	/*----------------------------------------------------------- TIMER ----------------------------------------------------------*/



	Timer: {
		view: null,
		counter: 0,
		myInterval: null,
		currentTime: null,
		pacmanDelegate: null,
		highscoreDelegate: null,
		init: function(stage, pacmanDelegate, highscoreDelegate) {
			this.view = Object.create(View.Timer);
			this.view.init(stage);
			this.pacmanDelegate = pacmanDelegate;
			this.highscoreDelegate = highscoreDelegate;
		},
		count: function() {
			if (this.counter > 0) {
				this.counter -= 1;
				var minutes = Math.floor(this.counter  / 60);
				var seconds = this.counter  - minutes * 60;
				if (minutes < 10) minutes = '0' + minutes;
				if (seconds < 10) seconds = '0' + seconds;
				this.currentTime = minutes + ':' + seconds;
				this.view.update(this.currentTime);
			} else {
				clearInterval(this.myInterval);
				this.endGame();
			}
		},
		endGame: function() {
			if (this.pacmanDelegate.getLeftCookies() > 0) {
				this.view.update('Game Over');
			} else {
				this.view.update('Congratulations!!!');
				// do highscore
				this.highscoreDelegate.insertTimeToHighscore(this.currentTime);
				this.highscoreDelegate.displayHighscore();
			}
			this.pacmanDelegate.model.moveSound.volumeChannel(0);
			this.view.stage.removeChild(this.pacmanDelegate.model.view.element);
		},
	},



	/*------------------------------------------------------ HIGHSCORE ---------------------------------------------------*/



	Highscore: {
		view: null,
		highscoreList: [],
		init: function(stage) {
			this.view = Object.create(View.Highscore);
			this.view.init(stage);
			// add code here
			if (localStorage.getItem('highscoreList') === null) {
				localStorage.setItem('highscoreList', this.highscoreList);
			}
			this.highscoreList = localStorage.getItem('highscoreList').split(',');
		},
		insertToHighscore: function(value) {
			// add code here
			this.highscoreList.push(value);
			localStorage.setItem('highscoreList', this.highscoreList);
		},
		getListAndDisplay: function() {
			// add code here
			var jump = "\n";
			var hs = 'Highscore:';
			
			for (var i in this.highscoreList) {
				hs += jump;
				hs += this.highscoreList[i];
			}

			this.view.placeOnStage(hs, this.highscoreList.length + 1);
		},
	},

};