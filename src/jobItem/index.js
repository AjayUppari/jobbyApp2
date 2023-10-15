import {Link} from 'react-router-dom'
import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link className="jobItemLink" to={`/jobs/${id}`}>
      <li className="jobItem">
        <div className="section1">
          <div className="sectionItem">
            <img
              className="companyLogo"
              src={companyLogoUrl}
              alt="company logo"
            />
          </div>
          <div className="ratingAndTitleContainer">
            <h1 className="jobTitle">{title}</h1>
            <div className="ratingContainer">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="section2">
          <div className="section2">
            <div className="locationContainer employmentDetailsIcon">
              <IoLocationSharp className="jobIcon" />
              <p className="jobDetailsText">{location}</p>
            </div>
            <div className="employmentTypeContainer employmentDetailsIcon">
              <BsFillBriefcaseFill className="jobIcon" />
              <p className="jobDetailsText">{employmentType}</p>
            </div>
          </div>
          <p className="salaryPackage">{packagePerAnnum}</p>
        </div>

        <hr />

        <div className="section3">
          <h1 className="descriptionHeading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
