(function() {
  var points = [{ id: 0 }];
  var links = [];

  var c = $('#canvas')[0];
  var context = c.getContext('2d');

  var draw = function() {
    for(var i=0;i<pointLayout.points.length;i++) {
      $('.point' + i).css({
        left: pointLayout.points[i].x,
        top:  pointLayout.points[i].y
      });
    }

    context.clearRect(0, 0, 2000, 2000);
    for(var i=0;i<pointLayout.links.length;i++) {
      var link = pointLayout.links[i];
      context.beginPath();
      context.moveTo(pointLayout.points[link.startId].x + 15, pointLayout.points[link.startId].y + 15);
      context.lineTo(pointLayout.points[link.endId].x + 15, pointLayout.points[link.endId].y + 15);
      context.stroke();
    }
  };

  var demo = $('#points');
  for(var i=0;i<points.length;i++) {
    demo.append($('<div class="point point'+ i +'" data-id="'+ i +'" />'));
  }

  var pointLayout = new PointLayout(points, links, {
    distance: 250
  });
  draw();

  var startNode = null;
  var nextNode = 1;

  $(document).on('click', '.point', function(e) {
    if(startNode == null) {
      startNode = $(e.currentTarget).data('id');
    }
    else {
      var endNode = $(e.currentTarget).data('id');
      if(endNode == startNode) {
        pointLayout.points.push({
          id: nextNode
        });
        demo.append($('<div class="point point'+ nextNode +'" data-id="'+ nextNode +'" />'));
        pointLayout.links.push({
          startId: startNode,
          endId: nextNode
        });
        nextNode++;
      }
      else {
        pointLayout.links.push({
          startId: startNode,
          endId: endNode
        });
      }
      startNode = null;
      pointLayout.render();
      draw();
    }
  });
})();
