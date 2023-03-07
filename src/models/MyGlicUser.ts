
export interface MyGlicUser {
  type: string
  id: number | null
  isDeleted: boolean
  isActive: boolean
  login: string
  passwd: string
}

export function createUser(params:MyGlicUser) {
  return {
    type: "userImp",
    id: params.id,
    isDeleted: params.isDeleted,
    isActive: params.isActive,
    login: params.login,
    passwd: params.passwd
  } as MyGlicUser
}

export function createUserAny(params:any) {
  return {
    type: "userImp",
    id: params.id,
    isDeleted: params.isDeleted,
    isActive: params.isActive,
    login: params.login,
    passwd: params.passwd
  } as MyGlicUser
}

export function createUserBlank() {
  return {
    type: "userImp",
    id: null,
    isDeleted: false,
    isActive: true,
    login: "",
    passwd: ""
  } as MyGlicUser
}