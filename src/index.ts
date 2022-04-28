// CONTROLLER

import express from 'express'
import 'dotenv/config'
import { DefaultGroceryService } from './grocery-service'
import { InMemoryGroceryDao, MongoDbDao  } from './dao'
import { connectToMongoDB } from './connection'
import { foodItemSchema } from './validation'
import { FoodItem } from './models'
import timeLogger from './middlewares'

const initServer = async () => {
  const dao = new MongoDbDao()
  const service = new DefaultGroceryService(dao)

  const app = express()
  const PORT = 8080

  app.use(express.json())
  app.use(timeLogger)

  await connectToMongoDB()

  

  app.get('/food-items', async(req, res) => {
    const items = await service.getAll()
    res.send(items)
  })

  app.get('/food-items/:id', async(req, res) => {
    const item = await service.getById(req.params.id)
    res.send(item)
  })
  
  app.post('/food-items', async(req: express.Request, res: express.Response) => {
    try {
      const item: FoodItem = await foodItemSchema.validateAsync(req.body)
      await service.create(item)
      res.sendStatus(201)
    } catch (error) {
      res.status(422).send(error.message)
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

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

initServer()

// export default server

/* app.get('/food-items', async(req, res) => {
  const items = await service.getAll()
  res.send(items)
})

app.get('/food-items/:id', async(req, res) => {
  const item = await service.getById(req.params.id)
  res.send(item)
})

app.post('/food-items', async(req: express.Request, res: express.Response) => {
  console.log("Request body: ", req.body)
  const item = req.body as FoodItem
  await service.create(item)
  res.sendStatus(201)
})

app.delete('/food-items/:id', async(req, res) => {
  await service.delete(req.params.id)
  console.log('Deleting item with id: ', req.params.id)
  res.sendStatus(204)
})

app.put('/food-items/:id', async(req, res) => {
  const currentItem = await service.getById(req.params.id)
  if (currentItem) {
    const item = req.body as FoodItem
    await service.update(item)
    console.log('Updating item with id: ', req.params.id)
    res.sendStatus(204)
  } else {
    console.log('Item does not exists')
    res.sendStatus(404)
  }
}) */






