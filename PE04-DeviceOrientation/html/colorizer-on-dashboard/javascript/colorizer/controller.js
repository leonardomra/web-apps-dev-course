/******* responsible for receiving input from the user and passing it to the model (or the view through the model)  *******/
var Controller = {
	Colorizer: {
		model: null,
		init: function(stage) {
			this.model = Object.create(Model.Colorizer);
			this.model.init(stage);
			window.addEventListener('devicemotion', this.model.processDeviceInformation.bind(this.model));
		},
	},
};