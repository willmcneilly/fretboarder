/* fretboarder main */

// Base function.
var fretboarder = function(chordNotation, options) {
  // Add functionality here.
  var defaultOptions = {
    width: 50,
  };

  var mergedOptions = null;

  var _chordNotation = chordNotation;
  var _notationArray = null;

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

  var _renderDiagram = function() {
    _notationArray = _splitChordNotation();
    _validateChord();
    console.log(_notationArray);
  };


  _init();

  return {
    chordNotation: _chordNotation,
    options: options

  };
};


// Version.
fretboarder.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
root.fretboarder = fretboarder;
