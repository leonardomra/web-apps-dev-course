/************************** responsible for updating the screen - NO DATA PROCESSING  **************************/
var View = {



	/*----------------------------------------------------------- BALL -----------------------------------------------------------*/


	
	Ball: {
		element: null,
		init: function(elementXPos, elementYPos, stage){
			this.element = document.createElement('div');
			this.element.className = 'ball';
			this.element.style.left = elementXPos + 'px';
			this.element.style.top = elementYPos + 'px';
			stage.appendChild(this.element);
		},
		// SOLUTION:
		// As for the previous exercise, the balls are the ones that should disappear. However, now we don't achieve this by the user's click, but instead by collision detection performed by the model of the Pacman.
		// As we want to keep this function flexible enough to still accept the user's click, we can make it flexible by accounting for different possibilities of the function's parameter. In this case, "e".
		// We check if "e" is undefined, if so it means that there is no event being passed. 
		// If there is no event, this function is not being used by an event listerner. So it is possible then to access the variable/key "element" with the path "this.element" in order to make it disappear.
		disappear: function(e) {
			var self = (e === undefined ? this.element : e.target);
			self.style.display = 'none';
		},
	},



	/*----------------------------------------------------------- PACMAN -----------------------------------------------------------*/
	

	
	Pacman: {
		element: null,
		init: function(stage){
			this.element = document.createElement('div');
			this.element.className = 'pacman';
			stage.appendChild(this.element);
		},
		setPosition: function(elementXPos, elementYPos) {
			this.element.style.left = elementXPos + 'px';
			this.element.style.top = elementYPos + 'px';
		},
	},
};
