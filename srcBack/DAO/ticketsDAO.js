import { ObjectId } from "bson";

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

    static async addNewFlightTicket(number, totalTickets){
      try{
        await tickets.insertOne(
          {
            flight_id: number,
            totalTickets: totalTickets,
            availableTickets: totalTickets
          }
        )
        return {success: true};
      }catch(e){
        console.error(`Error occurred while adding new flight's ticket, ${error}.`);
        return {error: error};
      }
    }

    static async addFlightTicket({flight_id, user_id, type, fare}, availableTickets){
      try {
        await tickets.updateOne(
          {
            flight_id: flight_id,
          },{ 
            $set :
            {
              availableTickets: availableTickets -1
            },
            $addToSet:
            {
              tickets:                    
                {
                  _id: (ObjectId(Math.random(1)*1000000000)).toString().replace(/[^0-9]/g,''),
                  user_id: user_id,
                  type: type,
                  fare: fare
                }
            }  
          },{
          upsert: true
          }
        );
        return {success: true};
      } catch (error) {
        console.error(`Error occurred while adding new ticket, ${error}.`);
        return {error: error};
      }
    }

    static async getAvailableTicket(flightNum){
      const flightTicket = await tickets.findOne({flight_id: flightNum});
      return flightTicket.availableTickets;
    }

    static async getFlightTicket(flightNum){
      const flightTicket = await tickets.findOne({flight_id: flightNum});
      if(flightTicket == null) return true;
      return false
    }

    static async compareTicket(ticket_id){
      const pipeline = [
        {
          '$match': {
            'tickets': {
              '$elemMatch': {
                '_id': ticket_id
              }
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'availableTickets': 1
          }
        }
      ];
      if(!(await tickets.aggregate(pipeline).hasNext())) return false
      return await tickets.aggregate(pipeline).next();
    }

    static async deleteTicket(ticket_id, availableTickets){
      try{
        await tickets.updateOne(
          {
            'tickets': {
              '$elemMatch': {
                '_id': ticket_id
              }
            }
          },{
            $set:{
              "availableTickets": availableTickets + 1
            },
            $pull:{
                "tickets": {
                  "_id": ticket_id
                }
            }
          });
        return {success: true}
      }catch(error){
        console.error(`An error ocurred while deleting ticket ${error}`);
        return {error: error};
      }
    };

    static async getTicket(email){
      const pipeline = [
        {
          '$match': {
            'tickets': {
              '$elemMatch': {
                'user_id': email
              }
            }
          }
        },{
          '$project': {
            '_id': 0,
            'flight_id': 1,
            'tickets._id': 1,
            'tickets.type': 1,
            'tickets.fare': 1
          }
        }
      ];
      return await tickets.aggregate(pipeline).toArray()
    };
}