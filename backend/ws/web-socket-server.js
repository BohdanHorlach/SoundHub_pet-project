const { WebSocketServer } = require("ws");
const editorsCardService = require("./editors-card-service");
const { authenticateWsClient } = require("./ws-auth-middleware");


function onMessage(msg, client, wss) {
  try {
    const data = JSON.parse(msg);

    if (data.type === "select_card" && data.cardId) {
      editorsCardService.selectCard(data.cardId, client);
      editorsCardService.updateAllClients(wss);
    } else {
      throw new Error(`Unknown WS message type: ${data.type}`);
    }
  } catch (error) {
    console.error("Error processing message:", error);
  }
}


function onClose(client, wss) {
  editorsCardService.handleClientDisconnect(client);
  editorsCardService.updateAllClients(wss);
}


function initWebSocketServer(app) {
  const server = app.listen(process.env.WEB_SOCKET_PORT, () => console.log(`Web Socket Server started on port ${process.env.WEB_SOCKET_PORT}`));
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (client, request) => {
    const isAuthenticated = await authenticateWsClient(client, request);
    
    if (!isAuthenticated) {
      return;
    }

    client.send(
      JSON.stringify({
        type: "editors_update",
        editors: editorsCardService.getEditorsData(),
      })
    );

    client.on("message", (msg) => onMessage(msg, client, wss));
    client.on("close", () => onClose(client, wss));
  });
}


module.exports = initWebSocketServer;