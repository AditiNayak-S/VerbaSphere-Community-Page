document.addEventListener("DOMContentLoaded", () => {
  const blogs = [
    {
      title: "The Future of AI in Education",
      author: "Sneha S.",
      content:
        "Artificial Intelligence is revolutionizing the educational sector. With personalized learning paths, real-time feedback, and virtual teaching assistants, students experience an enriched way of gaining knowledge.",
    },
    {
      title: "Dancing Through the Algorithms",
      author: "Arjun M.",
      content:
        "Combining classical dance and programming may seem odd, but both require structure, rhythm, and expression. This blog explores how Bharatanatyam inspires my code logic.",
    },
    {
      title: "Git Made Simple",
      author: "Nisha R.",
      content:
        "Using Git effectively requires more than just basic commands. It involves understanding branching, merging, and conflict resolution with confidence.",
    },
    {
      title: "Hackathon Survival Guide",
      author: "Ravi K.",
      content:
        "Staying awake for 24 hours isn’t the hard part—it’s keeping your ideas fresh. This blog covers tips to stay productive, energized, and collaborative during overnight hackathons.",
    },
    {
      title: "Design Thinking for Developers",
      author: "Pooja D.",
      content:
        "Design isn’t just for designers. Developers who embrace design thinking deliver better user experiences, solve real problems, and write more intuitive code.",
    },
  ];

  const container = document.getElementById("blogContainer");

  blogs.forEach((blog, index) => {
    const blogEl = document.createElement("div");
    blogEl.className = "blog";

    blogEl.innerHTML = `
      <h2>${blog.title}</h2>
      <p class="meta">By ${blog.author}</p>
      <p>${blog.content}</p>
      <button class="like-btn" data-index="${index}">❤ Like (<span id="like-${index}">0</span>)</button>
      <div class="comments">
        <textarea id="comment-${index}" placeholder="Leave a comment..."></textarea>
        <button onclick="submitComment(${index})">Post</button>
        <div class="comment-list" id="comment-list-${index}"></div>
      </div>
    `;

    container.appendChild(blogEl);
  });
});

const likes = Array(5).fill(0);
const comments = Array(5).fill().map(() => []);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("like-btn")) {
    const index = e.target.getAttribute("data-index");
    likes[index]++;
    document.getElementById(`like-${index}`).textContent = likes[index];
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
  commentList.innerHTML = comments[index]
    .map((c) => `<p>🗨 ${c}</p>`)
    .join("");
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
      behavior: "smooth"
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
      subscriptionMessage.textContent = "Thank you for subscribing to our newsletter!";
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
  document.querySelector(".footer-bottom p").innerHTML = 
    `&copy; ${currentYear} VerbaSphere. All rights reserved.`;
});


