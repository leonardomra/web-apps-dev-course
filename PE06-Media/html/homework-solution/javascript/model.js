/************************** responsible for fetching, processing, and defining data  **************************/
var Model = {
	


	/*----------------------------------------------------------- AUDIO ----------------------------------------------------------*/



	AudioChannel: {
		view: null,
		init: function(label) {
			this.view = Object.create(View.AudioChannel);
			this.view.init(label);
		},
		handleTimeupdate: function(e) {
			var progress = Math.floor((100 / this.model.view.element.duration) * this.model.view.element.currentTime);
			this.model.progressPercentage = progress;
			this.model.timer = this.model.view.element.currentTime;
		},
	},



	/*----------------------------------------------------------- PLAYER ----------------------------------------------------------*/
	


	Player: {
		view: null,
		audioChannel: null,
		tracks: [],
		trackTracker: 0,
		init: function(stage, tracks) {
			this.view = Object.create(View.Player);
			this.view.init(stage);
			this.tracks = tracks;
			this.audioChannel = Object.create(Controller.AudioChannel);
			this.audioChannel.init(this.tracks[this.trackTracker]['file']);
			this.collectInfoSongAndUpdate();
		},
		playSong: function(e) {
			this.audioChannel.playChannel();
		},
		stopSong: function(e) {
			this.audioChannel.stopChannel();
		},
		pauseSong: function(e) {
			this.audioChannel.pauseChannel();
		},
		nextSong: function(e) {
			this.audioChannel.stopChannel();
			if (this.trackTracker < this.tracks.length - 1) {
				this.trackTracker++;
			} else {
				this.trackTracker = 0;
			}
			this.audioChannel.changeAudioChannel(this.tracks[this.trackTracker]['file']);
			this.audioChannel.playChannel();
			this.collectInfoSongAndUpdate();
		},
		previousSong: function(e) {
			this.audioChannel.stopChannel();
			if (this.trackTracker > 0) {
				this.trackTracker--;
			} else {
				this.trackTracker = this.tracks.length - 1;
			}
			this.audioChannel.changeAudioChannel(this.tracks[this.trackTracker]['file']);
			this.audioChannel.playChannel();
			this.collectInfoSongAndUpdate();
		},
		volUp: function(e) {
			this.audioChannel.volumeChannel(this.audioChannel.model.view.element.volume + 0.1);
		},
		volDown: function(e) {
			this.audioChannel.volumeChannel(this.audioChannel.model.view.element.volume - 0.1);
		},
		collectInfoSongAndUpdate: function() {
			var info = this.tracks[this.trackTracker]['artist'] + "\n"+ this.tracks[this.trackTracker]['title'];
			this.view.update(info);
			setInterval(function() {
				console.log(this.audioChannel.getTimerChannel());
				console.log(this.audioChannel.getProgressPercentageChannel());
				if (this.audioChannel.getProgressPercentageChannel() !== undefined) {
					this.view.advanceProgressBar(this.audioChannel.getProgressPercentageChannel());
				}
			}.bind(this), 1000);
			
		},
	},
};