/******* responsible for receiving input from the user and passing it to the model (or the view through the model)  *******/
var Controller = {



	/*----------------------------------------------------------- CLOCK ---------------------------------------------------------*/
	

	
	Clock: {
		model: null,
		init: function(stage) {
			this.model = Object.create(Model.Clock);
			this.model.init(stage);
			this.model.startCanvas();
		},
	},
};
