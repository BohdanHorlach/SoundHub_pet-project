const WebSocket = require("ws");

class EditorsCardService {
  #editors = new Map();
  #selectedCards = new Map();

  
  selectCard(cardId, client) {
    const oldCardId = this.#selectedCards.get(client);
    if (oldCardId && oldCardId !== cardId) {
      this.removeClientFromCard(oldCardId, client);
    }

    if (!this.#editors.has(cardId)) {
      this.#editors.set(cardId, new Set());
    }
    this.#editors.get(cardId).add(client);

    this.#selectedCards.set(client, cardId);
  }


  removeClientFromCard(cardId, client) {
    const clients = this.#editors.get(cardId);
    if (!clients) return;

    clients.delete(client);
    if (clients.size === 0) {
      this.#editors.delete(cardId);
    }

    if (this.#selectedCards.get(client) === cardId) {
      this.#selectedCards.delete(client);
    }
  }


  handleClientDisconnect(client) {
    const cardId = this.#selectedCards.get(client);
    if (cardId) {
      this.removeClientFromCard(cardId, client);
    }
  }


  getEditorsData() {
    return Object.fromEntries(
      [...this.#editors.entries()].map(([cardId, clients]) => [
        cardId,
        [...clients].map((client) => ({
          id: client.user.id,
          name: client.user.name,
          avatar: client.user.avatar,
        })),
      ])
    );
  }
}

module.exports = new EditorsCardService();
