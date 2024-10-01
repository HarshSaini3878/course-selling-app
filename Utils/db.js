import mongoose from 'mongoose';
import chalk from 'chalk';

async function dbconnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(chalk.green("Database connected successfully!"));
    } catch (error) {
        console.error(chalk.red("Database connection failed:", error));
    }
}

export default dbconnect;
