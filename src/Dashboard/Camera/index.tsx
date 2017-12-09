import * as React from 'react';

import api from '../../api';

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

  postStream(categoryId: number) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context === null) {
      throw new Error('Context crashed');
    } else {
      context.drawImage(this.refs.video as HTMLVideoElement, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');
      api.post(categoryId, dataUrl);
    }
  }

  render() {
    return (
      <span>
        <button onClick={() => this.postStream(0)} >Post!</button>
        {this.state.stream && 
          <video ref="video" autoPlay src={this.state.stream} />
        }
      </span>
    );
  }
}
