

// usage: ContourAnimation.moveToSection(7)

var ContourAnimation =  {

  mask: $('#contourMask rect'),
  maskWidth: 0,
  widthSections: [0, 100, 80, 200, 500, 150, 90, 60, 175],
  poi: [0, 100, 80, 200, 500, 150, 90, 60, 175],
  currentSection: 0,

  moveToSection: function(sectionIndex){
    var currentMaskWidth =  this.mask.attr('width'), // bug fix. Velocity doesn't calculate current State
        nw = this.widthSections[sectionIndex];
    this.mask.velocity('stop').velocity({width:[nw, currentMaskWidth], x : sectionIndex*100 },{duration: 3000});

  }


};
