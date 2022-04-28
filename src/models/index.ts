import mongoose from "mongoose"
import { Mongoose } from 'mongoose'

type FoodItem = {
    id: string
    name: string
    description: string
    image: string
    price: number
    sugarfree: Boolean
    allergies: string[]
}

const foodItemSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    image: String,
    price: Number,
    sugarfree: Boolean,
    allergies: [String]
})

export { foodItemSchema, FoodItem }