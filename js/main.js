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
  var $vids = [$satan, $depression, $cena, $wwe];

  var wordset = [
    "THE ENEMY ALWAYS FIGHTS US THE HARDEST WHEN WE ARE CLOSE TO OUR VICTORY",
    "WHEN I WAS IN AFRICA A SAFARI GUY TOLD HOW WHEN A GAZELLE IS PREGANT A LION STALKS AND KILLS IT AND IT'S CHILD",
    "CLOSE TO THE PROMOT<br>ION",
    "REACH A NEW LEVEL IN YOUR DESTINY",
    "YOU'RE ABOUT TO GIVE BIRTH",
    "THE OPPOSITE OF PLAY ISN'T WORK ITS DEPRESS<br>ION",
    "THAT'S WHAT THIS ONE LADY DID",
    "WHAT'S HE SAYING",
    "MEDICAL SCIENCE TELLS US THAT PEOPLE THAT LAUGH IT BOOSTS THEIR IMMUNE SYSTEM",
    "IT'S HEALTHY TO HAVE FUN",
    "SHE CAN SLEEP LIKE A BABY",
    "LAUGHTER ACTIVATES THE BODY'S NATURAL TRANQUIL<br>IZERS THAT GOD PUT ON THE INSIDE",
    "INSOMNIA",
    "SOMETHING FUNNY TO WATCH",
    "IT'S JUST FROM TENSION",
    "MY MOTHER WAS DIAGNOSED WITH TERMINAL CANCER IN 1981"
  ];

  var numMedia = vids.length; // number of things to load
  var mediasReady = 0;

  var active = {
    satan: true,
    depression: true,
    cena: true,
    wwe: true
  };

  var AUDIO_LENGTH = 100000;
  var SCALE_TIME = 13666;
  var WORD_TIME = 18666;
  var FLICKER_TIME = 30000;

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

    startVids();

    setTimeout(hideFooter, 1000);
    setTimeout(startScaling, SCALE_TIME);
    setTimeout(wordFlashing, WORD_TIME);
    setTimeout(blackFlicker, FLICKER_TIME);

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

  function startVids() {
    for(var i = 0; i < vids.length; i++) {
      vids[i].play();
      vids[i].loop = true;
    }
  }

  function startScaling() {
    function scale() {
      var $v = kt.choice($vids);
      var s = Math.round(Math.random() * 1) + 1;
      kt.scale($v, s);
      $v.css('z-index', '1000');

      setTimeout(function() {
        kt.scale($v, 1);
        $v.css('z-index', '1');
        scale();
      }, kt.randInt(300, 50));
    }

    scale();
  }

  function flashText(words, color, callback) {
    var i = 0;
    var tz = $('.text-zone');
    tz.css('color', color);

    function flash() {
      tz.html(words[i]);
      if (++i < words.length)
        setTimeout(flash, kt.randInt(400, 150));
      else
        callback();
    }

    flash();
  }

  function blackFlicker() {

    function hide() {
      for (var i = 0; i < $vids.length; i++)
        $vids[i].hide();
    }

    function reveal() {
      for (var i = 0; i < $vids.length; i++)
        $vids[i].show();
    }

    function flicker() {
      hide();
      setTimeout(function() {
        reveal();
        setTimeout(flicker, kt.randInt(400, 100));
      }, kt.randInt(200, 50));
    }

    flicker();
  }

  function wordFlashing() {
    var idx = 0;

    function showSentence() {
      var words = wordset[idx].split(" ");
      var color = kt.colorWheel(kt.randInt(1536));
      flashText(words, color, function() {
        // done flashing
        if (++idx < wordset.length)
          setTimeout(showSentence, kt.randInt(12000, 5000));
      });
    }

    showSentence();
  }

});
