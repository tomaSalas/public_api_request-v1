


const profiles = document.querySelector("#gallery");
const search = document.querySelector(".search-container");





// ------------------------------------------
//  url
// ------------------------------------------

const data = ["https://randomuser.me/api/?results=12&&nat=US"];
let dataCollect = [];
let currentProfile;





// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------

// asked for data
function requestAPI(url) {
    return fetch(url)
           .then(checkStatus)
           .then(data => data.json())
           .catch(error => ("Looks ther was a problem parsing the data ", error))

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
// after the data is received extract it and display it, and store it temporary array of objects 
function readerHTML(data) {
    (data);
    for (let i = 0; i < data.results.length; i += 1) {
        const card = document.createElement("div");
        card.className = "card";
        let fName = data.results[i].name.first;
        let lName = data.results[i].name.last;
        let img = data.results[i].picture.large;
        let city = data.results[i].location.city;
        let address = data.results[i].location.street.name;
        let zipCode = data.results[i].location.postcode;
        let email = data.results[i].email;
        let phone = data.results[i].phone;
        let birthday = data.results[i].dob.date;
        let fullBirthday = getFormattedDate(birthday);
        phone = formatPhoneNumber(phone);

        let htmlOverview = ` 
            <div class="card-img-container">
                <img class="card-img" src="${img}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${fName} ${lName}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}</p>
            </div>
        `;
        card.style.boxShadow = "0px 8px 8px rgba(0,0,0,0.12)";
        card.insertAdjacentHTML("beforeend", htmlOverview);

        
        dataCollect.push(
            {
            key: `${fName} ${lName}`,
            first: `${fName}`,
            last: `${lName}`,
            img: `${img}`,
            city: `${city}`,
            address: `${address}`,
            zipCode: `${zipCode}`,
            email: `${email}`,
            phone: `${phone}`,
            birthday: `${fullBirthday}`

            });
            
        profiles.appendChild(card);
    }
    // add click event to the cards
    addEventsToCards();
}

function addEventsToCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach( card => card.addEventListener("click", readerHTMLOnClick));

}
// expands the information of the profile
function readerHTMLOnClick(event) {
    // this section is trying to get the wrapper div with className ".card"
    // if it does not find it, the algorithm will select the parent element until it gets to the className ".card"
    let card = event.target;
    if (card.className !== "card") {
       card = card.parentElement;
        if (card.className !== "card" ) {
            card = card.parentElement;
        } 
    } 
    let name = card.querySelector("#name");
    // creates all of the information to expand profile and display it
    for (let i = 0; i < dataCollect.length; i += 1) {
        let html = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${dataCollect[i].img}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${dataCollect[i].first} ${dataCollect[i].last}</h3>
                    <p class="modal-text">${dataCollect[i].email}</p>
                    <p class="modal-text cap">${dataCollect[i].address}</p>
                    <hr>
                    <p class="modal-text">${dataCollect[i].phone}</p>
                    <p class="modal-text">${dataCollect[i].address}, ${dataCollect[i].city} ${dataCollect[i].zipCode}</p>
                    <p class="modal-text">Birthday: ${dataCollect[i].birthday}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        `;
        // adds to the page the profile that matches the click and ads all of the events 
        if (name.textContent === dataCollect[i].key) {

            profiles.insertAdjacentHTML("beforeend", html);

            

            const prev = document.querySelector("#modal-prev");
            prev.addEventListener("click", preProfile);

            const next = document.querySelector("#modal-next");
            next.addEventListener("click", nextProfile);

            const buttonClose = document.querySelector("#modal-close-btn");
            buttonClose.addEventListener("click", removeDiv);
            currentProfile = i;
        } 
       
        
    }

 

} 

// checks to see if the index of the array is 0, if this is the case it display the last element of the array
function readerPrev(int) {
    let profile = 0;
    if ((int - 1) < 0) {
        profile = dataCollect[dataCollect.length -1];
    } else {

        profile = dataCollect[int - 1];
    }
        
    let html = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${profile.img}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${profile.first} ${profile.last}</h3>
                <p class="modal-text">${profile.email}</p>
                <p class="modal-text cap">${profile.address}</p>
                <hr>
                <p class="modal-text">${profile.phone}</p>
                <p class="modal-text">${profile.address}, ${profile.city} ${profile.zipCode}</p>
                <p class="modal-text">Birthday: ${profile.birthday}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    `;

    profiles.insertAdjacentHTML("beforeend", html);
    const prev = document.querySelector("#modal-prev");
    prev.addEventListener("click", preProfile);
    const next = document.querySelector("#modal-next");
    next.addEventListener("click", nextProfile);

    const buttonClose = document.querySelector("#modal-close-btn");
    buttonClose.addEventListener("click", removeDiv);
    currentProfile = dataCollect.indexOf(profile);
    


}



// checks to see the last index of array, if this is the case it display the first element of the array 
function nextProfileElement(int) {
    let profile = 0;
    (int);
    if ((int + 1) >= dataCollect.length) {
        profile = dataCollect[profile];
    } else {

        profile = dataCollect[int + 1];
    }
        
    let html = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${profile.img}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${profile.first} ${profile.last}</h3>
                <p class="modal-text">${profile.email}</p>
                <p class="modal-text cap">${profile.address}</p>
                <hr>
                <p class="modal-text">${profile.phone}</p>
                <p class="modal-text">${profile.address}, ${profile.city} ${profile.zipCode}</p>
                <p class="modal-text">Birthday: ${profile.birthday}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    `;

    profiles.insertAdjacentHTML("beforeend", html);
    const prev = document.querySelector("#modal-prev");
    prev.addEventListener("click", preProfile);
    const next = document.querySelector("#modal-next");
    next.addEventListener("click", nextProfile);

    const buttonClose = document.querySelector("#modal-close-btn");
    buttonClose.addEventListener("click", removeDiv);
    currentProfile = dataCollect.indexOf(profile);
    


}





// removes profile after the left arrow is click and display the next one
function preProfile(event) {
    if (event.target.className === "modal-prev btn") {
        const divWrapper = document.querySelector(".modal-container");
        divWrapper.remove();
        readerPrev(currentProfile);
        
    }
  

}

// removes profile after the right arrow is click and display the next one
function nextProfile(event) {
    if (event.target.className === "modal-next btn") {
        const divWrapper = document.querySelector(".modal-container");
        divWrapper.remove();
        nextProfileElement(currentProfile);
        
    }
  

}







//removes cards

function removeDiv() {
    const divWrapper = document.querySelector(".modal-container");
    divWrapper.remove();
  

}
// creates the searchBar
function searchBar() {
    let htmlSearch = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;

    search.insertAdjacentHTML("beforeend", htmlSearch);
    const input = search.querySelector("#search-input");
    input.addEventListener("keyup", searchNameKeyDown);
    const submit = search.querySelector("#search-submit");
    submit.addEventListener("click", searchNameClick);
}

// keydown event handdler for the search
function searchNameKeyDown(event) {
    let input = event.target;
    let filter = input.value.toUpperCase();
    let data = dataCollect;
    let matches = [];

    // match the names with the input add them to array
   for (let i = 0; i < data.length; i += 1) {
        let obj = data[i];
        let name = `${obj.first} ${obj.last}`;
        (name);
        name = name.toLocaleUpperCase();
        if (name.includes(filter)) {
            matches.push(obj);
        }
    }
    
    if (matches.length === 0) {
        input.style.borderColor = "red";
           
    } else {
        input.style.borderColor = "grey";   

    }
    // diplay the match cards
    readerSearch(matches);
    
}

// click event handler for the search 
function searchNameClick(event) {
    event.preventDefault();
    const inputElement= search.querySelector("#search-input");
    let input = inputElement.value;
    let filter = input.toUpperCase();
    let data = dataCollect;
    let matches = [];

    // match the names with the input add them to array
   for (let i = 0; i < data.length; i += 1) {
        let obj = data[i];
        let name = `${obj.first} ${obj.last}`;
        name = name.toLocaleUpperCase();
        if (name.includes(filter)) {
            matches.push(obj);
        }
    }
    
    if (matches.length === 0) {
        inputElement.style.borderColor = "red";
           
    } else {
        inputElement.style.borderColor = "grey";   

    }
    readerSearch(matches);
    
}




// display the result from the search
function readerSearch(matches) {
    
    profiles.innerHTML = "";
    if (matches.length === 0) {
        profiles.innerHTML = `<h1> No Match Found</h1>`;
    }
    matches.forEach( profile => {
        const card = document.createElement("div");
        card.className = "card";
        let html = ` 
            <div class="card-img-container">
                <img class="card-img" src="${profile.img}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${profile.first} ${profile.last}</h3>
                <p class="card-text">${profile.email}</p>
                <p class="card-text cap">${profile.city}</p>
            </div>
        `;
        card.style.boxShadow = "0px 8px 8px rgba(0,0,0,0.12)";
        card.insertAdjacentHTML("beforeend", html);
        profiles.appendChild(card);
        addEventsToCards();
    });
    
}




    



// https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
  }

  function getFormattedDate(date) {
    let obj = new Date(date);
    let mouth = obj.getMonth();
    let day = obj.getDay();
    let year = obj.getFullYear();
    return `${mouth}/${day}/${year}`;
  }


// ------------------------------------------
//  main func
// ------------------------------------------

searchBar();
requestAPI(data[0])
    .then( data => readerHTML(data))




        