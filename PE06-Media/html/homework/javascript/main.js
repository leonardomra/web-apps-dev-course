/********************************************** Big Bang **********************************************/
(function() {
	var tracks = [
			{
				'file': 'song01',
				'title': 'unknown title 01',
				'artist': 'unknown artist 01',
			},
			{
				'file': 'song02',
				'title': 'unknown title 02',
				'artist': 'unknown artist 02',
			},
			{
				'file': 'song03',
				'title': 'unknown title 03',
				'artist': 'unknown artist 03',
			},
			{
				'file': 'song04',
				'title': 'unknown title 04',
				'artist': 'unknown artist 04',
			},
			{
				'file': 'song05',
				'title': 'unknown title 05',
				'artist': 'unknown artist 06',
			},
			{
				'file': 'song06',
				'title': 'unknown title 06',
				'artist': 'unknown artist 06',
			},
		];
	var myStage = document.getElementById('main-stage');
	var myPlayer = Object.create(Controller.Player);
	myPlayer.init(myStage, tracks);
})();


/********************************************************************/
/* HOMEWORK  -  Implement the following functionalities on the      */
/* mp3 player:                                                      */
/* 1: volume up and down                                            */
/* 2: function previousSong within the model                        */
/* 3: progress bar based on the information given by the            */
/* AudioChannel - getProgressPercentageChannel() inside of          */
/* the collectInfoSongAndUpdate() of the Player within the Model    */
/* 4: Insert the Player on your Dashboard                           */
/********************************************************************/
