/********************************************** Big Bang **********************************************/
(function() {
	var myStage = document.getElementById('main-stage');
	setInterval(function(){
		Object.create(Controller.Ball).init(myStage);
	}, 1000);
	Object.create(Controller.Pacman).init(myStage);
	Object.create(Controller.DeviceMotionDemo).init();
	Object.create(Controller.DeviceOrientationDemo).init();
})();