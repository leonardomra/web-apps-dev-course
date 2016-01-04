/************************** responsible for fetching, processing, and defining data  **************************/
var Model = {
	


	/*----------------------------------------------------------- BALL -----------------------------------------------------------*/
	


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
	


	/*---------------------------------------------------- DEVICE MOTION DEMO ----------------------------------------------------*/
	


	DeviceMotionDemo: {
		view: null,  // the model keeps an eye on the view
		init: function() {
			this.view = Object.create(View.InfoBox);
			var numberOfRows = 7;
			this.view.init(numberOfRows);
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
	


	/*-------------------------------------------------- DEVICE ORIENTATION DEMO -------------------------------------------------*/
	


	DeviceOrientationDemo: {
		view: null,  // the model keeps an eye on the view
		init: function() {
			this.view = Object.create(View.InfoBox);
			var numberOfRows = 7;
			this.view.init(numberOfRows);
			//this.view.changeVerticalPosition(document.querySelector('.infobox').getBoundingClientRect().height);
		},
		processDeviceInformation: function(e) {
			var information = '';
			var jumpLine = '\n';
			information += " absolute: " + window.Model.DeviceMotionDemo.numberBeautifier(e.absolute);  // borrowing something I need from a friend "DeviceMotionDemo"
			information += jumpLine;
			information += " alpha: " + window.Model.DeviceMotionDemo.numberBeautifier(e.alpha);
			information += jumpLine;
			information += " beta: " + window.Model.DeviceMotionDemo.numberBeautifier(e.beta);
			information += jumpLine;
			information += " gamma:" + window.Model.DeviceMotionDemo.numberBeautifier(e.gamma);
			// background color change
			var redX = this.calculateColorBasedOnOrientation(e.alpha);  // from 0 to 360, Chrome EMULATOR: from -180 to 180; represents x
			var greenY = this.calculateColorBasedOnOrientation(e.beta);  // from -180 to 180; represents y
			var blueZ = this.calculateColorBasedOnOrientation(e.gamma);  // from -90 to 90; represents z
			information += jumpLine;
			information += " redX|" + redX;
			information += jumpLine;
			information += " greenY|" + greenY;
			information += jumpLine;
			information += " blueZ|" + blueZ;
			this.view.update(information);
			this.view.changeBackgroundColorBasedOnMotion('#'+redX+greenY+blueZ);
		},
		calculateColorBasedOnOrientation: function(value) {
			var amplifiedValue = Math.floor(Math.abs(0.088 * parseFloat(window.Model.DeviceMotionDemo.numberBeautifier(value))));  // calculate based on 180 degrees
			var duplicatedValue = Array(3).join(window.Model.DeviceMotionDemo.decimalToHexadecimalConverter(amplifiedValue).charAt(0));
			return duplicatedValue;
		},
	},
	


	/*----------------------------------------------------------- PACMAN ---------------------------------------------------------*/
	


	Pacman: {
		view: null,  // the model keeps an eye on the view
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
	},
};