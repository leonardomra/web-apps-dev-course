/************************** responsible for updating the screen - NO DATA PROCESSING  **************************/
var View = {



	/*----------------------------------------------------------- CLOCK -----------------------------------------------------------*/
	

	
	Clock: {
		element: null,
		init: function(stage){
			this.element = document.createElement('canvas');
			this.element.width = 200;
			this.element.height = 200;
			stage.appendChild(this.element);
		},
	},
};
