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

  captureToEditor() {
    var config = {
      tools: ['filters', 'crop', 'rotate', 'adjust'],
      translations: {
        en: {'header.image_editor_title': 'Edit Snapshot'}
      }
    }
    const ImageEditor = new FilerobotImageEditor(config);
    // consoel.log () 
    AFRAME.scenes[0].setAttribute('screenshot','width',AFRAME.scenes[0].canvas.width)
    AFRAME.scenes[0].setAttribute('screenshot','height',AFRAME.scenes[0].canvas.height)
    const dataURL = AFRAME.scenes[0].components['screenshot'].getCanvas('perspective').toDataURL('image/png', 1.0);
    ImageEditor.open(dataURL);

  }

  render() {
    return (
      <div id="cameraToolbar">
        <button onClick={this.captureToEditor.bind(this)}>📸 Snapshot</button>
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
