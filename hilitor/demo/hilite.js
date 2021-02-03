function init(options) {



  var options = {
    "element": "em",
    "className": "ifs-highlite",
    "acrossElements": true,
    "separateWordSearch": false,
    "ignoreJoiners": true,
    "accuracy": {
      "value": "exactly",
      "limiters": [",", ".", ";", "-", "—", "<", ">", "\"", "'", "?", ":"]
    },
    "diacritics": true,
    done: function (matches) {
      console.log("Matches: ", matches)
    }
  }



  var marker = new Mark(document.querySelector('body'));
  marker.mark("high", options);
  marker.mark("der alte Gehäuseöffnungstürschließer", options);


  scrollToFilter = function (selector) {
    document.querySelector(selector).scrollIntoView();
  };

  document.querySelector('button').addEventListener('click', function () {scrollToFilter('#scrollTarget')})

};

window.addEventListener('DOMContentLoaded', (event) => {

  // #############################################################################
  // when using headless chrome, we need to inject the CSS
  // #############################################################################

  function addStyle(styles) {
    var css = document.createElement('style');
    css.appendChild(document.createTextNode(styles));
    document.getElementsByTagName("head")[0].appendChild(css);
  }
  var styles = '.ifs-highlite { background-color: yellow }';
  addStyle(styles);

  // #############################################################################
  // start options
  var options = {
    "element": "em",
    "className": "ifs-highlite",
    "acrossElements": true,
    "separateWordSearch": false,
    "ignoreJoiners": true,
    "accuracy": {
      "value": "exactly",
      "limiters": [",", ".", ";", "-", "—", "<", ">", '"', "'", "?", ":", "[", "]", "(", ")", "{", "}", "=", "/", "\\", "&", "%", "§", "_", "%"]
    },
    "diacritics": true,
    done: function (matches) {
      console.log("Matches: ", matches)
    }
  }


 init(options)

});
