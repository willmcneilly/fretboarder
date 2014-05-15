(function(root, undefined) {

  "use strict";


/* fretboarder main */

// Base function.
var fretboarder = function(chordNotation, options, SVG) {

  var HEIGHT_PERCENTAGE = 25,
      NUM_FRETS = 5;

  var defaultOptions = {
    width: 100,
  };

  var mergedOptions = null,
      _chordNotation = chordNotation,
      _notationArray = null,
      _canvasDOMNode = null,
      _canvas = null,
      _height = null,
      _fretHeight = null,
      _widthBetweenStrings = null,
      _startingFret = null,
      _diagram = {};


  var _init = function() {
    if(!_chordNotation) {
      console.error('no chord string defined');
      return;
    }
    _renderDiagram();
  };

  var _checkOptions = function() {

  };

  var _splitChordNotation = function() {
    return _chordNotation.split(',');
  };

  var _isNormalInteger = function(str) {
    var n = ~~Number(str);
    return String(n) === str && n >= 0;
  };

  var _validateChord = function() {
    if((_notationArray.length < 6 || _notationArray.length > 0) === false) {
      return console.error('Invalid Chord Notation Length');
    }

    _notationArray = _notationArray.map(function(position, index) {
      if(_isNormalInteger(position)) {

        position = ~~Number(position);
        if ((position < 30 || position >= 0) === false ) {
          return console.error('position ' + position + ' is out of range of fretboard');
        }
      }
      else if (position !== 'x') {
        return console.error('postion ' + position + 'is invalid');
      }
      return position;
    });
  };

  var _calculateHeight = function() {
    _height = (HEIGHT_PERCENTAGE/100 * defaultOptions.width) + defaultOptions.width;
  };

  var _drawFretboard = function() {
    _diagram.fretboard = _canvas
      .rect(defaultOptions.width, _height)
      .attr('class', 'fretboarder-fingerboard');
  };

  var _isInOpenPosition = function() {
    if(_startingFret === 1) {
      return true;
    }
  };

  var _calculateFretHeight = function() {
    _fretHeight = _height / NUM_FRETS;
  };

  var _calculateWidthBetweenStrings = function() {
    _widthBetweenStrings = defaultOptions.width / 5;
  };

  var _calculateFretwirePosition = function() {
    // position 4 fretwire
    var fretSpacing = _fretHeight;
    var positionY = fretSpacing;
    for(var i = 0; i < 4; i++) {
      _drawFretwire(positionY);
      positionY += fretSpacing;
    }
  };

  var _calculateStringPosition = function() {
    var stringSpacing = _widthBetweenStrings;
    var positionX = 0;
    for(var i = 0; i < 6; i++) {
      _drawString(positionX);
      positionX += stringSpacing;
    }
  };

  var _findStartingFret = function() {
    // We're looking for the lowest fret number here
    // should be noted that just because the notation contains
    // an open string, doesn't mean we're in open position.
    var openPosition = true;
    var lowestNumberNotZero = null;
    _notationArray.forEach(function(note) {
      if(typeof note === 'number') {
        if(note > 5) {
          openPosition = false;
        }
        if(lowestNumberNotZero === null) {
          lowestNumberNotZero = note;
        }
        if(note < lowestNumberNotZero && note > 0) {
          lowestNumberNotZero = null;
        }
      }
    });

    if(openPosition) {
      _startingFret = 1;
    }
    else {
      _startingFret = lowestNumberNotZero;
    }

  };

  var _calculateFingerPosition = function() {
    _notationArray.forEach(function(note, index){
      var relativeFingerPosition,
          xPosition,
          yPosition;

      if(note === 'x' || note === 0) {

      }
      else {
        console.log(note);
        console.log(_startingFret);
        console.log('--------');
        relativeFingerPosition = note - _startingFret;
        xPosition = index * _widthBetweenStrings;
        yPosition = relativeFingerPosition * _fretHeight;
        _drawFingerPosition(xPosition, yPosition);

      }

    });
  };

  var _drawFingerPosition = function(x,y) {
    _canvas
      .circle(_fretHeight)
      .translate(x - _fretHeight/2, y);
  };

  var _drawString = function(positionX) {
    _canvas
      .line(positionX, 0, positionX, _height)
      .attr('class', 'fretboarder-string');
  };

  var _drawFretwire = function(positionY) {
    _canvas
      .line(0, positionY, defaultOptions.width, positionY)
      .attr('class', 'fretboarder-fretwire');
  };

  var _drawNut = function() {
    if(_isInOpenPosition()) {
      _canvas
        .line(0, 0, defaultOptions.width, 0)
        .attr('class', 'fretboarder-nut');
    }
  };

  var _initiateCanvas = function() {
    _canvasDOMNode = root.document.createElement("div");
    _canvasDOMNode.style.width = defaultOptions.width + "px";
    _canvasDOMNode.style.height = _height + "px";
    _canvas = SVG(_canvasDOMNode);
  };

  var _renderDiagram = function() {
    _notationArray = _splitChordNotation();
    _validateChord();
    _calculateHeight();
    _findStartingFret();
    _initiateCanvas();
    _drawFretboard();
    _calculateWidthBetweenStrings();
    _calculateFretHeight();
    _calculateFretwirePosition();
    _calculateStringPosition();
    _calculateFingerPosition();
    _drawNut();
  };

  var _renderTo = function(DOMNode) {
    DOMNode.appendChild(_canvasDOMNode);
  };



  _init();

  return {
    chordNotation: _chordNotation,
    options: options,
    renderTo: function(DOMNode) {
      _renderTo(DOMNode);
    }

  };
};


// Version.
fretboarder.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
root.fretboarder = fretboarder;


}(this));
