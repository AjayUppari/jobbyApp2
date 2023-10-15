import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
  const isCookiePresent = Cookies.get('jwt_token')

  return isCookiePresent !== undefined ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  )
}

export default ProtectedRoute
