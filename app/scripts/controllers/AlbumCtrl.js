(function() {
    function AlbumCtrl() {
        this.albumData = getAlbum();
        this.songPlayer = songPlayer;
    }

    angular
        .module("blocJams")
        .controller("AlbumCtrl", AlbumCtrl);
})();