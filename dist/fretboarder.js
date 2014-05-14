(function(root, undefined) {

  "use strict";


/* fretboarder main */

// Base function.
var fretboarder = function(chordString, options) {
  // Add functionality here.
  var defaultOptions = {
    width: 50,
  };

  var mergedOptions = null;

  var _chordString = chordString;

  var _init = function() {

  };

  var _checkOptions = function() {

  };

  var _renderDiagram = function() {

  };


  _init();

  return {
    chordString: _chordString,
    options: options

  };
};


// Version.
fretboarder.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
root.fretboarder = fretboarder;


}(this));
