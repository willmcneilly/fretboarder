/* fretboarder main */

// Base function.
var fretboarder = function(chordNotation, options, SVG) {

  var HEIGHT_PERCENTAGE = 25;

  var defaultOptions = {
    width: 100,
  };

  var mergedOptions = null,
      _chordNotation = chordNotation,
      _notationArray = null,
      _canvasDOMNode = null,
      _canvas = null,
      _height = null,
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
    _diagram.fretboard = _canvas.rect(defaultOptions.width, _height).attr('class', 'fretboarder-fingerboard');
  };

  var _initiateCanvas = function() {
    _canvasDOMNode = root.document.createElement("div");
    _canvasDOMNode.style.width = defaultOptions.width + "px";
    _canvasDOMNode.style.height = _height + "px";
    _canvas = SVG(_canvasDOMNode);
  };

  var _renderDiagram = function() {
    _notationArray = _splitChordNotation();
    _calculateHeight();
    _validateChord();
    _initiateCanvas();
    _drawFretboard();
    console.log(_notationArray);
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
