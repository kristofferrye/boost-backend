import express from 'express'
import 'dotenv/config'
import { DefaultGroceryService } from './grocery-service'
import { requestTimeLogger } from './middlewares'
import { getStatusCodeFromError } from './error'
import { FoodItem } from './models'
import { foodItemSchema } from './validation'
import { MongoDbDao  } from './dao'
// i controller.ts:
import cors from "cors";

const app = express()
app.use(express.json())
app.use(cors())

const getExpressApp = () => {
  const dao = new MongoDbDao()
  const service = new DefaultGroceryService(dao)

  const app = express()
  app.use(express.json())
  app.use(requestTimeLogger)
  // app.use(authenticate) <--

  const PORT = process.env.PORT || 8080

  app.get('/food-items', async(req, res) => {
    try {
      const items = await service.getAll()
      res.send(items)
    } catch (error) {
      console.log(error.message)
      res.sendStatus(getStatusCodeFromError(error))
    }
  })

  app.get('/food-items/:id', async(req, res) => {
    try {
      const item = await service.getById(req.params.id)
      res.send(item)
    } catch (error) {
      console.log(error.message)
      res.sendStatus(getStatusCodeFromError(error))
    }
  })
  
  app.post('/food-items', async(req: express.Request, res: express.Response) => {
    try {
      const item: FoodItem = await foodItemSchema.validateAsync(req.body)
      await service.create(item)
      res.sendStatus(201)
    } catch (error) {
      res.status(getStatusCodeFromError(error)).send(error.message)
    }
  }) 
  
  app.delete('/food-items/:id', async(req, res) => {
    await service.delete(req.params.id)
    console.log('Deleting item with id: ', req.params.id)
    res.sendStatus(204)
  })

  app.put('/food-items/:id', async(req, res) => {
    const currentItem = await service.getById(req.params.id)
    if (currentItem) {
      const item = req.body
      await service.update(item)
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  })

  return app
}

export { getExpressApp }