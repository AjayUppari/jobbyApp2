import {Switch, Route} from 'react-router-dom'

import Login from './login'
import Home from './home'
import Jobs from './jobs'
import ProtectedRoute from './protectedRoute'
import './App.css'
import JobItemDetails from './jobItemDetails'
import NotFound from './notFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div className="appContainer">
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
