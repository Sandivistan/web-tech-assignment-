/*
  main.js
  All the behaviour of the website. This file is loaded on every page,
  after events.js, so it can use the "events" array.

  Parts:
    1. Helper functions
    2. Event cards (Home and Events pages)
    3. Search and category filter (Events page)
    4. Saving registrations in localStorage
    5. "My registrations" table (Registration page)
    6. Form validation (Registration page)
    7. Form events (Registration page)
    8. Starting the page
*/

// The name under which the registrations are stored in localStorage.
const STORAGE_KEY = "xyzCampusEventRegistrations";

// The category chosen on the Events page. "All" means no filter.
let selectedCategory = "All";


/* ---------- 1. Helper functions ---------- */

// Changes a date such as "2026-12-03" into text such as "Thu 3 Dec 2026".
function formatDate(dateText) {
  const date = new Date(dateText + "T00:00");
  const options = { weekday: "short", day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

// Returns the event with the given id, or undefined if there is none.
function findEventById(id) {
  return events.find(function (item) {
    return item.id === Number(id);
  });
}


/* ---------- 2. Event cards ---------- */

// Returns the HTML of one event card.
function createEventCard(item) {
  return `
    <article class="event-card">
      <figure class="event-figure">
        <img src="${item.image}" alt="Illustration for ${item.name}" width="400" height="225">
        <figcaption class="category category-${item.category.toLowerCase()}">${item.category}</figcaption>
      </figure>
      <div class="event-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <ul class="event-details">
          <li><strong>Date</strong> <time datetime="${item.date}">${formatDate(item.date)}</time></li>
          <li><strong>Time</strong> <time datetime="${item.time}">${item.time}</time></li>
          <li><strong>Venue</strong> <span>${item.venue}</span></li>
        </ul>
        <a class="button" href="register.html?event=${item.id}" aria-label="Register for ${item.name}">Register</a>
      </div>
    </article>`;
}

// Puts a card for each event in the list inside the given container.
function showEventCards(container, eventList) {
  let html = "";
  eventList.forEach(function (item) {
    html += createEventCard(item);
  });
  container.innerHTML = html;
}


/* ---------- 3. Search and category filter ---------- */

// Checks if an event contains the search text in its name, description, category or venue.
function matchesSearch(item, searchText) {
  const eventText = item.name + " " + item.description + " " + item.category + " " + item.venue;
  return eventText.toLowerCase().includes(searchText);
}

// Checks if an event belongs to the selected category.
function matchesCategory(item) {
  return selectedCategory === "All" || item.category === selectedCategory;
}

// Shows only the events that match both the search box and the category button.
function updateEventList() {
  const searchText = document.getElementById("search").value.trim().toLowerCase();
  const matchingEvents = events.filter(function (item) {
    return matchesSearch(item, searchText) && matchesCategory(item);
  });

  showEventCards(document.getElementById("event-list"), matchingEvents);
  document.getElementById("no-events").hidden = matchingEvents.length > 0;
  document.getElementById("event-count").textContent =
    "Showing " + matchingEvents.length + " of " + events.length + " events";
}

// Runs when a category button is clicked: remembers the category and highlights the button.
function selectCategory(clickedButton) {
  selectedCategory = clickedButton.dataset.category;

  document.querySelectorAll(".filter-button").forEach(function (button) {
    button.setAttribute("aria-pressed", button === clickedButton);
  });
  updateEventList();
}


/* ---------- 4. Saving registrations in localStorage ---------- */

// Returns the saved registrations as an array (an empty array if there are none).
function getRegistrations() {
  const savedText = localStorage.getItem(STORAGE_KEY);
  if (savedText === null) {
    return [];
  }
  return JSON.parse(savedText);
}

// Adds one registration to the saved list. localStorage only keeps text, so we use JSON.
function saveRegistration(registration) {
  const registrations = getRegistrations();
  registrations.push(registration);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
}

// Deletes all saved registrations after asking the student to confirm.
function clearRegistrations() {
  if (confirm("Delete all your saved registrations?")) {
    localStorage.removeItem(STORAGE_KEY);
    showRegistrations();
  }
}


/* ---------- 5. "My registrations" table ---------- */

// Adds one cell to a table row. textContent is used so that typed text is never read as HTML.
function addCell(row, text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
}

// Adds one registration as a new row in the table.
function addRegistrationRow(tableBody, registration) {
  const row = document.createElement("tr");
  addCell(row, registration.fullName);
  addCell(row, registration.studentId);
  addCell(row, registration.eventName);
  addCell(row, formatDate(registration.eventDate));
  tableBody.appendChild(row);
}

// Fills the table with the saved registrations, or shows a message if there are none.
function showRegistrations() {
  const registrations = getRegistrations();
  const tableBody = document.getElementById("registration-rows");
  const hasRegistrations = registrations.length > 0;

  tableBody.innerHTML = "";
  registrations.forEach(function (registration) {
    addRegistrationRow(tableBody, registration);
  });

  document.getElementById("registration-table").hidden = !hasRegistrations;
  document.getElementById("clear-registrations").hidden = !hasRegistrations;
  document.getElementById("no-registrations").hidden = hasRegistrations;
}


/* ---------- 6. Form validation ---------- */

// Reads everything the student typed and returns it as one object.
function getFormData(form) {
  return {
    fullName: form.elements["full-name"].value.trim(),
    studentId: form.elements["student-id"].value.trim().toUpperCase(),
    email: form.elements["email"].value.trim(),
    phone: form.elements["phone"].value.trim(),
    department: form.elements["department"].value,
    year: form.elements["year"].value,
    eventId: form.elements["event"].value,
    comments: form.elements["comments"].value.trim(),
    terms: form.elements["terms"].checked
  };
}

// Checks the text fields. For each wrong field it adds a message to the errors object.
function checkTextFields(data, errors) {
  if (data.fullName.length < 3) {
    errors["full-name"] = "Enter your full name (at least 3 characters).";
  }
  if (!/^[A-Z][0-9]{8}$/.test(data.studentId)) {
    errors["student-id"] = "Enter 1 letter followed by 8 digits, for example S12345678.";
  }
  if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(data.email)) {
    errors["email"] = "Enter a valid email, for example name@xyz.example.";
  }
  if (!/^[0-9]{10}$/.test(data.phone)) {
    errors["phone"] = "Enter a phone number with exactly 10 digits.";
  }
}

// Checks the select boxes, radio buttons and checkbox in the same way.
function checkChoiceFields(data, errors) {
  if (data.department === "") {
    errors["department"] = "Choose your department.";
  }
  if (data.year === "") {
    errors["year"] = "Choose your year of study.";
  }
  if (data.eventId === "") {
    errors["event"] = "Choose an event.";
  }
  if (!data.terms) {
    errors["terms"] = "You must agree to the event terms.";
  }
}

// Shows an error message under one field.
function showError(fieldName, message) {
  const errorElement = document.getElementById(fieldName + "-error");
  errorElement.textContent = message;
  errorElement.parentElement.classList.add("has-error");
}

// Removes the error message under one field (if that field has one).
function clearError(fieldName) {
  const errorElement = document.getElementById(fieldName + "-error");
  if (errorElement !== null) {
    errorElement.textContent = "";
    errorElement.parentElement.classList.remove("has-error");
  }
}

// Removes every error message and hides the confirmation message.
function clearMessages() {
  document.querySelectorAll(".error").forEach(function (errorElement) {
    errorElement.textContent = "";
    errorElement.parentElement.classList.remove("has-error");
  });
  document.getElementById("confirmation").textContent = "";
}

// Shows all the error messages and moves the cursor to the first wrong field.
function showErrors(form, errors) {
  Object.keys(errors).forEach(function (fieldName) {
    showError(fieldName, errors[fieldName]);
  });
  form.querySelector(".has-error input, .has-error select").focus();
}


/* ---------- 7. Form events ---------- */

// Shows the success message with the student's name and the chosen event.
function showConfirmation(data) {
  const confirmation = document.getElementById("confirmation");
  confirmation.textContent =
    "Thank you, " + data.fullName + "! You are registered for " + data.eventName + ".";
  confirmation.scrollIntoView({ block: "center" });
}

// Saves a valid registration, empties the form and updates the page.
function completeRegistration(form, data) {
  const chosenEvent = findEventById(data.eventId);
  data.eventName = chosenEvent.name;
  data.eventDate = chosenEvent.date;

  saveRegistration(data);
  form.reset();
  showRegistrations();
  showConfirmation(data);
}

// Runs when the form is submitted: checks the data, then shows errors or saves it.
function handleSubmit(submitEvent) {
  submitEvent.preventDefault();
  const form = submitEvent.target;
  const data = getFormData(form);
  const errors = {};

  checkTextFields(data, errors);
  checkChoiceFields(data, errors);
  clearMessages();
  if (Object.keys(errors).length > 0) {
    showErrors(form, errors);
  } else {
    completeRegistration(form, data);
  }
}

// Adds one option to the event select box for each event in the array.
function fillEventSelect(select) {
  events.forEach(function (item) {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name + " (" + formatDate(item.date) + ")";
    select.appendChild(option);
  });
}

// Selects the event given in the page address, for example register.html?event=3.
function selectEventFromUrl(select) {
  const parameters = new URLSearchParams(window.location.search);
  const chosenEvent = findEventById(parameters.get("event"));
  if (chosenEvent !== undefined) {
    select.value = chosenEvent.id;
  }
}


/* ---------- 8. Starting the page ---------- */

// Prepares the Home page: shows the first three events as featured events.
function startHomePage() {
  const featuredEvents = events.slice(0, 3);
  showEventCards(document.getElementById("featured-events"), featuredEvents);
}

// Prepares the Events page: connects the search box and buttons, then shows all events.
function startEventsPage() {
  document.getElementById("search").addEventListener("input", updateEventList);

  document.querySelectorAll(".filter-button").forEach(function (button) {
    button.addEventListener("click", function () {
      selectCategory(button);
    });
  });
  updateEventList();
}

// Prepares the Registration page: fills the event list and connects the form and buttons.
function startRegisterPage() {
  const form = document.getElementById("registration-form");
  const eventSelect = document.getElementById("event");

  fillEventSelect(eventSelect);
  selectEventFromUrl(eventSelect);
  showRegistrations();

  form.addEventListener("submit", handleSubmit);
  form.addEventListener("reset", clearMessages);
  form.addEventListener("input", function (inputEvent) {
    clearError(inputEvent.target.name);
  });
  document.getElementById("clear-registrations").addEventListener("click", clearRegistrations);
}

// Finds out which page is open by looking for an element that only that page has.
function startPage() {
  if (document.getElementById("featured-events") !== null) {
    startHomePage();
  }
  if (document.getElementById("event-list") !== null) {
    startEventsPage();
  }
  if (document.getElementById("registration-form") !== null) {
    startRegisterPage();
  }
}

startPage();
