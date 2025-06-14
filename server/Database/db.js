import mongoose from 'mongoose'


const connection = async(username,password) =>{
    const URL = `mongodb+srv://${username}:${password}@blog.pasvjfq.mongodb.net/?retryWrites=true&w=majority&appName=Blog`;
    try {
        await mongoose.connect(URl,{useNewUrlParser:true});
        console.log('Database connected Successfully');
    } catch (error) {
        console.log('Error while connecting with the Database',error)
    }
}
export default connection;