
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
  pricePerPerson?: number,
  canceled?: boolean,
  image?: string

}

export function createSeminar(id?: string, title?:string, shortDescription?:string,description?:string,category?:any,start?:string,end?:string,registrationEnd?:boolean,maxParticipants?:number,creator?:string,location?:string,
pricePerPerson?:number,canceled?:boolean,image?:string){

}

