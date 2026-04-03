# Lab 10 — React JS

Three separate React applications, each in its own folder.

---

## Setup (same steps for all tasks)

```bash
cd Task1_AlienSignalDecryption   # or Task2 / Task3
npm install
npm run dev
```

Then open the localhost URL shown in your terminal.

---

## Task 1 — Alien Signal Decryption Interface

**Folder:** `Task1_AlienSignalDecryption/`

A 4×4 memory-matching card game with alien emoji signals.

**Features:**
- 16-card grid (8 matched pairs)
- Cards flip with a 3D CSS animation
- Mismatch hides cards after 1 second delay (via `useEffect`)
- Timer starts on first click, stops on completion
- Scoring: +100 per match, -10 per mismatch, time bonus on completion
- Final results modal with total score breakdown
- Animated star background

**Key State:**
```js
const [cards, setCards] = useState([])
const [flippedCards, setFlippedCards] = useState([])
const [matchedCards, setMatchedCards] = useState([])
const [score, setScore] = useState(0)
const [time, setTime] = useState(0)
```

---

## Task 2 — Traveler Onboarding System

**Folder:** `Task2_TravelerOnboarding/`

A professional 4-step multi-stage travel registration form.

**Features:**
- **Step 1:** Name, email, DOB (18+ check), passport photo upload
- **Step 2:** Phone, address, country/state dropdowns (state options update dynamically), postal code validation per country
- **Step 3:** Profession (with custom "Other" input), travel experience, multi-tag language selector, optional LinkedIn/website URLs
- **Step 4:** Username (mock uniqueness check), strong password, notification checkboxes, terms + privacy consent
- Real-time field validation with inline error messages
- Animated color-coded progress bar (Red → Yellow → Blue → Green)
- `localStorage` persistence — data survives page reload
- Clear Form with confirmation dialog
- Simulated loading state on final submission
- Success/Error toast notifications
- Mobile responsive layout

---

## Task 3 — Personal Task Manager Dashboard

**Folder:** `Task3_TaskManagerDashboard/`

A clean personal task manager dashboard with filtering.

**Features:**
- Initial tasks loaded via `useEffect` + `setTimeout` (1 second simulated API load)
- "Loading tasks..." message while data is being set
- Add new tasks via text input (Enter key or button)
- Toggle completion via checkbox (strikethrough style)
- Delete tasks per item
- Filter buttons: All / Active / Completed (active button highlighted in blue)
- Task stats badge (Total / Active / Done)
- Empty state message when no tasks match the filter
- Page title updates with active task count

**Component Tree:**
```
App.js
 ├── TaskInput.js
 ├── FilterControls.js
 └── TaskList.js
      └── TaskItem.js (per task)
```
