import TicketsDAO from "../../DAO/ticketsDAO.js";
import FlightsDAO from "../../DAO/flightsDAO.js";

const basic = 1;
const business = 1.8;
const premium = 2.2;

export default class TicketsController {
  static async purchase(req, res) {
    try {
      let newTicket, newFare;
      let availableTickets = 0;
      const ticketsFromBody = req.body;
      const flightData = await FlightsDAO.getFlightByID(
        ticketsFromBody.flightId
      );

      if (ticketsFromBody && flightData.number) {
        switch (ticketsFromBody.type) {
          case "business":
            newFare = flightData.defaultFare * business;
            break;
          case "premium":
            newFare = flightData.defaultFare * premium;
            break;
          default:
            newFare = flightData.defaultFare * basic;
            break;
        }
        newTicket = {
          user_id: ticketsFromBody.email,
          flight_id: flightData.number,
          fare: newFare,
          type: ticketsFromBody.type,
        };
      }

      let flight = await TicketsDAO.getFlightTicket(flightData.number);
      let insertResult;
      if (flight) {
        insertResult = await TicketsDAO.addNewFlightTicket(
          flightData.number,
          flightData.totalSeats
        );
      }

      availableTickets = await TicketsDAO.getAvailableTicket(flightData.number);
      if (availableTickets > 0) {
        insertResult = await TicketsDAO.addFlightTicket(
          newTicket,
          availableTickets
        );
        res.json(insertResult);
        return;
      } else {
        res.status(400).json({error: "No more available tickets."});
      }
    } catch (e) {
      res.status(500).json({error: e});
    }
  }

  static async cancel(req, res) {
    try {
      let {ticketId} = req.body;
      if (!(await TicketsDAO.compareTicket(ticketId))) {
        res.status(401).json({error: "The ticket number is not correct."});
        return;
      }
      let {availableTickets} = await TicketsDAO.compareTicket(ticketId);
      const deleteResult = await TicketsDAO.deleteTicket(
        ticketId,
        availableTickets
      );
      let {error} = deleteResult;
      if (error) {
        res.status(500).json({error});
        return;
      }
      res.json(deleteResult);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async send(req, res) {
    try {
      let {email} = req.params;

      const result = await TicketsDAO.getTicket(email);

      let tickets = result.map((e) => {
        let flightID = e.flight_id;
        let ticket = e.tickets.map((t) => {
          return {
            _id: t._id,
            flight_id: flightID,
            type: t.type,
            fare: t.fare,
          };
        });
        return ticket;
      });

      res.json(tickets.flat());
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getPackages(req, res) {
    try {
      let all = await TicketsDAO.getAllPackages();
      res.json(all);
      return;
    } catch (error) {
      res.status(500).json({error});
    }
  }

  static async apiGetPackageByCode(req, res, next) {
    try {
      const {code} = req.params;
      let report = await TicketsDAO.getPackageByCode(code);
      res.json(report);
      return;
    } catch (error) {
      res.status(500).json({error});
    }
  }

  static async createPackage(req, res) {
    try {
      const {
        code,
        startDate,
        endDate,
        origin,
        destination,
        airport,
        price,
        amount,
        description,
      } = req.body;

      let result = await TicketsDAO.addPackage(
        code,
        startDate,
        endDate,
        origin,
        destination,
        airport,
        price,
        amount,
        description
      );

      if (!result.success) {
        res.status(400).send("Error in creating Package");
        return;
      }
      res.status(200).send("Creation");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
