import confetti from 'canvas-confetti';

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const nextStepBtn = document.getElementById('nextStepBtn');
const mainTitle = document.getElementById('main-title');
const subTitle = document.getElementById('sub-title');
const navContainer = document.getElementById('navigation-container');
const proposalButtons = document.getElementById('proposal-buttons');
const successMessage = document.getElementById('successMessage');
const noMessage = document.getElementById('no-message');

// Hype Sequence
const steps = [
  {
    title: "Wait...",
    subtitle: "Is that <strong>Boluwatife Temitope</strong>?? (aka Tee tee bee) 👀"
  },
  {
    title: "Shining Melanin ✨",
    subtitle: "You are absolutely glowing, my love!"
  },
  {
    title: "Those eyes...",
    subtitle: "Beautifully dangerous eyes that captivate me �"
  },
  {
    title: "Adunniiiiiii miiiiiii ❤️",
    subtitle: "Temitope Miiiiiiiiiiiii"
  },
  {
    title: "Iyawo Miiiiii 💍",
    subtitle: "I have a very important question for you..."
  },
  {
    title: "Will you be my Valentine?",
    subtitle: "Please say yes! 🥺",
    isFinal: true
  }
];

let currentStep = 0;

nextStepBtn.addEventListener('click', () => {
  const stepData = steps[currentStep];

  // Animate text change
  mainTitle.style.opacity = 0;
  subTitle.style.opacity = 0;

  setTimeout(() => {
    mainTitle.innerHTML = stepData.title;
    subTitle.innerHTML = stepData.subtitle;

    mainTitle.style.opacity = 1;
    subTitle.style.opacity = 1;

    if (stepData.isFinal) {
      navContainer.style.display = 'none';
      proposalButtons.classList.remove('hidden');
      proposalButtons.classList.add('fade-in'); // Add animation class
    }
  }, 300);

  currentStep++;
});


// Interaction for the 'No' button - makes it run away
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);
noBtn.addEventListener('touchstart', moveButton); // Mobile support

function moveButton() {
  // Get viewport dimensions
  const maxWidth = window.innerWidth - noBtn.offsetWidth;
  const maxHeight = window.innerHeight - noBtn.offsetHeight;

  // Generate random coordinates
  // Ensure we don't go off screen with some padding
  const padding = 20;
  const randomX = Math.random() * (maxWidth - padding * 2) + padding;
  const randomY = Math.random() * (maxHeight - padding * 2) + padding;

  // Apply new position using fixed positioning to break out of the flex container
  noBtn.style.position = 'fixed';
  noBtn.style.left = randomX + 'px';
  noBtn.style.top = randomY + 'px';

  // Add a transition for smooth movement
  noBtn.style.transition = 'top 0.3s ease-out, left 0.3s ease-out';

  // Show the "No choice" message
  if (noMessage) {
    noMessage.textContent = "You don't have a choice! 😜";
    noMessage.classList.remove('hidden');

    // Reset animation to play again if triggered multiple times
    noMessage.style.animation = 'none';
    noMessage.offsetHeight; /* trigger reflow */
    noMessage.style.animation = null;
  }
}

// Interaction for the 'Yes' button
yesBtn.addEventListener('click', () => {
  // Trigger confetti
  launchConfetti();

  // Play celebratory animation on UI
  proposalButtons.style.display = 'none';
  mainTitle.style.display = 'none';
  /* subTitle.style.display = 'none'; */ // Keep layout stable or hide it
  // Actually hiding subtitle causes layout shift but we are hiding everything anyway.
  subTitle.style.display = 'none';
  navContainer.style.display = 'none';
  noMessage.style.display = 'none'; // Hide the error message if visible

  successMessage.classList.remove('hidden');
});

function launchConfetti() {
  var duration = 5 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}
