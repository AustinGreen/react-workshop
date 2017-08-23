/*eslint-disable no-alert */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls <Form onSubmit>
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onSubmit> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
//
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Form extends React.Component {
  static childContextTypes = {
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired
  }

  getChildContext() {
    return {
      onSubmit: this.props.onSubmit,
      onReset: this.props.onReset
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

class SubmitButton extends React.Component {
  static contextTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    return (
      <button onClick={this.context.onSubmit}>
        {this.props.children}
      </button>
    )
  }
}

class ResetButton extends React.Component {
  static contextTypes = {
    onReset: PropTypes.func.isRequired
  }

  render() {
    return (
      <button onClick={this.context.onReset}>
        {this.props.children}
      </button>
    )
  }
}

class TextInput extends React.Component {
  static contextTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.context.onSubmit()
    }
  }

  render() {
    return (
      <input
        onChange={this.props.onChange}
        onKeyPress={this.handleKeyPress}
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
        value={this.props.value}
      />
    )
  }
}

class App extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    submittedName: ''
  }

  handleSubmit = () => {
    this.setState({ submittedName: `${this.state.firstName} ${this.state.lastName}` })
    alert('YOU WIN!')
  }

  handleReset = () => {
    this.setState({ firstName: '', lastName: '' })
  }

  render() {
    return (
      <div>
        <h1>
          This isn't even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <p>
            <TextInput
              onChange={e => this.setState({ firstName: e.target.value })}
              value={this.state.firstName}
              name="firstName"
              placeholder="First Name"
            />
            <TextInput
              onChange={e => this.setState({ lastName: e.target.value })}
              value={this.state.lastName}
              name="lastName"
              placeholder="Last Name"
            />
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </p>
          <p>
            {this.state.submittedName}
          </p>
        </Form>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
