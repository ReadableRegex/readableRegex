const axios = require("axios");
const {  handleAxiosError  } = require("./axios");

class urlUtils {
    static async isUrlReachable(inputString){
        try{
            const response = await axios.get(inputString, {
                timeout: 5000,
                maxRedirects: 5,
                validateStatus: function (status) {
                    return status < 500;
                }
            });

            return {
                responseCode: response.status,
                statusText: response.statusText
            };     
        }
        catch(error){
            return handleAxiosError(error);
        };
    };    
};

module.exports = { urlUtils };