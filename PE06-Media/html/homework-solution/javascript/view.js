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
		elementButtonVolUp: null,
		elementButtonVolDown: null,
		init: function(stage) {
			this.elementContainer = document.createElement('div');
			this.elementContainer.className = 'playerContainer';
			stage.appendChild(this.elementContainer);

			this.elementDisplay = document.createElement('textarea');
			this.elementDisplay.className = 'display';
			this.elementDisplay.rows = 2;
			this.elementDisplay.value = 'Waiting for signal...';
			this.elementContainer.appendChild(this.elementDisplay);

			this.elementProgressBar = document.createElement('div');
			this.elementProgressBar.className = 'progressBar';
			this.elementProgressBar.style.width = '0%';
			this.elementContainer.appendChild(this.elementProgressBar);

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
			this.elementButtonJumpPrevious.appendChild(document.createTextNode("Previous Song"));
			this.elementContainer.appendChild(this.elementButtonJumpPrevious);

			this.elementButtonVolUp = document.createElement('button');
			this.elementButtonVolUp.className = 'volumeUp';
			this.elementButtonVolUp.appendChild(document.createTextNode("Volume Up"));
			this.elementContainer.appendChild(this.elementButtonVolUp);
			
			this.elementButtonVolDown = document.createElement('button');
			this.elementButtonVolDown.className = 'volumeDown';
			this.elementButtonVolDown.appendChild(document.createTextNode("Volume Down"));
			this.elementContainer.appendChild(this.elementButtonVolDown);
		},
		update: function(information) {
			this.elementDisplay.value = information;
		},
		advanceProgressBar: function(value) {
			this.elementProgressBar.style.width = value + '%';
		},
	},
};