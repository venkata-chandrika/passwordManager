import './index.css'

const Passwords = props => {
  const {eachPasswordDetails, deletePwdTodo, checkBoxClicked} = props
  const {id, input, username, pwd, initialClassName} = eachPasswordDetails
  const initial = username[0].toUpperCase()

  const onDeleteBtn = () => {
    deletePwdTodo(id)
  }
  return (
    <li className="list-container">
      <div className={initialClassName}>
        <p className="initial">{initial}</p>
      </div>

      <div className="three-inputs">
        <p className="value">{input}</p>
        <p className="value">{username}</p>
        {checkBoxClicked ? (
          <p className="value">{pwd}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="star-img"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onDeleteBtn}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          alt="delete"
          className="del-img"
        />
      </button>
    </li>
  )
}

export default Passwords
