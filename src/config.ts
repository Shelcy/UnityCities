import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        traininglab: {
            host: process.env.BD_HOST,
            username: process.env.BD_USER,
            password: process.env.BD_PASS,
            database: process.env.BD_DATABASE,
            port: process.env.BD_PORT 
        }

    }
});
