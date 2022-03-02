//getting input value and connecting with API
const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const showingResultFor = document.getElementById('showing-for');

  const searchText = searchField.value;
  searchField.value = '';

  showingResultFor.innerHTML = `
    <div class="row">
        <div class="col-12">
          <h5 class="text-center py-3">Showing Results for "${searchText}"</h5>
        </div>
      </div>
    `;
  //creating url setting link inside url
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then(res => res.json()) //converting to json
    .then(data => {
      if (data.data.length === 0) {
        notFound(data.data); //calling notFound function if search result do not match
      } else {
        displayPhone(data.data.slice(0, 20)); //show upto 20 results per search
      }
    });
}

/*================================================== */

//display Phones by searching name
const displayPhone = phones => {
  const searchResults = document.getElementById('search-results');

  phones.forEach(phone => {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card box-shadow w-100 text-center">
                <img src="${phone.image}" class="card-img-top w-50 pb-2 pt-3 mx-auto" alt="">
                <div class="card-body">
                  <h5 class="card-title pt-1">${phone.phone_name}</h5>
                  <h6 class="card-title py-1">${phone.brand}</h6>
                  <a href="#thumbnail" onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary">Details</a>
                  </div>
        </div>
        `;
    searchResults.appendChild(div);

  })
}

/*================================================== */

//if search result is not found
const notFound = (dispNotFound) => {
  const notFoundPhone = document.getElementById('not-found');
  const div = document.createElement('div');
  div.innerHTML = `

    <div class="row">
      <div class="col-12">
        <h5 class="text-center text-danger pt-2 pb-3 w-100">No Result Found!</h5>
      </div>
    </div>

        `;
  notFoundPhone.appendChild(div);
}

/*================================================== */

//load second api
const loadPhoneDetails = (slugId) => {

  const url = `https://openapi.programming-hero.com/api/phone/${slugId}`
  //fetching 2nd api
  fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data));
}


/*================================================== */
//display phone details to UI
const displayPhoneDetail = phone => {
  const displayDetail = document.getElementById('phone-details');
  displayDetail.textContent = ''; //clearing old content if new detail  button is clicked
  const release = phone.releaseDate;
  const thumbDiv = document.getElementById('thumbnail');
  thumbDiv.innerHTML = `

    <div class="row">
    <div class="col-12 text-center">
      <img src="${phone.image}"  class=" custom-width mx-auto" alt="">
      <h4 class="pt-3">${phone.name}</h4>
      <h6>${phone.brand}</h6>
      <p class="fw-bolder">Release Date: ${releaseDateChecker(release)}</p>
    </div>
  </div>
    `;

  const detailDiv = document.createElement('div');
  
  detailDiv.classList.add('row');

  detailDiv.innerHTML = `

        <div class="col-sm-3">
          <div class="main-feature">
            <h5 class="d-flex justify-content-center text-primary">Main Features</h5>
          </div>
        </div>
        <div class="col-sm-9">
          <table class="table table-bordered ">
            <tbody>
              <tr>
                <th class="w-25">Chipset</th>
                <td>${phone.mainFeatures.chipSet}</td>
              </tr>
              <tr>
                <th class="w-25">Display Size</th>
                <td>${phone.mainFeatures.displaySize}</td>
              </tr>
              <tr>
                <th class="w-25">Memory</th>
                <td>${phone.mainFeatures.memory}</td>
              </tr>
              <tr>
                <th class="w-25">Storage</th>
                <td>${phone.mainFeatures.storage}</td>
              </tr>
              
              <tr>
                <th class="w-25">Sensors</th>
                <td class="p-0">
                <ul class="ms-3 mt-3 list-unstyled">
            ${sensorsData(phone.mainFeatures.sensors)} 
            </ul>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        <div class="col-sm-3 mt-0 pt-0">
          <div class="main-feature">
            <h5 class="d-flex justify-content-center text-primary">Others</h5>
          </div>
        </div>
        <div class="col-sm-9">
          <table class="table table-bordered ">
            <tbody>
              <tr>
                <th class="w-25">WLAN</th>
                <td> ${phone.others.WLAN}</td>
              </tr>
              <tr>
                <th class="w-25">Bluetooth</th>
                <td>${phone.others.Bluetooth}</td>
              </tr>
              <tr>
                <th class="w-25">NFC</th>
                <td>${phone.others.NFC}</td>
              </tr>
              <tr>
                <th class="w-25">USB</th>
                <td>${phone.others.USB}</td>
              </tr>
              <tr>
                <th class="w-25">GPS</th>
                <td>${phone.others.GPS}</td>
              </tr>
              <tr>
                <th class="w-25">Radio</th>
                <td>${phone.others.Radio}</td>
              </tr>
              
            </tbody>
          </table>
        </div>
    <br>
    <br>
    `;
  displayDetail.appendChild(detailDiv);
  
}

/*================================================== */

//creating indexed sensor data, displaying as list items
const sensorsData = (sensors) => {
  let pushData = "";
  sensors.forEach((sensor) => {
    pushData += `
      <li>${sensor}</li>
      `;
  });
  return pushData;
};

/*================================================== */

//cheching for release date
const releaseDateChecker = release => {
  if (!release) {
    return '<span class="text-danger">No Release Date Found!</span>'
  } else {
    return `<span class="text-success">${release}</span>`;
  }
}

// END