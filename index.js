const express = require('express');
const app = express();
app.use(express.json());

require('./routes/group')(app);
require('./routes/coordinate')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Starting app on port ${port}`);
});
