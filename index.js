import express from 'express'
import router from './routes/router.js'

const app = express()

const PORT = process.env.PORT ?? 8080

app.use(express.json())

app.disable('x-powered-by')

app.use(express.static('client'))

app.use('/', router)

app.listen(PORT)
