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

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.data.length === 0) { 
                notFound(data.data);
            } else {
                displayPhone(data.data.slice(0, 20)); //show upto 20 results per search
            }
        });
}


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
                  <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Details</button>
                </div>
        </div>
        `;
        searchResults.appendChild(div);
        // console.log(phone.slug);
    })
}

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

//load second api
const loadPhoneDetails = (slugId) => {
    
    const url = `https://openapi.programming-hero.com/api/phone/${slugId}`
    
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data));


}