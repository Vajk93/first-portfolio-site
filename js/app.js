// const projectsDatas = [
//   {
//     id: 0,
//     imgUrl: "../images/portfolios/portfolio0.jpg",
//     websiteUrl: "http://vajkgyakorolodomain.hu",
//     projectName: "weather app",
//     description: "This is a Weather App.",
//     usedTechnologies: ["APIs", " React", " HTML", " CSS"],
//     whatILearned:
//       "The goal of the project was to make a weather app with React.js using several APIs. The goal was achieved, but the logic of the code is terrible, because I didn't plan it, I just started, and then it will be based on something.",
//   },
//   {
//     id: 1,
//     imgUrl: "../images/portfolios/portfolio1.jpg",
//     websiteUrl: "http://brekkteam.hu",
//     projectName: "BrekkTeam website",
//     description:
//       "I had the opportunity to create the Brekkteam website, where their products and services are presented.",
//     usedTechnologies: [" Vanilla JS", " HTML", " CSS"],
//     whatILearned:
//       "I learned what cookies are and how to use them. The animation was fun. I did the authentication of the form and the immediate sending of the email using Email.js. I also tried in PHP, but there it put the mails in spam.",
//   },
//   {
//     id: 2,
//     imgUrl: "../images/portfolios/portfolio2.jpg",
//     websiteUrl: "https://vajk93.github.io/quotes/",
//     projectName: "random quote generator",
//     description:
//       "I chose this challenge from frontendmentor.io. This is a random quote generator website.  I used -advice slip json API-. It wasn't too complicated, luckily it was ready quickly.",
//     usedTechnologies: ["API", " HTML", " CSS", " JavaScript"],
//     whatILearned: "using an API with fetch",
//   },
//   {
//     id: 3,
//     imgUrl: "../images/portfolios/portfolio3.jpg",
//     websiteUrl: "https://happygyros.hu/",
//     projectName: "happy gyros",
//     description: "I made this site for an entrepreneur who sells gyros.",
//     usedTechnologies: [" HTML", " CSS", " JavaScript", " Figma"],
//     whatILearned:
//       "What was new was the use of the map, here we stayed with the basic map in the end, because there was not such a demand for it that even a paid option could be included. In addition to the map, the parallax solution was also new. Fortunately, I found a suitable external library for this. I started by myself, but when we scrolled back it wasn't perfect, only down.",
//   },
//   {
//     id: 4,
//     imgUrl: "../images/portfolios/portfolio4.jpg",
//     websiteUrl: "https://schillingheni.hu/",
//     projectName: "Hairdresser website",
//     description:
//       "I made this site for a friend, who is a hairdresser. I used Figma for design, and photoshop to optimizing photos.",
//     usedTechnologies: [" Vanilla JavaScript", " HTML", " CSS", " Figma"],
//     whatILearned:
//       "challenge: Not to use any framework or library (write all the functions by myself), and learn how to host a website. I used Figma for design, and photoshop to optimizing photos. I used HTML ,CSS and vanilla javasScript. I met lot's of new problems, but finally, (and slowly) i could solve those.",
//   },
//   {
//     id: 5,
//     imgUrl: "../images/portfolios/portfolio5.jpg",
//     websiteUrl: "https://react-form-validation-good.web.app/",
//     projectName: "react interactive form validation",
//     description:
//       "This is an interactive form validation app. it doesn't look the best on the phone, it should be worked on a bit more.",
//     usedTechnologies: [
//       "React (props, onChange, onBlur, states)",
//       " HTML",
//       " CSS",
//     ],
//     whatILearned:
//       "What was difficult? Everything, and i was very slow, but i have learnt a lot from this project: Use props, to send data not just down, but also up, use onChange and onBlur event use useState(), use components, use different css things, eg. something.module.css or just something.css or inline css. Challange and design made by frontendmentor.io: https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw",
//   },
//   {
//     id: 6,
//     imgUrl: "../images/portfolios/portfolio6.jpg",
//     websiteUrl: "https://vajk93.github.io/toDoApp/",
//     projectName: "to do app",
//     description: "This is a To Do App with some function.",
//     usedTechnologies: ["Vanilla JS", " HTML", " CSS"],
//     whatILearned:
//       "The JS part was difficult, but eventually I made friends with the js template literal",
//   },
//   {
//     id: 7,
//     imgUrl: "../images/portfolios/portfolio7.jpg",
//     websiteUrl: "https://vajk93.github.io/fylo-dark-theme-landing-page-master/",
//     projectName: "fylo dark theme landing page",
//     description:
//       "This is a landing page with a basic form validation. Challange form frontendmentor.io",
//     usedTechnologies: ["Vanilla JS", " HTML", " CSS"],
//     whatILearned:
//       "It wasn't too difficult, it was good to practice and build something new.",
//   },
//   {
//     id: 8,
//     imgUrl: "../images/portfolios/portfolio8.jpg",
//     websiteUrl: "https://vajk93.github.io/runaway_exam/",
//     projectName: "runaway portfolio site",
//     description: "This is a copy of a portfolio site",
//     usedTechnologies: ["Vanilla JS", " HTML", " CSS"],
//     whatILearned:
//       "I tried to copy an existing page. When I made the site, I still had very little javascript experience, so html and css dominated.",
//   },
//   {
//     id: 9,
//     imgUrl: "../images/portfolios/portfolio9.jpg",
//     websiteUrl: "https://vajk93.github.io/loopstudios/",
//     projectName: "loop studios",
//     description: "This is a basic website, but i firstly used bootstrap.",
//     usedTechnologies: ["Vanilla JS", " Bootstrap", " HTML", " CSS"],
//     whatILearned:
//       "After a bootstrap course, i chose this basic challenge from frontendmentor.io to practice bootstrap.",
//   },
//   {
//     id: 10,
//     imgUrl: "../images/portfolios/portfolio10.jpg",
//     websiteUrl:
//       "https://vajk93.github.io/Social-media-dashboard-with-theme-switcher/",
//     projectName: "social media dashboard",
//     description:
//       "This is a social media dashboard challenge from frontendmentor.io. ",
//     usedTechnologies: ["CSS Grid", " Vanilla JS", " HTML", " CSS"],
//     whatILearned:
//       "I used the css grid firstly in a project. The dark mode switcher was also new to me, but it wasn't too hard fortunatelly.",
//   },
//   {
//     id: 11,
//     imgUrl: "../images/portfolios/portfolio11.jpg",
//     websiteUrl: "https://vajk93.github.io/porto_exam/",
//     projectName: "porto website",
//     description:
//       "This site was a html and css exam project with in Ruander. Today I would be able to make it exactly like the original",
//     usedTechnologies: [" Vanilla JS", " HTML", " CSS"],
//     whatILearned:
//       "Everything was a bit new, maybe it was my first project where I don't just practice small things but actually build something.",
//   },
//   {
//     id: 12,
//     imgUrl: "../images/portfolios/portfolio12.jpg",
//     websiteUrl: "https://vajk93.github.io/time-tracking-dashboard/",
//     projectName: "time tracking dashboard",
//     description: "This is a time tracking dashboard.",
//     usedTechnologies: ["CSS grid", " Vanilla JS", " HTML", " CSS"],
//     whatILearned: "How to use arrays/objects to manipulate the DOM.",
//   },
//   {
//     id: 13,
//     imgUrl: "../images/portfolios/portfolio13.jpg",
//     websiteUrl: "https://vajk93.github.io/tipCault/",
//     projectName: "tip cault",
//     description:
//       "This is a tip cault app. The logic not the best..maybe i will refactor this, but i dont think so.",
//     usedTechnologies: [" Vanilla JS", " HTML", " CSS"],
//     whatILearned:
//       "Javascript was still new when I made this page. I still didn't know what refactoring was, or that I had to build logic, not just that it should work. Also, the UX part is horrible, but this site was one of my first JS project.",
//   },
//   {
//     id: 14,
//     imgUrl: "../images/portfolios/portfolio14.jpg",
//     websiteUrl: "https://vajk93.github.io/reading-helper/",
//     projectName: "reading helper",
//     description:
//       "This page is not optimized for mobile devices. I only made it for desktop view. This is a reading helper site. When I was working downstairs in the warehouse, it occurred to me that it would be good to make a website like this.",
//     usedTechnologies: [" Vanilla JS", " HTML", " CSS"],
//     whatILearned: "Javascript - dom manipulation and the js/css connections.",
//   },
//   {
//     id: 15,
//     imgUrl: "../images/portfolios/portfolio15.jpg",
//     websiteUrl: "https://github.com/Vajk93/whatToWatchToday",
//     projectName: "what to watch today",
//     description: "This is a movie selection website. One of my first project.",
//     usedTechnologies: [" Vanilla JS", " HTML", " CSS"],
//     whatILearned:
//       "The javascript part was slower, but I'm proud of myself because I was very new when I did this and it works the way I wanted it to work. This is where I first and last time used jquery for the menu. It didn't even occur to me to optimize the images here.",
//   },
//   {
//     id: 16,
//     imgUrl: "../images/portfolios/portfolio16.jpg",
//     websiteUrl: "https://vajk93.github.io/counterdown",
//     projectName: "JavasScript Counterdown for Actions",
//     description:
//       "This is a countdown timer for several promotional periods, which counts down in relation to the given promotion, how long the percentage discount is valid",
//     usedTechnologies: [" Vanilla JS", " HTML", " CSS"],
//     whatILearned:
//       "it was mainly javascript programming and I encountered many challenges, but fortunately I managed to solve them all.",
//   },
//   {
//     id: 17,
//     imgUrl: "../images/portfolios/portfolio17.jpg",
//     websiteUrl: "https://vajk93.github.io/create-excel/",
//     projectName: "Convert emails to importable excel format",
//     description:
//       "This site converts an email database in a specific format as a file that can be imported into a newsletter system. A made it to solve a specific problem.",
//     usedTechnologies: [" Vanilla JS", " HTML", " CSS"],
//     whatILearned:
//       "Creating XLSX files was new to me, but a found some tutorials on the internet, so i could make this site.",
//   },
// ];
// // ------------------------- home page projects rendering -------------------
// let projectsContainerOnHomePage = document.getElementById("projects");
// // projectsContainerOnHomePage.innerHTML = "alma";
// for (let i = 0; i < projectsDatas.length; i++) {
//   let el = `<div class="project">
//   <img
//     class="projectImg1"
//     src="images/portfolios/portfolio${i}.jpg"
//     alt="portfolio image1"
//   />
//   <a href="./projects/projects.html">Details</a>
// </div>
//   `;
//   projectsContainerOnHomePage.innerHTML =
//     projectsContainerOnHomePage.innerHTML + el;
// }
