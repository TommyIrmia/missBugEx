const { useState, useEffect } = React
import { LabelSelector } from './LabelSelect.jsx'


export function BugFilter({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  const labels = [
    'critical',
    'need-CR',
    'dev-branch',
    'famous',
    'high'
  ]
  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    setFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      [field]: value,
    }))
  }

  function onLabelChange(selectedLabels) {
    console.log('selectedLabels:', selectedLabels)
    
    setFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      labels: selectedLabels,
    }))
  }

  const { severity, txt, label } = filterBy
  return (
    <form>
      <label htmlFor="txt">By text</label>
      <input type="text" id="txt" name="txt" value={txt} onChange={handleChange} />

      <label htmlFor="severity">By severity</label>
      <input type="text" id="severity" name="severity" value={severity} onChange={handleChange} />
      <LabelSelector labels={labels} onLabelChange={onLabelChange} />

    </form>
  )
}
