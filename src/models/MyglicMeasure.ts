import { MyGlicUser, createUserBlank } from "./MyGlicUser";

export interface MyGlicMeasure {
  type: string
  id: number | null
  isDeleted: boolean
  isActive: boolean
  dtEntry: Date
  measureEntry: number
  obs: string
  user: MyGlicUser
}

export function createMeasure(params:MyGlicMeasure) {
  return {
    type: "measureImp",
    id: params.id,
    isDeleted: params.isDeleted,
    isActive: params.isActive,
    dtEntry: params.dtEntry,
    measureEntry: params.measureEntry,
    obs: params.obs,
    user: params.user
  } as MyGlicMeasure
}

export function createMeasureAny(params:any) {
  return {
    type: "measureImp",
    id: params.id,
    isDeleted: params.isDeleted,
    isActive: params.isActive,
    dtEntry: params.dtEntry,
    measureEntry: params.measureEntry,
    obs: params.obs,
    user: params.user
  } as MyGlicMeasure
}

export function createMeasureBlank() {
  return {
    type: "measureImp",
    id: null,
    isDeleted: false,
    isActive: true,
    dtEntry: new Date(),
    measureEntry: 0,
    obs: "",
    user: createUserBlank()
  } as MyGlicMeasure
}
