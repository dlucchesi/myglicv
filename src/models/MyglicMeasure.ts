import MyGlicUser from "./MyGlicUser.ts";

interface MyGlicMeasure {
  type: string
  id: number;
  isDeleted: boolean;
  isActive: boolean;
  dtEntry: Date;
  measureEntry: String;
  obs: string;
  user: MyGlicUser;
}
