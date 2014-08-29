/**
 * An algorithm for laying out points in a tree-like structure
 * but with the ability to loop back to earlier nodes
 * @author         Johan Halse, Varvet AB
 * @param {array}  points  an array of points with an id
 * @param {array}  links   an array of links between points
 * @param {object} options some settings
 */
var PointLayout = function(points, links, options) {
  this.settings = {
    distance: 50,
    pointIdAttribute: 'id',
    linkStartIdAttribute: 'startId',
    linkEndIdAttribute: 'endId',
    firstPoint: points[0],
    startX: 500,
    startY: 500
  }
  this.settings = $.extend(this.settings, options);
  this.points = points;
  this.links = links;

  this.render();
};

PointLayout.prototype = {
  render: function() {
    for(var i=0;i<this.points.length;i++) {
      this.points[i].hasRendered = false;
    }
    this.settings.firstPoint.x = this.settings.startX;
    this.settings.firstPoint.y = this.settings.startY;
    this.settings.firstPoint.hasRendered = true;
    this.renderChildrenFor(this.settings.firstPoint);
  },

  renderChildrenFor: function(point) {
    var children = this.childrenFor(point);
    var angles = this.defaultAngles(children);
    for(var i=0;i<children.length;i++) {
      // Someone else has positioned this for us already
      if(children[i].hasRendered == true) {
        continue;
      }

      var cX = point.x + this.settings.distance * Math.cos(angles[i]*Math.PI/180);
      var cY = point.y + this.settings.distance * Math.sin(angles[i]*Math.PI/180);
      children[i].y = cY;
      children[i].x = cX;

      children[i].hasRendered = true;
      this.renderChildrenFor(children[i]);
    }
  },

  angleBetween: function(point1, point2) {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x);
  },

  defaultAngles: function(children) {
    return [
      null,
      [0],
      [-20, 20],
      [-25, 0, 25],
      [-30, -10, 10, 30],
      [-50, -25, 0, 25, 50],
      [-50, -30, -10, 10, 30, 50],
      [-60, -40, -20, 0, 20, 40, 60]
    ][children.length]
  },

  childrenFor: function(point) {
    var points = [];
    for(var i=0;i<this.links.length;i++) {
      if(this.links[i][this.settings.linkStartIdAttribute] == point[this.settings.pointIdAttribute]) {
        points.push(this.getPoint(this.links[i][this.settings.linkEndIdAttribute]))
      }
    }
    return points;
  },

  getPoint: function(id) {
    for(var i=0;i<this.points.length;i++) {
      if(this.points[i][this.settings.pointIdAttribute] == id) {
        return this.points[i]
      }
    }
  }
};