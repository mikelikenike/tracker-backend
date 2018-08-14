const firebase = require('../services/firebase.service');
const groupReference = firebase.getDatabase().ref('group');

module.exports = (app) => {
  // add group
  app.post('/api/group', (request, response) => {
    const newGroup = groupReference.push();
    newGroup.set(request.body);
    response.status(201).send(newGroup.key);
  });

  // add member to group
  app.post('/api/group/member', (request, response) => {
    const data = request.body;
    const group = data.group;
    if (!group) {
      response.status(400).send('No group');
    }
    const user = data.user;
    if (!user) {
      response.status(400).send('No user');
    }
    groupReference.child(`${group}/members/${user}`).set(true);
    if (data.isAdmin) {
      groupReference.child(`${group}/admininstrators/${user}`).set(true);
    }
    response.status(200).send({});
  });
};
