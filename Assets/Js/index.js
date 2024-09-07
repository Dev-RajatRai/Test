document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
    },
  });
});

const tenureButtons = document.querySelectorAll(".tenure-btn");
const donationAmounts = document.querySelectorAll(
  ".donation-amounts input[type='radio']"
);
const donateButton = document.getElementById("donate-btn");

tenureButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tenureButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
  });
});

donationAmounts.forEach((amount) => {
  amount.addEventListener("change", () => {
    donationAmounts.forEach((input) =>
      input.parentElement.classList.remove("selected")
    );
    if (amount.checked) {
      amount.parentElement.classList.add("selected");
    }
  });
});

donateButton.addEventListener("click", (event) => {
  event.preventDefault();

  const selectedTenure = document.querySelector(".tenure-btn.selected");
  if (!selectedTenure) {
    alert("Please select a donation tenure.");
    return;
  }

  const selectedAmount = document.querySelector(
    ".donation-amounts input[type='radio']:checked"
  );
  if (!selectedAmount) {
    alert("Please select a donation amount.");
    return;
  }

  const donationTo = document.getElementById("donation-to-select").value;

  const donationComment = document
    .getElementById("donation-comment-textarea")
    .value.trim();
  if (donationComment.length > 0) {
    console.log({
      tenure: selectedTenure.innerText,
      amount: selectedAmount.value,
      donateTo: donationTo,
      comment: donationComment,
    });

    alert(
      "Donation data has been successfully captured. Check the console for details."
    );
  } else {
    alert("Please enter a comment before donating.");
  }
});

// Add background color when navbar is scrolled
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document
  .getElementById("donate-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("donation-section").scrollIntoView({
      behavior: "smooth",
    });
  });
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count1, .count2, .count3");

  const startCounting = (element) => {
    const target = +element.getAttribute("data-target");

    const updateCount = () => {
      const current =
        parseInt(element.innerText.replace(/[^0-9]/g, ""), 10) || 0;

      if (current < target) {
        const increment = Math.ceil(target / 100);
        element.innerHTML = `${Math.min(current + increment, target)}<span>${
          element.querySelector("span").innerText
        }</span>`;
        setTimeout(updateCount, 50);
      } else {
        element.innerHTML = `${target}<span>${
          element.querySelector("span").innerText
        }</span>`;
      }
    };

    element.innerHTML = `0<span>${
      element.querySelector("span").innerText
    }</span>`;

    updateCount();
  };

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});
