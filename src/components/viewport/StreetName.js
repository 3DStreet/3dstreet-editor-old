var React = require('react');
var Events = require('../../lib/Events.js');
import { printEntity } from '../../lib/entity';

export default class StreetName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streetName: "Street Name",
    };
  }
// TO DO: Replace this with event listener to update the street name! Please and Thank you
 /* componentDidMount() {
    Events.on('raycastermouseenter', el => {
      this.setState({ hoveredEntity: el });
    });

    Events.on('raycastermouseleave', el => {
      this.setState({ hoveredEntity: el });
    });
  } */

  render() {
    return (
      <div id="streetname">
        <p style={{border: "1px solid black", borderRadius: "5px", background: "white", paddingRight: "5px", paddingLeft: "5px"}}>{this.state.streetName}</p>
      </div>
    );
  }
}
