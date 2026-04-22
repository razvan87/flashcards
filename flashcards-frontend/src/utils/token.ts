export function parseJwt(token: string) {
    try {
      const base64Payload = token.split(".")[1];
      const payload = atob(base64Payload);
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }
  
  export function getToken() {
    return localStorage.getItem("token");
  }
  
  export function setToken(token: string) {
    localStorage.setItem("token", token);
  }
  
  export function removeToken() {
    localStorage.removeItem("token");
  }