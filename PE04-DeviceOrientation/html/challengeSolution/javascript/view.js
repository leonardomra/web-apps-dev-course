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