const firebase = require('../services/firebase.service');
const database = firebase.getDatabase();

module.exports = (app) => {
  app.post('/api/coordinate', (request, response) => {
    console.log(request.body);
    const data = request.body;
    firebase.authenticateToken(data.token).then((decodedToken) => {
      if (!data.latitude || !data.longitude) {
        response.status(400).send('missing coordinate');
      }
      const uid = decodedToken.uid;
      const userReference = database.ref(`user/${uid}`);
      userReference.child('group').once('value', (groupData) => {
        if (!groupData.val()) {
          response.status(400).send('invalid group');
        }

        const group = groupData.val();
        const coordinate = database.ref(`group/${group}/members/${uid}/coordinates`).push({
          date: new Date().getTime(),
          latitude: data.latitude,
          longitude: data.longitude,
        });
        response.status(201).send(coordinate.key);
      });
    }).catch((error) => {
      console.log('Error authenticating token');
      response.status(400).send(error);
    });
  });
};
