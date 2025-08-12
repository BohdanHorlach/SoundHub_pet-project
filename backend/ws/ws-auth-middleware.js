const url = require("url");
const { authenticateUserByToken } = require("../services/auth-service");


async function authenticateWsClient(client, request) {
  try {
    const { query } = url.parse(request.url, true);
    const token = query.token;
    client.user = await authenticateUserByToken(token);

    console.log("WS authenticated:", client.user);
    return true;
  } catch (err) {
    console.error("WS Auth failed:", err);
    client.close(4001, "Invalid token");
    return false;
  }
}


module.exports = { authenticateWsClient };