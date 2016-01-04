/******* responsible for receiving input from the user and passing it to the model (or the view through the model)  *******/
var Controller = {
	


	/*----------------------------------------------------------- BALL -----------------------------------------------------------*/
	


	Ball: {
		model: null,
		init: function(stage) {
			this.model = Object.create(Model.Ball);
			this.model.init(stage);
		},
		// SOLUTION:
		// The controller is the layer responsible for managing all the commands our objects receive from external sources (user).
		// In this case, specifically, the user is not a person, but the Pacman. When the Pacman eats the ball it calls the function "toBeEaten" from inside of the digest function.
		// Also, the path "this.model.view" indicates that "this" is actually the controller, because of its capability of calling all other layers in the chain.
		toBeEaten: function() {
			this.model.view.disappear();
		},
	},
	


	/*----------------------------------------------------------- PACMAN ---------------------------------------------------------*/
	

	
	Pacman: {
		model: null,
		init: function(stage) {
			this.model = Object.create(Model.Pacman);
			this.model.init(stage);
			window.addEventListener('deviceorientation', this.model.handleOrientation.bind(this));
		},
		// SOLUTION:
		// As for the function "toBeEaten", The controller is the layer responsible for managing all the commands our objects receive from external sources (user).
		// In this case, specifically, the user is not a person, but the "biscuitProductionQueue (setInterval)", that *** forces the Pacman to be aware of the biscuits it creates ***.
		// The path "this.model" indicates that "this" is the controller, because of its capability of calling straight the model.
		lookAt: function(biscuitContainer) {
			this.model.observedBiscuits = biscuitContainer;
		},
	},
};
