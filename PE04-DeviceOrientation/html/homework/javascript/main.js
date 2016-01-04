/********************************************** Big Bang **********************************************/
(function() {
	var myStage = document.getElementById('main-stage');
	
	// our hero
	var pacman = Object.create(Controller.Pacman);
	pacman.init(myStage);
	
	// biscuit production line
	var biscuitContainer = [];
	var biscuitProductionQueue = setInterval(function(){
		var biscuit = Object.create(Controller.Ball);
		biscuit.init(myStage);
		biscuitContainer.push(biscuit);
		pacman.lookAt(biscuitContainer);
	}, 1000);
	//Object.create(Controller.DeviceMotionDemo).init();
	//Object.create(Controller.DeviceOrientationDemo).init();
})();

/********************************************************************/
/* HOMEWORK - implement collision detection by pasting the 4 chunks */
/* of code in the right place (model.js, view.js, controller.js)    */
/*------------------------------------------------------------------*/
/* --->>> USE THE CODE IN THIS FOLDER (CHALLENGE) FOR THIS EXERCISE */
/*------------------------------------------------------------------*/
/* IMPORTANT: Write 4 sentences next to the chunks you have pasted  */
/* explaining the reasons of your decision.                         */
/* Example: "I placed the following code inside the Model of the    */
/* Pacman, because the model is responsible for processing data,    */
/* and this function is related to..."                              */
/*------------------------------------------------------------------*/
/*------------------------------------------------------------------*/
/* CHUNK A:                                                         */
	/*
	toBeEaten: function() {
		this.model.view.disappear();
	},
	*/
/*------------------------------------------------------------------*/
/* CHUNK B:                                                         */
	/*	
	lookAt: function(biscuitContainer) {
		this.model.observedBiscuits = biscuitContainer;
	},
	*/
/*------------------------------------------------------------------*/
/* CHUNK C:                                                         */
	/*
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
	*/
/*------------------------------------------------------------------*/
/* CHUNK D (REPLACE INSIDE AN ALREADY EXISTING FUNCTION):           */
	/*
	var self = (e === undefined ? this.element : e.target);
	self.style.display = 'none';
	*/
/********************************************************************/
