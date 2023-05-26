import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apisStatusConsts = {
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}
class ProfileSection extends Component {
  state = {profileDetails: {}, apiStatus: apisStatusConsts.initial}

  componentDidMount() {
    this.getUserProfileDetails()
  }

  getUserProfileDetails = async () => {
    this.setState({apiStatus: apisStatusConsts.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        apiStatus: apisStatusConsts.success,
        profileDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apisStatusConsts.failure})
    }
  }

  renderProfileViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apisStatusConsts.success:
        return this.profileSuccessView()
      case apisStatusConsts.failure:
        return this.profileFailureView()
      case apisStatusConsts.inProgress:
        return this.loaderView()
      default:
        return null
    }
  }

  retryTheView = () => {
    this.getUserProfileDetails()
  }

  profileFailureView = () => (
    <div className="failure-container">
      <button
        type="button"
        className="failure-button"
        onClick={this.retryTheView}
      >
        Retry
      </button>
    </div>
  )

  loaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileSuccessView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  render() {
    return <>{this.renderProfileViews()}</>
  }
}

export default ProfileSection
