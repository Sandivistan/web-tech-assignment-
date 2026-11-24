# Smart Campus Events Portal

A website for XYZ University where students can browse campus events, search and filter them, and register for an event. It was made for a web technologies assignment with plain HTML5, CSS3 and JavaScript. There are no frameworks, libraries, build tools or backend.

The website is designed for desktop screens only.

## Pages

| Page | What it does |
| --- | --- |
| `index.html` | Home page with the hero section and three featured events |
| `events.html` | All events, with a search box and category buttons |
| `register.html` | Registration form and the "My registrations" table |
| `about.html` | About the portal, contact details, FAQ and event terms |

## File structure

```text
.
├── index.html
├── events.html
├── register.html
├── about.html
├── README.md
├── css/
│   └── style.css      The one stylesheet used by all pages
├── js/
│   ├── events.js      The events, stored as an array of objects
│   └── main.js        All the behaviour of the website
└── images/            SVG images for the logo, the hero and each event
```

## Run it locally

Open the project folder and double-click `index.html`. It opens in your browser and needs no installation.

## Run it with Live Server

1. Open the project folder in VS Code (**File > Open Folder**).
2. Install the **Live Server** extension from the Extensions panel.
3. Right-click `index.html` and choose **Open with Live Server**.

The page reloads each time you save a file.

## Publish it with GitHub Pages

1. Create a new public repository on GitHub.
2. Upload everything in this folder to the repository. `index.html` must be at the top level, not inside another folder.
3. In the repository, open **Settings > Pages**.
4. Under **Build and deployment**, set the source to **Deploy from a branch**.
5. Choose the **main** branch and the **/ (root)** folder, then select **Save**.
6. After a few minutes the address of the website appears on the same page. It looks like `https://your-username.github.io/your-repository/`.

All links are relative, so they work locally and on GitHub Pages.

## How the JavaScript works

- **Event cards:** `main.js` reads the array in `events.js` and creates the HTML for each card. The Home page shows the first three events in the array.
- **Search and filter:** an event is shown only if it matches the search text and the selected category.
- **Choosing an event:** a Register link such as `register.html?event=3` carries the event id. The form reads the id and selects that event.
- **Validation:** when the form is submitted, every field is checked. Errors appear under the fields, and nothing is saved until all fields are valid.
- **Saving:** registrations are saved as JSON text in `localStorage`. They stay in the same browser until they are cleared and are not sent to a server. The published site and the local copy each keep their own list.

## Change the events

Edit the array in `js/events.js`. Write dates as `YYYY-MM-DD` and times as `HH:MM`. Put a new image in the `images` folder and give its path in the event object.
