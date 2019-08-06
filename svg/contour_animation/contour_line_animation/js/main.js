(function($, window, undefined) {



  ContourAnimation = {

    paths: [],
    pathListCache: [],
    duration: 1000,

    animatePaths: function(pathList) {

      var pathLength, thisPath;

      // stop animation and erase line
      ContourAnimation.pathListCache.map(function(thisItem) {
        thisItem.velocity('stop');
        thisItem[0].style.strokeOpacity = 0;
      });

      // reset lists
      ContourAnimation.paths = [];
      ContourAnimation.pathListCache = [];

      if ($.isArray(pathList)) {
        jQueryPathList = [];
        $.each(pathList, function(index, item) {
          thisPath = $('#' + item);
          if (thisPath.length) {
            ContourAnimation.paths.push(thisPath);
            ContourAnimation.pathListCache.push(thisPath);
          }
        });
        ContourAnimation.duration = ContourAnimation.paths.length * 100;
        ContourAnimation.animateLineSequential();
      }

    },

    getPath: function() {
      if (ContourAnimation.paths.length) {
        return ContourAnimation.paths.shift();
      } else {
        return null;
      }
    },

    animateLineSequential: function() {

      var thisPath = ContourAnimation.getPath(),
        pathLength, pathId, dashOffset;

      if (thisPath) {

        pathLength = thisPath[0].getTotalLength();
        thisPath.attr('stroke-dasharray', pathLength + ' ' + pathLength);

        pathId = thisPath.attr('id');
        if (pathId === 'path-12') {
          dashOffset = [0, pathLength];
        } else {
          dashOffset = [0, -pathLength];
        }

        thisPath.velocity({
          'stroke-dashoffset': dashOffset,
          'strokeOpacity': [1, 0]
        }, {
          duration: ContourAnimation.duration,
          easing: "linear",
          complete: function() {
            ContourAnimation.animateLineSequential();
          }

        });

      }

    },

    animateLine: function() {
      var pathLength;
      $.each(ContourAnimation.paths, function(index, thisPath) {

        if (thisPath.length) {
          pathLength = thisPath[0].getTotalLength();
          thisPath.velocity({
            'stroke-dashoffset': [0, -pathLength]
          }, {
            duration: ContourAnimation.duration
          });
        }
      });

    }

  };

  $('[data-poi]').on('mouseenter', function(e) {


    var me, destination, i,
      pathList = [],
      activated;

    me = $(this);
    activated = me.prop('activated');


    if (me.prop('timeout')) {
      window.clearTimeout(me.prop('timeout'));
    }

    if (activated === false) {

      $('[data-poi]').prop('activated', false);

      me.prop('activated', true);
      destination = parseInt(me.data('poi'), 10);

      for (i = 1; i <= destination; i += 1) {
        pathList.push('path-' + i);
      }

      ContourAnimation.animatePaths(pathList);

      me.find('text').velocity({
        scale: [5, 1],
        fill: '#FFFFFF'
      }, {
        duration: 300
      }).velocity('reverse');

      //ToolTip.show($(e.currentTarget).offset());
    }



  }).prop('activated', false).on('click', function(e) {
    e.stopImmediatePropagation();
  });


  var ToolTip = {

    poiControl: $('.tooltip'),

    setPos: function(x, y) {
      ToolTip.poiControl.css({
        top: x,
        left: y
      });
    },
    show: function(currentAnchor) {
      ToolTip.poiControl.velocity('fadeIn');
      ToolTip.setPos(currentAnchor.top - 60, currentAnchor.left - 75);
    },

    hide: function() {

      ToolTip.poiControl.velocity('fadeOut', function() {
        $('[data-poi]').prop('activated', false);
      });
    }


  };

  $(document.body).on('click', function() {

    ToolTip.hide();

  });







}(jQuery, window, undefined));
// EOS
