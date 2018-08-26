const firebase = require('../services/firebase.service');
const groupReference = firebase.getDatabase().ref('group');
const userReference = firebase.getDatabase().ref('user');

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
      response.status(400).send('Group required');
    }
    const user = data.user;
    if (!user) {
      response.status(400).send('User required');
    }
    // add to users
    userReference.child(`${user}`).set({
      group: group,
    });
    // add to group
    groupReference.child(`${group}/members/${user}`).set(true);
    if (data.isAdmin) {
      groupReference.child(`${group}/admininstrators/${user}`).set(true);
    }
    response.status(201).send({});
  });
};
