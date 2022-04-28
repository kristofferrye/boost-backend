import { Request, Response, NextFunction } from 'express'
// import * as myExpress from 'express'  alternative myExpress.response

const requestTimeLogger = (req: Request, res: Response, next: NextFunction) => {
    const date = Date.now()
    const formattedDate = date.toLocaleString('sv-SE')
    console.log('Incoming request at time: ', formattedDate)
    next()
}

export default requestTimeLogger