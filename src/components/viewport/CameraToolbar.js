var React = require('react');
var Events = require('../../lib/Events.js');
var classNames = require('classnames');
import Select from 'react-select';

const options = [
  { value: 'orthotop', event: 'cameraorthographictoggle', payload: 'top', label: 'Plan View (Top)' },
  { value: 'orthofront', event: 'cameraorthographictoggle', payload: 'front', label: 'Outbound View (Front)' },
  { value: 'orthoback', event: 'cameraorthographictoggle', payload: 'back', label: 'Inbound View (Back)' },
  { value: 'ortholeft', event: 'cameraorthographictoggle', payload: 'left', label: 'Left View' },
  { value: 'orthoright', event: 'cameraorthographictoggle', payload: 'right', label: 'Right View' },
];

function getOption (value) {
  return options.filter(opt => opt.value === value)[0];
}

export default class CameraToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCamera: 'orthotop'
    };
    this.justChangedCamera = false;
  }

  componentDidMount() {
    Events.on('cameratoggle', data => {
      if (this.justChangedCamera) {
        // Prevent recursion.
        this.justChangedCamera = false;
        return;
      }
      this.setState({selectedCamera: data.value});
    });
  }

  onChange(option) {
    console.log(option);
    this.justChangedCamera = true;
    this.setState({selectedCamera: option.value});
    Events.emit(option.event, option.payload);
  }

  render() {
    return (
      <div id="cameraToolbar">
        <Select
          id="cameraSelect"
          classNamePrefix="select"
          options={options}
          simpleValue
          value={getOption(this.state.selectedCamera)}
          isSearchable={false}
          onChange={this.onChange.bind(this)} />
      </div>
    );
  }
}
