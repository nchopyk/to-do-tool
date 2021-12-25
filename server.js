const { build } = require('./app.js');
const config = require('./config');

const app = build({ logger: true });

app.listen(config.PORT, config.HOST, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
