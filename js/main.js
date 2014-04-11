$(function() {

  var kt = require('./lib/kutility'); /* you can remove this if you don't want it */

  var satan = document.querySelector('#satan');
  var $satan = $(satan);

  var depression = document.querySelector('#depression');
  var $depression = $(depression);

  var cena = document.querySelector('#cena');
  var $cena = $(cena);

  var wwe = document.querySelector('#wwe');
  var $wwe = $(wwe);

  //var audio = document.querySelector('#audio');
  //var $aud = $(audio);
  
  var vids = [satan, depression, cena, wwe];

  var numMedia = vids.length; // number of things to load
  var mediasReady = 0;

  var active = {
    satan: true,
    depression: true,
    cena: true,
    wwe: true
  };

  var AUDIO_LENGTH = 100000;

  for (var i = 0; i < vids.length; i++)
    vids[i].addEventListener('canplaythrough', mediaReady);

  function mediaReady() {
    mediasReady++;
    if (mediasReady == numMedia) {
      start();
    }
  }

  function start() {

    //audio.play();

    setTimeout(hideFooter, 1000);

    soundControl();

    setInterval(function() {
      $('.debug-timer').html(depression.currentTime);
    }, 200);
  }

  function endgame() {

    function restart() {

      //audio.currentTime = 0;
      for (var i = 0; i < vids.length; i++)
        vids[i].currentTime = 0;

      start();
    }

    function showFooter() {
      $('.footer').animate({
        opacity: 1.0
      }, 600);

      $('.footer').unbind('mouseenter');
      $('.footer').unbind('mouseleave');
    }

    showFooter();
    setTimeout(restart, 5000);
  }

  function hideFooter() {
    $('.footer').animate({
      opacity: 0.0
    }, 800);

    $('.footer').mouseenter(function() {
      $(this).animate({
        opacity: 1.0
      }, 400);
    });

    $('.footer').mouseleave(function() {
      $(this).animate({
        opacity: 0.0
      }, 400);
    });
  }

  function soundControl() {
    for (var i = 0; i < vids.length; i++)
      vids[i].muted = true;
  }

  function speed(vid, rate) {
    vid.playbackRate = rate;
  }

  function removeLater(el) {
    setTimeout(function() {
      el.remove();
    }, kt.randInt(6666, 2666));
  }

});
