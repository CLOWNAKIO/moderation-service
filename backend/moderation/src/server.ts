import express, { Express, Response } from "express";

import toxic_router from "./toxicity";

const app: Express = express();
const port: number = 8000;

app.get("/", (_, res: Response) => {
    res.status(200).send("Hello World!");
});

app.use("/api", toxic_router);

app.listen(port, '0.0.0.0', () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});