let contactList = [];
const apiEP = "https://randomuser.me/api?results=10";

const slider = document.getElementById("mySlider");

slider.addEventListener("change", (event) => {
  let { value } = event.target;

  if (value > 70) {
    displayScreen("appScreen");
  } else {
    displayScreen("lockScreen");
  }
});

const displayScreen = (screenName) => {
  const screens = document.getElementsByClassName("screen");

  for (screen of screens) {
    screen.style.display = "none";
  }

  const screenElement = document.getElementById(screenName);

  screenElement.style.display = "block";
};

const displayContactScreen = async () => {
  displayScreen("contactListScreen");

  const listElement = document.getElementById("list");
  const spinnerElement = document.getElementById("spinner");

  listElement.style.display = "none";
  spinnerElement.style.display = "block";

  const response = await fetch(apiEP);

  const data = await response.json();
  contactList = data.results;

  displayContactList(contactList);

  listElement.style.display = "block";
  spinnerElement.style.display = "none";
};

const displayContactList = (list) => {
  const contactAccordian = document.getElementById("contactAccordian");
  contactAccordian.innerHTML = "";

  list.map((contact, index) => {
    console.log(contact);
    const accordianItem = `
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#contact-id-${index}" aria-expanded="false" aria-controls="collapseThree">
                    <img src="${contact.picture.thumbnail}" alt="" width="50px"
                      class="rounded-circle" />
                    <div class="ms-2">
                      <div class="fw-bolder">${contact.name.title} ${contact.name.first} ${contact.name.last}</div>
                      <small>${contact.location.street.number} ${contact.location.street.name} </small>
                    </div>
                  </button>
                </h2>
                <div id="contact-id-${index}" class="accordion-collapse collapse" data-bs-parent="#contactAccordian">
                  <div class="accordion-body d-flex flex-column align-items-center">

                    <img src="${contact.picture.medium}" alt="" width="150px"
                      class="rounded-circle">
                    <div>
                      <div class="fw-bolder">
                        <i class="bi bi-person-circle"></i>
                        ${contact.name.title} ${contact.name.first} ${contact.name.last}
                      </div>
                      <div>
                        <a href="tel:${contact.cell}">
                          <i class="bi bi-phone-fill"></i>
                          ${contact.cell}
                        </a>
                      </div>

                      <div>
                        <a href="mailto:${contact.email}">
                          <i class="bi bi-envelope-fill"></i>
                          ${contact.email}
                        </a>
                      </div>

                      <div>
                        <a href="https://www.google.com/maps/place/${contact.location.street.number}+${contact.location.street.name}+${contact.location.city}+${contact.location.state}+${contact.location.country}"
                          target="_blank">
                          <i class="bi bi-globe-asia-australia"></i>

                          ${contact.location.street.number} ${contact.location.street.name}, ${contact.location.state}
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
    
    `;

    contactAccordian.innerHTML += accordianItem;
  });

  const userCount = document.getElementById("userCount");
  userCount.innerText = list.length;
};

const displayLockScreen = () => {
  displayScreen("lockScreen");
  slider.value = 0;
};

const searchElement = document.getElementById("search");

searchElement.addEventListener("keyup", (event) => {
  const { value } = event.target;

  const filteredContact = contactList.filter((contact) => {
    const name = (contact.name.first + " " + contact.name.last).toLowerCase();

    return name.includes(value.toLowerCase());
  });

  displayContactList(filteredContact);
});

// displayContactScreen();
