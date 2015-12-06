/************************** responsible for updating the screen - NO DATA PROCESSING  **************************/
var View = {



	/*----------------------------------------------------------- BALL -----------------------------------------------------------*/


	
	Ball: {
		element: null,  // the view keeps an eye on its elements
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


	
	/*----------------------------------------------------------- INFOBOX -----------------------------------------------------------*/


	
	InfoBox: {
		element: null,  // the view keeps an eye on its elements
		init: function(numberOfRows) {
			this.element = document.createElement('textarea');
			this.element.className = 'infobox';
			this.element.rows = numberOfRows;
			this.element.value = 'Waiting for signal...';
			document.body.appendChild(this.element);
		},
		update: function(information) {
			this.element.value = information;
		},
		changeBackgroundColorBasedOnMotion: function(color) {
			this.element.style.backgroundColor = color;
		},
		changeVerticalPosition: function(elementYPos) {
			this.element.style.top = elementYPos + 'px';
		}
	},
	


	/*----------------------------------------------------------- PACMAN -----------------------------------------------------------*/
	

	
	Pacman: {
		element: null,  // the view keeps an eye on its elements
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