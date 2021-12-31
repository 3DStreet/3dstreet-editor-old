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

 componentDidMount() {
    Events.on('streetloaded', el => {
      this.setState({ streetName: el.getAttribute('streetmix-loader').name });
    });
  }

  render() {
    return (
      <div id="streetname">
        <p style={{border: "1px solid black", borderRadius: "5px", background: "white", paddingRight: "5px", paddingLeft: "5px"}}>{this.state.streetName}</p>
      </div>
    );
  }
}
