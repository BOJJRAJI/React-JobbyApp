import './index.css'

const FilterSection = props => {
  const {
    employmentTypes,
    salaryRange,
    selectemploymentType,
    selectSalaryRange,
    employmentTypesList,
    salaryRangesList,
  } = props

  const renderEmployeeType = () => (
    <div className="employee-type-container">
      <h1 className="employee-type-heading">Type of Employment</h1>
      <ul className="employee-filter-list-container">
        {employmentTypesList.map(eachItem => (
          <li key={eachItem.employmentTypeId} className="filter-list-item">
            <input
              id={eachItem.employmentTypeId}
              type="checkbox"
              value={eachItem.employmentTypeId}
              checked={employmentTypes.includes(eachItem.employmentTypeId)}
              onChange={selectemploymentType}
            />
            <label
              className="filter-input-label"
              htmlFor={eachItem.employmentTypeId}
            >
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRanges = () => (
    <div className="salary-ranges-container">
      <h1 className="employee-type-heading">Salary Range</h1>
      <ul className="employee-filter-list-container">
        {salaryRangesList.map(eachItem => (
          <li key={eachItem.salaryRangeId} className="filter-list-item">
            <input
              id={eachItem.salaryRangeId}
              type="radio"
              checked={salaryRange === eachItem.salaryRangeId}
              value={eachItem.salaryRangeId}
              onChange={selectSalaryRange}
            />
            <label
              className="filter-input-label"
              htmlFor={eachItem.salaryRangeId}
            >
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filter-group-container">
      {renderEmployeeType()}
      <hr className="line" />
      {renderSalaryRanges()}
    </div>
  )
}

export default FilterSection
