let currentPage = 1;
const totalPages = 6;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" && currentPage < totalPages) {
    currentPage++;
  } else if (e.key === "ArrowUp" && currentPage > 1) {
    currentPage--;
  }
  switchPage(currentPage);
});

// Function to handle page switching
function switchPage(pageNumber) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page, index) => {
    if (index === pageNumber - 1) {
      page.style.display = "flex";
      triggerTypewriter(page.querySelector(".typewriter p"));
    } else {
      page.style.display = "none";
    }
  });
}

// Typewriter effect logic
function triggerTypewriter(element) {
  if (!element) return;

  const text = element.textContent;
  element.textContent = ""; // Clear text before starting effect

  let index = 0;
  const typingSpeed = 50; // Adjust typing speed as needed (ms per character)

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, typingSpeed);
    }
  }
  type();
}

// Initialize the first page
switchPage(1);
 // Track the current page number

// Touch event variables
let touchStartX = 0;
let touchEndX = 0;

// Function to detect swipe direction and change pages
function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
  touchEndX = event.changedTouches[0].clientX;

  if (touchStartX > touchEndX) {
    // Swiped left (next page)
    if (currentPage < 6) {
      currentPage++;
    }
  } else if (touchStartX < touchEndX) {
    // Swiped right (previous page)
    if (currentPage > 1) {
      currentPage--;
    }
  }

  // Update the page based on the swipe direction
  showPage(currentPage);
}

// Function to show the current page
function showPage(pageNumber) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.style.display = 'none';
  });

  // Show the current page
  const currentPageElement = document.querySelector(`#page${pageNumber}`);
  currentPageElement.style.display = 'block';
}

// Add event listeners for touch events
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);

// Show the first page initially
showPage(currentPage);

// Add event listeners for tap zones
document.addEventListener('click', function(event) {
    if (event.clientX < window.innerWidth / 2) {
      // Tapped left half of the screen (go to previous page)
      if (currentPage > 1) {
        currentPage--;
      }
    } else {
      // Tapped right half of the screen (go to next page)
      if (currentPage < 6) {
        currentPage++;
      }
    }
    showPage(currentPage);
  });
