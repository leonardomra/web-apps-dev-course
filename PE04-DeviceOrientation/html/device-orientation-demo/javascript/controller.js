/******* responsible for receiving input from the user and passing it to the model (or the view through the model)  *******/
var Controller = {
	


	/*----------------------------------------------------------- BALL -----------------------------------------------------------*/
	


	Ball: {
		model: null,  // controller keeps an eye on the model
		init: function(stage) {
			this.model = Object.create(Model.Ball);
			this.model.init(stage);
			this.model.view.element.addEventListener('click', this.model.view.disappear);
		},
	},
	


	/*---------------------------------------------------- DEVICE MOTION DEMO ----------------------------------------------------*/
	


	DeviceMotionDemo: {
		model: null,  // controller keeps an eye on the model
		init: function() {
			this.model = Object.create(Model.DeviceMotionDemo);
			this.model.init();
			window.addEventListener('devicemotion', this.model.processDeviceInformation.bind(this.model));
		},
	},
	


	/*-------------------------------------------------- DEVICE ORIENTATION DEMO -------------------------------------------------*/
	


	DeviceOrientationDemo: {
		model: null,
		init: function() {
			this.model = Object.create(Model.DeviceOrientationDemo);
			this.model.init();
			window.addEventListener('deviceorientation', this.model.processDeviceInformation.bind(this.model));
		}
	},
	


	/*----------------------------------------------------------- PACMAN ---------------------------------------------------------*/
	

	
	Pacman: {
		model: null,  // controller keeps an eye on the model
		init: function(stage) {
			this.model = Object.create(Model.Pacman);
			this.model.init(stage);
		},
	},
};