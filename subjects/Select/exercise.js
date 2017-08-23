import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './styles.css'

const { func, any } = PropTypes

////////////////////////////////////////////////////////////////////////////////
// Requirements
//
// Make this work like a normal <select><option/></select>

class Select extends React.Component {
  static propTypes = {
    onChange: func,
    value: any,
    defaultValue: any
  }

  state = {
    showDropdown: false
  }

  toggleDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown })
  }

  render() {
    const { showDropdown } = this.state
    return (
      <div className="select" onClick={() => this.toggleDropdown()}>
        <div className="label">
          {this.getLabel()} <span className="arrow">▾</span>
        </div>
        {showDropdown &&
          <div className="options">
            {this.renderChildren()}
          </div>}
      </div>
    )
  }
}

class Option extends React.Component {
  state = {
    currentValue: ''
  }

  select = () => {
    this.setState({ currentValue: this.props.value })
  }

  render() {
    return (
      <div onClick={this.select} className="option">
        {this.props.children}
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    selectValue: 'dosa'
  }

  setToMintChutney = () => {
    this.setState({ selectValue: 'mint-chutney' })
  }

  render() {
    return (
      <div>
        <h1>Select/Option</h1>
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>

        <h2>Controlled</h2>
        <p>
          <button onClick={this.setToMintChutney}>Set to Mint Chutney</button>
        </p>

        <Select value={this.state.selectValue} onChange={selectValue => this.setState({ selectValue })}>
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        {/* <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select> */}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
