import {KeyValuePair} from './KeyValuePair'
import { UserDto } from './UserDto'

export interface MedicineToReturn {
    id : number
    name : string,
    description: string,
    quantity : number,
    imageUrl : string,
    postedAt : Date,
    category : KeyValuePair,
    user : UserDto


}
