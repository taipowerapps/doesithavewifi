var React = require('react');

var Router = require('react-router'),
  State = Router.State,
  Hero = require('../components/hero'),
  RatingItem = require('../components/ratingItem'),
  SectionHeader = require('../components/sectionHeader'),
  OpeningTimes = require('../components/openingTimes');

import { FluxComponent } from '../../flux';


module.exports = React.createClass({
  mixins: [State],

  render: function() {
    var content = null;

    if(this.props.appDatabase){

      var id = this.getParams().id,
          item = this.props.appDatabase[id],
          heroUrl = "/img/cafes/default-header.jpg",
          description,
          openingTimes;


      var heroUrl = "/img/cafes/default-header.jpg";
      if (item.header_image) {
        heroUrl = item.header_image;
      }

      if(item.description) {
        description = <p className="cafe-description">{item.description}</p>
      }

      if(item.opening_times) {
        openingTimes = <OpeningTimes data={item.opening_times} />
      } else {
        openingTimes = <p>No Opening Times data available</p>
      }

      var nav = [
        {
          name: 'Information',
          link: '#information',
        },
        {
          name: 'Opening Times',
          link: '#information',
        },
        {
          name: 'Maps',
          link: '#map',
        }
      ];
      
      content = 
        <div className="cafe">
          <Hero heroUrl={heroUrl} title={item.name} rating={item.editor_rating} address={item.address}/>
          <main>
            {description}
            <section id="opening-times">
              <SectionHeader>Opening Times</SectionHeader>
              {openingTimes}
            </section>
            <section id="information">
              <SectionHeader>Ratings &amp; Information</SectionHeader>
              <RatingItem title="Wifi Quality" value={item.wifi_quality}></RatingItem>
              <RatingItem title="Ambience" value={item.ambience}></RatingItem>
              <RatingItem title="Food/snack selection" value={item.food_snack_selection}></RatingItem>
              <RatingItem title="Power Outlet" value={item.power_outlet}></RatingItem>
              <RatingItem title="Toilet Hygiene" value={item.toilet_hygiene}></RatingItem>
              <RatingItem title="Ergonomics" value={item.desk_chair}></RatingItem>
              <RatingItem title="Website" value={item.website}></RatingItem>
              <RatingItem title="Closest Station" value={item.closest_station.original}></RatingItem>
            </section>
            
            <section id="map">
              <SectionHeader>Map</SectionHeader>
              Map goes here
            </section>
          </main>
        </div>
      ;
    } else {
      content = <div>Loading data...</div>;
    }

    return (
      <FluxComponent connectToStores={['app']}>
        {content}
      </FluxComponent>
    );
  },
});
