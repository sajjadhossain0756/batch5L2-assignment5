import express, { Request, Response } from "express";
import { router } from "./app/routes";

const app = express()

app.use(express.json())

app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome To Our Parcel Delivery System"
    })
})

export default app;