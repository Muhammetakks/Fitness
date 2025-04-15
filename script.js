const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btn", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".header__stats", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
  interval: 500,
});
ScrollReveal().reveal(".about__btn", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".program__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".workout__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".meal__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".service__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".service__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".service__list li", {
  ...scrollRevealOption,
  delay: 1000,
  interval: 500,
});
ScrollReveal().reveal(".service__btn", {
  ...scrollRevealOption,
  delay: 2500,
});

ScrollReveal().reveal(".calculator__form", {
  ...scrollRevealOption,
  origin: "left",
  delay: 500,
});
ScrollReveal().reveal(".calculator__image img", {
  ...scrollRevealOption,
  origin: "right",
  delay: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// Enhanced Calorie and Protein Calculator
function initCalculator() {
  const form = document.getElementById("calculator-form");
  const resultDiv = document.getElementById("calculator-result");
  const progressBar = document.getElementById("progress-bar");
  const inputs = form.querySelectorAll("input, select");

  // Progress Bar Update
  function updateProgress() {
    const totalFields = inputs.length;
    let filledFields = 0;

    inputs.forEach((input) => {
      if (input.value && input.value !== "") {
        filledFields++;
      }
    });

    const progress = (filledFields / totalFields) * 100;
    progressBar.style.width = `${progress}%`;
  }

  inputs.forEach((input) => {
    input.addEventListener("input", updateProgress);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const gender = document.getElementById("gender").value;
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const age = parseInt(document.getElementById("age").value);
    const activity = parseFloat(document.getElementById("activity").value);
    const goal = document.getElementById("goal").value;

    // Basic Validation
    if (!gender || !height || !weight || !age || !activity || !goal) {
      resultDiv.innerHTML = `<p style="color: #ff4d00;">Lütfen tüm alanları doldurun!</p>`;
      resultDiv.classList.add("show");
      return;
    }

    // Harris-Benedict BMR Calculation
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Daily Calorie Needs
    let calories = Math.round(bmr * activity);

    // Adjust Calories Based on Goal
    switch (goal) {
      case "weight-loss":
        calories -= 500; // Deficit for weight loss
        break;
      case "muscle-gain":
        calories += 300; // Surplus for muscle gain
        break;
      case "maintenance":
        break;
    }

    // Protein Needs
    let protein;
    switch (goal) {
      case "weight-loss":
        protein = weight * 1.4; // Higher protein for satiety
        break;
      case "maintenance":
        protein = weight * 0.8; // Standard protein
        break;
      case "muscle-gain":
        protein = weight * 1.8; // Higher protein for muscle repair
        break;
    }
    protein = Math.round(protein);

    // Display Results with Animation
    resultDiv.innerHTML = `
      <p><span class="highlight">Günlük Kalori:</span> ${calories} kcal</p>
      <p><span class="highlight">Günlük Protein:</span> ${protein} g</p>
      <p style="font-size: 0.9rem; margin-top: 1rem;">
        ${
          goal === "weight-loss"
            ? "Kilo vermek için kalori açığı oluşturduk!"
            : goal === "muscle-gain"
            ? "Kas kazanımı için kalori fazlası eklendi!"
            : "Sağlığını korumak için ideal kalori miktarı!"
        }
      </p>
    `;
    resultDiv.classList.add("show");

    // Reset Progress Bar
    setTimeout(() => {
      inputs.forEach((input) => (input.value = ""));
      progressBar.style.width = "0%";
    }, 5000);
  });
}

initCalculator();
