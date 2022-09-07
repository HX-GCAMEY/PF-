import FlightsDAO from "../../DAO/flightsDAO.js";

export default class FlightsControler {
  static async apiGetFlights(req, res, next) {
    const FLIGHTS_PER_PAGE = 3;
    const {flightList, totalFlights} = await FlightsDAO.getFlights();
    let response = {
      flights: flightList,
      page: 0,
      filters: {},
      entries_per_page: FLIGHTS_PER_PAGE,
      total_results: totalFlights,
    };
    res.json(response);
  }

  static async apiGetFlightsByRoute(req, res, next) {
    try {
      let {departureCity, arrivalCity, departureDate} = req.query;
      let flight = await FlightsDAO.getFlightsByRoute(
        departureCity,
        arrivalCity,
        departureDate
      );
      if (!flight) {
        res.status(404).json({error: "Not found"});
        return;
      }
      res.json(flight);
    } catch (error) {
      console.log(`api, ${error}`);
      res.status(500).json({error: error});
    }
  }

  static async apiGetFlightsPage(req, res, next) {
    const FLIGHTS_PER_PAGE = 3;
    let page;
    try {
      page = req.query.page ? parseInt(req.query.page, 10) : 0;
    } catch (error) {
      console.error(`Got bad value for page:, ${error}`);
      page = 0;
    }
    const {flightList, totalFlights} = await FlightsDAO.getFlights({
      page,
      FLIGHTS_PER_PAGE,
    });
    let response = {
      flights: flightList,
      page: page,
      entries_per_page: FLIGHTS_PER_PAGE,
      total_results: totalFlights,
    };
    res.json(response);
  }

  static async apiGetCities(req, res){
    const citiesList = await FlightsDAO.getCities();
    let response = citiesList;
    res.json(response);
  }
}
