import TicketsDAO from "../../DAO/ticketsDAO.js";

export class Ticket {
  constructor({email, flightNumber, fare, seat, type}) {
    this.user_id = email;
    this.flight_id = flightNumber;
    this.fare = fare;
    this.seat = seat;
    this.type = type;
  }
}

export default class TicketsController {
  static async purchase(req, res) {
    try{
      const ticketsFromBody = req.body;
      let availableTickets = await TicketsDAO.getAvailableTicket(ticketsFromBody.flightNumber);
      if(availableTickets > 0){
        const insertResult = await TicketsDAO.addFlightTicket(
            ticketsFromBody.flightNumber,
            ticketsFromBody.totalSeats,
            availableTickets
          );
      }
      res.json(insertResult);
    }catch(e){
      res.status(500).json({error: e});
    }
  }
}
