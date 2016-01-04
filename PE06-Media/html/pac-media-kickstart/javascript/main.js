/********************************************** Big Bang **********************************************/
(function() {
	var myStage = document.getElementById('main-stage');
	var numberOfCookies = 100;
	
	function startGame() {
		// our hero
		var pacman = Object.create(Controller.Pacman);
		pacman.init(myStage);
		// biscuit production line
		var biscuitContainer = [];
		for (var i = numberOfCookies - 1; i >= 0; i--) {
			var biscuit = Object.create(Controller.Ball);
			biscuit.init(myStage);
			biscuitContainer.push(biscuit);
			pacman.lookAt(biscuitContainer);
		}
	}

	function startIntroVideo() {
	}

	function startObserver() {
		var observer = new MutationObserver(callback);
		var forEachProto = Array.prototype.forEach;
		observer.observe(document, { childList: true, subtree: true });
		function callback(mutations) {
			mutations.forEach(function(mutation) {
				forEachProto.call(mutation.removedNodes, function(node) {
				});
			});
		}
	}

	startIntroVideo();
	startObserver();
})();