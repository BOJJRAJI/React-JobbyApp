import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import ProfileSection from '../ProfileSection'
import JobItem from '../JobItem'
import Header from '../Header'
import FilterSection from '../FilterSection'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeIdss: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apisStatusConsts = {
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class Jobs extends Component {
  state = {
    apiStatus: apisStatusConsts.initial,
    searchInput: '',
    employmentTypes: [],
    salaryRange: '',
    allJobsData: [],
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({apiStatus: apisStatusConsts.inProgress})
    const {searchInput, salaryRange, employmentTypes} = this.state
    const employmentTypesJoined = employmentTypes.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesJoined}&minimum_package=${salaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobsData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      console.log(updatedJobsData)
      this.setState({
        allJobsData: updatedJobsData,
        apiStatus: apisStatusConsts.success,
      })
    } else {
      this.setState({apiStatus: apisStatusConsts.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickSearch = () => this.getJobsDetails()

  jobsSuccessView = () => {
    const {allJobsData} = this.state
    const shouldShowJobsList = allJobsData.length > 0

    return shouldShowJobsList ? (
      <div className="jobs-search-container">
        <div className="search-container">
          <input
            className="search-input"
            type="search"
            placeholder="Search"
            onChange={this.onChangeSearchInput}
          />
          <button
            onClick={this.onClickSearch}
            className="search-icon-button"
            type="button"
            data-testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="job-items-container">
          {allJobsData.map(job => (
            <JobItem jobDetails={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="jobs-failure-container">
        <img
          className="jobs-failure-image"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="jobs-failure-heading">No Jobs Found</h1>
        <p className="jobs-failure-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  selectSalaryRange = event => {
    const {value} = event.target

    this.setState(
      {
        salaryRange: value,
      },
      this.getJobsDetails,
    )
  }

  selectemploymentType = event => {
    const {value, checked} = event.target
    const {employmentTypes} = this.state

    if (checked === true) {
      this.setState(
        {
          employmentTypes: [...employmentTypes, value],
        },
        this.getJobsDetails,
      )
    } else {
      const updatedTypes = employmentTypes.filter(
        eachType => eachType !== value,
      )

      this.setState(
        {
          employmentTypes: updatedTypes,
        },
        this.getJobsDetails,
      )
    }
  }

  renderResultsViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apisStatusConsts.success:
        return this.jobsSuccessView()
      case apisStatusConsts.failure:
        return this.jobsFailureView()
      case apisStatusConsts.inProgress:
        return this.loaderView()
      default:
        return null
    }
  }

  loaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-failure-button"
        onClick={this.retryView}
      >
        Retry
      </button>
    </div>
  )

  retryView = () => this.getJobsDetails()

  render() {
    const {employmentTypes, salaryRange} = this.state

    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="profile-filter-container">
            <ProfileSection />
            <hr className="line" />
            <FilterSection
              employmentTypes={employmentTypes}
              salaryRange={salaryRange}
              selectemploymentType={this.selectemploymentType}
              selectSalaryRange={this.selectSalaryRange}
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
            />
          </div>
          {this.renderResultsViews()}
        </div>
      </>
    )
  }
}

export default Jobs
