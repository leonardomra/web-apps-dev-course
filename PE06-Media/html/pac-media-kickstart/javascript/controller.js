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
	},
	


	/*----------------------------------------------------------- AUDIO ----------------------------------------------------------*/



	AudioChannel: {
		model: null,
		init: function(label) {
		},
	},



	/*----------------------------------------------------------- VIDEO ----------------------------------------------------------*/



	VideoChannel: {
		model: null,
		init: function(stage, label) {
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
	},
};