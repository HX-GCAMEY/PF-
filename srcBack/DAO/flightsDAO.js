let flights;
let flymate;

const DEFAULT_SORT = [["price", -1]];

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

  static async getFlights({filters = null, page = 0, flightsPerPage = 4} = {}) {
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

  static async getFlightsByRoute(departureCity, arrivalCity) {
    try {
      const pipeline = [
        {
          $match: {
            departureCity: departureCity,
          },
        },
        {
          $match: {
            arrivalCity: arrivalCity,
          },
        },
        {
          $project: {},
        },
        {$sort: {DEFAULT_SORT}},
      ];
      return await flights.aggregate(pipeline).next();
    } catch (error) {
      console.error(`Unable to issue find flights, ${error}`);
      throw error;
    }
  }
}
