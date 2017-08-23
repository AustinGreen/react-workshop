////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import PropTypes from 'prop-types'
import { createHashHistory } from 'history'

class Router extends React.Component {
  history = createHashHistory()

  state = {
    location: this.history.location
  }

  static childContextTypes = {
    location: React.PropTypes.object,
    history: React.PropTypes.object
  }

  getChildContext() {
    return {
      location: this.state.location,
      history: this.history
    }
  }

  componentDidMount() {
    this.history.listen(() => {
      this.setState({
        location: this.history.location
      })
    })
  }

  render() {
    return this.props.children
  }
}

class Route extends React.Component {
  static contextTypes = {
    location: React.PropTypes.object
  }

  render() {
    const { location } = this.context
    const { path, render, component: Component } = this.props
    const isMatch = location.pathname.startsWith(path)

    if (isMatch) {
      if (render) {
        return render()
      } else if (Component) {
        return <Component/>
      } else {
        return null
      }
    } else {
      return null
    }
  }
}

class Link extends React.Component {
  static contextTypes = {
    history: React.PropTypes.object
  }

  handleRoute = e => {
    e.preventDefault()
    this.context.history.push(this.props.to)
  }

  render() {
    return (
      <a href={`#${this.props.to}`} onClick={this.handleRoute}>
        {this.props.children}
      </a>
    )
  }
}

export { Router, Route, Link }
