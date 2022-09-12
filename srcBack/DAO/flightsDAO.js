let flights;
let flymate;

const DEFAULT_SORT = {defaultFare: -1};

export default class FlightsDAO {
  static async injectDB(conn) {
    if (flights) {
      return;
    }
    try {
      flymate = await conn.db(process.env.FLYMATE_NS);
      flights = await conn.db(process.env.FLYMATE_NS).collection("flights");
    } catch (error) {
      console.error(
        `Unable to establish a collection handle in moviesDAO: ${error}`
      );
    }
  }
  static async getConfiguration() {
    const roleInfo = await flymate.command({connectionStatus: 1});
    const authInfo = roleInfo.authInfo.authenticatedUserRoles[0];
    const {poolSize, writeConcern} = flights.s.db.serverConfig.s.options;
    let response = {
      poolSize,
      wtimeout: writeConcern.wtimeout,
      authInfo,
    };
    return response;
  }

  static async getAllFlights({filters = null} = {}) {
    let queryParams = {};
    let {query = {}, project = {}, sort = DEFAULT_SORT} = queryParams;
    let cursor;
    try {
      cursor = await flights
        .find(query)
        .project(project)
        .sort(sort);
    } catch (error) {
      console.error(`Unable to issue find command, ${error}`);
      return {flightList: []};
    }

    const displayCursor = cursor.limit(0);

    try {
      const flightList = await displayCursor.toArray();
      return {flightList};
    } catch (error) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${error}`
      );
      return {flightsList: []};
    }
  }

  static async getFlights({filters = null, page = 0, flightsPerPage = 5} = {}) {
    let queryParams = {};
    let {query = {}, project = {}, sort = DEFAULT_SORT} = queryParams;
    let cursor;
    try {
      cursor = await flights
        .find(query)
        .project(project)
        .sort(sort);
    } catch (error) {
      console.error(`Unable to issue find command, ${error}`);
      return {flightList: [], totalFlights: 0};
    }

    const displayCursor = cursor
      .limit(flightsPerPage)
      .skip(page * 5)
      .limit(5);

    try {
      const flightList = await displayCursor.toArray();
      const totalFlights = page === 0 ? await flights.countDocuments(query) : 0;
      return {flightList, totalFlights};
    } catch (error) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${error}`
      );
      return {flightsList: [], totalFlights: 0};
    }
  }

  static async getFlightsByRoute(departureCity, arrivalCity, departureDate) {
    try {
      let matchedFlights = [];
      let sameDateFlights = [];
      const pipeline1 = [
        {
          $match: {
            "departure.city": departureCity,
            "arrival.city": arrivalCity,
            "departure.date": departureDate,
          },
        },
        {
          $sort: DEFAULT_SORT,
        },
      ];

      matchedFlights = await flights.aggregate(pipeline1).toArray();

      const pipeline2 = [
        {
          $match: {
            "departure.city": departureCity,
            "arrival.city": arrivalCity,
            "departure.date": {
              $ne: departureDate,
            },
          },
        },
        {
          $sort: {
            "departure.date": 1,
          },
        },
      ];
      sameDateFlights = await flights.aggregate(pipeline2).toArray();

      return {matchedFlights, sameDateFlights};
    } catch (error) {
      console.error(`Unable to issue find flights, ${error}`);
      throw error;
    }
  }

  static async getCities() {
    let cities;
    try {
      cities = await flights.distinct("departure.city");
      return cities;
    } catch (error) {
      console.error(`Unable to issue find command, ${error}`);
      return (cities = []);
    }
  }

  static async getFlightByID(flight_id) {
    try {
      const pipeline = [
        {
          $match: {
            $expr: {$eq: ["$_id", {$toObjectId: flight_id}]},
          },
        },
        {
          $project: {
            _id: 0,
            number: 1,
            totalSeats: 1,
            defaultFare: 1,
          },
        },
      ];
      return await flights.aggregate(pipeline).next();
    } catch (error) {
      console.error(`Unable to issue find command, ${error}`);
    }
  }
}
