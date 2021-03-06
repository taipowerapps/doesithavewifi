var React = require('react');

module.exports = React.createClass({
  propTypes: {
    name : React.PropTypes.string,
    className : React.PropTypes.string,
    onClick : React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {
      name: null,
      onClick: null,
    };
  },

  render: function() {   
    let classes = `icon-${this.props.name}`;

    if (this.props.className) {
      classes = `${classes} ${this.props.className}`;
    }

    return (
      <i className={classes} onClick={this.props.onClick}/>
    );
  }

});
