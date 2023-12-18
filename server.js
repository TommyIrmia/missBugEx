import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import { bugService } from './services/bug.service.js'

const app = express()

// Config the Express App
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

// List
app.get('/api/bug', (req, res) => {
    const filterBy = {
        txt: req.query.txt || '',
        severity: +req.query.severity || 0,
        labels: req.query.labels || ''
    }
    const sortBy = {
        type: req.query.sortBy || '',
        desc: req.query.desc || 1
    }
    if (req.query.pageIdx) filterBy.pageIdx = req.query.pageIdx
    bugService.query(filterBy, sortBy)
        .then(bugs => {
            // console.log('Got Bugs', bugs)
            res.send(bugs)
        })
})

// Read
app.get('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    let visitedBugIds = req.cookies.visitedBugIds || []
    if (!visitedBugIds.includes(bugId)) visitedBugIds.push(bugId)
    if (visitedBugIds.length > 3) return res.status(401).send('Wait for a bit')
    bugService.getById(bugId)
        .then(bug => {
            res.cookie('visitedBugIds', visitedBugIds, { maxAge: 1000 * 60 * 3 })
            res.send(bug)
        })
        .catch(err => {
            console.log('Error:', err);
            res.status(401).send('Cannot get bug')
        })
})

// Delete
app.delete('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    bugService.remove(bugId)
        .then(() => {
            res.send(`Bug id : ${bugId} deleted`)
        })
        .catch((err) => {
            console.log('Had issues :', err)
        })

})

// Create
app.post('/api/bug', (req, res) => {
    const { bug } = req.body
    bugService.save(bug)
        .then((addedBug) => {
            res.send(addedBug)
        })
})

// Update
app.put('/api/bug', (req, res) => {
    const { bug } = req.body
    bugService.save(bug)
        .then(savedBug => {
            res.send(savedBug)
        })
        .catch((err) => {
            console.log('Had issues:', err)
        })
})

app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

app.listen(3030, () => {
    console.log(`Server is ready at 3030 http://127.0.0.1:3030/`)
})