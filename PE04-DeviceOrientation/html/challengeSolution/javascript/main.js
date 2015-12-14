/********************************************** Big Bang **********************************************/
(function() {
	var myStage = document.getElementById('main-stage');
	
	// our hero
	var pacman = Object.create(Controller.Pacman);
	pacman.init(myStage);
	
	// biscuit production line
	var biscuitContainer = [];
	var biscuitProductionQueue = setInterval(function(){
		var biscuit = Object.create(Controller.Ball);
		biscuit.init(myStage);
		biscuitContainer.push(biscuit);
		pacman.lookAt(biscuitContainer);
	}, 1000);
})();