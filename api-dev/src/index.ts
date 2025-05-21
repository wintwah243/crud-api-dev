import express from 'express';
import mongoose from 'mongoose';
import router from './routes/studentRoute';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const port = 4000;

// return value ပြန်စရာမရှိလို့ void ကိုသံုးတယ်
// Promise ကိုသံုးတာက typescript ကိုမှ async function မို့လို့
const connectDB = async (): Promise<void> => {
    try {
        const mongoUrl = process.env.MONGODB_URL_PATH;
        const dbName = process.env.MONGO_DBNAME;

        if (!mongoUrl || !dbName) {
            throw new Error('MongoDB connection configuration is missing');
        }

        await mongoose.connect(mongoUrl, {
            dbName: dbName,
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

connectDB();

app.use("/", router);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});
