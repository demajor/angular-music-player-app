(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};

        /**
        * @desc Album file with attributes
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
                // currentSong.playing = null;
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song; 

            /**
            * @desc Current playback time (in seconds) of currently playing song
            * @type {Number}
            */
            // SongPlayer.currentTime = null;
        };

        /**
        * @function playSong
        * @desc plays current Buzz object and sets playing attribute
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /**
        * @function stopSong
        * @desc stops current Buzz object and sets playing attribute
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };


        /**
        * @function getSongIndex
        * @desc retrieves the index of a song
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };


        /**
        * @desc Song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @desc Current play time of currently selected / playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

        /**
        * @desc Default volume set for initial song loudness
        * @type {Number}
        */
        SongPlayer.volume = 70;



        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                    // playSong(song);
                }
            } 
        };


        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };


        /**
        * @function previous
        * @desc Plays previous song
        * @param {Object} 
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(song);
                SongPlayer.currentSong.playing = song;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };


        /**
        * @function next
        * @desc plays next song
        * @param {Object} 
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > (currentAlbum.songs.length - 1)) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function setCurrentTime
        * @desc Set current time of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /**
        * @function setVolume
        * @desc Set volume for songs
        * @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();