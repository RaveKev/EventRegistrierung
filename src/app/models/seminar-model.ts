
/**
 * Created by busch on 11.09.2017.
 */
export interface Seminar{
  id?: string,
  title?: string,
  shortDescription?: string,
  description?: string,
  category?: any,
  start?: string,
  end?: string,
  registrationEnd?: string,
  maxParticipants?: number,
  creator?: string,
  location?: string,
  pricePerSeat?: number,
  canceled?: boolean,
  image?: string,
  organizer?: any,
  lead?: string,
  targetGroup?: string,
  preBookedSeats?: number,
  seats?: number,
  seatsBooked?: number,
  seatsOccupied?: number,
  itemNumber?: string

}

export function createSeminar(id?: string, title?:string, shortDescription?:string,description?:string,category?:any,start?:string,end?:string,registrationEnd?:boolean,maxParticipants?:number,creator?:string,location?:string,
                              pricePerSeat?:number,canceled?:boolean,image?:string, organizer?:any, lead?:string, targetGroup?:string, preBookedSeats?:number, seats?:number, seatsBooked?:number, seatsOccupied?:number, itemNumber?:string){

}

