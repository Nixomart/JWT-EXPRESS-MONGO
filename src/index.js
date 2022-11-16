import app from './app.js'
import {connectdb} from './databse.js' 

connectdb()
app.listen(4000, ()=>{
    console.log('corriendo')
})