import express, { Request, Response } from "express";

const app = express()



app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome To Our Parcel Delivery System"
  })
})

export default app;