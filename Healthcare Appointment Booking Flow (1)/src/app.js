const SPECIALTIES = [
  "All",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "General Practice",
];

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Amara Osei-Mensah",
    specialty: "Cardiology",
    rating: 4.9,
    reviews: 312,
    experience: "14 yrs",
    availability: "Next: Today",
    photo:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&auto=format",
    bio: "Interventional cardiologist at Northfield Medical Center. Specializes in minimally invasive procedures.",
    languages: ["English", "Twi"],
    accepting: true,
  },
  {
    id: 2,
    name: "Dr. Priya Nair",
    specialty: "Dermatology",
    rating: 4.8,
    reviews: 278,
    experience: "9 yrs",
    availability: "Next: Tomorrow",
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&auto=format",
    bio: "Board-certified dermatologist specializing in medical and cosmetic skin conditions.",
    languages: ["English", "Hindi", "Tamil"],
    accepting: true,
  },
  {
    id: 3,
    name: "Dr. Marcus Webb",
    specialty: "Neurology",
    rating: 4.7,
    reviews: 194,
    experience: "18 yrs",
    availability: "Next: Thu",
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&auto=format",
    bio: "Neurologist with expertise in movement disorders and headache management.",
    languages: ["English", "Spanish"],
    accepting: true,
  },
  {
    id: 4,
    name: "Dr. Sarah Lindqvist",
    specialty: "Pediatrics",
    rating: 4.9,
    reviews: 421,
    experience: "11 yrs",
    availability: "Next: Today",
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&auto=format",
    bio: "Dedicated pediatrician with a gentle, child-centered approach to care.",
    languages: ["English", "Swedish"],
    accepting: true,
  },
  {
    id: 5,
    name: "Dr. James Okoro",
    specialty: "Orthopedics",
    rating: 4.6,
    reviews: 157,
    experience: "21 yrs",
    availability: "Next: Fri",
    photo:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&auto=format",
    bio: "Orthopedic surgeon specializing in sports medicine and joint reconstruction.",
    languages: ["English", "Igbo"],
    accepting: false,
  },
  {
    id: 6,
    name: "Dr. Elena Vasquez",
    specialty: "General Practice",
    rating: 4.8,
    reviews: 533,
    experience: "8 yrs",
    availability: "Next: Today",
    photo:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=200&h=200&fit=crop&auto=format",
    bio: "Family physician providing comprehensive preventive and chronic disease care.",
    languages: ["English", "Spanish", "Portuguese"],
    accepting: true,
  },
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIME_SLOTS = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
];
const UNAVAILABLE_SLOTS = new Set(["9:00 AM", "10:30 AM", "2:30 PM"]);

const today = new Date();
const state = {
  step: 1,
  query: "",
  specialty: "All",
  doctor: null,
  viewYear: today.getFullYear(),
  viewMonth: today.getMonth(),
  date: null,
  time: null,
  visitType: "video",
  booking: false,
  confirmed: false,
};

const app = document.querySelector("#app");

