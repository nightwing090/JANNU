document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const clickButton = document.getElementById("click-button");
  const roseCounterElement = document.getElementById("rose-counter");
  const goalTitleElement = document.getElementById("goal-title");
  const goalSubtitleElement = document.getElementById("goal-subtitle");
  const letterRevealContainer = document.getElementById(
    "letter-reveal-container"
  );
  const catPawImage = document.getElementById("cat-paw-image");
  const letter = document.getElementById("letter");
  const finalMessageContainer = document.getElementById(
    "final-message-container"
  );
  const mainContainer = document.getElementById("main-container");

  // --- Game State ---
  let roseCount = 0;
  let currentGoal = 100;

  // --- Event Listeners ---
  clickButton.addEventListener("click", handleRoseClick);
  letter.addEventListener("click", handlePawClick);

  // --- Functions ---
  function handleRoseClick() {
    if (roseCount >= currentGoal && currentGoal === 200) {
      return; // Stop counting after final goal is reached
    }

    roseCount++;
    updateCounter();
    createRoseParticle();
    checkGoals();
  }

  function updateCounter() {
    roseCounterElement.textContent = ` ${roseCount} Roses`;
  }

  function createRoseParticle() {
    const particle = document.createElement("div");
    particle.classList.add("rose-particle");

    // Position particle near the button
    const buttonRect = clickButton.getBoundingClientRect();
    const xPos =
      buttonRect.left + buttonRect.width / 2 + (Math.random() - 0.5) * 50;
    const yPos = buttonRect.top;

    particle.style.left = ` ${xPos}px`;
    particle.style.top = ` ${yPos}px`;

    document.body.appendChild(particle);

    // Clean up the DOM after animation finishes
    setTimeout(() => {
      particle.remove();
    }, 2000);
  }

  function checkGoals() {
    // Goal 1: 100 Roses
    if (roseCount === 100 && currentGoal === 100) {
      currentGoal = 200;
      goalTitleElement.textContent = "Get to 200 Roses";
      goalSubtitleElement.textContent = "(Click the letter!)";

      // Show the cat paw
      setTimeout(() => {
        catPawImage.style.bottom = "0";
        letter.style.bottom = "5vh";
        // letterRevealContainer.classList.add("visible");
      }, 100);
      setTimeout(() => {
        catPawImage.style.bottom = "-300px";
      }, 1300);
    }
  }

  function handlePawClick() {
    // Goal 2: 200 Roses
    if (roseCount >= currentGoal) {
      finalMessageContainer.classList.remove("hidden");
      setTimeout(() => {
        finalMessageContainer.classList.add("visible");
      }, 10); // Short delay for transition to trigger
      clickButton.disabled = true; // Optional: disable button after completion
    } else {
      alert(`You need ${currentGoal - roseCount} more roses!`);
    }
  }
});
