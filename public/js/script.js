const operations = [
  { value: "onlyNumbers", label: "Only Numbers" },
  { value: "onlyLetters", label: "Only Letters" },
  { value: "onlySpecialCharacters", label: "Only Special Characters" },
  { value: "isEmailAddress", label: "Is Email Address" },
  { value: "isPhoneNumber", label: "Is Phone Number" },
  { value: "trim", label: "Trim" },
  { value: "isInteger", label: "Is Integer" },
  { value: "isAlphaNumeric", label: "Is Alpha Numeric" },
  { value: "isHexadecimal", label: "Is Hexadecimal" },
  { value: "isDecimal", label: "Is Decimal" },
  { value: "isLowercase", label: "Is Lowercase" },
  { value: "isDate", label: "Is Date" },
  { value: "isAllCaps", label: "Is AllCaps" },
  { value: "isUrl", label: "Is Url" },
  { value: "isBinaryString", label: "Is Binary String" },
  { value: "isBoolean", label: "Is Boolean" },
  { value: "isCountry", label: "Is Country" },
  { value: "isValidStateCode", label: "Is Valid State Code" },
];

async function getResponse() {
  const inputString = document.querySelector("#inputString").value;
  const endpoint = document.querySelector('select[name="endpoint"]').value;

  if (!endpoint) {
    alert("Please select an operation first");
    return;
  }

  // Use window.location.origin to get the base URL
  const baseUrl = window.location.origin;

  try {
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
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

function renderOperations(operations) {
  const searchResults = document.querySelector("#searchResults");
  searchResults.innerHTML = "";
  searchResults.style.display = "block";

  operations.forEach((operation) => {
    const div = document.createElement("div");
    div.className = "search-results-item";
    div.textContent = operation.label;
    div.onclick = () => selectOperation(operation);
    searchResults.appendChild(div);
  });
}

function toggleDropdown() {
  const searchResults = document.querySelector("#searchResults");
  const dropdownIcon = document.querySelector("#dropdownToggle");
  const isVisible = searchResults.style.display === "block";

  if (isVisible) {
    searchResults.style.display = "none";
    dropdownIcon.textContent = "▼";
  } else {
    renderOperations(operations);
    searchResults.style.disabled = "block";
    dropdownIcon.textContent = "▲";
  }
}

function searchOperations(showAll = false) {
  const searchInput = document.querySelector("#operationSearch");
  const searchResults = document.querySelector("#searchResults");
  const dropdownIcon = document.querySelector("#dropdownToggle");
  const query = showAll ? "" : searchInput.value.toLowerCase();

  const filteredOperations = operations.filter(
    (operation) =>
      operation.label.toLowerCase().includes(query) ||
      operation.value.toLowerCase().includes(query)
  );

  renderOperations(filteredOperations);
  searchResults.style.display = "block";
  dropdownIcon.textContent = "▲";

  if (filteredOperations.length === 0) {
    searchResults.style.display = "none";
    dropdownIcon.textContent = "▼";
  }
}

document.querySelector("#operationSearch").addEventListener("click", () => {
  searchOperations(true);
});

function clearSelection() {
  const searchInput = document.querySelector("#operationSearch");
  const searchResults = document.querySelector("#searchResults");
  const selectedOperation = document.querySelector("#selectedOperation");
  const clearIcon = document.querySelector("#clearSearch");
  const dropdownIcon = document.querySelector("#dropdownToggle");

  searchInput.value = "";
  renderOperations(operations);
  selectedOperation.value = "";
  searchResults.style.display = "block";
  clearIcon.style.display = "none";
  dropdownIcon.textContent = "▲";
}

function selectOperation(operation) {
  const searchInput = document.querySelector("#operationSearch");
  const searchResults = document.querySelector("#searchResults");
  const selectedOperation = document.querySelector("#selectedOperation");
  const clearIcon = document.querySelector("#clearSearch");
  const dropdownIcon = document.querySelector("#dropdownToggle");

  searchInput.value = operation.label;
  selectedOperation.value = operation.value;
  searchResults.style.display = "none";
  clearIcon.style.display = "block";
  dropdownIcon.textContent = "▼";
}

document.addEventListener("click", (e) => {
  const searchResults = document.querySelector("#searchResults");
  const operationSearch = document.querySelector("#operationSearch");
  const clearIcon = document.querySelector("#clearSearch");
  const dropdownIcon = document.querySelector("#dropdownToggle");

  if (
    e.target !== operationSearch &&
    e.target !== clearIcon &&
    e.target !== dropdownIcon &&
    !searchResults.contains(e.taget)
  ) {
    searchResults.style;
    display = "none";
    dropdownIcon.textContent = "▼";
  }
});
