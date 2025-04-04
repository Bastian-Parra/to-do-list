import mongoose from 'mongoose';
import config from '../config/config.js';

const connectDB = async () => {
    const uri = `mongodb+srv://${config.user}:${config.password}@${config.cluster}/to-do-list?retryWrites=true&w=majority`;
    
    console.log("Intentando conectar con URI:", uri.replace(config.password, '***'));

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

connectDB()

export default connectDB