// Custom Library

class PicDay {
  // GET Request
  async get(url) {
    const response = await fetch(url);
    const respData = await response.json();
    return respData;
  }
}
