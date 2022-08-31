const app = require("./server");
const MongoClient = require("mongodb");

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.FLYMATE_DB_URI, {
  poolSize: 50,
  writeConcern: { wtimeout: 2500 },
  useNewUrlParser: true
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
