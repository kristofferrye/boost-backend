import mongoose from "mongoose"

const connectToMongoDB = async (): Promise<void> => {
    // mongoose.connect('mongodb+srv://kruzty:ES0lCrDKRuv5UhAQ@cluster0.pr1hh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
}

export { connectToMongoDB }