// Decode: A token gets returned to the frontend when a user is successfully logged in
// and must be stored in the local storage and decoded
import decode from "jwt-decode";

//Create class in order to manage the local storage for the token when user logs in
class AuthService {
  getProfile() {
    // Decode the token when getToken() got the id from the local storage
    return decode(this.getToken());
  }

  // Check if a user is logged in: if get token is not undefined the user is logged in
  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // Check if token is expried (Time set to 2h in backend)
  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  // Get token when user is logged in from local storage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // When the user logs in, the id token gets stored in the local storage
  login(idToken) {
    console.log(idToken)
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // When the user logs out, the id token gets removed from the local storage
  logout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}

export default new AuthService();
