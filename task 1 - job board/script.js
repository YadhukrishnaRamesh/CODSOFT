const jobs = [
  { title: "Frontend Developer", category: "Frontend", location: "Remote", salary: "₹6-8 LPA" },
  { title: "Backend Engineer", category: "Backend", location: "Bangalore", salary: "₹8-10 LPA" },
  { title: "Fullstack Developer", category: "Fullstack", location: "Chennai", salary: "₹7-9 LPA" },
  { title: "React Developer", category: "Frontend", location: "Remote", salary: "₹5-7 LPA" },
  { title: "Node.js Developer", category: "Backend", location: "Hyderabad", salary: "₹8-12 LPA" }
];

const container = document.getElementById("jobsContainer");
const jobCount = document.getElementById("jobCount");
const buttons = document.querySelectorAll(".filters button");

let savedJobs = [];

function displayJobs(filteredJobs) {
  container.innerHTML = "";
  jobCount.innerText = `Available Jobs: ${filteredJobs.length}`;

  filteredJobs.forEach(job => {
    const card = document.createElement("div");
    card.classList.add("job-card");

    if (savedJobs.includes(job.title)) {
      card.classList.add("saved");
    }

    card.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Category:</strong> ${job.category}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Salary:</strong> ${job.salary}</p>
      <button class="apply-btn" onclick="openModal('${job.title}')">Apply</button>
      <button class="save-btn" onclick="saveJob('${job.title}')">⭐ Save</button>
    `;

    container.appendChild(card);
  });
}

function filterJobs(category, element) {
  buttons.forEach(btn => btn.classList.remove("active"));
  if (element) element.classList.add("active");

  const filtered = category === "All"
    ? jobs
    : jobs.filter(job => job.category === category);

  displayJobs(filtered);
}

function saveJob(title) {
  if (!savedJobs.includes(title)) {
    savedJobs.push(title);
  } else {
    savedJobs = savedJobs.filter(job => job !== title);
  }
  displayJobs(jobs);
}

function openModal(title) {
  document.getElementById("applyModal").style.display = "flex";
  document.getElementById("modalTitle").innerText = `Apply for ${title}`;
}

function closeModal() {
  document.getElementById("applyModal").style.display = "none";
}

function submitApplication() {
  alert("Application Submitted Successfully!");
  closeModal();
}

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

document.getElementById("searchInput").addEventListener("keyup", function() {
  const searchValue = this.value.toLowerCase();
  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(searchValue)
  );
  displayJobs(filtered);
});

displayJobs(jobs);
