import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Navbar = props => {
  const {history} = props
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="navbar">
        <ul className="navBarContainer">
          <li className="logoContainer">
            <Link to="/">
              <img
                className="logoImage"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </Link>
          </li>
          <li className="homeAndJobs">
            <Link to="/">
              <button className="navItem" type="button">
                Home
              </button>
            </Link>
            <Link to="/jobs">
              <button className="navItem" type="button">
                Jobs
              </button>
            </Link>
          </li>
          <li className="navItemContainer">
            <button onClick={onLogout} className="logoutButton" type="button">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Navbar)
