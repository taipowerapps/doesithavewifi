var _ = require('lodash'),
  React = require('react');

var Router = require('react-router'),
    Link = Router.Link;

var DataElement = require('./dataElement'),
    Stars = require('./stars'),
    Str = require('./str'),
    UnknownValue = require('./unknownValue'),
    utils = require('../../utils');

module.exports = React.createClass({
  propTypes: {
    item : React.PropTypes.object.isRequired,
    columns: React.PropTypes.array.isRequired,
  },

  render: function() {    
    let item = this.props.item;

    var dataElements = _.map(this.props.columns, (col) => {
      return this._formatColumnValue(col, item[col.key]);
    });

    return (
      <Link className="item" to="cafe" params={ {id:item.slug} } key={item.slug}>
        {dataElements}
      </Link>
    );    
  },


  _formatColumnValue: function(column, value) {
    var dataElementAttrs = {},
      dataElementChild = null;

    switch (column.key) {
      case 'editor_rating':
        dataElementChild = (
          <Stars rating={value}  />
        );

        break;

      case 'affordability':
        value = utils.getRatingFromPrice(value.avge);

        dataElementChild = (
          <Stars rating={value}  />
        );

        break;

      case 'wifi_quality':
        dataElementChild = (
          <Stars rating={value} fullIcon="wifi" halfIcon="shit-wifi" />
        );

        dataElementAttrs = {
          popup: utils.generateWifiDescription(value)
        };

        break;

      case 'closest_station':
        dataElementChild = (
          <Str value={value.station} />
        );

        break;

      case 'distance_from_user':
        value = utils.prettyPrintDistance(value);

        dataElementChild = (
          <Str value={value} />
        );

        break;

      default:
        dataElementChild = (
          <Str value={value} />
        );
    }

    return (
      <DataElement ref={column.key} className={column.cssName} {...dataElementAttrs}>
        {dataElementChild}
      </DataElement>
    );
  },
});



