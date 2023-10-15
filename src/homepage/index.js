import {Link} from 'react-router-dom'
import './index.css'

const HomePage = () => (
  <>
    <div className="homeContainer">
      <div className="homeInnerContainer">
        <h1 className="homepageHeading">Find The Job That Fits Your Life</h1>
        <p className="homepageDescription">
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that fits your your abilities and
          potential.
        </p>
        <Link to="/jobs">
          <button className="findJobsButton" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default HomePage
