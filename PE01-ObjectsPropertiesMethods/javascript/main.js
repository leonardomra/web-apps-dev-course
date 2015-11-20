// Defining an object, it's properties and methods 

var Ball = {
	xPos: function() {
		return this.generateRandomPositionForBody(document.documentElement.clientWidth);
	},
	yPos: function() {
		return this.generateRandomPositionForBody(document.documentElement.clientHeight);
	},
	init: function() {
		var element = document.createElement('div');
		element.style.position = 'absolute';
		element.className = 'ball';
		element.style.left = this.xPos() + 'px';
		element.style.top = this.yPos() + 'px';
		document.body.appendChild(element);
	},
	generateRandomPositionForBody: function(size) {
		// Math.floor();  // The Math.floor() function returns the largest integer less than or equal to a given number.
		// Math.round();  // The Math.round() function returns the value of a number rounded to the nearest integer.
		// Math.ceil();  // The Math.ceil() function returns the smallest integer greater than or equal to a given number.
		return Math.floor((Math.random() * size));
	},
};


(function() {
	var myBall = Object.create(Ball);  // create an instance with Object.create()
	myBall.init();  // initialize the object
})();


/*
// Create an anonymous object every 1 second 
(function() {
	setInterval(function(){
		Object.create(Ball).init();
	}, 1000);
})();
*/