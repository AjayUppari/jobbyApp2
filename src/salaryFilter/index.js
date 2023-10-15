const SalaryFilter = props => {
  const {filterItem, onClickSalaryRange} = props
  const {label, salaryRangeId} = filterItem

  const onClickSalaryFilter = event => {
    onClickSalaryRange(event.target.id)
  }

  return (
    <div>
      <input
        onClick={onClickSalaryFilter}
        name="salaryFilter"
        type="radio"
        id={salaryRangeId}
      />
      <label className="filterText" htmlFor={salaryRangeId}>
        {label}
      </label>
    </div>
  )
}

export default SalaryFilter
