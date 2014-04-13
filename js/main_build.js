(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* export something */
module.exports = new Kutility;

/* constructor does nothing at this point */
function Kutility() {

}

/**
 * get a random object from the array arr
 *
 * @api public
 */

Kutility.prototype.choice = function(arr) {
    var i = Math.floor(Math.random() * arr.length);
    return arr[i];
}

/**
 * return shuffled version of an array.
 *
 * adapted from css tricks
 *
 * @api public
 */
Kutility.prototype.shuffle = function(arr) {
  var newArray = new Array(arr.length);
  for (var i = 0; i < arr.length; i++)
    newArray[i] = arr[i];

  newArray.sort(function() { return 0.5 - Math.random() });
  return newArray;
}

/**
 * returns a random color as an 'rgb(x, y, z)' string
 *
 * @api public
 */
Kutility.prototype.randColor = function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

Kutility.prototype.randInt = function(max, min) {
  if (min)
    return Math.floor(Math.random() * (max - min)) + min;
  else
    return Math.floor(Math.random() * (max));
}

/**
 * Color wheel 1 -> 1536.
 *
 * Written by Henry Van Dusen, all attribution to the big boy.
 * Slightly modified by Kev.
 *
 * @api public
 */
 Kutility.prototype.colorWheel = function(num) {
    var text = "rgb(";
    var entry = num % 1536;
    var num = entry % 256;

    if(entry < 256 * 1)
    	return text + "0,255," + num + ")";
    else if(entry < 256 * 2)
    	return text + "0," + (255 - num) + ",255)";
    else if(entry < 256 * 3)
      return text + num + ",0,255)";
    else if(entry < 256 * 4)
      return text + "255,0," + (255 - num) + ")";
    else if(entry < 256 * 5)
      return text + "255," + num + ",0)";
    else
      return text + (255 - num) + ",255,0)";
 }

 /**
  * Make an rbg() color string an rgba() color string
  *
  * @api public
  */
Kutility.prototype.alphize = function(color, alpha) {
  color.replace('rgb', 'rgba');
  color.replace(')', ', ' + alpha + ')');
  return color;
}

/**
 * Get an array of two random contrasting colors.
 *
 * @api public
 */
Kutility.prototype.contrasters = function() {
  var num = Math.floor(Math.random() * 1536);
  var fg = this.colorWheel(num);
  var bg = this.colorWheel(num + 650);
  return [fg, bg];
}

/**
 * Add a random shadow to a jquery element
 *
 * @api public
 */
Kutility.prototype.addShadow = function(el, size) {
  var s = size + 'px';
  var shadow = '0px 0px ' + s + ' ' + s + ' ' + this.randColor();
  el.css('-webkit-box-shadow', shadow);
  el.css('-moz-box-shadow', shadow);
  el.css('box-shadow', shadow);
}

/**
 * Add transform to element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.addTransform = function(el, transform) {
  var curTransform = this.getTransform(el);
  curTransform = curTransform.replace('none', '');
  var newTransform = curTransform + transform;
  this.setTransform(el, newTransform);
}

/**
 * Set transform of element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.setTransform = function(el, transform) {
  el.css('-webkit-transform', transform);
  el.css('-moz-transform', transform);
  el.css('-ms-transform', transform);
  el.css('-o-transform', transform);
  el.css('transform', transform);
}

/**
 * Check an elements tansform.
 *
 * @api public
 */
Kutility.prototype.getTransform = function(el) {
  var possible = ['transform', '-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform'];

  for (var i = 0; i < possible.length; i++) {
    var f = el.css(possible[i]);
    if (f == 'none' && i + 1 < possible.length) {
      var pf = el.css(possible[i + 1]);
      if (pf)
        continue;
    }
    return f;
  }
}

/**
 * Remove all transforms from element.
 *
 * @api public
 */
Kutility.prototype.clearTransforms = function(el) {
  el.css('-webkit-transform', '');
  el.css('-moz-transform', '');
  el.css('-ms-transform', '');
  el.css('-o-transform', '');
  el.css('transform', '');
}

/**
 * Rotate an element by x degrees.
 *
 * @api public
 */
Kutility.prototype.rotate = function(el, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var t = ' rotate(' + x + 'deg)';
  this.setTransform(el, ct  + t);
}

/**
 * Scale an element by x (no units);
 *
 * @api public
 */
Kutility.prototype.scale = function(el, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var t = ' scale(' + x + ',' + x + ')';
  this.setTransform(el, ct + t);
}

/**
 * Translate an element by x, y (include your own units);
 *
 * @api public
 */
Kutility.prototype.translate = function(el, x, y) {
  var ct = this.getTransform(el);
  console.log(ct);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var t = ' translate(' + x + ', '  + y + ')';
  this.setTransform(el, ct + t);
}

/**
 * Skew an element by x, y degrees;
 *
 * @api public
 */
Kutility.prototype.skew = function(el, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/skew\(.*?\)/, '').replace(/matrix\(.*?\)/, '').replace('none', '');

  var xd = x + 'deg';
  var yd = y + 'deg';
  var t = ' skew(' + xd + ', ' + yd + ')';
  this.setTransform(el, ct + t);
}

