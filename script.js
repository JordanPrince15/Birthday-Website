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