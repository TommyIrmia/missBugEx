const { useState, useEffect } = React
import { BugFilter } from '../cmps/BugFilter.jsx'
import { BugList } from '../cmps/BugList.jsx'
import { BugSort } from '../cmps/BugSort.jsx'
import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
  const [sortBy, setSortBy] = useState({ type: '', desc: 1 })

  useEffect(() => {
    loadBugs()
  }, [filterBy, sortBy])

  function loadBugs() {
    bugService.query(filterBy, sortBy).then((bugs) => {
      console.log('Bugs from DB:', bugs)
      setBugs(bugs)
    })
  }

  function onSetFilter(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
  }

  function onRemoveBug(bugId) {
    bugService
      .remove(bugId)
      .then(() => {
        console.log('Deleted Succesfully!')
        const updatedBugs = bugs.filter((bug) => bug._id !== bugId)
        setBugs(updatedBugs)
        showSuccessMsg('Bug removed')
      })
      .catch((err) => {
        console.log('from remove bug', err)
        showErrorMsg('Cannot remove bug')
      })
  }

  function onAddBug() {
    const bug = {
      title: prompt('Bug title?'),
      severity: +prompt('Bug severity?'),
    }
    bugService
      .save(bug)
      .then((savedBug) => {
        console.log('Added Bug', savedBug)
        setBugs((prevBugs) => [...prevBugs, savedBug])
        showSuccessMsg('Bug added')
      })
      .catch((err) => {
        console.log('from add bug', err)
        showErrorMsg('Cannot add bug')
      })
  }

  function onEditBug(bug) {
    const severity = +prompt('New severity?')
    const bugToSave = { ...bug, severity }
    bugService
      .save(bugToSave)
      .then((savedBug) => {
        console.log('Updated Bug:', savedBug)
        const updatedBugs = bugs.map((currBug) => (currBug._id === savedBug._id ? savedBug : currBug))
        setBugs(updatedBugs)
        showSuccessMsg('Bug updated')
      })
      .catch((err) => {
        console.log('from edit bug', err)
        showErrorMsg('Cannot update bug')
      })
  }

  function onSetSort(sortBy) {
    setSortBy(prevSort => ({ ...prevSort, ...sortBy })) 
  }

  function onChangePageIdx(diff) {
    setFilterBy(prevFilter => ({ ...prevFilter, pageIdx: prevFilter.pageIdx + diff }))
  }

  return (
    <div>
      <h3>Bugs App</h3>
      <main>
        <BugFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <BugSort onSetSort={onSetSort} sortBy={sortBy} />
        <button onClick={onAddBug}>Add Bug ⛐</button>
        <button onClick={() => { onChangePageIdx(1) }}>+</button>
            {filterBy.pageIdx + 1}
            <button onClick={() => { onChangePageIdx(-1) }}>-</button>
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
      </main>
    </div>
  )
}
