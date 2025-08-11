const btn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// ===== Sidebar Toggle =====
btn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Close sidebar when overlay clicked
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// ===== Smooth Scroll for Sidebar Links =====
document.querySelectorAll("#sidebar a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
});

// ===== Contact Form Validation =====
const form = document.getElementById("contactForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  let valid = true;

  form.querySelectorAll("input, textarea").forEach(input => {
    const errorEl = input.nextElementSibling;
    if (!input.value.trim()) {
      errorEl.textContent = "This field is required.";
      errorEl.style.display = "block";
      valid = false;
    } else {
      errorEl.style.display = "none";
    }
  });

  if (valid) {
    document.getElementById("success-message").textContent = "Form submitted successfully!";
    document.getElementById("success-message").style.display = "block";
    form.reset();
  }
});
// ===== BLOG POSTS DATA =====
const postsData = [
  { title: "Mastering JavaScript", category: "tech", img: "https://picsum.photos/id/1011/400/200", desc: "Learn tips and tricks for modern JavaScript.", date: "Feb 5, 2025" },
  { title: "Exploring the Alps", category: "travel", img: "https://picsum.photos/id/1015/400/200", desc: "A travel guide to the beautiful Alps.", date: "Jan 20, 2025" },
  { title: "Delicious Pasta Recipes", category: "food", img: "https://picsum.photos/id/1020/400/200", desc: "Easy and tasty pasta recipes.", date: "Jan 10, 2025" },
  { title: "CSS Grid vs Flexbox", category: "tech", img: "https://picsum.photos/id/1025/400/200", desc: "Understand when to use grid or flexbox.", date: "Feb 1, 2025" },
  { title: "Top Beaches in Thailand", category: "travel", img: "https://picsum.photos/id/1035/400/200", desc: "Best beaches to visit in Thailand.", date: "Dec 15, 2024" },
  { title: "Baking the Perfect Cake", category: "food", img: "https://picsum.photos/id/1040/400/200", desc: "A step-by-step cake baking guide.", date: "Dec 10, 2024" }
];

let currentPage = 1;
const postsPerPage = 4;
let currentCategory = "all";

const blogContainer = document.getElementById("blog-posts");
const pageInfo = document.getElementById("page-info");
const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");

function displayPosts() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase();

  let filtered = currentCategory === "all" 
    ? postsData 
    : postsData.filter(p => p.category === currentCategory);

  if (searchTerm) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm));
  }

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const postsToShow = filtered.slice(start, end);

  blogContainer.innerHTML = postsToShow.length 
    ? postsToShow.map(post => `
      <div class="blog-card">
        <img src="${post.img}" alt="${post.title}">
        <div class="blog-card-content">
          <h3>${post.title}</h3>
          <small>${post.date}</small>
          <p>${post.desc}</p>
        </div>
      </div>
    `).join("")
    : "<p>No posts found.</p>";

  pageInfo.textContent = `Page ${currentPage}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = end >= filtered.length;
}
document.getElementById("search-input").addEventListener("input", () => {
  currentPage = 1;
  displayPosts();
});

// Category Filter
document.querySelectorAll(".blog-filter button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".blog-filter button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.getAttribute("data-category");
    currentPage = 1;
    displayPosts();
  });
});

// Pagination
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPosts();
  }
});

nextBtn.addEventListener("click", () => {
  const filtered = currentCategory === "all" ? postsData : postsData.filter(p => p.category === currentCategory);
  if (currentPage * postsPerPage < filtered.length) {
    currentPage++;
    displayPosts();
  }
});

displayPosts();
