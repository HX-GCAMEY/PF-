let tickets;
export default class TicketsDAO {
    
    static async injectDB(conn) {
      if (tickets) {
        return;
      }
      try {
        tickets = await conn.db(process.env.FLYMATE_NS).collection("tickets");
      } catch (e) {
        console.error(`Unable to establish collection handles in userDAO: ${e}`);
      }
    }

    static async addFlightTicket(flightNumber, totalSeats,availableTickets){
      try {
        await tickets.insertOne({
          flight_id: flightNumber,
          totalTickets: totalSeats,
          availableTickets: availableTickets
        });
        return {success: true};
      } catch (error) {
        console.error(`Error occurred while adding new flight's ticket, ${error}.`);
        return {error: error};
      }
    }

    static async getAvailableTicket(flightNum){
      return await users.findOne({flight_id: flightNum});
    }

}