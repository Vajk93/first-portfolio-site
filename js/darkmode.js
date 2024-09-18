let darkModeBtn = document.getElementById("darkModeBtn");
let darkModeCircleBtn = document.getElementById("darkModeCircleBtn");

darkModeBtn.addEventListener("click", darkMode);

function darkMode() {
  darkModeCircleBtn.classList.toggle("darkModeOn");
  darkModeBtn.classList.toggle("dark-mode-BG");
  darkModeSubtitles();
  darkModeHeroText();
  darkModePTags();
  darkModeBackground();
  darkModeContactIcons();
  darkModeNavButtons();
  darkModeForm();
  frontendMentorLink();
}

// i like the dark mode, so let's change it
myTimeout = setTimeout(() => {
  darkMode();
}, 0);

function darkModeSubtitles() {
  let i = 0;
  for (i = 0; i < 3; i++) {
    document
      .getElementById("aboutMe")
      .children[0].children[2].children[i].children[0].classList.toggle(
        "dark-mode-subtitle"
      );
  }
}

function darkModePTags() {
  let p_elements = Array.from(document.getElementsByTagName("p"));
  p_elements.map((p_element) => {
    p_element.classList.toggle("dark-mode-pTags");
  });
}

function darkModeHeroText() {
  document.getElementById("hello").classList.toggle("dark-mode-hero-text");
  document.getElementById("myNameIs").classList.toggle("dark-mode-hero-text");
  document.getElementById("iAm").classList.toggle("dark-mode-hero-text");
}

function darkModeBackground() {
  document.getElementById("animatedBG").classList.toggle("animatedBG-dark");
  document.getElementById("bg").classList.toggle("bg-dark");
  document.getElementById("bg2").classList.toggle("bg2-dark");
  document.getElementById("bg3").classList.toggle("bg3-dark");
  document.getElementById("bg4").classList.toggle("bg4-dark");
}

function darkModeContactIcons() {
  let icons = document.getElementById("contactIcons");
  let firstIcon = icons.children[0].children[0].children[0];
  let secondIcon = icons.children[0].children[1].children[0];
  let thirdIcon = icons.children[0].children[2].children[0];
  let fourthIcon = icons.children[0].children[3].children[0];

  firstIcon.classList.toggle("dark-mode-contact-icon");
  secondIcon.classList.toggle("dark-mode-contact-icon");
  thirdIcon.classList.toggle("dark-mode-contact-icon");
  fourthIcon.classList.toggle("dark-mode-contact-icon");
}

function darkModeNavButtons() {
  document.getElementById("homeBtn").src = homeBtnToggle();
  document.getElementById("aboutMeBtn").src = aboutMeBtnToggle();
  document.getElementById("codesBtn").src = codeBtnToggle();
  document.getElementById("contactBtn").src = contactBtnToggle();

  function homeBtnToggle() {
    let homeBtn = document.getElementById("homeBtn").src;
    let homeBtnSrcTest = homeBtn.includes("images/nav-buttons/homeBtn1");
    let homeBtn2 = {
      true: "images/nav-buttons/homeBtn2.jpg",
      false: "images/nav-buttons/homeBtn1.jpg",
    }[homeBtnSrcTest];
    return homeBtn2;
  }
  function aboutMeBtnToggle() {
    let aboutMeBtn = document.getElementById("aboutMeBtn").src;
    let aboutMeBtnSrcTest = aboutMeBtn.includes("images/nav-buttons/meBtn1");
    let aboutMeBtn2 = {
      true: "images/nav-buttons/meBtn2.jpg",
      false: "images/nav-buttons/meBtn1.jpg",
    }[aboutMeBtnSrcTest];
    return aboutMeBtn2;
  }
  function codeBtnToggle() {
    let codesBtn = document.getElementById("codesBtn").src;
    let codesBtnSrcTest = codesBtn.includes("images/nav-buttons/codeBtn1");
    let codesBtn2 = {
      true: "images/nav-buttons/codeBtn2.jpg",
      false: "images/nav-buttons/codeBtn1.jpg",
    }[codesBtnSrcTest];
    return codesBtn2;
  }
  function contactBtnToggle() {
    let contactBtn = document.getElementById("contactBtn").src;
    let contactBtnSrcTest = contactBtn.includes("images/nav-buttons/mailBtn1");
    let contactBtn2 = {
      true: "images/nav-buttons/mailBtn2.jpg",
      false: "images/nav-buttons/mailBtn1.jpg",
    }[contactBtnSrcTest];
    return contactBtn2;
  }
}

function darkModeForm() {
  document.getElementById("form").classList.toggle("dark-mode-formBG");
}

function frontendMentorLink() {
  document
    .getElementById("frontendmentor-link")
    .classList.toggle("dark-mode-frontendmentor-link");
}
