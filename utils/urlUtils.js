const axios = require("axios");
const {  axios_Error_handling  } = require("./axios");

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
            return axios_Error_handling(error);
        };
    };    
};

module.exports = { urlUtils };