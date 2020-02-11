const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
// app.use('/api/link', require('./routes/link.routes'))

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: !0,
            useUnifiedTopology: !0,
            useCreateIndex: !0,
        })
    } catch (e) {
        console.log('Srv err,', e.message)
        process.exit(1)
    }
}
start()
app.listen(PORT, () => console.log(`App has been started on port ${PORT}..`))