document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle functionality
  const themeToggleBtn = document.getElementById("theme-switch");

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggleBtn.textContent = "☀️";
  }

  // Toggle theme on click
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
      themeToggleBtn.textContent = "☀️";
      localStorage.setItem("theme", "light");
    } else {
      themeToggleBtn.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    }
  });

  // Font size adjustment
  const fontDecreaseBtn = document.getElementById("font-decrease");
  const fontResetBtn = document.getElementById("font-reset");
  const fontIncreaseBtn = document.getElementById("font-increase");

  // Default font size (in percentage)
  let currentFontSize = 100;

  // Check for saved font size preference
  const savedFontSize = localStorage.getItem("fontSize");
  if (savedFontSize) {
    currentFontSize = parseInt(savedFontSize);
    document.body.style.fontSize = `${currentFontSize}%`;
  }

  // Decrease font size
  fontDecreaseBtn.addEventListener("click", () => {
    if (currentFontSize > 70) {
      currentFontSize -= 10;
      updateFontSize();
    }
  });

  // Reset font size
  fontResetBtn.addEventListener("click", () => {
    currentFontSize = 100;
    updateFontSize();
  });

  // Increase font size
  fontIncreaseBtn.addEventListener("click", () => {
    if (currentFontSize < 150) {
      currentFontSize += 10;
      updateFontSize();
    }
  });

  // Update font size and save preference
  function updateFontSize() {
    document.body.style.fontSize = `${currentFontSize}%`;
    localStorage.setItem("fontSize", currentFontSize);
  }

  // Reading mode functionality
  const readingModeBtn = document.getElementById("reading-mode");

  // Check for saved reading mode preference
  const savedReadingMode = localStorage.getItem("readingMode");
  if (savedReadingMode === "enabled") {
    document.body.classList.add("reading-mode");
    readingModeBtn.textContent = "📕";
  }

  // Toggle reading mode on click
  readingModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("reading-mode");

    if (document.body.classList.contains("reading-mode")) {
      readingModeBtn.textContent = "📕";
      localStorage.setItem("readingMode", "enabled");
    } else {
      readingModeBtn.textContent = "📖";
      localStorage.setItem("readingMode", "disabled");
    }
  });

  const blogs = [
    {
      title: "The Future of AI in Education",
      author: "Sneha S.",
      content:
        "Artificial Intelligence is revolutionizing the educational sector. With personalized learning paths, real-time feedback, and virtual teaching assistants, students experience an enriched way of gaining knowledge.",
      date: "2025-05-15",
      likes: 0,
    },
    {
      title: "Dancing Through the Algorithms",
      author: "Arjun M.",
      content:
        "Combining classical dance and programming may seem odd, but both require structure, rhythm, and expression. This blog explores how Bharatanatyam inspires my code logic.",
      date: "2025-05-10",
      likes: 0,
    },
    {
      title: "Git Made Simple",
      author: "Nisha R.",
      content:
        "Using Git effectively requires more than just basic commands. It involves understanding branching, merging, and conflict resolution with confidence.",
      date: "2025-05-05",
      likes: 0,
    },
    {
      title: "Hackathon Survival Guide",
      author: "Ravi K.",
      content:
        "Staying awake for 24 hours isn't the hard part—it's keeping your ideas fresh. This blog covers tips to stay productive, energized, and collaborative during overnight hackathons.",
      date: "2025-04-28",
      likes: 0,
    },
    {
      title: "Design Thinking for Developers",
      author: "Pooja D.",
      content:
        "Design isn't just for designers. Developers who embrace design thinking deliver better user experiences, solve real problems, and write more intuitive code.",
      date: "2025-04-20",
      likes: 0,
    },
  ];

  // Search & Sort Functionality
  const searchInput = document.getElementById("blog-search");
  const sortSelect = document.getElementById("blog-sort");
  const container = document.getElementById("blogContainer");

  // Display blogs initially
  displayBlogs(blogs);

  // Event listeners for search and sort
  searchInput.addEventListener("input", filterBlogs);
  sortSelect.addEventListener("change", filterBlogs);

  function filterBlogs() {
    const searchTerm = searchInput.value.toLowerCase();
    const sortOption = sortSelect.value;

    // Filter blogs based on search term
    let filteredBlogs = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.content.toLowerCase().includes(searchTerm) ||
        blog.author.toLowerCase().includes(searchTerm)
    );

    // Sort blogs based on selected option
    switch (sortOption) {
      case "newest":
        filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        filteredBlogs.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "popular":
        filteredBlogs.sort((a, b) => b.likes - a.likes);
        break;
      default:
        // Default order (no sorting needed)
        break;
    }

    // Display filtered blogs
    displayBlogs(filteredBlogs);
  }

  function displayBlogs(blogsToDisplay) {
    container.innerHTML = "";

    blogsToDisplay.forEach((blog, index) => {
      const blogEl = document.createElement("div");
      blogEl.className = "blog";

      blogEl.innerHTML = `
        <h2>${blog.title}</h2>
        <p class="meta">By ${blog.author} | ${formatDate(blog.date)}</p>
        <p class="blog-preview">${blog.content.substring(0, 100)}${blog.content.length > 100 ? "..." : ""}</p>
        <div class="blog-full-content hidden">${blog.content}</div>
        <div class="blog-links">
          <a href="#" class="read-more-btn" data-index="${index}">${blog.content.length > 100 ? "Read More" : ""}</a>
          <a href="https://en.wikipedia.org/wiki/${encodeURIComponent(blog.title.replace(/\s+/g, "_"))}" target="_blank" class="wiki-link">Wikipedia</a>
          <a href="https://www.google.com/search?q=${encodeURIComponent(blog.title)}" target="_blank" class="search-link">Search More</a>
        </div>
        <div class="blog-actions">
          <button class="like-btn" data-index="${index}">❤ Like (<span id="like-${index}">${blog.likes}</span>)</button>
          <button class="copy-btn" data-content="${blog.title} - ${blog.author}&#10;&#10;${blog.content}">📋 Copy</button>
        </div>
        <div class="comments">
          <textarea id="comment-${index}" placeholder="Leave a comment..."></textarea>
          <button onclick="submitComment(${index})">Post</button>
          <div class="comment-list" id="comment-list-${index}"></div>
        </div>
      `;

      container.appendChild(blogEl);
    });

    // Add event listeners for copy buttons
    document.querySelectorAll(".copy-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const content = this.getAttribute("data-content");
        navigator.clipboard
          .writeText(content)
          .then(() => {
            // Show feedback
            const originalText = this.textContent;
            this.textContent = "Copied! ✓";
            setTimeout(() => {
              this.textContent = originalText;
            }, 2000);
          })
          .catch((err) => {
            console.error("Could not copy text: ", err);
          });
      });
    });

    // Add event listeners for read more buttons
    document.querySelectorAll(".read-more-btn").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const blogEl = this.closest(".blog");
        const preview = blogEl.querySelector(".blog-preview");
        const fullContent = blogEl.querySelector(".blog-full-content");

        // Toggle visibility
        if (fullContent.classList.contains("hidden")) {
          preview.classList.add("hidden");
          fullContent.classList.remove("hidden");
          this.textContent = "Read Less";
        } else {
          preview.classList.remove("hidden");
          fullContent.classList.add("hidden");
          this.textContent = "Read More";
        }
      });
    });
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
});

