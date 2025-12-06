'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// Scroll animations with Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(20px)';
  item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(item);
});

// Observe skills items
document.querySelectorAll('.skills-item').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
  observer.observe(item);
});

// Animate skill indicators on scroll
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillCard = entry.target;
      const indicator = skillCard.querySelector('.skill-indicator::after');
      const skillValue = skillCard.getAttribute('data-skill');
      
      // Trigger animation by adding a class
      skillCard.classList.add('animate');
      
      skillObserver.unobserve(skillCard);
    }
  });
}, { threshold: 0.5 });

skillCards.forEach(card => {
  skillObserver.observe(card);
});

// Simple scroll animations - removed heavy parallax

// Add smooth reveal animation to about text
const aboutText = document.querySelector('.about-text');
if (aboutText) {
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        textObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  textObserver.observe(aboutText);
}

// Simple name styling - removed typing effect for performance
const nameElement = document.querySelector('.name');
if (nameElement) {
  nameElement.style.background = 'linear-gradient(to right, hsl(45, 100%, 72%), hsl(35, 100%, 68%))';
  nameElement.style.webkitBackgroundClip = 'text';
  nameElement.style.webkitTextFillColor = 'transparent';
  nameElement.style.backgroundClip = 'text';
}

// Add stagger animation to contact items
document.querySelectorAll('.contact-item').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
  
  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        contactObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  contactObserver.observe(item);
});

// Add hover sound effect (optional - can be removed if not needed)
// Enhanced button interactions
document.querySelectorAll('button, .social-link, .navbar-link').forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// Simple fade in on load
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in';
    document.body.style.opacity = '1';
  }, 100);
});