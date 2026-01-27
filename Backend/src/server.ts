import http from "http";
import express from "express";
import routes from "./connect.js";
import { expressConnectMiddleware } from "@connectrpc/connect-express";
import { createValidateInterceptor } from "@connectrpc/validate";
import cors from "cors";
import { cors as connectCors } from "@connectrpc/connect";

const app = express();

const corsOptions: cors.CorsOptions = {
  // Reflects the request origin. This should only be used for development.
  // Production should explicitly specify an origin
  origin: true,
  methods: [...connectCors.allowedMethods],
  allowedHeaders: [...connectCors.allowedHeaders],
  exposedHeaders: [...connectCors.exposedHeaders],
};

app.use(cors(corsOptions));
app.use(
  expressConnectMiddleware({
    // Validation via Protovalidate is almost always recommended
    interceptors: [createValidateInterceptor()],
    routes,
  }),
);

http.createServer(app).listen(8080);
