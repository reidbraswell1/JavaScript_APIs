console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

function blankImages() {
    img1.src = "#";
    img2.src = "#";
    img3.src = "#";
    img4.src = "#";
    img5.src = "#";
}
function controller(inputSearch) {
  console.log("---Begin controller()---");
  console.log(`Parameters=${inputSearch}`);
  getGiph(inputSearch)
    .then(function (response, reject) {
      console.log(
        "Response returned to getGiph = " + JSON.stringify(response, null, 2)
      );
      blankImages();
      let errorLine = document.getElementById("error-line");
      let returnedLine = document.getElementById("returned-line");
      errorLine.innerText="";
      returnedLine.innerText=`${response.length}`;
      returnedLine.style.color="green";
      if(response.length == 0) {
          errorLine.innerText=`Error no information available on search key "${inputSearch}"`;
          errorLine.style.color="red";
      }
      for (let i = 0; i < response.length; i++) {
        console.log(`urls=${response[i].images.original.url}`);
        console.log(response[i].images.original.url);
        switch (i) {
          case 0:
            img1.src = response[i].images.original.url;
            break;
          case 1:
            img2.src = response[i].images.original.url;
            break;
          case 2:
            img3.src = response[i].images.original.url;
            break;
          case 3:
            img4.src = response[i].images.original.url;
            break;
          case 4:
            img5.src = response[i].images.original.url;
            break;
        }
      }
    })
    .catch(function (error) {
      console.log(`An Error has occurred = ${error}`);
    });
    document.getElementById("exercise-form").reset();
}

async function getGiph(searchKey) {
  console.log("---Begin getGiph()---");
  console.log(`Parameters=${searchKey}`)

  const baseURL = "https://api.giphy.com/v1/gifs/search?";
  const apiKey = "api_key=mUiZ6FGejMTommITwThDmUr016iX5GAG";
  const query = "&q=";
  const limitOffsetRatingLang = "&limit=5&offset=0&rating=g&lang=en";
  let fetchURL = `${baseURL}${apiKey}${query}${searchKey}${limitOffsetRatingLang}`;

  console.log(`fetchURL=${fetchURL}`);

  let jsonResponse;
  let url;

  return await fetch(fetchURL, { mode: "cors" })
    /*
    .then(function(response) {
        console.log("Response 1");
        console.log(response);
        return response.json();
    })
    .then(function(response) {
        console.log("Response 2");
        console.log(response.data[0].url);
        return response;
    })
    .catch(function(error) {
        console.log("An Error Occurred");
    });
    */
    .then(function (response) {
      console.log("Response 3");
      console.log(response);
      return response.json();
    })
    .then(function (response) {
      console.log("Response 4");
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(`Error=${error}`);
    });
}

function validateForm(searchKey) {
  console.log("---Begin validateForm()---");
  console.log(`Parameters=${searchKey}`);
  return true;
}
