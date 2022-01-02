var React = require('react');
var Events = require('../../lib/Events.js');

export default class StreetName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streetName: "Street Name",
      el: null
    };
  }

  componentDidMount() {
    Events.on('streetloaded', el => {
      this.setState({ 
        streetName: el.getAttribute('streetmix-loader').name,
        el: el
      });
    });
  }

  onChange = (e) => {
    if (e.target.value === '1') {
      window.open(this.state.el.getAttribute('streetmix-loader').streetmixStreetURL);
    }
    if (e.target.value === '2') {
      window.open(this.state.el.getAttribute('streetmix-loader').streetmixAPIURL);
    }
    if (e.target.value === '3') {
      let newStreetURL = prompt("Paste a Streetmix Street URL:", this.state.el.getAttribute('streetmix-loader').streetmixStreetURL);
      if (newStreetURL == null || newStreetURL == "") {
        e.target.value = 0;
        return;
      } else {
        window.open(window.location.origin + "#" + newStreetURL, "_self");
        location.reload();
      }
    }
    e.target.value = 0;
  }

  render() {
    return (

      <div id="streetname">
      {/* <p style={{border: "1px solid black", borderRadius: "5px", background: "white", paddingRight: "5px", paddingLeft: "5px", fontWeight: "600"}}>{this.state.streetName}</p> */}

        <select 
          id="dropdown"
          style={{color: "black", border: "1px solid black", borderRadius: "5px", background: "white", padding: "3px", fontWeight: "600", cursor: "pointer"}}
          onChange={this.onChange.bind(this)}>
          
          <option value="0">{this.state.streetName}</option>
          <option value="1">Open this street in Streetmix...</option>
          <option value="2">View JSON API request...</option>
          <option value="3">Open a new Streetmix URL...</option>
        </select>

      </div>
    );
  }
}
