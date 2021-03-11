


const profiles = document.querySelector("#gallery");





// ------------------------------------------
//  url
// ------------------------------------------

const data = ["https://randomuser.me/api/?results=100"];




// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

// asked for data
function requestAPI(url) {
    return fetch(url)
           .then(checkStatus)
           .then(data => data.json())
           .catch(error => console.log("Looks ther was a problem parsing the data ", error))

}


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

// check if request worked
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);

    } else {
        return Promise.reject(new Error(response.statusText));

    }

}

function readerHTML(data) {
    for (let i = 0; i < data.results.length; i += 1) {
        console.log(data);
        let fName = data.results[i].name.first;
        let lName = data.results[i].name.last;
        let img = data.results[i].picture.medium;
        let address = data.results[i].location.city;
        let email = data.results[i].email;
        let html = ` 
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${img}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${fName, lName}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${address}</p>
            </div>
        </div>
        `;
    
        profiles.insertAdjacentHTML("beforeend", html);

    }
   

}


// ------------------------------------------
//  main func
// ------------------------------------------


requestAPI(data[0])
    .then( data => readerHTML(data));