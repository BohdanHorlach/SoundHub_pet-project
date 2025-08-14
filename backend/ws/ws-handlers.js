const WebSocket = require("ws");
const editorsCardService = require("./editors-card-service");

function getEditorsPayload() {
  return JSON.stringify({
    type: "editorsUpdate",
    editors: editorsCardService.getEditorsData(),
  });
}


function updateAllClients(wss, payload) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}


module.exports = {
  connection: (client) => {
    client.send(getEditorsPayload());
  },


  disconnection: (client, wss) => {
    editorsCardService.handleClientDisconnect(client);
    const payload = getEditorsPayload();
    updateAllClients(wss, payload);
  },


  selectCard: (data, client, wss) => {
    if (!data.cardId) 
      return;

    editorsCardService.selectCard(data.cardId, client);
    const payload = getEditorsPayload();
    updateAllClients(wss, payload);
  },


  removeCard: (data, client, wss) => {
    if (!data.cardId) 
      return;

    const payload = JSON.stringify({
      type: "cardRemoved",
      cardId: data.cardId
    });

    editorsCardService.removeClientFromCard(data.cardId, client);
    updateAllClients(wss, payload);
  }
};
