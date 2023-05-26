import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import SimilarJob from '../SimilarJob'
import Header from '../Header'
import './index.css'

const apisStatusConsts = {
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}
class JobItemDetails extends Component {
  state = {
    similarJobsData: [],
    jobItemDetails: {},
    apiStatus: apisStatusConsts.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apisStatusConsts.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updateSimilarJobsData = fetchedData.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))

      const updatedJobItemDetailsData = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        skills: fetchedData.job_details.skills,
        lifeAtCompany: fetchedData.job_details.life_at_company,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        title: fetchedData.job_details.title,
      }

      console.log(updatedJobItemDetailsData)
      this.setState({
        similarJobsData: updateSimilarJobsData,
        jobItemDetails: updatedJobItemDetailsData,
        apiStatus: apisStatusConsts.success,
      })
    } else {
      this.setState({apiStatus: apisStatusConsts.failure})
    }
  }

  jobItemDetailsSuccessView = () => {
    const {similarJobsData} = this.state
    return (
      <div className="job-item-details-container">
        {this.renderJobItemDetails()}
        <h1 className="heading">Similar Jobs</h1>
        <ul className="similar-job-container">
          {similarJobsData.map(job => (
            <SimilarJob similarJobDetails={job} key={job.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobItemDetails = () => {
    const {jobItemDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      packagePerAnnum,
      location,
      employmentType,
      jobDescription,
      title,
      rating,
      lifeAtCompany,
      skills,
    } = jobItemDetails
    return (
      <div className="job-item-container">
        <div className="job-logo-title-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="job-company-logo"
          />
          <div className="title-rating-container">
            <h1 className="title-heading">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="start-icon" />
              <p className="rating-para">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-type-package-container">
          <div className="location-type-container">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="location-container">
              <BsFillBriefcaseFill className="location-icon" />
              <p className="type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="description-visit-container">
          <h1 className="description-heading">Description</h1>
          <a href={companyWebsiteUrl} className="visit-navigate">
            Visit <BiLinkExternal />
          </a>
        </div>
        <p className="description">{jobDescription}</p>
        <h1 className="skills-heading">Skills</h1>
        <ul className="skills-container">
          {skills.map(skill => (
            <li className="skill-list" key={skill.name}>
              <img
                src={skill.image_url}
                alt={skill.name}
                className="skill-image"
              />
              <p className="skill-name">{skill.name}</p>
            </li>
          ))}
        </ul>
        <h1 className="heading">Life at Company</h1>
        <div className="company-description-image-container">
          <p className="company-description">{lifeAtCompany.description}</p>
          <img
            src={lifeAtCompany.image_url}
            alt="life at company"
            className="company-image"
          />
        </div>
      </div>
    )
  }

  renderResultsViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apisStatusConsts.success:
        return this.jobItemDetailsSuccessView()
      case apisStatusConsts.failure:
        return this.jobItemDetailsFailureView()
      case apisStatusConsts.inProgress:
        return this.jobItemDetailsLoaderView()
      default:
        return null
    }
  }

  retryView = () => this.getJobItemDetails()

  jobItemDetailsFailureView = () => (
    <div className="job-item-details-container">
      <div className="jobs-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="jobs-failure-image"
        />
        <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
        <p className="jobs-failure-para">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          className="jobs-failure-button"
          onClick={this.retryView}
        >
          Retry
        </button>
      </div>
    </div>
  )

  jobItemDetailsLoaderView = () => (
    <div className="job-item-details-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        {this.renderResultsViews()}
      </>
    )
  }
}

export default JobItemDetails
