const firebase = require('../services/firebase.service');
const userReference = firebase.getDatabase().ref('user');

module.exports = (app) => {
  // add user
  app.post('/api/user', (request, response) => {
    const data = request.body;
    if (!data.user) {
      response.status(400).send('user required');
    } else if (!data.group) {
      response.status(400).send('group required');
    }
    const newUser = userReference.child(`${data.user}`).set({
      group: data.group,
    });
    response.status(201).send({});
  });
};
