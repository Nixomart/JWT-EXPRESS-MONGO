import express, { json } from 'express'
import morgan from 'morgan'
import productRoutes from './routes/products.routes.js'
import authRoutes from './routes/auth.routes.js'
import './databse.js'
import { createRoles } from './libs/initialSetup.js'

const app = express()
createRoles()

app.use(morgan('dev'))
app.use(express.json())
 
app.get('/', (req, res) =>{
    res.json('hola')
})

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)

export default app