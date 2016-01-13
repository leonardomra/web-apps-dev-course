/************************** responsible for updating the screen - NO DATA PROCESSING  **************************/
var View = {



	/*----------------------------------------------------------- BALL -----------------------------------------------------------*/


	
	Ball: {
		element: null,
		stage: null,
		init: function(elementXPos, elementYPos, stage){
			this.stage = stage;
			this.element = document.createElement('div');
			this.element.className = 'ball';
			this.element.style.left = elementXPos + 'px';
			this.element.style.top = elementYPos + 'px';
			stage.appendChild(this.element);
		},
		disappear: function() {
			this.stage.removeChild(this.element);
		},
		appear: function() {
			this.stage.appendChild(this.element);
		},
	},



	/*----------------------------------------------------------- AUDIO ----------------------------------------------------------*/



	AudioChannel: {
		element: null,
		init: function(label){
			this.element = document.createElement('audio');
			this.element.src = "sounds/" + label + ".ogg";
		},
	},



	/*----------------------------------------------------------- VIDEO ----------------------------------------------------------*/



	VideoChannel: {
		element: null,
		stage: null,
		textElement: null,
		init: function(stage, label){
			this.stage = stage;
			this.element = document.createElement('video');
			this.element.src = "videos/" + label + ".mp4";
			this.element.className = 'introvideo';
			this.element.autoplay = false;
			this.element.controls = false;

			this.textElement = document.createElement('textarea');
			this.textElement.className = 'timer';
			this.textElement.rows = 1;
			this.textElement.value = 'Tap to start!';
			this.stage.appendChild(this.textElement);
		},
		placeVideo: function() {
			this.stage.appendChild(this.element);
		},
		removeVideo: function(e) {
			this.stage.removeChild(this.element);
		},
		placeMessage: function() {
			this.stage.appendChild(this.textElement);
		},
		removeMessage: function() {
			this.stage.removeChild(this.textElement);
		}
	},



	/*----------------------------------------------------------- PACMAN -----------------------------------------------------------*/
	

	
	Pacman: {
		element: null,
		init: function(stage){
			this.element = document.createElement('canvas');
			this.element.style.position = 'absolute';
			this.element.width = 40;
			this.element.height = 40;
			stage.appendChild(this.element);
		},
		setPosition: function(elementXPos, elementYPos) {
			this.element.style.left = elementXPos + 'px';
			this.element.style.top = elementYPos + 'px';
		},
	},



	/*----------------------------------------------------------- INFOBOX ----------------------------------------------------------*/



	InfoBox: {
		element: null,
		init: function(stage) {
			this.element = document.createElement('textarea');
			this.element.style.position = 'relative';
			this.element.className = 'infobox';
			this.element.rows = 4;
			this.element.value = 'Waiting for signal...';
			stage.appendChild(this.element);
		},
		update: function(information) {
			this.element.value = information;
		},
	},



	/*----------------------------------------------------------- GHOST ----------------------------------------------------------*/


	
	Ghost: {
		element: null,
		stage: null,
		init: function(stage, image, speed, top) {
			this.stage = stage;
			this.element = document.createElement('img');
			this.element.src = 'images/' + image + '.png';
			this.element.className = 'ghost';
			this.element.style.top = top;
			this.element.style.WebkitAnimation = 'backandforth ' + speed + ' linear infinite';
			this.element.style.animation = 'backandforth ' + speed + ' linear infinite';
			this.element.style.display = 'none';
			stage.appendChild(this.element);
		},
		elementVisibility: function(bool) {
			if (bool === true) {
				this.element.style.display = 'inline';
			} else {
				this.element.style.display = 'none';
			}
		},
		disappear: function() {
			this.stage.removeChild(this.element);
		},
		appear: function() {
			this.stage.appendChild(this.element);
		},
	},



	/*----------------------------------------------------------- TIMER ----------------------------------------------------------*/



	Timer: {
		element: null,
		stage: null,
		init: function(stage) {
			this.stage = stage;
			this.element = document.createElement('textarea');
			this.element.className = 'timer';
			this.element.rows = 1;
			this.element.value = 'Get Ready!';
			stage.appendChild(this.element);
		},
		update: function(time) {
			this.element.value = time;
		},
	},



	/*----------------------------------------------------------- HIGHSCORE ----------------------------------------------------------*/



	Highscore: {
		element: null,
		stage: null,
		init: function(stage) {
			this.stage = stage;
			this.element = document.createElement('textarea');
			this.element.className = 'highscore';
			this.element.rows = 1;
			this.element.value = 'Highscore';
			this.element.contentEditable = false;
		},
		placeOnStage: function(value, rows) {
			this.element.value = value;
			this.element.rows = rows;
			this.stage.appendChild(this.element);
		},
	},

};