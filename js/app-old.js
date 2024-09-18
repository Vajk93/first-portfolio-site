//nav buttons
var homeBtn = document.getElementById("homeBtn");
var aboutMeBtn = document.getElementById("aboutMeBtn");
var portfoliosBtn = document.getElementById("codesBtn");
var contactBtn = document.getElementById("contactBtn");

// sections
var homeSection = document.getElementById("hero");
var aboutMeSection = document.getElementById("aboutMe");
var portfoliosSection = document.getElementById("portfolios");
var contactSection = document.getElementById("contact");

var emailIcon = document.getElementById("emailIcon");
emailIcon.addEventListener("click", () => {
  contactSection.style.display = "flex";
  // hide every other section
  homeSection.style.display = "none";
  aboutMeSection.style.display = "none";
  portfoliosSection.style.display = "none";
});

/* the display none
homeSection.style.display = "none";
aboutMeSection.style.display = "none";
portfoliosSection.style.display = "none";
contactSection.style.display = "none";
*/
homeBtn.addEventListener("click", () => {
  homeSection.style.display = "flex";
  hello.innerHTML = "";
  myNameIs.innerHTML = "";
  iAm.innerHTML = "";
  heroTitle();
  // hide every other section
  aboutMeSection.style.display = "none";
  portfoliosSection.style.display = "none";
  contactSection.style.display = "none";
});

aboutMeBtn.addEventListener("click", () => {
  window.scroll(0, 0);
  aboutMeSection.style.display = "flex";
  // hide every other section
  homeSection.style.display = "none";
  portfoliosSection.style.display = "none";
  contactSection.style.display = "none";
});

portfoliosBtn.addEventListener("click", () => {
  window.scroll(0, 0);
  portfoliosSection.style.display = "flex";
  // hide every other section
  homeSection.style.display = "none";
  aboutMeSection.style.display = "none";
  contactSection.style.display = "none";
});

contactBtn.addEventListener("click", () => {
  window.scroll(0, 0);
  contactSection.style.display = "flex";
  // hide every other section
  homeSection.style.display = "none";
  aboutMeSection.style.display = "none";
  portfoliosSection.style.display = "none";
});
