import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJob = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-list">
      <div className="job-logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="description-heading">Description</h1>
      <p className="description">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJob
