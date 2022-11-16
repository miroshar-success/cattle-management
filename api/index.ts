const config = require(__dirname + "/src/config/config.js");
const PORT = config.server.port || 3001;
const app = require("./src/app");

app.listen(PORT, () => {
  console.log(
    "**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** "
  );
  console.log(`App listening on port ${PORT}`);
  console.log(
    "**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** "
  );
});
