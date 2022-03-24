const { build } = require('./app.js');
const { PORT, HOST } = require('./config');

const app = build({ logger: true });

app.listen(PORT, HOST, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
