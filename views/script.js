async function getResponse() {
  const endpoint = document.querySelector('select[name="endpoint"]').value;
  const inputString = document.querySelector("#inputString").value;

  // Access the API URL from the server-side
  const apiUrl = "#{apiUrl}";

  try {
    const response = await fetch(`${apiUrl}/api/${endpoint}`, {
      method: "POST",
      body: JSON.stringify({
        inputString: inputString,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    const transformedString = json.result;
    document.querySelector("#responseBox").textContent = transformedString;
  } catch (exception) {
    alert(
      "Error executing regex, try again later! Contact developer for support"
    );
    throw exception;
  }
}

function enableButton() {
  const inputString = document.querySelector("#inputString").value;
  document.querySelector("#getResponseButton").disabled =
    inputString.length > 0 ? false : true;
}
