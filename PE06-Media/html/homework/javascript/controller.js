/******* responsible for receiving input from the user and passing it to the model (or the view through the model)  *******/
var Controller = {



	/*----------------------------------------------------------- AUDIO ----------------------------------------------------------*/



	AudioChannel: {
		model: null,
		init: function(label) {
			this.model = Object.create(Model.AudioChannel);
			this.model.init(label);
			this.model.view.element.addEventListener('timeupdate', this.model.handleTimeupdate.bind(this));
		},
		playChannel: function() {
			this.model.view.element.loop = false;
			this.model.view.element.play();
		},
		pauseChannel: function() {
			this.model.view.element.pause();
		},
		stopChannel: function() {
			this.model.view.element.currentTime = 0;
			this.pauseChannel();
		},
		restartChannel: function() {
			this.stopChannel();
			this.playChannel();
		},
		playLoopChannel: function() {
			this.model.view.element.loop = true;
			this.model.view.element.play();
		},
		volumeChannel: function(value) {
			this.model.view.element.volume = value;
		},
		changeAudioChannel: function(label) {
			this.model.view.loadFile(label);
			this.model.view.element.load();
		},
		getTimerChannel: function() {
			return this.model.timer;
		},
		getProgressPercentageChannel: function() {
			return this.model.progressPercentage;
		}
	},



	/*----------------------------------------------------------- PLAYER ----------------------------------------------------------*/



	Player: {
		model: null,
		init: function(stage, tracks) {
			this.model = Object.create(Model.Player);
			this.model.init(stage, tracks);
			this.model.view.elementButtonPlay.addEventListener('click', this.model.playSong.bind(this.model));
			this.model.view.elementButtonStop.addEventListener('click', this.model.stopSong.bind(this.model));
			this.model.view.elementButtonPause.addEventListener('click', this.model.pauseSong.bind(this.model));
			this.model.view.elementButtonJumpNext.addEventListener('click', this.model.nextSong.bind(this.model));
			this.model.view.elementButtonJumpPrevious.addEventListener('click', this.model.previousSong.bind(this.model));
		},
	},

};