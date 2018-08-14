var admin = require('firebase-admin');
admin.initializeApp();

module.exports = {
  authenticateToken(token) {
    if (!token) return false;

    return admin.auth().verifyIdToken(token);
  },
  getAuth() {
    return admin.auth();
  },
  getDatabase() {
    return admin.database();
  },
};
