/************************** responsible for updating the screen - NO DATA PROCESSING  **************************/
var View = {
	Colorizer: {
		element: null,
		init: function(stage) {
			this.element = stage;
		},
		changeBackgroundColorBasedOnMotion: function(color) {
			this.element.style.backgroundColor = color;
		},
	},
};