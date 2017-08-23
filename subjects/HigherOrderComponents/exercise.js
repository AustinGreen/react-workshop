////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMousePosition` a "higher-order component" that sends the mouse
// position to the component as props.
//
// Hint: use `event.clientX` and `event.clientY`
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const withMousePosition = Comp => {
  return class WithMouse extends React.Component {
    state = {
      mouse: {
        x: 0,
        y: 0
      }
    }

    handleMouseMove = e => {
      this.setState({ mouse: { x: e.clientX, y: e.clientY } })
    }

    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <Comp mouse={this.state.mouse}/>
        </div>
      )
    }
  }
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  }

  render() {
    const { mouse } = this.props

    return (
      <div style={{ height: '100%' }}>
        {mouse
          ? <h1>
              The mouse position is ({mouse.x}, {mouse.y})
            </h1>
          : <h1>We don't know the mouse position yet :(</h1>}
      </div>
    )
  }
}

const AppWithMouse = withMousePosition(App)

ReactDOM.render(<AppWithMouse/>, document.getElementById('app'))
