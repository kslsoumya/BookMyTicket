/* response generation library for api */
let generate = (key,data) => {
  let response ={};
  
     response[key] = data;
    return response
  }
  
  module.exports = {
    generate: generate
  }
  