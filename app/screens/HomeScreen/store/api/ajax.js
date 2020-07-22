const ajax = async (url, options = {}) => {
  let response = await fetch(url, options); // resolves with response headers
  let result = await response.json(); // read body as json
  return result;
};

export default ajax;
