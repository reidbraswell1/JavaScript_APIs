console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

document.getElementById("theme").addEventListener("change", themeChange);
let selectedIndex;

// Fucntion to change the theme colors of the page
function themeChange() {
  console.log("---Begin themeChange()---");

  const colorBlack = "black";
  const colorWhite = "white";
  const lightTheme = "light";
  const darkTheme = "dark";
  const rootElement = "html";

  const root = document.getElementById(rootElement);

  switch(this.value) {
    case lightTheme:
      root.style.color = colorBlack;
      root.style.backgroundColor = colorWhite;
      break;
    case darkTheme:
      root.style.color = colorWhite;
      root.style.backgroundColor = colorBlack;
      break;
    default:
      root.style.color = colorBlack;
      root.style.backgroundColor = colorWhite;
      break;
  }
  console.log("---End changeTheme()---");
}
/* 
   Change visibility to hidden
   and change src on all images
   to #
*/
function blankImages(prefix) {
  console.log("---Begin blankImages()---");
  console.log(`Parameters: prefix=${prefix}`);

  const visibility = "hidden";
  const gifSearchId = "gifSearch";

  for (let i = 1; i <= 5; i++) {
    let imageObj = document.getElementById(`${prefix}${i}`);
    imageObj.src = "#";
    imageObj.style.visibility = visibility;
  }
  console.log("---End blankImages()---");
}

/*
  Main controlling function called by
  action on the form
*/
function controller(searchKey, theme) {
  console.log("---Begin controller()---");
  console.log(`Parameters: searchKey=${searchKey}\ntheme=${theme}`);

  const gifSearchId = "gifSearch";

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
      /* Dont reset the select box.
         Want to keep the current selected value of the box
         since an even listener is being used to change the theme 
         colors.
      */
      //document.getElementById("exercise-form").reset();
      document.getElementById(gifSearchId).value="";
    })
    .catch(function (error) {
      console.log(`getGiph error=${error}`);
    });
    console.log("---End controller()---");
}

async function getGiph(searchKey) {
  console.log("---Begin getGiph()---");
  console.log(`Parameters: searchKey=${searchKey}`);

  const baseURL = "https://api.giphy.com/v1/gifs/search?";
  const apiKey = "api_key=mUiZ6FGejMTommITwThDmUr016iX5GAG";
  const query = "&q=";
  const limitOffsetRatingLang = "&limit=5&offset=0&rating=g&lang=en";
  const fetchURL = `${baseURL}${apiKey}${query}${searchKey}${limitOffsetRatingLang}`;

  const errorLineId = "error-line";
  const colorError = "red";

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
      const errorLine = document.getElementById(errorLineId);
      errorLine.innerText = "An error occured when fetching the giph image - check console logs.";
      errorLine.style.color = colorError;
      arrayObj = null;
    });
    console.log("End getGiph()---");
    return arrayObj;
}

/* Helper function to populate the image tags
   with the correct url's returned from the api
*/
function populateImages(response, searchKey) {
  console.log("---Begin populateImages()---");
  console.log(`Parameters: response=${response}\nsearchKey=${searchKey}`);
  console.log(`Parameters: response=`);
  console.log(response);

  const errorLineId = "error-line";
  const returnedLineId = "returned-line";
  const errorColor = "red";
  const successColor = "green";
  const visibility = "visible";

  blankImages("image-");
  const errorLine = document.getElementById(errorLineId);
  const returnedLine = document.getElementById(returnedLineId);
  errorLine.innerText = "";
  returnedLine.innerText = `${response.length}-"${searchKey}"`;
  returnedLine.style.color = successColor;
  if (response.length == 0) {
    errorLine.innerText = `Error no information available on search key "${searchKey}"`;
    errorLine.style.color = errorColor;
  }
  for (let i = 0; i < response.length; i++) {
    console.log(`urls=${response[i].images.original.url}`);
    console.log(response[i].images.original.url);
    let image = document.getElementById(`image-${i + 1}`);
    image.src = response[i].images.original.url;
    image.style.visibility = visibility;
  }
  console.log("---End populateImages()---");
}

// Form Validation called by onsubmit on form
function validateForm(searchKey) {
  console.log("---Begin validateForm()---");
  console.log(`Parameters: searchKey=${searchKey}`);
  console.log("---End validateForm()---");
  return true;
}
