/************************** responsible for fetching, processing, and defining data  **************************/
var Model = {
	Ball: {
		view: null,  // the model keeps an eye on the view
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
	DeviceMotionDemo: {
		view: null,  // the model keeps an eye on the view
		init: function() {
			this.view = Object.create(View.InfoBox);
			this.view.init();
		},
		processDeviceInformation: function(e) {
			var information = '';
			var jumpLine = '\n';
			information += " acc.| x-> " + this.numberBeautifier(e.acceleration.x) + ", y-> " + this.numberBeautifier(e.acceleration.y) + ", z-> " + this.numberBeautifier(e.acceleration.z);
			information += jumpLine;
			information += " acc.+Gravity| x-> " + this.numberBeautifier(e.accelerationIncludingGravity.x) + ", y-> " +  this.numberBeautifier(e.accelerationIncludingGravity.y) + ", z-> " + this.numberBeautifier(e.accelerationIncludingGravity.z);
			information += jumpLine;
			information += " rot. rate| alpha-> " + this.numberBeautifier(e.rotationRate.alpha) + ", beta-> " + this.numberBeautifier(e.rotationRate.beta) + ", gamma-> " + this.numberBeautifier(e.rotationRate.gamma);
			information += jumpLine;
			information += " interval|" + e.interval;
			// background color change
			var redX = this.calculateColorBasedOnMotion(e.accelerationIncludingGravity.x);
			var greenY = this.calculateColorBasedOnMotion(e.accelerationIncludingGravity.y);
			var blueZ = this.calculateColorBasedOnMotion(e.accelerationIncludingGravity.z);
			information += jumpLine;
			information += " redX|" + redX;
			information += jumpLine;
			information += " greenY|" + greenY;
			information += jumpLine;
			information += " blueZ|" + blueZ;
			this.view.update(information);
			this.view.changeBackgroundColorBasedOnMotion('#'+redX+greenY+blueZ);
		},
		numberBeautifier: function(value) {
			var strippedNumber = Math.floor(value * 10) / 10;
			var addPlusSign, addDecimal = false;
			if (strippedNumber === 0) {
				return ' 0.0';
			} else {
				addDecimal = strippedNumber % 1 === 0;
				addPlusSign = strippedNumber > 0;
				if (addDecimal) strippedNumber = strippedNumber + '.0';
				if (addPlusSign) strippedNumber = '+' + strippedNumber;
				return strippedNumber;
			}
		},
		calculateColorBasedOnMotion: function(value) {
			var amplifiedValue = Math.floor(Math.abs(1.6 * parseFloat(this.numberBeautifier(value))));
			var duplicatedValue = Array(3).join(this.decimalToHexadecimalConverter(amplifiedValue).charAt(0));
			return duplicatedValue;
		},
		decimalToHexadecimalConverter: function(value) {
			return value.toString(16);
		},
	},
};



/************************** responsible for updating the screen - NO DATA PROCESSING  **************************/
var View = {
	Ball: {
		element: null,  // the view keeps an eye in its elements
		init: function(elementXPos, elementYPos, stage){
			this.element = document.createElement('div');
			this.element.style.position = 'absolute';
			this.element.className = 'ball';
			this.element.style.left = elementXPos + 'px';
			this.element.style.top = elementYPos + 'px';
			stage.appendChild(this.element);
		},
		disappear: function(e) {
			e.target.style.display = 'none';
		},
	},
	InfoBox: {
		element: null,  // the view keeps an eye in its elements
		init: function() {
			this.element = document.createElement('textarea');
			this.element.style.position = 'absolute';
			this.element.style.left = '0px';
			this.element.style.top = '0px';
			this.element.style.padding = '0px';
			this.element.style.margin = '0px';
			this.element.style.border = '0px';
			this.element.style.width = '100%';
			this.element.rows = 7;
			this.element.value = 'Waiting for signal...';
			document.body.appendChild(this.element);
		},
		update: function(information) {
			this.element.value = information;
		},
		changeBackgroundColorBasedOnMotion: function(color) {
			this.element.style.backgroundColor = color;
		},
	},
};



/******* responsible for receiving input from the user and passing it to the model (or the view through the model)  *******/
var Controller = {
	Ball: {
		model: null,  // controller keeps an eye on the model
		init: function(stage) {
			this.model = Object.create(Model.Ball);
			this.model.init(stage);
			this.model.view.element.addEventListener('click', this.model.view.disappear);
		},
	},
	DeviceMotionDemo: {
		model: null,  // controller keeps an eye on the model
		init: function() {
			this.model = Object.create(Model.DeviceMotionDemo);
			this.model.init();
			window.addEventListener('devicemotion', this.model.processDeviceInformation.bind(this.model));
		}
	},
};



/********************************************** Big Bang **********************************************/
(function() {
	setInterval(function(){
		var myStage = document.getElementById('main-stage');
		var myBall = Object.create(Controller.Ball);
		myBall.init(myStage);
	}, 1000);
	Object.create(Controller.DeviceMotionDemo).init();
	
	/********************************************************************/
	/* HOMEWORK 1 - implement a screensaver widget into the dashboard   */
	/* HINT - document.getElementById('some-widget-block');             */
	/********************************************************************/

	/********************************************************************/
	/* HOMEWORK 2 - create our hero                                     */
	/* HINT - var Pacman = {};                                          */
	/********************************************************************/

	/********************************************************************************************/
	/* HOMEWORK 3 (Optional) - test this application on your phone                              */
	/* I've made it more visible how motion events can influence the                            */
	/* interface. You're encouraged to check how this app is done.                              */
	// HINT - please read http://vintaytime.com/639/host-website-on-google-drive                */ 
	// Check with mobile - https://googledrive.com/host/0BykieWY49RrPRVFYSF91T0pNdEk/app.html   */                                   */
	/********************************************************************************************/
})();