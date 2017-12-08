import * as React from 'react';

type props = {};
type state = {
  stream?: string,
};

export default class Camera extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {};

    navigator.getUserMedia = navigator.getUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true }, (stream: MediaStream) => this.addVideoStream(stream), this.videoStreamError);
    }
  }

  addVideoStream(stream: MediaStream) {
    this.setState({
      stream: window.URL.createObjectURL(stream),
    });
  }

  videoStreamError() {
    throw new Error('stream error');
  }

  render() {
    return (
      <span>
        {this.state.stream && 
          <video autoPlay src={this.state.stream} />
        }
      </span>
    );
  }
}