// Set up Read More functionality
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("read-more-btn")) {
      e.preventDefault();
      const index = e.target.getAttribute("data-index");
      const blogEl = e.target.closest(".blog");
      const preview = blogEl.querySelector(".blog-preview");
      const fullContent = blogEl.querySelector(".blog-full-content");

      // Toggle visibility
      if (fullContent.classList.contains("hidden")) {
        preview.classList.add("hidden");
        fullContent.classList.remove("hidden");
        e.target.textContent = "Read Less";
      } else {
        preview.classList.remove("hidden");
        fullContent.classList.add("hidden");
        e.target.textContent = "Read More";
      }
    }
  });
});

let blogs = []; // Make sure blogs is accessible globally

document.addEventListener("DOMContentLoaded", () => {
  // Storing the blogs array in the global scope
  blogs = [
    {
      title: "The Future of AI in Education",
      author: "Sneha S.",
      content:
        "Artificial Intelligence is revolutionizing the educational sector. With personalized learning paths, real-time feedback, and virtual teaching assistants, students experience an enriched way of gaining knowledge.",
      date: "2025-05-15",
      likes: 0,
    },
    // The other blog entries remain the same
  ];
});

const likes = Array(5).fill(0);
const comments = Array(5)
  .fill()
  .map(() => []);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("like-btn")) {
    const index = e.target.getAttribute("data-index");
    likes[index]++;
    document.getElementById(`like-${index}`).textContent = likes[index];

    // Update likes in blogs array for sorting by popularity
    const blogIndex = parseInt(index);
    if (!isNaN(blogIndex) && blogIndex >= 0 && blogIndex < blogs.length) {
      blogs[blogIndex].likes = likes[index];
    }
  }
});

function submitComment(index) {
  const textarea = document.getElementById(`comment-${index}`);
  const text = textarea.value.trim();
  if (text) {
    comments[index].push(text);
    updateComments(index);
    textarea.value = "";
  }
}

function updateComments(index) {
  const commentList = document.getElementById(`comment-list-${index}`);
  commentList.innerHTML = comments[index].map((c) => `<p>🗨 ${c}</p>`).join("");
}

// Back to top button functionality
document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("back-to-top");

  // Show the button when user scrolls down 200px from the top
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top when button is clicked
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Handle newsletter subscription
  const newsletterForm = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("email-input");
  const subscriptionMessage = document.getElementById("subscription-message");

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Very simple email validation
    if (email && email.includes("@") && email.includes(".")) {
      subscriptionMessage.textContent =
        "Thank you for subscribing to our newsletter!";
      subscriptionMessage.style.color = "#d4af37";
      emailInput.value = "";

      // Simulate storing the email
      console.log("Email subscribed:", email);

      // Reset the message after 3 seconds
      setTimeout(() => {
        subscriptionMessage.textContent = "";
      }, 3000);
    } else {
      subscriptionMessage.textContent = "Please enter a valid email address.";
      subscriptionMessage.style.color = "#ff6b6b";
    }
  });

  // Current Year for Copyright
  const currentYear = new Date().getFullYear();
  document.querySelector(
    ".footer-bottom p"
  ).innerHTML = `&copy; ${currentYear} VerbaSphere. All rights reserved.`;
});
