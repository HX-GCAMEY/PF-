import app from "./server.js";
import pkg from "mongodb";
import FlightsDAO from "./DAO/flightsDAO.js";
import UsersDAO from "./DAO/usersDAO.js";
import TicketsDAO from "./DAO/ticketsDAO.js";

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5000;

const {MongoClient} = pkg;

MongoClient.connect(process.env.FLYMATE_DB_URI, {
  poolSize: 50,
  writeConcern: {wtimeout: 2500},
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })

  .then(async (client) => {
    await FlightsDAO.injectDB(client);
    await UsersDAO.injectDB(client);
    await TicketsDAO.injectDB(client);
    app.listen(port, host, () => {
      console.log(`Server online`);
    });
  });
