import * as React from 'react';

import api from '../../api';
import feed from '../../interfaces/feed';
import category from '../../interfaces/category';


type props = { 
  feed: feed;
};

type state = {
  stream?: string,
  categoryId?: number;
  lat?: number;
  long?: number;
};

const CATEGORY_SIZE = 100;

export default class Camera extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {};

    navigator.getUserMedia = navigator.getUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true }, (stream: MediaStream) => this.addVideoStream(stream), this.videoStreamError);
    }

    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  }

  addVideoStream(stream: MediaStream) {
    this.setState({
      stream: window.URL.createObjectURL(stream),
    });
  }

  videoStreamError() {
    throw new Error('stream error');
  }

  postStream() {
    const video = this.refs.video as HTMLVideoElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    const context = canvas.getContext('2d');
    if (context === null || this.state.categoryId === undefined || this.state.lat === undefined || this.state.long === undefined) {
      throw new Error('data is broken');
    } else {
      context.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');
      api.post(this.state.categoryId, {
        id: 0,
        image: dataUrl,
        lat: this.state.lat,
        long: this.state.long,
      });
    }
  }

  setCategoryId(categoryId: number) {
    this.setState({
      categoryId,
    });
  }

  getCategoryClass(categoryId: number) {
    return categoryId === this.state.categoryId ? 'chosen' : '';
  }

  render() {
    const videoSize = this.props.feed.categories.length * CATEGORY_SIZE;
    return (
      <span className="camera">
        <div>
          {this.props.feed.categories.map((category: category, categoryId: number) =>
            <img key={categoryId} width={CATEGORY_SIZE} height={CATEGORY_SIZE} src={category.image} className={this.getCategoryClass(categoryId)} onClick={() => this.setCategoryId(categoryId)} />,
          )}
        </div>

        <div>
          {this.state.stream && 
            <video width={videoSize} ref="video" autoPlay src={this.state.stream} />
          }
        </div>

        {this.state.lat && this.state.long &&
          <div>lat: {this.state.lat} | {this.state.long}</div>
        }

        {this.state.categoryId &&
          <button onClick={() => this.postStream()} >Submit!</button>
        }
      </span>
    );
  }
}
