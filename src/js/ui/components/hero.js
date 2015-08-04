var React = require('react');

var Stars = require('./stars'),
  BgImageWrapper = require('./bgImageWrapper'),
  Utils = require('../../utils');

module.exports = React.createClass({
  render: function() {    
    var rating;
    if(this.props.rating){
      rating = <Stars rating={this.props.rating} />;
    }

    var distance = null;
    if (undefined !== this.props.distance) {
      distance = Utils.prettyPrintDistance(this.props.distance) + ' away';
    }

    var bgImageUrl = this.props.heroUrl || '/img/header.jpg';

    return (
      <BgImageWrapper className="hero" imgUrl={bgImageUrl}>
        <div className="content">
          <h2 className="title">{this.props.title}</h2>
          <div className="editor-rating">{rating}</div>
          <div className="address">{this.props.address}</div>
          <div className="distance">{distance}</div>
        </div>
      </BgImageWrapper>
    );    
  },
});
