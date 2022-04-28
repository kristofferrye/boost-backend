// CONTROLLER

import 'dotenv/config'
import { connectToMongoDB } from './connection'
import { getExpressApp } from './controller'

const initServer = async () => {
  
  const PORT = (process.env.PORT || 8080)
  const app = getExpressApp()
  await connectToMongoDB()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

initServer()
