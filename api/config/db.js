import mongoose from 'mongoose';



export const connectMongoDB = async () => {

    try{
        let connect = await mongoose.connect(process.env.MONGO_STRING)
        console.log(`Mongo connected successful HOST : ${ connect.connection.host }`.bgMagenta.black);

    }catch( error ){
        console.log(error);
    }

};