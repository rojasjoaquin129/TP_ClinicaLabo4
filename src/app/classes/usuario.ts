export class Usuario {
  public id = "";
  public nombre = "";
  public email = "";
  public password = "";
  public foto = "../../assets/user.png";

  constructor() {
      this.id = Math.round(Math.random() * (100 - 1) + 1).toString();
  }
}
