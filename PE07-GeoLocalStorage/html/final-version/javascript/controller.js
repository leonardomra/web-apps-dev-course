/******* responsible for receiving input from the user and passing it to the model (or the view through the model)  *******/
var Controller = {
	


	/*----------------------------------------------------------- BALL -----------------------------------------------------------*/
	


	Ball: {
		model: null,
		init: function(stage) {
			this.model = Object.create(Model.Ball);
			this.model.init(stage);
		},
		toBeEaten: function() {
			this.model.view.disappear();
		},
		resurrect: function() {
			this.model.view.appear();
		},
	},
	


	/*----------------------------------------------------------- AUDIO ----------------------------------------------------------*/



	AudioChannel: {
		model: null,
		init: function(label) {
			this.model = Object.create(Model.AudioChannel);
			this.model.init(label);
		},
		playChannel: function() {
			this.model.view.element.loop = false;
			this.model.view.element.play();
		},
		pauseChannel: function() {
			this.model.view.element.pause();
		},
		backToBeginningChannel: function() {
			this.model.view.element.currentTime = 0.0;
		},
		restartChannel: function() {
			this.playChannel();
			this.backToBeginningChannel(); // weird but necessary for firefox 
		},
		playLoopChannel: function() {
			this.model.view.element.loop = true;
			this.model.view.element.play();
		},
		volumeChannel: function(value) {
			this.model.view.element.volume = value;
		},
	},



	/*----------------------------------------------------------- VIDEO ----------------------------------------------------------*/



	VideoChannel: {
		model: null,
		init: function(stage, label) {
			this.model = Object.create(Model.VideoChannel);
			this.model.init(stage, label);
			this.model.view.element.addEventListener('ended', this.model.view.removeVideo.bind(this.model.view));
			this.model.view.element.addEventListener('pause', this.model.updateVideoStatus.bind(this.model));
			this.model.view.element.addEventListener('play', this.model.updateVideoStatus.bind(this.model));
		},
		placeScreenOnStage: function() {
			this.model.view.placeVideo();
		},
		removeScreenOffStage: function() {
			this.mode.view.removeVideo();
		},
		playChannel: function() {
			console.log('play');
			this.model.view.element.loop = false;
			this.model.view.element.play();
		},
		pauseChannel: function() {
			this.model.view.element.pause();
		},
		backToBeginningChannel: function() {
			this.model.view.element.currentTime = 0.0;
		},
		restartChannel: function() {
			this.backToBeginningChannel();
			this.playChannel();
		},
		playLoopChannel: function() {
			this.model.view.element.loop = true;
			this.model.view.element.play();
		},
		volumeChannel: function(value) {
			this.model.view.element.volume = value;
		},
		removeMessageFromStage: function() {
			this.model.view.removeMessage();
		},
	},



	/*----------------------------------------------------------- PACMAN ---------------------------------------------------------*/
	


	Pacman: {
		model: null,
		init: function(stage) {
			this.model = Object.create(Model.Pacman);
			this.model.init(stage);
			window.addEventListener('deviceorientation', this.model.handleOrientation.bind(this));
			this.model.startCanvas();
		},
		lookAt: function(biscuitContainer) {
			this.model.observedBiscuits = biscuitContainer;
		},
		getLeftCookies: function() {
			return this.model.leftCookies;
		},
		setTimerDelegate: function(timer) {
			this.model.timerDelegate = timer;
		},
	},


	/*----------------------------------------------------------- GEO ----------------------------------------------------------*/



	GeoWatcher: {
		model: null,
		init: function(stage) {
			this.model = Object.create(Model.GeoWatcher);
			this.model.init(stage);
			// add code here
			navigator.geolocation.watchPosition(this.model.informLocation.bind(this.model),
												this.model.errorLocation.bind(this.model),
												this.model.options);
		},
		getLatitude: function() {
			return this.model.latitude;
		},
		getLongitude: function() {
			return this.model.longitude;
		},
	},



	/*----------------------------------------------------------- GHOST ----------------------------------------------------------*/



	Ghost: {
		model: null,
		init: function(stage, latitude, longitude, area, image, speed, top) {
			this.model = Object.create(Model.Ghost);
			this.model.init(stage, latitude, longitude, area, image, speed, top);
		},
		getLatitude: function() {
			return this.model.latitude;
		},
		getLongitude: function() {
			return this.model.longitude;
		},
		evaluateWithDistance: function(value) {
			this.model.setGhostVisibility(value);
		},
		toBeEaten: function() {
			this.model.view.disappear();
		},
	},



	/*------------------------------------------------------ DISTANCE MESSAGER ---------------------------------------------------*/



	DistanceMessager: {
		model: null,
		init: function(stage, watcher, ghost) {
			this.model = Object.create(Model.DistanceMessager);
			this.model.init(stage, watcher, ghost);
			setInterval(this.calculate.bind(this), 1000);
		},
		calculate: function() {
			this.model.calculateDistance(this.model.watcher.getLatitude(), this.model.watcher.getLongitude(), this.model.ghost.getLatitude(), this.model.ghost.getLongitude());
		},
	},



	/*------------------------------------------------------ TIMER ---------------------------------------------------*/



	Timer: {
		model: null,
		init: function(stage, pacmanDelegate, highscoreDelegate) {
			this.model = Object.create(Model.Timer);
			this.model.init(stage, pacmanDelegate, highscoreDelegate);
		},
		start: function(amount) {
			this.model.counter = amount;
			this.model.myInterval = setInterval(this.model.count.bind(this.model), 1000);
		},
		stopAndFinish: function() {
			clearInterval(this.model.myInterval);
			this.model.endGame();
		}
	},



	/*------------------------------------------------------ HIGHSCORE ---------------------------------------------------*/



	Highscore: {
		model: null,
		init: function(stage) {
			this.model = Object.create(Model.Highscore);
			this.model.init(stage);
			this.model.view.element.addEventListener('click', this.clearHighscore);
		},
		displayHighscore: function() {
			this.model.getListAndDisplay();
		},
		insertTimeToHighscore: function(value) {
			this.model.insertToHighscore(value);
		},
		clearHighscore: function() {
			localStorage.clear();
		},
	},

};