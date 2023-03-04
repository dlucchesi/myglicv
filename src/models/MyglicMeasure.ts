import { MyGlicUser } from "./MyGlicUser";

export interface MyGlicMeasure {
  type: string
  id: number
  isDeleted: boolean
  isActive: boolean
  dtEntry: Date
  measureEntry: number
  obs: string
  user: MyGlicUser
}
