const { admin } = require("../config/firebase-config");
const User = require("../models/user-model");
const UserDTO = require("../dtos/user-dto");


async function authenticateUserByToken(token) {
  if (!token) 
    throw new Error("No token provided");

  const decodedToken = await admin.auth().verifyIdToken(token);
  const uid = decodedToken.uid;

  let user = await User.findOne({ where: { firebaseUid: uid } });
  if (!user) {
    user = await User.create({
      firebaseUid: uid,
      name: decodedToken.name || "Unnamed",
      avatar: decodedToken.picture || null,
    });
  }

  return new UserDTO(user);
}

module.exports = { authenticateUserByToken };
