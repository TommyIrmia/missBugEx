import fs from 'fs'
import { utilService } from './util.service.js'
let gBugs = utilService.readJsonFile('data/bug.json')

export const bugService = {
    query,
    getById,
    remove,
    save
}

const PAGE_SIZE = 5

function query(filterBy = { txt: '', severity: 0 }, sortBy = { type: '', desc: 1 }) {
    var bugs = gBugs
    // SS - Filter~
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        bugs = gBugs.filter(bug => regex.test(bug.title))
    }
    if (filterBy.severity) {
        bugs = bugs.filter(bug => bug.severity > filterBy.severity)
    }

    if (filterBy.labels) {
        const labelsToFilter = filterBy.labels
        bugs = bugs.filter((bug) =>
            labelsToFilter.every((label) => bug.labels.includes(label))
        )
    }
    // SS - Pagination~
    if (filterBy.pageIdx !== undefined) {
        const startIdx = filterBy.pageIdx * PAGE_SIZE;
        bugs = bugs.slice(startIdx, startIdx + PAGE_SIZE)
    }

    // sort
    if (sortBy.type === 'createdAt') {
        bugs.sort((b1, b2) => (sortBy.desc) * (b2.createdAt - b1.createdAt))
    }
    return Promise.resolve(bugs)
}

function save(bug) {
    if (bug._id) {
        const idx = gBugs.findIndex(currBug => currBug._id === bug._id)
        gBugs[idx] = bug
    } else {
        bug.createdAt = Date.now()
        bug.labels = ['critical', 'need-CR']
        bug._id = _makeId()
        bug.description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, earum sed corrupti voluptatum voluptatem at.'
        gBugs.push(bug)

    }
    return _saveBugsToFile().then(() => bug)
}

function remove(bugId, userId) {
    const idx = gBugs.findIndex(bug => bug._id === bugId)
    if (gBugs[idx].ownerId !== userId) return Promise.reject('Cant remove bug - not yours!')
    if (idx === -1) return Promise.reject('No bug found')
    gBugs.splice(idx, 1)
    return _saveBugsToFile()
}

function getById(bugId) {
    const bug = gBugs.find(bug => bug._id === bugId)
    if (!bug) return Promise.reject('No bug found')
    else return Promise.resolve(bug)
}

function _makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _saveBugsToFile() {
    console.log('gBugs:', gBugs)
    return new Promise((resolve, reject) => {
        fs.writeFile('data/bug.json', JSON.stringify(gBugs, null, 2), (err) => {
            if (err) {
                console.log(err);
                reject('Cannot write to file')
            } else {
                console.log('Wrote Successfully!')
                resolve()
            }
        })
    })
}