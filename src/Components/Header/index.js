import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const logOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="large-device-items">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="app-logo"
          />
        </Link>

        <ul className="home-jobs-container">
          <li className="list-text">
            <Link className="list-link" to="/">
              Home
            </Link>
          </li>
          <li className="list-text">
            <Link className="list-link" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="logout-button" type="button" onClick={logOut}>
          Logout
        </button>
      </div>

      <div className="mobile-device-images">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="mobile-app-logo"
          />
        </Link>

        <ul className="header-items-container">
          <li className="list-image">
            <Link className="list-link" to="/">
              <AiFillHome />
            </Link>
          </li>
          <li className="list-image">
            <Link className="list-link" to="/jobs">
              <BsBriefcaseFill />
            </Link>
          </li>
          <li className="list-image">
            <button
              className="logout-button-icon"
              type="button"
              onClick={logOut}
            >
              <FiLogOut />
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Header)
