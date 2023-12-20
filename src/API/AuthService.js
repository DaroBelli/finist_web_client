import HOST from "../constants/url";
import axios from "axios";

export default class AuthService {
  static async checkLoginInfo(loginInfo) {
    const response = await axios.post(`${HOST}/check-loginning`, loginInfo);
    return response;
  }
}
