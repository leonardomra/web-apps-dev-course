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



	/*----------------------------------------------------------- AUDIO ----------------------------------------------------------*/



	AudioChannel: {
		element: null,
		init: function(){
		},
	},



	/*----------------------------------------------------------- VIDEO ----------------------------------------------------------*/



	VideoChannel: {
		element: null,
		init: function(){
		},
	},



	/*----------------------------------------------------------- PACMAN -----------------------------------------------------------*/
	

	
	Pacman: {
		element: null,
		init: function(stage){
			this.element = document.createElement('canvas');
			this.element.style.position = 'absolute';
			this.element.width = 40;
			this.element.height = 40;
			stage.appendChild(this.element);
		},
		setPosition: function(elementXPos, elementYPos) {
			this.element.style.left = elementXPos + 'px';
			this.element.style.top = elementYPos + 'px';
		},
	},
};