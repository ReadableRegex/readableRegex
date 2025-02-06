async function getResponse() {
    const endpoint = document.querySelector('select[name="endpoint"]').value
    const inputString = document.querySelector('#inputString').value

    //TODO add env variables to dynamically load the right url
    // local dev  url: DO NOT COMMIT THIS TO PROD
    // const baseUrl = 'http://localhost:3000/api/'
    // prod url
    const baseUrl = 'https://readable-regex-8d81b79167bf.herokuapp.com/api/'

    try {
        const response = await fetch(baseUrl + endpoint, {
            method: 'POST',
            body: JSON.stringify({
                inputString: inputString
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()
        const transformedString = json.result
        document.querySelector('#responseBox').textContent = transformedString

    }
    catch (exception) {
        alert('Error executing regex, try again later! Contact developer for support')
        throw exception
    }
}

function enableButton() {
    const inputString = document.querySelector('#inputString').value
    document.querySelector('#getResponseButton').disabled = inputString.length > 0 ? false : true
}