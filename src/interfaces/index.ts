import { FoodItem } from '../models'

/* export interface Dao<T> {
    getAll: () => Promise<T[]>
    getById: (id: string)  => Promise<T>
    create: (item: T) => Promise<void>
    update: (item: T) => Promise<void>
    delete: (id: string) => Promise<void>
} */

export { Dao } from './dao'

export interface GroceryService {
    getAll: () => Promise<FoodItem[]>
    getById: (id: string)  => Promise<FoodItem>
    create: (item: FoodItem) => Promise<void>
    update: (item: FoodItem) => Promise<void>
    delete: (id: string) => Promise<void>
}