import { useMemo, useRef, useState } from "react";

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

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function Chevron({ direction = "left" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

function CheckIcon({ large = false }) {
  return (
    <svg width={large ? 40 : 20} height={large ? 40 : 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m22 8-6 4 6 4V8z" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function Progress({ step }) {
  const steps = ["Find a Doctor", "Choose Time", "Confirm"];
  return (
    <nav className="progress" aria-label="Booking progress">
      {steps.map((label, index) => {
        const number = index + 1;
        const status = step === number ? "is-active" : step > number ? "is-done" : "";
        return (
          <div className={`progress-step ${status}`} key={label}>
            <div className="progress-item">
              <span className="progress-number" aria-current={step === number ? "step" : undefined}>
                {step > number ? <CheckIcon /> : number}
              </span>
              <span className="progress-label">{label}</span>
            </div>
            {index < steps.length - 1 && (
              <span className={`progress-line ${step > number ? "is-done" : ""}`} aria-hidden="true" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

function Rating({ doctor, showReviewLabel = false }) {
  return (
    <div className="rating">
      <StarIcon />
      <strong>{doctor.rating}</strong>
      <span>({doctor.reviews}{showReviewLabel ? " reviews" : ""})</span>
      {!showReviewLabel && (
        <>
          <span className="rating-divider">·</span>
          <span>{doctor.experience}</span>
        </>
      )}
    </div>
  );
}

function DoctorCard({ doctor, onSelect }) {
  const visibleLanguages = doctor.languages.slice(0, 2);
  const remaining = doctor.languages.length - visibleLanguages.length;
  return (
    <article className="doctor-card">
      <div className="doctor-card-top">
        <div className="photo-wrap">
          <img className="doctor-photo" src={doctor.photo} alt={`Photo of ${doctor.name}`} loading="lazy" />
          {doctor.accepting && <span className="accepting-dot" role="img" aria-label="Accepting new patients" />}
        </div>
        <div>
          <h2 className="doctor-name">{doctor.name}</h2>
          <p className="doctor-specialty">{doctor.specialty}</p>
          <Rating doctor={doctor} />
        </div>
        <span className={`availability ${doctor.availability.includes("Today") ? "today" : ""}`}>
          {doctor.availability}
        </span>
      </div>
      <p className="doctor-bio">{doctor.bio}</p>
      <div className="doctor-card-footer">
        <div className="languages" aria-label="Languages spoken">
          {visibleLanguages.map((language) => <span className="language" key={language}>{language}</span>)}
          {remaining > 0 && <span className="language">+{remaining}</span>}
        </div>
        <button className="book-link" type="button" onClick={() => onSelect(doctor)} aria-label={`Book appointment with ${doctor.name}`}>
          Book <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}

function SearchScreen({ onSelect }) {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const doctors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return DOCTORS.filter((doctor) => {
      const matchesQuery =
        !normalizedQuery ||
        doctor.name.toLowerCase().includes(normalizedQuery) ||
        doctor.specialty.toLowerCase().includes(normalizedQuery);
      const matchesSpecialty = specialty === "All" || doctor.specialty === specialty;
      return matchesQuery && matchesSpecialty;
    });
  }, [query, specialty]);

  return (
    <section aria-labelledby="search-title">
      <div className="page-heading">
        <h1 className="page-title" id="search-title">Find your doctor</h1>
        <p className="page-copy">Search by name or specialty to book a same-day or future appointment.</p>
      </div>
      <div className="search-field">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search doctors, specialties…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search doctors"
          autoComplete="off"
        />
      </div>
      <fieldset className="filter-list" aria-label="Filter by specialty">
        {SPECIALTIES.map((item) => (
          <button className="filter-button" type="button" key={item} onClick={() => setSpecialty(item)} aria-pressed={specialty === item}>
            {item}
          </button>
        ))}
      </fieldset>
      <p className="results-meta" aria-live="polite">
        {doctors.length} {doctors.length === 1 ? "doctor" : "doctors"} found
      </p>
      {doctors.length ? (
        <div className="doctor-grid">
          {doctors.map((doctor) => <DoctorCard doctor={doctor} onSelect={onSelect} key={doctor.id} />)}
        </div>
      ) : (
        <div className="empty-state">
          <strong>No doctors found</strong>
          <span>Try adjusting your search or filters.</span>
        </div>
      )}
    </section>
  );
}

function CalendarPanel({ viewYear, viewMonth, selectedDate, onChangeMonth, onSelectDate }) {
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const comparisonToday = new Date();
  comparisonToday.setHours(0, 0, 0, 0);

  return (
    <div className="panel">
      <div className="calendar-header">
        <button className="icon-button" type="button" onClick={() => onChangeMonth(-1)} aria-label="Previous month"><Chevron /></button>
        <span className="month-title" aria-live="polite">{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button className="icon-button" type="button" onClick={() => onChangeMonth(1)} aria-label="Next month"><Chevron direction="right" /></button>
      </div>
      <div className="calendar-weekdays" aria-hidden="true">
        {DAY_NAMES.map((day) => <span className="weekday" key={day}>{day}</span>)}
      </div>
      <div className="calendar-days" role="grid" aria-label={`${MONTH_NAMES[viewMonth]} ${viewYear} calendar`}>
        {Array.from({ length: firstDay }, (_, index) => <span aria-hidden="true" key={`blank-${index}`} />)}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const date = new Date(viewYear, viewMonth, day);
          date.setHours(0, 0, 0, 0);
          const isPast = date < comparisonToday;
          const isToday = date.getTime() === comparisonToday.getTime();
          const isSelected =
            selectedDate &&
            selectedDate.getFullYear() === viewYear &&
            selectedDate.getMonth() === viewMonth &&
            selectedDate.getDate() === day;
          return (
            <button
              className={`day-button ${isToday ? "is-today" : ""}`}
              type="button"
              key={day}
              onClick={() => onSelectDate(new Date(viewYear, viewMonth, day))}
              aria-label={`${MONTH_NAMES[viewMonth]} ${day}, ${viewYear}${isPast ? " (unavailable)" : ""}${isSelected ? " (selected)" : ""}`}
              aria-pressed={Boolean(isSelected)}
              disabled={isPast}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SlotsPanel({ date, selectedTime, onSelectTime }) {
  return (
    <div className="panel">
      <p className="slots-title" aria-live="polite">
        {date ? `${MONTH_NAMES[date.getMonth()]} ${date.getDate()} — Available slots` : "Select a date to see slots"}
      </p>
      {date ? (
        <div className="time-slots" role="group" aria-label="Available time slots">
          {TIME_SLOTS.map((slot) => {
            const unavailable = UNAVAILABLE_SLOTS.has(slot);
            return (
              <button
                className="time-button"
                type="button"
                key={slot}
                onClick={() => onSelectTime(slot)}
                aria-pressed={selectedTime === slot}
                aria-disabled={unavailable}
                disabled={unavailable}
              >
                <ClockIcon /> {slot}
              </button>
            );
          })}
        </div>
      ) : <div className="slots-placeholder">Choose a date first</div>}
    </div>
  );
}

function CalendarScreen({ doctor, onBack, onContinue }) {
  const current = new Date();
  const [viewYear, setViewYear] = useState(current.getFullYear());
  const [viewMonth, setViewMonth] = useState(current.getMonth());
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [visitType, setVisitType] = useState("video");

  function changeMonth(delta) {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  function selectDate(nextDate) {
    setDate(nextDate);
    setTime(null);
  }

  return (
    <section aria-labelledby="calendar-title">
      <button className="back-button" type="button" onClick={onBack} aria-label="Go back to doctor search"><Chevron /> Back to results</button>
      <div className="doctor-summary">
        <img src={doctor.photo} alt="" />
        <div>
          <p className="summary-name">{doctor.name}</p>
          <p className="summary-specialty">{doctor.specialty}</p>
        </div>
      </div>
      <div className="page-heading">
        <h1 className="page-title" id="calendar-title">Pick a time</h1>
        <p className="page-copy">Select a date and time that works for you.</p>
      </div>
      <div className="visit-types" role="group" aria-label="Visit type">
        <button className="visit-button" type="button" onClick={() => setVisitType("video")} aria-pressed={visitType === "video"}><VideoIcon /> Video visit</button>
        <button className="visit-button" type="button" onClick={() => setVisitType("in-person")} aria-pressed={visitType === "in-person"}><PinIcon /> In-person</button>
      </div>
      <div className="schedule-grid">
        <CalendarPanel viewYear={viewYear} viewMonth={viewMonth} selectedDate={date} onChangeMonth={changeMonth} onSelectDate={selectDate} />
        <SlotsPanel date={date} selectedTime={time} onSelectTime={setTime} />
      </div>
      <div className="action-row">
        <button className="primary-button" type="button" onClick={() => onContinue(date, time, visitType)} disabled={!date || !time}>
          Continue to confirmation <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="detail-row">
      {icon}
      <div>
        <p className="detail-label">{label}</p>
        <p className="detail-value">{value}</p>
      </div>
    </div>
  );
}

function formatDate(date) {
  return `${DAY_NAMES[date.getDay()]}, ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function addToCalendar(doctor, date, time, visitType) {
  const [clockTime, meridiem] = time.split(" ");
  let [hours, minutes] = clockTime.split(":").map(Number);
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  const start = new Date(date);
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const toIcsDate = (value) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CareBook//Appointment//EN",
    "BEGIN:VEVENT",
    `UID:carebook-${Date.now()}@carebook.local`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:Appointment with ${doctor.name}`,
    `DESCRIPTION:${visitType === "video" ? "Video visit" : "In-person visit"} with ${doctor.name}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([content], { type: "text/calendar;charset=utf-8" }));
  link.download = "carebook-appointment.ics";
  link.click();
  URL.revokeObjectURL(link.href);
}

function SuccessScreen({ doctor, date, time, visitType, onReset }) {
  const formattedDate = formatDate(date);
  return (
    <section className="success" aria-labelledby="success-title">
      <div className="success-icon"><CheckIcon large /></div>
      <h1 className="page-title" id="success-title">Appointment confirmed</h1>
      <p className="success-copy">
        Your appointment with <strong>{doctor.name}</strong> is booked for <strong>{formattedDate}</strong> at <strong>{time}</strong>.
      </p>
      <div className="success-details">
        <p className="eyebrow">Appointment details</p>
        <div className="detail-rows">
          <DetailRow icon={<CalendarIcon />} label="Date" value={formattedDate} />
          <DetailRow icon={<ClockIcon />} label="Time" value={time} />
          <DetailRow icon={visitType === "video" ? <VideoIcon /> : <PinIcon />} label="Type" value={visitType === "video" ? "Video visit" : "In-person visit"} />
        </div>
      </div>
      <div className="success-actions">
        <button className="primary-button" type="button" onClick={onReset}>Book another appointment</button>
        <button className="secondary-button" type="button" onClick={() => addToCalendar(doctor, date, time, visitType)}>Add to calendar</button>
      </div>
    </section>
  );
}

function ConfirmationScreen({ doctor, date, time, visitType, onBack, onReset }) {
  const [booking, setBooking] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const formattedDate = formatDate(date);

  function confirmBooking() {
    setBooking(true);
    window.setTimeout(() => {
      setBooking(false);
      setConfirmed(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  }

  if (confirmed) {
    return <SuccessScreen doctor={doctor} date={date} time={time} visitType={visitType} onReset={onReset} />;
  }

  return (
    <section aria-labelledby="confirmation-title">
      <button className="back-button" type="button" onClick={onBack} aria-label="Go back to time selection"><Chevron /> Back to scheduling</button>
      <div className="page-heading">
        <h1 className="page-title" id="confirmation-title">Review &amp; confirm</h1>
        <p className="page-copy">Double-check your appointment details before booking.</p>
      </div>
      <div className="confirmation-grid">
        <div className="details-card">
          <div className="confirmation-doctor">
            <img src={doctor.photo} alt={doctor.name} />
            <div>
              <p className="doctor-name">{doctor.name}</p>
              <p className="specialty">{doctor.specialty}</p>
              <Rating doctor={doctor} showReviewLabel />
            </div>
          </div>
          <div className="detail-rows">
            <DetailRow icon={<CalendarIcon />} label="Date" value={formattedDate} />
            <DetailRow icon={<ClockIcon />} label="Time" value={time} />
            <DetailRow icon={visitType === "video" ? <VideoIcon /> : <PinIcon />} label="Visit type" value={visitType === "video" ? "Video visit" : "In-person visit"} />
          </div>
        </div>
        <aside className="booking-summary" aria-label="Booking summary">
          <div>
            <p className="eyebrow">Booking summary</p>
            <div className="summary-lines">
              <div className="summary-line"><span>Consultation fee</span><span>$0 — covered by insurance</span></div>
              <div className="summary-line"><span>Copay</span><span>$25.00</span></div>
              <div className="summary-line total"><span>Total due today</span><span>$25.00</span></div>
            </div>
            <p className="summary-note">You can cancel or reschedule up to 24 hours before your appointment at no charge.</p>
          </div>
          <button className="primary-button" type="button" onClick={confirmBooking} disabled={booking}>
            {booking ? <span className="button-content"><span className="spinner" aria-hidden="true" />Booking…</span> : "Confirm appointment"}
          </button>
          <span role="status" aria-live="polite">{booking ? "Booking your appointment" : ""}</span>
        </aside>
      </div>
    </section>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [doctor, setDoctor] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const mainRef = useRef(null);

  function moveToStep(nextStep) {
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true }));
  }

  function selectDoctor(nextDoctor) {
    setDoctor(nextDoctor);
    moveToStep(2);
  }

  function chooseAppointment(date, time, visitType) {
    setAppointment({ date, time, visitType });
    moveToStep(3);
  }

  function reset() {
    setDoctor(null);
    setAppointment(null);
    moveToStep(1);
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#" onClick={(event) => { event.preventDefault(); reset(); }} aria-label="CareBook home">
            <span className="brand-mark"><PulseIcon /></span>
            <span className="brand-name">CareBook</span>
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#appointments">My Appointments</a>
            <a href="#records">Records</a>
            <span className="avatar" aria-label="User account for JD">JD</span>
          </nav>
        </div>
      </header>
      <main className="main-content" id="main-content" tabIndex="-1" ref={mainRef}>
        <Progress step={step} />
        {step === 1 && <SearchScreen onSelect={selectDoctor} />}
        {step === 2 && doctor && <CalendarScreen doctor={doctor} onBack={() => moveToStep(1)} onContinue={chooseAppointment} />}
        {step === 3 && doctor && appointment && (
          <ConfirmationScreen
            doctor={doctor}
            date={appointment.date}
            time={appointment.time}
            visitType={appointment.visitType}
            onBack={() => moveToStep(2)}
            onReset={reset}
          />
        )}
      </main>
    </div>
  );
}
