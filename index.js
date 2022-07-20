import express from "express";
import { router as userRouter } from "./routers/user.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./openapi.json" assert { type: "json" };;

/* create an express app and use JSON */
const app = new express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", userRouter);

const port = 3000;
/* start the server */
app.listen(port, () => {
  console.log(`api: http://localhost:${port}/api-docs`);
});
