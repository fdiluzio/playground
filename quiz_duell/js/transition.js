Transition = {

  screens: $('#game>section'),
  currentScreen: null,

  gotoScreen: function(screenIndex, callback) {

      Game.ready = false;

    // close current screen
    if (this.currentScreen !== null) {

      this.screens.eq(this.currentScreen).velocity({
        properties: {
          scale: [1.3, "easeInSine", 1.0],
          opacity: [0, "easeInSine", 1],
        },
        options: {
          display: 'none',
          duration: 500,
          complete: function() {
            if ( $.isFunction(callback)){
              callback();
            }
          }
        }
      });

    }

    this.currentScreen = screenIndex;

    // open screen
    this.screens.eq(screenIndex).velocity({
      properties: {
        scale: [1, "easeInSine", 1.3],
        opacity: [1, "easeInSine", 0],
      },
      options: {
        display: 'block',
        duration: 500,
        complete: function(){
            Game.ready = true;
        }
      }
    });



  },
  cardFlipY: function() {
    $('.pt-page-1')
      .velocity("transition.flipXOut")
      .velocity("transition.flipXIn");
  }

};
