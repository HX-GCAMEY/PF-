import TicketsDAO from "../../DAO/ticketsDAO.js";
import FlightsDAO from "../../DAO/flightsDAO.js";

const basic = 1;
const business = 1.8;
const premium = 2.2;

export default class TicketsController {
  static async purchase(req, res) {
    console.log("purchasing");
    try {
      let newTicket, newFare;
      let availableTickets = 0;
      const {email, ticket} = req.body;
      const {flyId, defaultFare, type, passengers} = ticket;
      const flightData = await FlightsDAO.getFlightByID(flyId);

      if (ticket && flyId){
        switch (type) {
          case "business":
            newFare = Math.floor(defaultFare * business * passengers);
            break;
          case "premium":
            newFare = Math.floor(defaultFare * premium * passengers);
            break;
          default:
            newFare = defaultFare * basic * passengers;
            break;
        }
        newTicket = {
          email: email,
          flight_id: flyId,
          departDate: flightData.departure.date,
          arrivalDate: flightData.arrival.date,
          fare: newFare,
          type: type,
          passengers: passengers
        };
      }

      let flight = await TicketsDAO.getFlightTicket(flyId);
      let insertResult;
      if (flight) {
        insertResult = await TicketsDAO.addNewFlightTicket(
          flyId,
          flightData.totalSeats
        );
      }

      availableTickets = await TicketsDAO.getAvailableTicket(flyId);
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
      const {code, flight_id, amount, description, endDate} = req.body;

      let result = await TicketsDAO.addPackage(
        code,
        flight_id,
        amount,
        description,
        endDate
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
