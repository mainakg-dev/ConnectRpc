import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDef = protoLoader.loadSync(path.join(__dirname, "eliza.proto"));

const gRPCObject = grpc.loadPackageDefinition(packageDef) as any;

const server = new grpc.Server();

server.addService(gRPCObject.connectrpc.eliza.v1.ElizaService.service, {
  Say: (
    call: { request: { sentence: any } },
    callback: (arg0: null, arg1: { sentence: any }) => void,
  ) => {
    callback(null, { sentence: call.request.sentence });
  },
});

server.bindAsync("0.0.0.0:9090", grpc.ServerCredentials.createInsecure(), () =>
  console.log("started"),
);
