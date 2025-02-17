/**
 * Perform bulk operation of multiple validation/transformation functions given data and corresponding function calls
 * 
 * Each operations object must have an operation name that matches the function call used for the corresponding api route
 * To make this easy to use, all api route names should match their function name (i.e. /isEmail has a function called isEmail())
 * 
 * The object will be a JSON object with an operations key and a value with an array of operations
 * 
 * Each entry in the array will be a JSON object. Each entry will be required to have an operation key and a value 
 * for the operation (function) to be called.
 * Any additonal arguments to the function can be passed as key value pairs as well, where the key is the arg name 
 * and the value is the arg value. 
 * 
 * ---
 * Example operations object input: 
 * 
 * {
 *  operations: [
 *      {
 *          "1234.021a": [{operation: "isNumber"}, {operation: "isAlphaNumeric"}], 
 *          "test1234@gmail.com", [{operation: "excludeTheseCharacters", excludeTheseCharacters: ["1", "2"]}, {operation: "isEmail"}]
 *      }
 *  ]
 * }
 * ---
 * 
 * We have to take the string value of the functions passed and call them with the arguments. 
 * 
 * For example:
 * ---
 * If [{operation: "excludeTheseCharacters", excludeTheseCharacters: ["1", "2"]} is passed in as an operation,
 * we want to call this function with the args by using the Function constructor. We don't want to create a duplicate fn. 
 * Just want to create a Function to return the result of this one. 
 * 
 * The resulting code may look like the following:
 * 
 * new Function("return excludeTheseCharacters(["1", "2"]"}
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
 * ---
 * 
 * @param {*} operationsObject 
 */
function bulkOperation(operationsObject) {

    try {

        const { operations} = operationsObject

        

    }

}


module.exports = bulkOperation