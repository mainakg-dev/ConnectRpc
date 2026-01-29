import type { ConnectRouter, HandlerContext } from "@connectrpc/connect";
import {
  ElizaService,
  type SayRequest,
} from "./gen/connectrpc/eliza/v1/eliza_pb.js";

export default (router: ConnectRouter) =>
  router.service(ElizaService, {
    async say(req: SayRequest, context: HandlerContext) {
      return {
        sentence: `You said: ${req.sentence}`,
      };
    },
  });
