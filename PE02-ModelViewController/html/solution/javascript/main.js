/************************** responsible for fetching, processing, and defining data  **************************/
var Model = {
	Ball: {
		view: null,  // the model keeps an eye on the view
		init: function() {
			this.view = Object.create(View.Ball);
			this.view.init(this.xPos(), this.yPos());
		},
		xPos: function() {
			return this.generateRandomPositionForBody(document.documentElement.clientWidth);
		},
		yPos: function() {
			return this.generateRandomPositionForBody(document.documentElement.clientHeight);
		},
		generateRandomPositionForBody: function(size) {
			return Math.floor((Math.random() * size));
		},
	}
};

/************************** responsible for updating the screen - NO DATA PROCESSING  **************************/
var View = {
	Ball: {
		element: null, // the view keeps an eye in its elements
		init: function(elementXPos, elementYPos){
			this.element = document.createElement('div');
			this.element.style.position = 'absolute';
			this.element.className = 'ball';
			this.element.style.left = elementXPos + 'px';
			this.element.style.top = elementYPos + 'px';
			document.body.appendChild(this.element);
		},
		/********************************************************************/
		/* Solution                                                         */
		disappear: function(e) {
			e.target.style.display = 'none';
			// or 
			// this.style.display = 'none';
			
		},
		/********************************************************************/
	}
};

/******* responsible for receiving input from the user and passing it to the model (or the view through the model)  *******/
var Controller = {
	Ball: {
		model: null,  // controller keeps an eye on the model
		init: function() {
			this.model = Object.create(Model.Ball);
			this.model.init();
			/********************************************************************/
			/* HOMEWORK - the ball should disappear when the user clicks on it! */
			/* HINT - addEventListener('click', disappear);                     */
			/********************************************************************/

			/********************************************************************/
			/* Solution                                                         */
			this.model.view.element.addEventListener('click' , this.model.view.disappear);
			/********************************************************************/
		},
	},
};

/********************************************** Big Bang **********************************************/
(function() {
	setInterval(function(){
		Object.create(Controller.Ball).init();
	}, 1000);
})();
