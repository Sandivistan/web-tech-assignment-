/*
  events.js
  The list of campus events. Each event is one object in the array.
  To add an event, copy one object, change its values and give it a new id.

  date is written as YYYY-MM-DD and time as HH:MM (24-hour clock).
*/

const events = [
  {
    id: 1,
    name: "Web Design Bootcamp",
    category: "Workshop",
    description: "Build and style your first web page in one morning. No coding experience is needed.",
    date: "2026-12-03",
    time: "10:00",
    venue: "Computer Lab 2, Block B",
    image: "images/event-web-design.svg"
  },
  {
    id: 2,
    name: "Robotics Challenge",
    category: "Competition",
    description: "Teams of three program a robot to finish an obstacle course in the fastest time.",
    date: "2026-12-09",
    time: "09:00",
    venue: "Engineering Hall",
    image: "images/event-robotics.svg"
  },
  {
    id: 3,
    name: "International Food Festival",
    category: "Cultural",
    description: "Taste dishes cooked by student societies and vote for your favourite stall.",
    date: "2026-12-12",
    time: "12:00",
    venue: "Central Lawn",
    image: "images/event-food-festival.svg"
  },
  {
    id: 4,
    name: "AI in Everyday Life",
    category: "Seminar",
    description: "Lecturers explain how artificial intelligence is used in health, transport and study.",
    date: "2026-12-16",
    time: "14:00",
    venue: "Main Auditorium",
    image: "images/event-ai-seminar.svg"
  },
  {
    id: 5,
    name: "Inter-Faculty Football Cup",
    category: "Sports",
    description: "Play for your faculty or cheer from the stands in a one-day knockout tournament.",
    date: "2027-01-16",
    time: "15:00",
    venue: "University Stadium",
    image: "images/event-football.svg"
  },
  {
    id: 6,
    name: "Public Speaking Workshop",
    category: "Workshop",
    description: "Practise short talks in small groups and get friendly feedback before presentation week.",
    date: "2027-01-21",
    time: "13:30",
    venue: "Room 204, Arts Building",
    image: "images/event-public-speaking.svg"
  },
  {
    id: 7,
    name: "24-Hour Hackathon",
    category: "Competition",
    description: "Design, code and present an app that solves a campus problem. Meals are provided.",
    date: "2027-01-29",
    time: "17:00",
    venue: "Innovation Centre",
    image: "images/event-hackathon.svg"
  },
  {
    id: 8,
    name: "Campus Music Night",
    category: "Cultural",
    description: "An evening of live music from student bands, solo singers and the university choir.",
    date: "2027-02-05",
    time: "19:00",
    venue: "Open Air Theatre",
    image: "images/event-music-night.svg"
  },
  {
    id: 9,
    name: "Campus 5K Run",
    category: "Sports",
    description: "Run, jog or walk five kilometres around campus. Every finisher receives a medal.",
    date: "2027-02-13",
    time: "07:30",
    venue: "Start line at Main Gate",
    image: "images/event-campus-run.svg"
  }
];
