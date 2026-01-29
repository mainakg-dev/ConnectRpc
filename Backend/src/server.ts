import express from "express";
import routes from "./connect.js";
import { expressConnectMiddleware } from "@connectrpc/connect-express";
import { createValidateInterceptor } from "@connectrpc/validate";
import cors from "cors";
import { cors as connectCors } from "@connectrpc/connect";

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: true,
  methods: [...connectCors.allowedMethods],
  allowedHeaders: [...connectCors.allowedHeaders],
  exposedHeaders: [...connectCors.exposedHeaders],
};

app.use(cors(corsOptions));
app.use(
  expressConnectMiddleware({
    interceptors: [createValidateInterceptor()],
    routes,
  }),
);

app.listen(8080, () => console.log("server is listening on 8080"));
