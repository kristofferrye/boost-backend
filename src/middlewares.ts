import { Request, Response, NextFunction } from 'express'
// import * as myExpress from 'express'  alternative myExpress.response

const REQUIRED_PASSWORD = 'Bearer password'

const requestTimeLogger = (req: Request, res: Response, next: NextFunction) => {
    const date = Date.now()
    const formattedDate = date.toLocaleString('sv-SE')
    console.log('Incoming request at time: ', formattedDate)
    next()
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authValue = req.headers.authorization
    if (authValue === REQUIRED_PASSWORD){
        next()
    } else {
        res.sendStatus(401)
    }    
}

// export default requestTimeLogger
export { requestTimeLogger, authenticate }