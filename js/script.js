


const profiles = document.querySelector("#gallery");






// ------------------------------------------
//  url
// ------------------------------------------

const data = ["https://randomuser.me/api/?results=12"];
let dataCollect = [];




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
    console.log(data);
    for (let i = 0; i < data.results.length; i += 1) {
        const card = document.createElement("div");
        card.className = "card";
        profiles.appendChild;
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
        console.log(fullBirthday);
        phone = formatPhoneNumber(phone);

        let htmlOverview = ` 
            <div class="card-img-container">
                <img class="card-img" src="${img}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${fName} ${lName}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${address}</p>
            </div>
        `;
       
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
   console.log(dataCollect)
    addEventsToCards();
}

function addEventsToCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach( card => card.addEventListener("click", readerHTMLOnClick));

}

function readerHTMLOnClick(event) {
    const card = event.target;
    const name = card.querySelector("#name");

    for (let i = 0; i < dataCollect.length; i += 1) {
        if (name.textContent === dataCollect[i].key) {
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
        </div>
        `;
        profiles.insertAdjacentHTML("beforeend", html);
        break;
        }
    }

    const buttonClose = document.querySelector("#modal-close-btn");
    buttonClose.addEventListener("click", removeDiv);

} 

function removeDiv() {
    const divWrapper = document.querySelector(".modal-container");
    divWrapper.remove();
  

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
    console.log(obj);
    let mouth = obj.getMonth();
    let day = obj.getDay();
    let year = obj.getFullYear();
    return `${mouth}/${day}/${year}`;
  }


// ------------------------------------------
//  main func
// ------------------------------------------


requestAPI(data[0])
    .then( data => readerHTML(data))




        