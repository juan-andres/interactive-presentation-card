import {Draggable} from './Draggable';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title">DRAG ME AROUND</h1>
        <h1 className="title">THROW ME AT CORNERS</h1>
        <div className="content">
          <Draggable>
            <div className="card">
              <img className="profileImg" draggable="false" src="profile_pic.png" />
            </div>
            <a href="https://twitter.com/juanandresnyc?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-count="false">@juanandresnyc</a>
          </Draggable>
        </div>
      </div>
    );
  }
}

export {
  App
};