const icons = {
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>`,
  star: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`,
  left: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>`,
  right: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>`,
  check: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>`,
  clock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>`,
  calendar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>`,
  video: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 8-6 4 6 4V8z"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>`,
  pin: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  pulse: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shell(content) {
  return `
    <div class="site-shell">
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="#" data-action="reset" aria-label="CareBook home">
            <span class="brand-mark">${icons.pulse}</span>
            <span class="brand-name">CareBook</span>
          </a>
          <nav class="main-nav" aria-label="Main navigation">
            <a href="#appointments">My Appointments</a>
            <a href="#records">Records</a>
            <span class="avatar" aria-label="User account for JD">JD</span>
          </nav>
        </div>
      </header>
      <main class="main-content" id="main-content" tabindex="-1">
        ${progress()}
        ${content}
      </main>
    </div>`;
}

function progress() {
  const steps = ["Find a Doctor", "Choose Time", "Confirm"];
  return `
    <nav class="progress" aria-label="Booking progress">
      ${steps
        .map((label, index) => {
          const number = index + 1;
          const status =
            state.step === number
              ? "is-active"
              : state.step > number
                ? "is-done"
                : "";
          return `
            <div class="progress-step ${status}">
              <div class="progress-item">
                <span class="progress-number" ${state.step === number ? 'aria-current="step"' : ""}>
                  ${state.step > number ? icons.check : number}
                </span>
                <span class="progress-label">${label}</span>
              </div>
              ${
                index < steps.length - 1
                  ? `<span class="progress-line ${state.step > number ? "is-done" : ""}" aria-hidden="true"></span>`
                  : ""
              }
            </div>`;
        })
        .join("")}
    </nav>`;
}

function render({ focusMain = false } = {}) {
  let content = searchScreen();
  if (state.step === 2 && state.doctor) content = calendarScreen();
  if (state.step === 3 && state.doctor && state.date && state.time) {
    content = confirmationScreen();
  }
  app.innerHTML = shell(content);
  bindEvents();
  if (focusMain) {
    document.querySelector("#main-content")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function searchScreen() {
  const query = state.query.trim().toLowerCase();
  const doctors = DOCTORS.filter((doctor) => {
    const matchesQuery =
      !query ||
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialty.toLowerCase().includes(query);
    const matchesSpecialty =
      state.specialty === "All" || doctor.specialty === state.specialty;
    return matchesQuery && matchesSpecialty;
  });

  return `
    <section aria-labelledby="search-title">
      <div class="page-heading">
        <h1 class="page-title" id="search-title">Find your doctor</h1>
        <p class="page-copy">Search by name or specialty to book a same-day or future appointment.</p>
      </div>
      <div class="search-field">
        ${icons.search}
        <input
          id="doctor-search"
          type="search"
          placeholder="Search doctors, specialties…"
          value="${escapeHtml(state.query)}"
          aria-label="Search doctors"
          autocomplete="off"
        />
      </div>
      <fieldset class="filter-list" aria-label="Filter by specialty">
        ${SPECIALTIES.map(
          (specialty) => `
            <button
              class="filter-button"
              type="button"
              data-specialty="${escapeHtml(specialty)}"
              aria-pressed="${state.specialty === specialty}"
            >${specialty}</button>`,
        ).join("")}
      </fieldset>
      <p class="results-meta" aria-live="polite">${doctors.length} ${doctors.length === 1 ? "doctor" : "doctors"} found</p>
      ${
        doctors.length
          ? `<div class="doctor-grid">${doctors.map(doctorCard).join("")}</div>`
          : `<div class="empty-state"><strong>No doctors found</strong><span>Try adjusting your search or filters.</span></div>`
      }
    </section>`;
}

function doctorCard(doctor) {
  const visibleLanguages = doctor.languages.slice(0, 2);
  const remainingLanguages = doctor.languages.length - visibleLanguages.length;
  return `
    <article class="doctor-card">
      <div class="doctor-card-top">
        <div class="photo-wrap">
          <img class="doctor-photo" src="${doctor.photo}" alt="Photo of ${escapeHtml(doctor.name)}" loading="lazy" />
          ${
            doctor.accepting
              ? '<span class="accepting-dot" role="img" aria-label="Accepting new patients"></span>'
              : ""
          }
        </div>
        <div>
          <h2 class="doctor-name">${doctor.name}</h2>
          <p class="doctor-specialty">${doctor.specialty}</p>
          <div class="rating">
            ${icons.star}
            <strong>${doctor.rating}</strong>
            <span>(${doctor.reviews})</span>
            <span class="rating-divider">·</span>
            <span>${doctor.experience}</span>
          </div>
        </div>
        <span class="availability ${doctor.availability.includes("Today") ? "today" : ""}">
          ${doctor.availability}
        </span>
      </div>
      <p class="doctor-bio">${doctor.bio}</p>
      <div class="doctor-card-footer">
        <div class="languages" aria-label="Languages spoken">
          ${visibleLanguages.map((language) => `<span class="language">${language}</span>`).join("")}
          ${remainingLanguages ? `<span class="language">+${remainingLanguages}</span>` : ""}
        </div>
        <button class="book-link" type="button" data-doctor-id="${doctor.id}" aria-label="Book appointment with ${escapeHtml(doctor.name)}">
          Book <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>`;
}

function calendarScreen() {
  return `
    <section aria-labelledby="calendar-title">
      <button class="back-button" type="button" data-action="back-search" aria-label="Go back to doctor search">
        ${icons.left} Back to results
      </button>
      <div class="doctor-summary">
        <img src="${state.doctor.photo}" alt="" />
        <div>
          <p class="summary-name">${state.doctor.name}</p>
          <p class="summary-specialty">${state.doctor.specialty}</p>
        </div>
      </div>
      <div class="page-heading">
        <h1 class="page-title" id="calendar-title">Pick a time</h1>
        <p class="page-copy">Select a date and time that works for you.</p>
      </div>
      <div class="visit-types" role="group" aria-label="Visit type">
        <button class="visit-button" type="button" data-visit-type="video" aria-pressed="${state.visitType === "video"}">
          ${icons.video} Video visit
        </button>
        <button class="visit-button" type="button" data-visit-type="in-person" aria-pressed="${state.visitType === "in-person"}">
          ${icons.pin} In-person
        </button>
      </div>
      <div class="schedule-grid">
        ${calendarPanel()}
        ${slotsPanel()}
      </div>
      <div class="action-row">
        <button class="primary-button" type="button" data-action="continue" ${state.date && state.time ? "" : "disabled"}>
          Continue to confirmation <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>`;
}

function calendarPanel() {
  const firstDay = new Date(state.viewYear, state.viewMonth, 1).getDay();
  const daysInMonth = new Date(
    state.viewYear,
    state.viewMonth + 1,
    0,
  ).getDate();
  const blankDays = Array.from(
    { length: firstDay },
    () => '<span aria-hidden="true"></span>',
  ).join("");
  const monthDays = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const date = new Date(state.viewYear, state.viewMonth, day);
    date.setHours(0, 0, 0, 0);
    const comparisonToday = new Date();
    comparisonToday.setHours(0, 0, 0, 0);
    const isPast = date < comparisonToday;
    const isToday = date.getTime() === comparisonToday.getTime();
    const isSelected =
      state.date &&
      state.date.getFullYear() === state.viewYear &&
      state.date.getMonth() === state.viewMonth &&
      state.date.getDate() === day;
    const label = `${MONTH_NAMES[state.viewMonth]} ${day}, ${state.viewYear}${isPast ? " (unavailable)" : ""}${isSelected ? " (selected)" : ""}`;
    return `
      <button
        class="day-button ${isToday ? "is-today" : ""}"
        type="button"
        data-day="${day}"
        aria-label="${label}"
        aria-pressed="${Boolean(isSelected)}"
        ${isPast ? "disabled" : ""}
      >${day}</button>`;
  }).join("");

  return `
    <div class="panel">
      <div class="calendar-header">
        <button class="icon-button" type="button" data-action="previous-month" aria-label="Previous month">${icons.left}</button>
        <span class="month-title" aria-live="polite">${MONTH_NAMES[state.viewMonth]} ${state.viewYear}</span>
        <button class="icon-button" type="button" data-action="next-month" aria-label="Next month">${icons.right}</button>
      </div>
      <div class="calendar-weekdays" aria-hidden="true">
        ${DAY_NAMES.map((day) => `<span class="weekday">${day}</span>`).join("")}
      </div>
      <div class="calendar-days" role="grid" aria-label="${MONTH_NAMES[state.viewMonth]} ${state.viewYear} calendar">
        ${blankDays}${monthDays}
      </div>
    </div>`;
}

function slotsPanel() {
  const title = state.date
    ? `${MONTH_NAMES[state.date.getMonth()]} ${state.date.getDate()} — Available slots`
    : "Select a date to see slots";
  return `
    <div class="panel">
      <p class="slots-title" aria-live="polite">${title}</p>
      ${
        state.date
          ? `<div class="time-slots" role="group" aria-label="Available time slots">
              ${TIME_SLOTS.map((slot) => {
                const unavailable = UNAVAILABLE_SLOTS.has(slot);
                return `
                  <button
                    class="time-button"
                    type="button"
                    data-time="${slot}"
                    aria-pressed="${state.time === slot}"
                    aria-disabled="${unavailable}"
                    ${unavailable ? "disabled" : ""}
                  >${icons.clock} ${slot}</button>`;
              }).join("")}
            </div>`
          : '<div class="slots-placeholder">Choose a date first</div>'
      }
    </div>`;
}

function confirmationScreen() {
  if (state.confirmed) return successScreen();
  const formattedDate = formatDate(state.date);
  return `
    <section aria-labelledby="confirmation-title">
      <button class="back-button" type="button" data-action="back-calendar" aria-label="Go back to time selection">
        ${icons.left} Back to scheduling
      </button>
      <div class="page-heading">
        <h1 class="page-title" id="confirmation-title">Review &amp; confirm</h1>
        <p class="page-copy">Double-check your appointment details before booking.</p>
      </div>
      <div class="confirmation-grid">
        <div class="details-card">
          <div class="confirmation-doctor">
            <img src="${state.doctor.photo}" alt="${escapeHtml(state.doctor.name)}" />
            <div>
              <p class="doctor-name">${state.doctor.name}</p>
              <p class="specialty">${state.doctor.specialty}</p>
              <div class="rating">
                ${icons.star}
                <strong>${state.doctor.rating}</strong>
                <span>(${state.doctor.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div class="detail-rows">
            ${detailRow(icons.calendar, "Date", formattedDate)}
            ${detailRow(icons.clock, "Time", state.time)}
            ${detailRow(
              state.visitType === "video" ? icons.video : icons.pin,
              "Visit type",
              state.visitType === "video" ? "Video visit" : "In-person visit",
            )}
          </div>
        </div>
        <aside class="booking-summary" aria-label="Booking summary">
          <div>
            <p class="eyebrow">Booking summary</p>
            <div class="summary-lines">
              <div class="summary-line"><span>Consultation fee</span><span>$0 — covered by insurance</span></div>
              <div class="summary-line"><span>Copay</span><span>$25.00</span></div>
              <div class="summary-line total"><span>Total due today</span><span>$25.00</span></div>
            </div>
            <p class="summary-note">You can cancel or reschedule up to 24 hours before your appointment at no charge.</p>
          </div>
          <button class="primary-button" type="button" data-action="confirm-booking" ${state.booking ? "disabled" : ""}>
            ${
              state.booking
                ? '<span class="button-content"><span class="spinner" aria-hidden="true"></span>Booking…</span>'
                : "Confirm appointment"
            }
          </button>
          <span class="sr-status" role="status" aria-live="polite">${state.booking ? "Booking your appointment" : ""}</span>
        </aside>
      </div>
    </section>`;
}

function successScreen() {
  const formattedDate = formatDate(state.date);
  return `
    <section class="success" aria-labelledby="success-title">
      <div class="success-icon">${icons.check.replace('width="20" height="20"', 'width="40" height="40"')}</div>
      <h1 class="page-title" id="success-title">Appointment confirmed</h1>
      <p class="success-copy">
        Your appointment with <strong>${state.doctor.name}</strong> is booked for
        <strong>${formattedDate}</strong> at <strong>${state.time}</strong>.
      </p>
      <div class="success-details">
        <p class="eyebrow">Appointment details</p>
        <div class="detail-rows">
          ${detailRow(icons.calendar, "Date", formattedDate)}
          ${detailRow(icons.clock, "Time", state.time)}
          ${detailRow(
            state.visitType === "video" ? icons.video : icons.pin,
            "Type",
            state.visitType === "video" ? "Video visit" : "In-person visit",
          )}
        </div>
      </div>
      <div class="success-actions">
        <button class="primary-button" type="button" data-action="reset">Book another appointment</button>
        <button class="secondary-button" type="button" data-action="add-calendar">Add to calendar</button>
      </div>
    </section>`;
}

function detailRow(icon, label, value) {
  return `
    <div class="detail-row">
      ${icon}
      <div>
        <p class="detail-label">${label}</p>
        <p class="detail-value">${value}</p>
      </div>
    </div>`;
}

function formatDate(date) {
  return `${DAY_NAMES[date.getDay()]}, ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function resetState() {
  state.step = 1;
  state.query = "";
  state.specialty = "All";
  state.doctor = null;
  state.viewYear = today.getFullYear();
  state.viewMonth = today.getMonth();
  state.date = null;
  state.time = null;
  state.visitType = "video";
  state.booking = false;
  state.confirmed = false;
}

function bindEvents() {
  document.querySelector("#doctor-search")?.addEventListener("input", (event) => {
    const selectionStart = event.target.selectionStart;
    state.query = event.target.value;
    render();
    const search = document.querySelector("#doctor-search");
    search?.focus();
    search?.setSelectionRange(selectionStart, selectionStart);
  });

  document.querySelectorAll("[data-specialty]").forEach((button) => {
    button.addEventListener("click", () => {
      state.specialty = button.dataset.specialty;
      render();
      document.querySelector(`[data-specialty="${CSS.escape(state.specialty)}"]`)?.focus();
    });
  });

  document.querySelectorAll("[data-doctor-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.doctor = DOCTORS.find(
        (doctor) => doctor.id === Number(button.dataset.doctorId),
      );
      state.step = 2;
      state.date = null;
      state.time = null;
      render({ focusMain: true });
    });
  });

  document.querySelectorAll("[data-visit-type]").forEach((button) => {
    button.addEventListener("click", () => {
      state.visitType = button.dataset.visitType;
      render();
      document.querySelector(`[data-visit-type="${state.visitType}"]`)?.focus();
    });
  });

  document.querySelectorAll("[data-day]").forEach((button) => {
    button.addEventListener("click", () => {
      state.date = new Date(
        state.viewYear,
        state.viewMonth,
        Number(button.dataset.day),
      );
      state.time = null;
      render();
      document.querySelector(`[data-day="${button.dataset.day}"]`)?.focus();
    });
  });

  document.querySelectorAll("[data-time]").forEach((button) => {
    button.addEventListener("click", () => {
      state.time = button.dataset.time;
      render();
      document.querySelector(`[data-time="${state.time}"]`)?.focus();
    });
  });

  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", (event) => {
      const action = element.dataset.action;
      if (action === "reset") {
        event.preventDefault();
        resetState();
        render({ focusMain: true });
      }
      if (action === "back-search") {
        state.step = 1;
        render({ focusMain: true });
      }
      if (action === "back-calendar") {
        state.step = 2;
        state.confirmed = false;
        render({ focusMain: true });
      }
      if (action === "previous-month") {
        state.viewMonth -= 1;
        if (state.viewMonth < 0) {
          state.viewMonth = 11;
          state.viewYear -= 1;
        }
        render();
        document.querySelector('[data-action="previous-month"]')?.focus();
      }
      if (action === "next-month") {
        state.viewMonth += 1;
        if (state.viewMonth > 11) {
          state.viewMonth = 0;
          state.viewYear += 1;
        }
        render();
        document.querySelector('[data-action="next-month"]')?.focus();
      }
      if (action === "continue" && state.date && state.time) {
        state.step = 3;
        render({ focusMain: true });
      }
      if (action === "confirm-booking" && !state.booking) {
        state.booking = true;
        render();
        window.setTimeout(() => {
          state.booking = false;
          state.confirmed = true;
          render({ focusMain: true });
        }, 1200);
      }
      if (action === "add-calendar") addToCalendar();
    });
  });
}

function addToCalendar() {
  const [time, meridiem] = state.time.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  const start = new Date(state.date);
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const toIcsDate = (date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CareBook//Appointment//EN",
    "BEGIN:VEVENT",
    `UID:carebook-${Date.now()}@carebook.local`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:Appointment with ${state.doctor.name}`,
    `DESCRIPTION:${state.visitType === "video" ? "Video visit" : "In-person visit"} with ${state.doctor.name}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "carebook-appointment.ics";
  link.click();
  URL.revokeObjectURL(link.href);
}

render();
