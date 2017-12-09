import * as React from 'react';

import api from '../../api';
import feed from '../../interfaces/feed';

type props = { 
  feed: feed;
};
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
    const video = this.refs.video as HTMLVideoElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    const context = canvas.getContext('2d');
    if (context === null) {
      throw new Error('Context crashed');
    } else {
      context.drawImage(video, 0, 0);
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
