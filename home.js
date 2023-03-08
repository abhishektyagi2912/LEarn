// Navbar js starts here
// define all UI variable
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.site-navbar ul');
const navLinks = document.querySelectorAll('.site-navbar a');

// load all event listners
allEventListners();

// functions of all event listners
function allEventListners() {
  // toggler icon click event
  navToggler.addEventListener('click', togglerClick);
  // nav links click event
  navLinks.forEach( elem => elem.addEventListener('click', navLinkClick));
}

// togglerClick function
function togglerClick() {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('open');
}

// navLinkClick function
function navLinkClick() {
  if(navMenu.classList.contains('open')) {
    navToggler.click();
  }
}
// Navbar Js ends here
// Courses js starts here
if (typeof window.CSS.registerProperty === 'function') {
    console.log('CSS.registerProperty supported 🎉')
    document.body.style.setProperty('--supported', 1);
    document.body.classList.add('registerProperty-supported')
  } else {
    console.log('CSS.registerProperty not supported ❌')
    document.body.style.setProperty('--not-supported', 1);
    document.body.classList.add('registerProperty-not-supported')
  }
// Courses js ends here