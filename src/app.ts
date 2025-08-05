import express, { Request, Response } from "express";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import cors from "cors";
import { notFound } from "./app/middlewares/notFound";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome To Our Parcel Delivery System"
    })
})

app.use(globalErrorHandler);
app.use(notFound)

export default app;