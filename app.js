console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

/* 
   Change visibility to hidden
   and change src on all images
   to #
*/
function blankImages(prefix) {
  for (let i = 1; i <= 5; i++) {
    let imageObj = document.getElementById(`${prefix}${i}`);
    imageObj.src = "#";
    imageObj.style.visibility = "hidden";
  }
}

/*
  Main controlling function called by
  action on the form
*/
function controller(searchKey) {
  console.log("---Begin controller()---");
  console.log(`Parameters=${searchKey}`);
  getGiph(searchKey)
    .then(function (response) {
      if(response == null) {
        throw new Error("Error has occured in fetch");
      }
      console.log("getGiph Promise fulfilled response returned response below");
      console.log(response);
      /* response will contain an array of objects
         inside the array of objects we will obtain the 
         url to display.
      */
      populateImages(response, searchKey);
      document.getElementById("exercise-form").reset();
    })
    .catch(function (error) {
      console.log(`getGiph error=${error}`);
    });
}

async function getGiph(searchKey) {
  const baseURL = "https://api.giphy.com/v1/gifs/search?";
  const apiKey = "api_key=mUiZ6FGejMTommITwThDmUr016iX5GAG";
  const query = "&q=";
  const limitOffsetRatingLang = "&limit=5&offset=0&rating=g&lang=en";
  let fetchURL = `${baseURL}${apiKey}${query}${searchKey}${limitOffsetRatingLang}`;

  console.log(`fetchURL=${fetchURL}`);

  let arrayObj;

  await fetch(fetchURL, { mode: "cors" })
    .then(function (response) {
      console.log("1st then fetch promise response - ");
      console.log(response);
      return response.json();
    })
    .then(function (response) {
      console.log("2nd then fetch promise response");
      console.log(response);
      console.log(JSON.stringify(response, null, 2));
      arrayObj=response.data;
      /* response.data will contain an array of objects
         inside the array of objects we will obtain the 
         url to display.
      */
    })
    .catch(function (error) {
      console.log(`Fetch error=${error}`);
      let errorLine = document.getElementById("error-line");
      errorLine.innerText="An error occured when fetching the giph image - check console logs.";
      errorLine.style.color="red";
      arrayObj = null;
    });
    return arrayObj;
}

/* Helper function to populate the image tags
   with the correct url's returned from the api
*/
function populateImages(response, searchKey) {
  blankImages("image-");
  let errorLine = document.getElementById("error-line");
  let returnedLine = document.getElementById("returned-line");
  errorLine.innerText = "";
  returnedLine.innerText = `${response.length}-"${searchKey}"`;
  returnedLine.style.color = "green";
  if (response.length == 0) {
    errorLine.innerText = `Error no information available on search key "${searchKey}"`;
    errorLine.style.color = "red";
  }
  for (let i = 0; i < response.length; i++) {
    console.log(`urls=${response[i].images.original.url}`);
    console.log(response[i].images.original.url);
    let image = document.getElementById(`image-${i + 1}`);
    image.src = response[i].images.original.url;
    image.style.visibility = "visible";
  }
}

// Form Validation called by onsubmit on form
function validateForm(searchKey) {
  console.log("---Begin validateForm()---");
  console.log(`Parameters=${searchKey}`);
  return true;
}
