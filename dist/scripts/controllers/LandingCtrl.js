(function() {
  function LandingCtrl() {
    this.herotitle = "Turn the Music Up!";
  }

  angular
    .module('blocJams')
    .controller('LandingCtrl', LandingCtrl);
})();