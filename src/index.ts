import "dotenv/config";
import { createServer } from "./infraestructure/webserver/server";

(async () => {
  const server = createServer();
  const port = <number>(process.env.PORT || 3000);

  await server.start(port);
})();
