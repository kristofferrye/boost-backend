// DAO

import { Dao } from '../interfaces'
import { FoodItem, foodItemSchema } from '../models'
import mongoose, { Model } from 'mongoose'
import { CustomErrors, GroceryAppError } from '../error'

export class MongoDbDao implements Dao<FoodItem> {
    private model: Model<FoodItem>
    constructor() {
        this.model = mongoose.model('FoodItem', foodItemSchema)
    }

    private fromMongoDbToFoodItem(source: any): FoodItem {
        return {
            id: source.id,
            name: source.name,
            description: source.description,
            image: source.image,
            price: source.price,
            sugarfree: source.sugarfree,
            allergies: source.allergies
        }
    }

    async getAll ():Promise<FoodItem[]> {
        const items = await this.model.find()
        if (!items) {
            throw new GroceryAppError('Food item not found in MongoDb', CustomErrors.NOT_FOUND)
        }
        return items.map(item => this.fromMongoDbToFoodItem(item))
    }
    async getById (id: string):Promise<FoodItem> {
        const item = await this.model.findOne({id})
        if (!item) {
            throw new GroceryAppError('Food item not found in MongoDb', CustomErrors.NOT_FOUND)
        }
        return this.fromMongoDbToFoodItem(item)
    }
    async create (item: FoodItem):Promise<void> {
        try {
            await this.model.create(item)
        } catch (error) {
            return error
        }
    }
    async delete (id: string):Promise<void> {
        await this.model.findOneAndDelete({id})
    }
    async update (item: FoodItem):Promise<void> {
        await this.model.findOneAndUpdate({id:item.id}, item)
    }
}

// const myDao = new MongoDbDao()