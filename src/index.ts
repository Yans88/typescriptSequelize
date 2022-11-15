import express, {Request, Response} from "express";
import dotenv from "dotenv";
import router from "../src/routes/Routes"

dotenv.config();

const app = express();
app.use(express.json())
app.get("/", function (req: Request, res: Response) {
    return res.status(200).send({message: "express typescript"});
})

app.use(router)

app.listen(process.env.APP_PORT, () => console.log(`${process.env.APP_NAME} running on port ${process.env.APP_PORT}`));