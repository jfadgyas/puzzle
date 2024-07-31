import mongoose from "mongoose";

let isConnected 

const dbConnect = async () => {

    if (isConnected) return console.log('Already connected')
    
    // Simple mongoose connection
    try{
        const connection = await mongoose.connect(process.env.URI)
        console.log(`Connected to db: ${connection.connections[0].name}`)
        isConnected = connection.connections[0].readyState
        return connection
    }
    catch(err){
        return err.message
    }
}

export default dbConnect