import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import Passwords from '../Passwords'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    inputValue: '',
    userName: '',
    password: '',
    passwordsList: [],
    checkBox: false,
    searchInput: '',
  }

  onAddSubmit = event => {
    event.preventDefault()
    const {inputValue, userName, password} = this.state
    const initialBackgroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newPassword = {
      id: v4(),
      input: inputValue,
      username: userName,
      pwd: password,
      initialClassName: initialBackgroundClassName,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
    }))
    this.setState({
      inputValue: '',
      userName: '',
      password: '',
    })
  }

  userInput = event => {
    this.setState({inputValue: event.target.value})
  }

  username = event => {
    this.setState({userName: event.target.value})
  }

  userPassword = event => {
    this.setState({password: event.target.value})
  }

  searchInputValue = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  deletePwdTodo = id => {
    const {passwordsList} = this.state
    const filteredPwdList = passwordsList.filter(eachList => eachList.id !== id)
    this.setState({passwordsList: filteredPwdList})
  }

  toggleCheckBox = () => {
    this.setState(prevState => ({checkBox: !prevState.checkBox}))
  }

  getFilteredPwdList = () => {
    const {passwordsList, searchInput} = this.state
    const filteredList = passwordsList.filter(eachList =>
      eachList.input.includes(searchInput.toLowerCase()),
    )
    return filteredList
  }

  render() {
    const {inputValue, userName, password, passwordsList, checkBox} = this.state
    const filteredPwdList = this.getFilteredPwdList()
    console.log(filteredPwdList)
    return (
      <div className="app-container">
        <div className="password-container">
          <div className="logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="logo-img"
            />
          </div>
          <div className="img-form-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="pwd-manager"
            />
            <form className="form" onSubmit={this.onAddSubmit}>
              <h1 className="password">Add New Password</h1>
              <div className="img-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-img"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  onChange={this.userInput}
                  value={inputValue}
                />
              </div>
              <div className="img-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt=" username"
                  className="input-img"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  onChange={this.username}
                  value={userName}
                />
              </div>
              <div className="img-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt=" password"
                  className="input-img"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  onChange={this.userPassword}
                  value={password}
                />
              </div>
              <div className="btn-container">
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="your-passwords-container">
            <div className="pwd-search-top-container">
              <div className="pwd-count-cont">
                <h1 className="password mr-5">Your Passwords </h1>
                <p className="count">{passwordsList.length}</p>
              </div>

              <div className="img-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt=" search"
                  className="input-img"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="input"
                  onClick={this.searchInputValue}
                />
              </div>
            </div>
            <hr className="hr" />
            <div className="show-passwords">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox"
                onChange={this.toggleCheckBox}
              />
              <label htmlFor="checkbox" className="password">
                Show Passwords
              </label>
            </div>

            {passwordsList.length === 0 ? (
              <div className="no-pwd-img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="pwd-img"
                />
                <p className="password">No Passwords</p>
              </div>
            ) : (
              <ul className="pwd-list-container">
                {filteredPwdList.map(eachList => (
                  <Passwords
                    eachPasswordDetails={eachList}
                    key={eachList.id}
                    deletePwdTodo={this.deletePwdTodo}
                    checkBoxClicked={checkBox}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
