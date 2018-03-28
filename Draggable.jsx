import classNames from 'classnames';

class Draggable extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseMoveHandler = this.onMouseMove.bind(this);
    this.onMouseUpHandler = this.onMouseUp.bind(this);
    this.onMouseDownHandler = this.onMouseDown.bind(this);

    this.state = {
      dragging: false,
      init: false,
      currentMouse: {x: -1, y: -1},
      initialMouse: {x: -1, y: -1},
      initialBox: {left: null, top: null},
    };
  }

  componentDidMount() {
    document.onmousemove = this.onMouseMoveHandler;
    document.ontouchmove = this.onMouseMoveHandler;
    document.onmouseleave = this.onMouseUpHandler;
    const clientBox = this.element.getBoundingClientRect();
    this.setState({
      init: true,
      initialBox: {left: clientBox.left, top: clientBox.top},
    });
  }

  componentWillUnmount() {
    document.onmousemove = null;
    document.onmouseleave = null;
    document.ontouchmove = null;
  }

  resetStyle() {
    this.element.style = "";
  }

  onMouseUp(e) {
    if (!this.state.dragging) return;

    const event = e.touches ? e.touches[0] : e;
    this.setState({
      dragging: false,
    });

    const offsetX = this.state.currentMouse.x - this.state.initialMouse.x;
    const offsetY = this.state.currentMouse.y - this.state.initialMouse.y;
    const elasticity = Math.sqrt(offsetX*offsetX + offsetY*offsetY);

    anime({
      targets: this.element,
      translateX: -offsetX,
      translateY: -offsetY,
      duration: 1000,
      elasticity: elasticity*2,
      complete: this.resetStyle.bind(this),
    });
  }

  onMouseDown(e) {
    e.preventDefault();

    anime.remove(this.element);
    this.resetStyle();

    const event = e.touches ? e.touches[0] : e;
    const clientBox = this.element.getBoundingClientRect();

    this.setState({
      dragging: true,
      initialBox: {left: clientBox.left, top: clientBox.top},
      initialMouse: {x: event.clientX, y: event.clientY},
      currentMouse: {x: event.clientX, y: event.clientY},
    })
  }

  onMouseMove(e) {
    e.preventDefault();
    if (!this.state.dragging) return;

    const event = e.touches ? e.touches[0] : e;
    this.setState({
      dragging: true,
      currentMouse: {x: event.clientX, y: event.clientY},
    })
  }

  render() {
    const classes = classNames({
      'draggable': true,
      'dragging': this.state.dragging,
    })

    const offsetX = this.state.currentMouse.x - this.state.initialMouse.x;
    const offsetY = this.state.currentMouse.y - this.state.initialMouse.y;
    const style = {
      left: this.state.initialBox.left + offsetX + 'px',
      top: this.state.initialBox.top + offsetY + 'px',
    };

    return (
      <div
        className={classes}
        onMouseDown={this.onMouseDownHandler}
        onMouseUp={this.onMouseUpHandler}
        onMouseMove={this.onMouseMoveHandler}
        onTouchStart={this.onMouseDownHandler}
        onTouchEnd={this.onMouseUpHandler}
        onTouchMove={this.onMouseMoveHandler}
        ref={(el) => this.element = el}
        style={this.state.init ? style : {}}
        draggable="false"
      >
      {this.props.children}
      </div>
    );
  }
}

export {
  Draggable
};
