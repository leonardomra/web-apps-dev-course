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
		init: function(stage) {
			this.stage = stage;
			this.view = Object.create(View.Pacman);
			this.view.init(stage);
			var initialXPos = this.calculateHorizontalCenterOfElementOnStage(this.view.element, stage);
			var initialYPos = this.calculateVerticalCenterOfElementOnStage(this.view.element, stage);
			this.view.setPosition(initialXPos, initialYPos);
		},
		calculateHorizontalCenterOfElementOnStage: function(element, stage) {
			return (stage.getBoundingClientRect().width/2) - (element.getBoundingClientRect().width/2);
		},
		calculateVerticalCenterOfElementOnStage: function(element, stage) {
			return (stage.getBoundingClientRect().height/2) - (element.getBoundingClientRect().height/2);
		},
		handleOrientation: function(e) {
			this.model.view.setPosition(this.model.horizontalPos(e.gamma), this.model.verticalPos(e.beta));
			this.model.digest();
		},
		horizontalPos: function(gamma) {
			var horizontalAdjustmentScale = (this.stage.getBoundingClientRect().width/2)/90;
			return this.calculateHorizontalCenterOfElementOnStage(this.view.element, this.stage) + (gamma * horizontalAdjustmentScale);
		},
		verticalPos: function(beta) {
			var verticalAdjustmentScale = (this.stage.getBoundingClientRect().height/2)/90;
			return this.calculateVerticalCenterOfElementOnStage(this.view.element, this.stage) + (beta * verticalAdjustmentScale);
		},
		// SOLUTION:
		// The function digest is responsible to detect if objects (Pacman, Balls) touch each other. The Pacman is the one who digest the biscuits. 
		// So the name of the function is already a strong indication that it belongs to the Pacman instead the Balls.
		// In addition, another strong hint is the "variable" (key) "observedBiscuits" that belongs to the model of the Pacman and it's used inside of this function.
		// This variable/key is the one how allows for the detection to occur taking into account all Balls on the stage. This variable/key is updated by the "biscuitProductionQueue" (setInterval) whenever a new biscuit is created.
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
	},
};
