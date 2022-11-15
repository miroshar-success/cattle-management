import db from "./src/models";
const config = require(__dirname + "/src/config/config.js");
const PORT = config.server.port || 3001;
const app = require("./src/app");

// Primero sincroniza con la database, y luego levanta el servidor :
db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(
      "**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** "
    );
    console.log(`App listening on port ${PORT}`);
    console.log(
      "**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** "
    );
  });
});
