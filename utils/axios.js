function handleAxiosError(error){
    let error_details;

    if(error.response){
      error_details = {
        type: "server-side",
        responseCode: error.response.status,
        statusText: error.response.statusText,
        message: "The server responded with some error"
      };
    }
    else if(error.request){
      error_details = { 
        type: "network",
        responseCode: 503,
        statusText: "No response received",
        message: "The request was made, but no response was received from the server."
      };
    }
    else{
      error_details = {
        type: "request",
        responseCode: 400,
        statusText: "Request setting error",
        message: error.message || "Something went wrong in setting up the request."
      };
    }

    return error_details;
}

module.exports = { handleAxiosError };