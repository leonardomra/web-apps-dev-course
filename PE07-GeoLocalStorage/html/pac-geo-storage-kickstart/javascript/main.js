/********************************************** Big Bang **********************************************/
(function() {

	var myStage = document.getElementById('main-stage');
	var numberOfCookies = 2;
	var amountOfTime = 30;  // in seconds
	var intro = null;
	var pacman = null;
	var biscuitContainer = [];
	var ghostContainer = [];
	var pois = [  // points of interest
			{
				'title': 'red',  // file/color of the ghost
				'lat': '53.0744'+'020',  // latidute where it should appear
				'lon': '8.8312'+'744',  // longitude where it should appear
				'area': '5',  // active area in meters around the location 
				'top': '10%',  // top position where the ghost should appear
				'speed': '5s',  // moving speed of the ghost
			},
			{
				'title': 'blue',
				'lat': '53.0743'+'823',
				'lon': '8.8312'+'513',
				'area': '5',
				'top': '50%',
				'speed': '10s',
			},
			{
				'title': 'yellow',
				'lat': '53.0743'+'992',
				'lon': '8.8312'+'702',
				'area': '5',
				'top': '90%',
				'speed': '15s'
			},
		];
	

	function startGeolocationForGhost() {
		var geoWatcher = Object.create(Controller.GeoWatcher);  // geoWatcher watches the location of the device
		geoWatcher.init(myStage);

		for (var i = pois.length - 1; i >= 0; i--) {
			var ghost = Object.create(Controller.Ghost);
			ghost.init(myStage, pois[i]['lat'], pois[i]['lon'], pois[i]['area'], pois[i]['title'], pois[i]['speed'], pois[i]['top']);
			ghostContainer.push(ghost);

			var distanceMessager = Object.create(Controller.DistanceMessager);  // distanceMessager monitors the distance between all ghosts and the position of the device informed by the GeoWatcher
			distanceMessager.init(myStage, geoWatcher, ghost);
		}
		var allElementsPacmanShouldBeAware = biscuitContainer.concat(ghostContainer);
		pacman.lookAt(allElementsPacmanShouldBeAware);
	}


	function setupHighscoreAndTimer() {
		var highscore = Object.create(Controller.Highscore);
		highscore.init(myStage);

		var timer = Object.create(Controller.Timer);
		timer.init(myStage, pacman, highscore);
		timer.start(amountOfTime);
		pacman.setTimerDelegate(timer);
	}


	function startGame() {
		pacman = Object.create(Controller.Pacman);  // our hero
		pacman.init(myStage);
		createAllCookies(numberOfCookies);  // biscuit production line
		startGeolocationForGhost();  // create the enemies
		setupHighscoreAndTimer();
	}


	function createAllCookies(amount) {
		for (var i = amount - 1; i >= 0; i--) {
			var biscuit = Object.create(Controller.Ball);
			biscuit.init(myStage);
			biscuitContainer.push(biscuit);
		}
	}


	function startIntroVideo() {
		if (intro === null) {
			intro = Object.create(Controller.VideoChannel);
			intro.init(myStage, 'intro');
			intro.placeScreenOnStage();
			startObserver();
		}
		intro.playChannel();
	}


	function startObserver() {
		var observer = new MutationObserver(callback);
		var forEachProto = Array.prototype.forEach;
		observer.observe(document, { childList: true, subtree: true});
		function callback(mutations) {
			mutations.forEach(function(mutation) {
				forEachProto.call(mutation.removedNodes, function(node) {
					if (node.className === 'introvideo') {
						startGame(); // when the video is removed from the screen, start the game
						window.removeEventListener('touchstart', handleVideoTap);
					}
					if (node.className === 'ghost') {
						for (var i in biscuitContainer) {
							biscuitContainer[i].resurrect(); // when a ghost is eaten, ressurect all the balls!
						}
					}
				});
			});
		}
	}


	// In case running the game on Chrome for Android - start video with touch 
	function handleVideoTap() {
		startIntroVideo();
		window.removeEventListener('touchstart', handleVideoTap);
	}
	window.addEventListener('touchstart', handleVideoTap);


	startIntroVideo();

})();