import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Navbar from '../navbar'
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    skills: [],
    fetchStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      fetchStatus: 'IN_PROGRESS',
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const jsonData = await response.json()

      const jobDetails = jsonData.job_details
      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        skills: jobDetails.skills.map(eachItem => ({
          name: eachItem.name,
          imageUrl: eachItem.image_url,
        })),
      }

      const similarJobs = jsonData.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs,
        skills: updatedJobDetails.skills,
        fetchStatus: 'SUCCESS',
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobs, skills} = this.state
    console.log(similarJobs)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      lifeAtCompany,
      jobDescription,
    } = jobDetails

    console.log(lifeAtCompany)
    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <Navbar />

        <div className="jobDetailsContainer">
          <div className="jobDetailsItemContainer">
            <div className="section1">
              <div className="sectionItem">
                <img
                  className="companyLogoDetails"
                  src={companyLogoUrl}
                  alt="companyLogo"
                />
              </div>
              <div className="ratingAndTitleContainer">
                <p className="jobTitle">{title}</p>
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
              <div>
                <div className="descriptionContainer">
                  <h1 className="subHeading">Description</h1>
                  <button type="button" className="visitContainer">
                    <a className="visitText" href={companyWebsiteUrl}>
                      Visit
                      <FaExternalLinkAlt className="visitImage" />
                    </a>
                  </button>
                </div>
                <p className="descriptionText">{jobDescription}</p>
              </div>
            </div>
            <div className="skillsSection">
              <h1 className="subHeading">Skills</h1>
              <ul>
                <div className="skillsContainer">
                  {skills.map(eachSkill => (
                    <li key={eachSkill.name}>
                      <div className="skillContainer">
                        <img
                          src={eachSkill.imageUrl}
                          alt={eachSkill.name}
                          className="skillImage"
                        />
                        <p>{eachSkill.name}</p>
                      </div>
                    </li>
                  ))}
                </div>
              </ul>
            </div>

            <div className="lifeAtCompanySection">
              <h1 className="subHeading">Life at Company</h1>
              <div className="lifeAtCompany">
                <p className="descriptionText">{description}</p>
                <img src={imageUrl} alt="life at company" />
              </div>
            </div>
          </div>
          <div className="similarJobsSection">
            <h1 className="subHeading">Similar Jobs</h1>
            <div className="similarJobsContainer">
              {similarJobs.map(eachItem => (
                <div className="similarJob">
                  <div className="similarJobItem">
                    <div className="sectionItem">
                      <img
                        className="companyLogoDetails"
                        src={eachItem.companyLogoUrl}
                        alt="companyLogo"
                      />
                    </div>
                    <div className="ratingAndTitleContainer">
                      <p className="jobTitle">{eachItem.title}</p>
                      <div className="ratingContainer">
                        <AiFillStar className="star" />
                        <p className="rating">{eachItem.rating}</p>
                      </div>
                    </div>
                  </div>
                  <h1 className="descriptionHeading">Description</h1>
                  <p className="description">{eachItem.jobDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case 'IN_PROGRESS':
        return this.renderLoader()
      case 'SUCCESS':
        return this.renderSuccessView()
      default:
        return null
    }
  }
}

export default JobItemDetails
