import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import AuthRouter from './routers/AuthRouter.js'
import swaggerSpec from './config/swagger.js'
import swaggerUi from 'swagger-ui-express'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import documentRouter from './routers/documentRouter.js'
import locationRouter from './routers/locationRouter.js'
import uploadRouter from './routers/uploadRouter.js'
import loanRouter from './routers/loanRouter.js'
import userRouter from './routers/userRouter.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/uploads', express.static('uploads'))


app.use('/api/auth', AuthRouter)
app.use('/api/documents', documentRouter)
app.use('/api/locations', locationRouter)
app.use('/api/uploads', uploadRouter)
app.use('/api/loans', loanRouter)
app.use('/api/users', userRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})