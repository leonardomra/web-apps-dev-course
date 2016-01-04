/********************************************** Big Bang **********************************************/
(function() {
	var myStage = document.getElementById('clock');
	var clock = Object.create(Controller.Clock);
	clock.init(myStage);
})();