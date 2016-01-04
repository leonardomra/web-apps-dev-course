/************************** responsible for updating the screen - NO DATA PROCESSING  **************************/
var View = {



	/*----------------------------------------------------------- AUDIO ----------------------------------------------------------*/



	AudioChannel: {
		element: null,
		init: function(label) {
			this.element = document.createElement('audio');
			this.element.src = "sounds/" + label + ".mp3";
		},
		loadFile: function(label) {
			var file = "sounds/" + label + ".mp3";
			this.element.src = file;
		},
	},



	/*----------------------------------------------------------- PLAYER ----------------------------------------------------------*/


	
	Player: {
		elementContainer: null,
		elementDisplay: null,
		elementButtonPlay: null,
		elementButtonStop: null,
		elementButtonPause: null,
		elementButtonJumpNext: null,
		elementButtonJumpPrevious: null,
		init: function(stage) {
			this.elementContainer = document.createElement('div');
			this.elementContainer.className = 'playerContainer';
			stage.appendChild(this.elementContainer);

			this.elementDisplay = document.createElement('textarea');
			this.elementDisplay.className = 'display';
			this.elementDisplay.rows = 2;
			this.elementDisplay.value = 'Waiting for signal...';
			this.elementContainer.appendChild(this.elementDisplay);

			this.elementButtonPlay = document.createElement('button');
			this.elementButtonPlay.className = 'buttonPlay';
			this.elementButtonPlay.appendChild(document.createTextNode("Play"));
			this.elementContainer.appendChild(this.elementButtonPlay);
			
			this.elementButtonStop = document.createElement('button');
			this.elementButtonStop.className = 'buttonStop';
			this.elementButtonStop.appendChild(document.createTextNode("Stop"));
			this.elementContainer.appendChild(this.elementButtonStop);
			
			this.elementButtonPause = document.createElement('button');
			this.elementButtonPause.className = 'buttonPause';
			this.elementButtonPause.appendChild(document.createTextNode("Pause"));
			this.elementContainer.appendChild(this.elementButtonPause);
			
			this.elementButtonJumpNext = document.createElement('button');
			this.elementButtonJumpNext.className = 'buttonJNext';
			this.elementButtonJumpNext.appendChild(document.createTextNode("Next Song"));
			this.elementContainer.appendChild(this.elementButtonJumpNext);
			
			this.elementButtonJumpPrevious = document.createElement('button');
			this.elementButtonJumpPrevious.className = 'buttonJPrevious';
			this.elementButtonJumpPrevious.appendChild(document.createTextNode("Previos Song"));
			this.elementContainer.appendChild(this.elementButtonJumpPrevious);
		},
		update: function(information) {
			this.elementDisplay.value = information;
		},
	},
};