/**
 * Warp an element by rotating and skewing it.
 *
 * @api public
 */
Kutility.prototype.warp = function(el, d, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var r = ' rotate(' + d + 'deg)';
  var xd = x + 'deg';
  var yd = y + 'deg';
  var s = ' skew(' + xd + ', ' + yd + ')';

  this.setTransform(el, ct + r + s);
}

/**
 * scale by w, translate x y
 *
 * @api public
 */
Kutility.prototype.slaw = function(el, w, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var s = ' scale(' + w + ',' + w + ')';
  var t = ' translate(' + x + ', '  + y + ')';
  this.setTransform(el, ct + s + t);
}

/**
 * scale by w, rotate by x
 *
 * @api public
 */
Kutility.prototype.straw = function(el, w, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var s = ' scale(' + w + ',' + w + ')';
  var r = ' rotate(' + x + 'deg)';
  this.setTransform(el, ct + s + r);
}

/**
 * Add filter to element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.addFilter = function(el, filter) {
  var curFilter = this.getFilter(el);
  curFilter = curFilter.replace('none', '');
  var newFilter = curFilter + ' ' + filter;
  this.setFilter(el, newFilter);
}

/**
 * Set filter to element with all lame prefixes.
 *
 * @api public
 */
Kutility.prototype.setFilter = function(el, filter) {
  el.css('-webkit-filter', filter);
  el.css('-moz-filter', filter);
  el.css('-ms-filter', filter);
  el.css('-o-filter', filter);
  el.css('filter', filter);
}

/**
 * Check an elements filter.
 *
 * @api public
 */
Kutility.prototype.getFilter = function(el) {
  var possible = ['filter', '-webkit-filter', '-moz-filter', '-ms-filter', '-o-filter'];

  for (var i = 0; i < possible.length; i++) {
    var f = el.css(possible[i]);
    if (f == 'none' && i + 1 < possible.length) {
      var pf = el.css(possible[i + 1]);
      if (pf)
        continue;
    }
    return f;
  }
}

/**
 * Remove all filters from element.
 *
 * @api public
 */
Kutility.prototype.clearFilters = function(el) {
  el.css('-webkit-filter', '');
  el.css('-moz-filter', '');
  el.css('-ms-filter', '');
  el.css('-o-filter', '');
  el.css('filter', '');
}

/**

/**
 * Grayscale an element by x percent.
 *
 * @api public
 */
Kutility.prototype.grayscale = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/grayscale\(.*?\)/, '').replace('none', '');

  var f = ' grayscale(' + x + '%)';
  this.setFilter(el, cf  + f);
}

