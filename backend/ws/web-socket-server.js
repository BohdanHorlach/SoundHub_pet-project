const { WebSocketServer } = require("ws");
const { authenticateWsClient } = require("./ws-auth-middleware");
const wsHandlers = require("./ws-handlers");


function onMessage(msg, client, wss) {
  try {
    const data = JSON.parse(msg);
    const handler = wsHandlers[data.type];

    if (handler) {
      handler(data, client, wss);
    } else {
      console.warn(`Unknown WS message type: ${data.type}`);
    }
  } catch (error) {
    console.error("Error processing message:", error);
  }
}


function initWebSocketServer(app) {
  const server = app.listen(process.env.WEB_SOCKET_PORT, () => console.log(`Web Socket Server started on port ${process.env.WEB_SOCKET_PORT}`));
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (client, request) => {
    const isAuthenticated = await authenticateWsClient(client, request);
    
    if (!isAuthenticated) {
      return;
    }
    wsHandlers.connection(client);

    client.on("message", (msg) => onMessage(msg, client, wss));
    client.on("close", () => wsHandlers.disconnection(client, wss));
  });
}


module.exports = initWebSocketServer;