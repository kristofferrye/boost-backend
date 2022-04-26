// CONTROLLER

import express from 'express'
import 'dotenv/config'
import { DefaultGroceryService } from './grocery-service'
import { InMemoryGroceryDao } from './in-memory-grocery-dao'
import { FoodItem } from './models'

const dao = new InMemoryGroceryDao()
const service = new DefaultGroceryService(dao)

const app = express()
const PORT = 8080
app.use(express.json())

app.get('/food-items', async(req, res) => {
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
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default server
