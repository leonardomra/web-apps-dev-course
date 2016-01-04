/************************** responsible for fetching, processing, and defining data  **************************/
var Model = {
	Colorizer: {
		view: null,
		init: function(stage) {
			this.view = Object.create(View.Colorizer);
			this.view.init(stage);
		},
		processDeviceInformation: function(e) {
			// background color change
			var redX = this.calculateColorBasedOnMotion(e.accelerationIncludingGravity.x);
			var greenY = this.calculateColorBasedOnMotion(e.accelerationIncludingGravity.y);
			var blueZ = this.calculateColorBasedOnMotion(e.accelerationIncludingGravity.z);
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