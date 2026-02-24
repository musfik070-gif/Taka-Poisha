//job list
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
];

//Initial tab
let currentTab = "all";

//DOM ELEMENTS
const jobList = document.getElementById("jobList");
const emptyState = document.getElementById("emptyState");
const tabButtons = document.querySelectorAll("[data-tab]");

// RENDER JOBS
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
    // STATUS BADGE
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
      "bg-white p-8 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1";

    div.innerHTML = `
      <div class="flex justify-between">
        <div>
          <h3 class="text-lg font-semibold text-black">${job.company}</h3>
          <p class="text-gray-500">${job.position}</p>

          <p class="text-sm text-gray-400 mt-3">${job.location} • ${job.type} • ${job.salary}</p>

          <span class="inline-block px-4 py-2 rounded mt-4 text-sm ${color}">
            ${badge}
          </span>

          <p class="mt-4 text-gray-700">${job.description}</p>
        </div>

        <!-- DELETE ICON -->
        <button 
          onclick="deleteJob(${job.id})"
          class="btn btn-circle btn-sm btn-ghost text-gray-400 hover:text-red-500 transition transform hover:scale-110"
        >
          🗑️
        </button>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="mt-6 space-x-4">
        <button class="btn btn-outline btn-success transition hover:scale-105" onclick="setStatus(${job.id}, 'interview')">
          INTERVIEW
        </button>

        <button class="btn btn-outline btn-error transition hover:scale-105" onclick="setStatus(${job.id}, 'rejected')">
          REJECTED
        </button>
      </div>
    `;

    jobList.appendChild(div);
  });

  updateDashboard();
  activeTabs();
}

renderJobs();
