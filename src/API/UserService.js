import HOST from "../constants/url";
import axios from "axios";

export default class UserService {
  static async getUser(phoneNumber) {
    console.log(phoneNumber);
    const response = await axios.post(`${HOST}/get-user`, phoneNumber);
    return response;
  }
}
