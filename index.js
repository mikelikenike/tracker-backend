const express = require('express');
const app = express();
app.use(express.json());

require('./routes/user')(app);
require('./routes/group')(app);
require('./routes/coordinate')(app);

app.listen(5000, () => {
  console.log('Starting app');
});
