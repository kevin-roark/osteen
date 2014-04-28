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
    "WHEN A GAZELLE IS PREGANT A LION STALKS AND KILLS IT AND IT'S CHILD",
    "CLOSE TO THE PROMOTION",
    "REACH A NEW LEVEL IN YOUR DESTINY",
    "YOU'RE ABOUT TO GIVE BIRTH",
    "THE OPPOSITE OF PLAY ISN'T WORK ITS DEPRESSION",
    "THAT'S WHAT THIS ONE LADY DID",
    "WHAT'S HE SAYING",
    "MEDICAL SCIENCE TELLS US THAT PEOPLE THAT LAUGH IT BOOSTS THEIR IMMUNE SYSTEM",
    "IT'S HEALTHY TO HAVE FUN",
    "SHE CAN SLEEP LIKE A BABY",
    "LAUGHTER ACTIVATES THE BODY'S NATURAL TRANQUILIZERS THAT GOD PUT ON THE INSIDE",
    "INSOMNIA",
    "SOMETHING FUNNY TO WATCH",
    "IT'S JUST FROM TENSION",
    "MY MOTHER WAS DIAGNOSED WITH TERMINAL CANCER IN 1981"
  ];

  wordset = kt.shuffle(wordset); // random ordering of phrases

  var numMedia = vids.length; // number of things to load
  var mediasReady = 0;

  var active = {
    satan: true,
    depression: true,
    cena: true,
    wwe: true,
    melt: false,
    font: false,
    shake: false,
    color: false,
    flicker: false,
    scale: false,
    words: false
  };

  var names = ['cena', 'wwe', 'satan', 'depression'];
  var nameMap = {cena: cena, wwe: wwe, satan: satan, depression: depression};
  var $nameMap = {cena: $cena, wwe: $wwe, satan: $satan, depression: $depression};

  var AUDIO_LENGTH = 158000;
  var SCALE_TIME = 6666;
  var WORD_TIME = 10666;
  var FLICKER_TIME = 15000;
  var COLOR_TIME = 22000;
  var SHAKE_TIME = 26000;
  var FONT_TIME = 38000;
  var MELT_TIME = 75000;

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
    setTimeout(colorMorph, COLOR_TIME);
    setTimeout(shakeText, SHAKE_TIME);
    setTimeout(fontMorph, FONT_TIME);
    setTimeout(vidMelt, MELT_TIME);
    setTimeout(endgame, AUDIO_LENGTH);

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

      for (var key in active)
        active[key] = false;

      wordset = kt.shuffle(wordset); // random ordering of phrases

      start();
    }

    function showFooter() {
      $('.footer').animate({
        opacity: 1.0
      }, 600);

      $('.footer').unbind('mouseenter');
      $('.footer').unbind('mouseleave');
    }

    for (var i = 0; i < vids.length; i++) {
      $vids[i].animate({opacity: 0.2});
      vids[i].pause();
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
    var i = 0;
    start();

    function turnOn(i) {
      $vids[i].animate({opacity: 1.0}, function() {
        vids[i].play();
        vids[i].loop = true;
      });
    }

    function start() {
      turnOn(i);
      setTimeout(function() {
        if (++i < vids.length) {
          start();
        }
      }, kt.randInt(1000, 200));
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
        if (active.scale)
          scale();
      }, kt.randInt(300, 50));
    }

    scale();
    active.scale = true;
  }

  function flashText(words, color, callback) {
    var i = 0;
    var tz = $('.text-zone');
    tz.css('color', color);

    function flash() {
      tz.html(words[i]);
      if (++i < words.length)
        setTimeout(flash, kt.randInt(450, 180));
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
        if (active.flicker)
          setTimeout(flicker, kt.randInt(400, 100));
      }, kt.randInt(200, 50));
    }

    flicker();
    active.flicker = true;
  }

  function wordFlashing() {
    var idx = 0;

    function showSentence() {
      var words = wordset[idx].split(" ");
      var color = kt.colorWheel(kt.randInt(1536));
      flashText(words, color, function() {
        if (++idx >= wordset.length)
          idx = 0;
        // done flashing
        if (active.words)
          setTimeout(showSentence, kt.randInt(15000, 6000));
      });
    }

    active.words = true;
    showSentence();
  }

  function colorMorph() {

    function saturStyle(callback) {
      var bloated = {};
      var bloatCount = 0;
      sat();

      function sat() {
        var n = kt.choice(names);
        if (!bloated[n]) {
          var $v = $nameMap[n];
          bloat();
          doneBloat();

          function bloat() {
            kt.saturate($v, 200);
            kt.contrast($v, 200);
          }

          function doneBloat() {
            bloated[n] = true;
            bloatCount++;
            if (bloatCount == vids.length) {
              callback();
            } else {
              setTimeout(sat, 2500);
            }
          }

        } else {
          sat(); // pick another
        }
      }
    }

    function morphStyle() {
      var $v = kt.choice($vids);
      kt.hutate($v, kt.randInt(360));
      if (active.color)
        setTimeout(morphStyle, kt.randInt(1000, 200));
    }

    saturStyle(function() { // pump contrast for them one at a time
      setTimeout(morphStyle, 5000); // then start morphing in a bit
    });
    active.color = true;
  }

  function shakeText() {
    var text = $('.text-zone');
    active.shake = true;
    rset();
    shake();

    function shake() {
      var ld = Math.floor(Math.random() * 10);
      if (Math.random() < 0.5)
        ld = - ld;

      var td = Math.floor(Math.random() * 10);
      if (Math.random() < 0.5)
        td = -td;

      var left = parseInt(text.css('left'));
      var top = parseInt(text.css('top'));

      var nl = (left + ld)  + 'px';
      var nt = (top + td) + 'px';

      text.css('left', nl);
      text.css('top', nt);

      if (active.shake)
        setTimeout(shake, kt.randInt(50, 20));
    }

    function rset() {
      text.css('left', '20px');
      text.css('top', '30%');
      setTimeout(rset, 12000);
    }
  }

  function fontMorph() {
    var text = $('.text-zone');
    var fonts = [
        'serif'
      , 'sans-serif'
      , 'Helvetica, Arial, sans-serif'
      , 'Impact, Charcoal, sans-serif'
      , '"Lucida Sans Unicode", "Lucida Grande", sans-serif'
      , '"Palatino Linotype", "Book Antiqua", Palatino, serif'
      , 'Georgia, serif'
      , '"Lucida Console", Monaco, monospace'
      , '"Courier New", Courier, monospace'
      , 'monospace'
      , 'cursive'
      , '"Comic Sans MS", "Comic Sans", fantasy'
    ];
    active.font = true;
    font();

    function font() {
      var f = kt.choice(fonts);
      var s = kt.randInt(280, 24);
      text.css('font-family', f);
      text.css('font-size', s + 'px');

      if (active.font)
        setTimeout(font, kt.randInt(200, 50));
    }
  }

  function vidMelt() {
    var degs = [];
    active.scale = false;
    active.melt = true;

    var counts = [];

    function melt(i) {
      var vid = $vids[i];
      var deg = degs[i];
      counts[i] = counts[i] + 1;

      deg += kt.randInt(7) - 2;

      var y = Math.random() * 0.7 + 0.3;
      var z = Math.sqrt(1 - y * y);
      var s = Math.random() * 0.9 + 1;

      kt.straw3d(vid, 0, y, z, deg, s);
      kt.randomShadow(vid, kt.randInt(20, 5));

      degs[i] = deg;

      if (active.melt) {
        if (counts[i] % 100 != 0) {
          setTimeout(function() {
            melt(i);
          }, kt.randInt(50, 20));
        } else {
          setTimeout(function() {
            melt(i);
          }, kt.randInt(5000, 2000));
        }
      }

    }

    function startMelt(i) {
      setTimeout(function() {
        melt(i);
      }, kt.randInt(10000, 2000));
    }

    for (var i = 0; i < $vids.length; i++) {
      degs.push(0);
      counts.push(0);
      startMelt(i);
    }

  }

});
