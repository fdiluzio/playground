$(function() {

  //start screen
  Transition.gotoScreen(0);


  // fullscreen
  if (screenfull.enabled) {
    $(document).on(screenfull.raw.fullscreenchange, function() {
      if (screenfull.isFullscreen) {
        $('#fullscreen-btn').hide();
      } else {
        $('#fullscreen-btn').show();
      }
    });
  }


  var pieSections = document.getElementsByClassName('pie-cat'),
    pieLabels = document.getElementsByClassName('pie-cat-label'),
    i;

  for (i = 0; i < pieSections.length; i++) {
    pieSections[i].category = i;
    pieSections[i].addEventListener('click', chooseCategory);

    pieLabels[i].category = i;
    pieLabels[i].addEventListener('click', chooseCategory);

  }

  function chooseCategory() {
    //Transition.gotoScreen(categories[this.category]);
    Game.setCategory(this.category);
  }


});
