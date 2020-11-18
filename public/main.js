// NOTE: wordSmith functions from lines 4 - 39
// NOTE: byteSize functions from lines 48 - 81

// information to reach API
const dataMuseUrl = "https://api.datamuse.com/words?";
const queryParams = "rel_jjb=";

// selecting page elements
const inputField = document.querySelector("#input");
const submit = document.querySelector("#submit");
const responseField = document.querySelector("#responseField");

// AJAX function
const getSuggestions = async () => {
  const wordQuery = inputField.value;
  const endpoint = dataMuseUrl + queryParams + wordQuery;

  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      let jsonResponse = await response.json();
      renderWordResponse(jsonResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

// clear previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault();
  while (responseField.firstChild) {
    responseField.removeChild(responseField.firstChild);
  }
  getSuggestions();
};

submit.addEventListener("click", displaySuggestions);

// information to reach Rebrandly API
const apiKey = "7f20e441461f4942a01ea76c1c3517ea";
const rebrandlyEndpoint = "https://api.rebrandly.com/v1/links";

// element selector
const shortenButton = document.querySelector("#shorten");

// AJAX functions
const shortenUrl = async () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({ destination: urlToShorten });

  try {
    const response = await fetch(rebrandlyEndpoint, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json",
        apikey: apiKey,
      },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      renderByteResponse(jsonResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

// Clear page and call AJAX functions
const displayShortUrl = (event) => {
  event.preventDefault();
  while (responseField.firstChild) {
    responseField.removeChild(responseField.firstChild);
  }
  shortenUrl();
};

shortenButton.addEventListener("click", displayShortUrl);
