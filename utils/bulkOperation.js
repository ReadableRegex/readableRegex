const ValidationFunctions = require("../validationFunctions")

/**
 * Perform bulk operation of multiple validation/transformation functions given data and corresponding function calls
 * 
 * Each operations object must have an operation name that matches the function call used for the corresponding api route
 * To make this easy to use, all api route names should match their function name (i.e. /isEmail has a function called isEmail())
 * 
 * 
 * ---
 * Example operations object input: 
 * 
 * {
 *  operationSet: [
 *      {
 *          value: "1234.021a",
 *          operations: [{operation: "isNumber"}, {operation: "isAlphaNumeric"}], 
 *          getAndBooleanResult: true,
 *          getOrBooleanResult: false
 *      },
 *      {
 *          value: "test1234@gmail.com", 
 *          operations: [{operation: "excludeTheseCharacters", excludeTheseCharacters: ["1", "2"]}, {operation: "isEmail"}]
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
 * @param operationsObject 
 */
const bulkOperation = (operationSet) => {
    const bulkOperationsResultObject = {
        results: []
    }
    operationSet.forEach((operationMetadataObject) => {
        const value = operationMetadataObject.value
        const operationsArray = operationMetadataObject.operations

        let resultForValueObject = {
            originalValue: value,
            results: [],
        }

        operationsArray.forEach((operationForValueObject) => {
            const { operation } = operationForValueObject
            // index the function from a class by it's name and invoke it
            const result = ValidationFunctions[operation](value)
            resultForValueObject.results.push({
                operation: operation,
                result: result
            })
        })
        if(operationMetadataObject.getAndBooleanResult) {
            resultForValueObject.andBooleanResult = resultForValueObject.results.every(resultObject => resultObject.result === true)
        }
        if(operationMetadataObject.getOrBooleanResult) {
            resultForValueObject.orBooleanResult = resultForValueObject.results.some(resultObject => resultObject.result === true)
        }
        bulkOperationsResultObject.results.push(resultForValueObject)
        
    })

    return bulkOperationsResultObject
}

module.exports = bulkOperation;