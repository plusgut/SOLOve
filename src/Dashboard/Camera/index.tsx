import * as React from 'react';

import api from '../../api';
import feed from '../../interfaces/feed';
import category from '../../interfaces/category';


type props = { 
  feed: feed;
};

type state = {
  stream?: string,
  categoryId: number;
};

const DEFAULT_CATEGORY = 0;
const CATEGORY_WIDTH = 100;

export default class Camera extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      categoryId: DEFAULT_CATEGORY,
    };

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

  setCategoryId(categoryId: number) {
    this.setState({
      categoryId,
    });
  }

  getCategoryClass(categoryId: number) {
    return categoryId === this.state.categoryId ? 'chosen' : '';
  }

  render() {
    return (
      <span className="camera">
        <div>
          {this.props.feed.categories.map((category: category, categoryId: number) =>
            <img key={categoryId} width={CATEGORY_WIDTH} src={category.image} className={this.getCategoryClass(categoryId)} onClick={() => this.setCategoryId(categoryId)} />,
          )}
        </div>

        <div>
          {this.state.stream && 
            <video ref="video" autoPlay src={this.state.stream} />
          }
        </div>

        <button onClick={() => this.postStream(this.state.categoryId)} >Submit!</button>
      </span>
    );
  }
}
