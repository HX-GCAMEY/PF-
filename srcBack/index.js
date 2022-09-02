import app from "../srcBack/server.js";
import pkg from "mongodb";
import FlightsDAO from "./DAO/flightsDAO.js";
import UsersDAO from "./DAO/usersDAO.js";

const port = process.env.PORT || 8000;
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
    await UsersDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
