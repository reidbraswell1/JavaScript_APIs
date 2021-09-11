console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

async function getGiph(searchKey) {
    console.log("---Begin getGiph---");

    const baseURL = "https://api.giphy.com/v1/gifs/search?";
    const apiKey = "api_key=mUiZ6FGejMTommITwThDmUr016iX5GAG";
    const query = "&q=";
    const limitOffsetRatingLang = "&limit=5&offset=0&rating=g&lang=en";
    let fetchURL = `${baseURL}${apiKey}${query}${searchKey}${limitOffsetRatingLang}`;

    console.log(`fetchURL=${fetchURL}`);

    let jsonResponse;
    let url;

    return await fetch(fetchURL, { mode: "cors" });
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
}

getGiph("rat")
.then(function(response) {
    console.log("Response 3");
    console.log(response);
    return response.json();
})
.then(function(response){
    console.log("Response 4");
    console.log(response.data[0].images.original.url);
})
.catch(function(error) {
    console.log(`Error=${error}`);
});