/**
 * Sepia an element by x percent.
 *
 * @api public
 */
Kutility.prototype.sepia = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/sepia\(.*?\)/, '').replace('none', '');

  var f = ' sepia(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Saturate an element by x percent.
 *
 * @api public
 */
Kutility.prototype.saturate = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/saturate\(.*?\)/, '').replace('none', '');

  var f = ' saturate(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Invert an element by x percent.
 *
 * @api public
 */
Kutility.prototype.invert = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/invert\(.*?\)/, '').replace('none', '');

  var f = ' invert(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Hue-rotate an element by x degrees.
 *
 * @api public
 */
Kutility.prototype.hutate = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/hue-rotate\(.*?\)/, '').replace('none', '');

  var f = ' hue-rotate(' + x + 'deg)';
  this.setFilter(el, cf + f);
}

/**
 * Set opacity of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.opace = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/opacity\(.*?\)/, '').replace('none', '');

  var f = ' opacity(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Set brightness of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.brightness = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/brightness\(.*?\)/, '').replace('none', '');

  var f = ' brightness(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Set contrast of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.contrast = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/contrast\(.*?\)/, '').replace('none', '');

  var f = ' contrast(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Blur an element by x pixels.
 *
 * @api public
 */
Kutility.prototype.blur = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/blur\(.*?\)/, '').replace('none', '');

  var f = ' blur(' + x + 'px)';
  this.setFilter(el, cf + f);
}

},{}],2:[function(require,module,exports){
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
    "WHEN I WAS IN AFRICA A SAFARI GUIDE TOLD US WHEN A GAZELLE IS PREGANT A LION STALKS AND KILLS IT AND IT'S CHILD",
    "CLOSE TO THE PROMOT-<br>ION",
    "REACH A NEW LEVEL IN YOUR DESTINY",
    "YOU'RE ABOUT TO GIVE BIRTH",
    "THE OPPOSITE OF PLAY ISN'T WORK ITS DEPRESS-<br>ION",
    "THAT'S WHAT THIS ONE LADY DID",
    "WHAT'S HE SAYING",
    "MEDICAL SCIENCE TELLS US THAT PEOPLE THAT LAUGH IT BOOSTS THEIR IMMUNE SYSTEM",
    "IT'S HEALTHY TO HAVE FUN",
    "SHE CAN SLEEP LIKE A BABY",
    "LAUGHTER ACTIVATES THE BODY'S NATURAL TRANQUIL-<br>IZERS THAT GOD PUT ON THE INSIDE",
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

  var names = ['cena', 'wwe', 'satan', 'depression'];
  var nameMap = {cena: cena, wwe: wwe, satan: satan, depression: depression};
  var $nameMap = {cena: $cena, wwe: $wwe, satan: $satan, depression: $depression};

  var AUDIO_LENGTH = 100000;
  var SCALE_TIME = 13666;
  var WORD_TIME = 18666;
  var FLICKER_TIME = 30000;
  var COLOR_TIME = 52000;

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
          setTimeout(showSentence, kt.randInt(15000, 6000));
      });
    }

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
          var con = 100;
          bloat();

          function bloat() {
            kt.saturate($v, con++);
            kt.contrast($v, con);
            if (con < 200)
              setTimeout(bloat, kt.randInt(80));
            else
              doneBloat();
          }

          function doneBloat() {
            bloated[n] = true;
            bloatCount++;
            if (bloatCount == vids.length) {
              callback();
            } else {
              sat();
            }
          }

        } else {
          sat();
        }
      }
    }

    function morphStyle() {
      var $v = kt.choice($vids);
      kt.hutate($v, kt.randInt(360));
      setTimeout(morphStyle, kt.randInt(1000, 200));
    }

    saturStyle(function() { // pump contrast for them one at a time
      setTimeout(morphStyle, 5000); // then start morphing in a bit
    });
  }

});

},{"./lib/kutility":1}]},{},[2])