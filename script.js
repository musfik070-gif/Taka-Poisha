// Job list
let jobs = [
  {
    id: 1,
    company: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "none",
  },
  {
    id: 2,
    company: "FinTech Innovations",
    position: "Backend Engineer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description:
      "Design and implement scalable backend services for our financial products. Collaborate with cross-functional teams to deliver high-quality solutions.",
    status: "none",
  },
  {
    id: 3,
    company: "HealthTech Solutions",
    position: "Data Scientist",
    location: "San Francisco, CA",
    type: "Contract",
    salary: "$90,000 - $120,000",
    description:
      "Analyze healthcare data to derive insights and build predictive models. Work closely with healthcare professionals to improve patient outcomes.",
    status: "none",
  },
  {
    id: 4,
    company: "E-commerce Giants",
    position: "Frontend Developer",
    location: "Remote",
    type: "Part-time",
    salary: "$80,000 - $110,000",
    description:
      "Develop and maintain the user interface of our e-commerce platform. Ensure a seamless shopping experience for millions of customers.",
    status: "none",
  },
  {
    id: 5,
    company: "AI Pioneers",
    position: "Machine Learning Engineer",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$140,000 - $180,000",
    description:
      "Build and deploy machine learning models for various applications. Collaborate with data scientists and software engineers to create innovative AI solutions.",
    status: "none",
  },
  {
    id: 6,
    company: "Cybersecurity Experts",
    position: "Security Analyst",
    location: "Remote",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    description:
      "Monitor and analyze security threats to protect our digital assets. Implement security measures and respond to incidents in a timely manner.",
    status: "none",
  },
  {
    id: 7,
    company: "Cloud Services Inc.",
    position: "DevOps Engineer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    description:
      "Design and maintain our cloud infrastructure. Automate deployment processes and ensure high availability of our services.",
    status: "none",
  },
  {
    id: 8,
    company: "Gaming Studio",
    position: "Game Developer",
    location: "Los Angeles, CA",
    type: "Contract",
    salary: "$100,000 - $130,000",
    description:
      "Develop engaging and innovative games for various platforms. Collaborate with artists and designers to create immersive gaming experiences.",
    status: "none",
  },
];

// Initial tab
let currentTab = "all";

// DOM ELEMENTS
const jobList = document.getElementById("jobList");
const emptyState = document.getElementById("emptyState");
const tabButtons = document.querySelectorAll("[data-tab]");

// Render jobs
function renderJobs() {
  jobList.innerHTML = "";
  // Filter jobs
  let filtered = jobs.filter((job) => {
    if (currentTab === "all") return true;
    return job.status === currentTab;
  });
  // Tab wise job count
  if (currentTab === "all") tabCount.innerText = jobs.length + " jobs";
  if (currentTab === "interview")
    tabCount.innerText =
      jobs.filter((j) => j.status === "interview").length + " jobs";
  if (currentTab === "rejected")
    tabCount.innerText =
      jobs.filter((j) => j.status === "rejected").length + " jobs";
  // Empty State
  emptyState.classList.toggle("hidden", filtered.length !== 0);
  filtered.forEach((job) => {
    // Status badge
    let badge = "NOT APPLIED";
    let color = "bg-blue-50 text-blue-800";
    if (job.status === "interview") {
      badge = "INTERVIEW";
      color = "bg-green-100 text-green-600";
    }
    if (job.status === "rejected") {
      badge = "REJECTED";
      color = "bg-red-100 text-red-600";
    }
    const div = document.createElement("div");
    div.className =
      "bg-white p-4 sm:p-8 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col gap-4";
    div.innerHTML = `
      <div class="flex flex-col sm:flex-row justify-between gap-4">
        <div class="flex-1">
          <h3 class="text-base sm:text-lg font-semibold text-black">${job.company}</h3>
          <p class="text-xs sm:text-base text-gray-500">${job.position}</p>
          <p class="text-xs sm:text-sm text-gray-400 mt-2 sm:mt-3">${job.location} • ${job.type} • ${job.salary}</p>
          <span class="inline-block px-3 sm:px-4 py-1 sm:py-2 rounded mt-3 sm:mt-4 text-xs sm:text-sm ${color}">${badge}</span>
          <p class="mt-3 sm:mt-4 text-xs sm:text-base text-gray-700">${job.description}</p>
        </div>
        <!-- DELETE ICON -->
        <button onclick="deleteJob(${job.id})" class="btn btn-circle btn-sm btn-ghost text-gray-400 hover:text-red-500 transition transform hover:scale-110 self-start sm:self-center">🗑️</button>
      </div>
      <!-- ACTION BUTTONS -->
      <div class="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-4">
        <button class="btn btn-outline btn-success transition hover:scale-105 w-full sm:w-auto" onclick="setStatus(${job.id}, 'interview')">INTERVIEW</button>
        <button class="btn btn-outline btn-error transition hover:scale-105 w-full sm:w-auto" onclick="setStatus(${job.id}, 'rejected')">REJECTED</button>
      </div>
    `;
    jobList.appendChild(div);
  });
  updateDashboard();
  activeTabs();
}

// Tab switching
function setStatus(id, status) {
  jobs = jobs.map((job) => (job.id === id ? { ...job, status } : job));
  renderJobs();
}

// Delete job
function deleteJob(id) {
  if (currentTab === "all") {
    const confirmDelete = confirm(
      "Are you sure you want to permanently delete this job?",
    );
    if (confirmDelete) {
      jobs = jobs.filter((job) => job.id !== id);
    } else {
      return;
    }
  } else {
    jobs = jobs.map((job) =>
      job.id === id ? { ...job, status: "none" } : job,
    );
  }
  renderJobs();
}

// Count in dashboard
function updateDashboard() {
  totalCount.innerText = jobs.length;
  interviewCount.innerText = jobs.filter(
    (j) => j.status === "interview",
  ).length;
  rejectedCount.innerText = jobs.filter((j) => j.status === "rejected").length;
}

// Tab styles
function activeTabs() {
  tabButtons.forEach((btn) => {
    btn.classList.remove("btn-primary");
    if (btn.dataset.tab === currentTab) btn.classList.add("btn-primary");
  });
}

// Initial render
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentTab = btn.dataset.tab;
    renderJobs();
  });
});
renderJobs();
