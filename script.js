JavaScript 
// Sample Data: Realistic mix of Mid-sized firms, MNCs, and Startups/Incubators
const companies = [
  {
    name: "Fractal Analytics",
    type: "mnc",
    typeLabel: "MNC",
    location: "Mumbai / Bengaluru / Hybrid",
    domain: "Enterprise AI & Decision Sciences",
    odds: "Medium",
    oddsClass: "odds-medium",
    desc: "Large scale enterprise client consulting. Focuses heavily on structured business analytics and visualization reporting.",
    portal: "https://fractal.ai/careers/"
  },
  {
    name: "Tiger Analytics",
    type: "mnc",
    typeLabel: "MNC",
    location: "Chennai / Hyderabad / Remote",
    domain: "Supply Chain & Retail Analytics",
    odds: "Medium",
    oddsClass: "odds-medium",
    desc: "Specializes in marketing analytics, supply forecasting, and automated BI systems. Regular internship pipelines for SQL specialists.",
    portal: "https://www.tigeranalytics.com/careers/"
  },
  {
    name: "DWA Media (Merkle B2B)",
    type: "mid-sized",
    typeLabel: "Mid-Sized / Agency",
    location: "Bengaluru / Pune",
    domain: "Performance & Media Analytics",
    odds: "High (Direct Email)",
    oddsClass: "odds-high",
    desc: "B2B performance marketing firm. High appetite for students who can build Google Sheets + Power BI tracking models. Fast interview cycles.",
    portal: "https://www.dentsu.com/careers"
  },
  {
    name: "BluePi Consulting",
    type: "mid-sized",
    typeLabel: "Mid-Sized",
    location: "Gurugram / Remote",
    domain: "Retail Data Engineering & BI",
    odds: "High (Walk-ins / Direct HR)",
    oddsClass: "odds-high",
    desc: "Mid-sized data modernization agency. Fast onboarding for analysts who know how to construct SQL transformations and BI tables without DSA theory.",
    portal: "https://bluepiit.com/careers/"
  },
  {
    name: "C4D Partners Incubator Portfolio",
    type: "incubation",
    typeLabel: "Incubation Center",
    location: "Bengaluru / Delhi NCR",
    domain: "Impact Startups / Early Stage",
    odds: "High (Portfolio-First)",
    oddsClass: "odds-high",
    desc: "Portfolio startups within impact funds require self-starters to consolidate scattered data into clean investor dashboards.",
    portal: "https://c4dpartners.com/"
  },
  {
    name: "NSRCEL (IIM Bangalore Incubator)",
    type: "incubation",
    typeLabel: "Incubator Hub",
    location: "Bengaluru",
    domain: "Seed Startups / Cross-Sector",
    odds: "Very High (Direct Founder Pitch)",
    oddsClass: "odds-high",
    desc: "Hosts 50+ early-stage companies at any given time. Reaching out directly to founders with a pre-built Power BI sample yields fast contract conversions.",
    portal: "https://nsrcel.org/"
  }
];

// Elements
const companiesGrid = document.getElementById("companies-grid");
const searchInput = document.getElementById("search-input");
const categoryFilters = document.getElementById("category-filters");
const copyButtons = document.querySelectorAll(".copy-btn");
const toast = document.getElementById("toast");

let activeFilter = "all";
let searchQuery = "";

// Render Company Cards
function renderCompanies() {
  const filtered = companies.filter((company) => {
    const matchesCategory = activeFilter === "all" || company.type === activeFilter;
    const matchesSearch = 
      company.name.toLowerCase().includes(searchQuery) ||
      company.location.toLowerCase().includes(searchQuery) ||
      company.domain.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    companiesGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 0; color: var(--text-muted);">
        No companies found matching your criteria.
      </div>
    `;
    return;
  }

  companiesGrid.innerHTML = filtered.map((c) => `
    <div class="card">
      <div class="card-top">
        <div class="card-header-flex">
          <span class="badge badge-${c.type}">${c.typeLabel}</span>
          <span class="odds-tag ${c.oddsClass}">${c.odds}</span>
        </div>
        <h3 class="company-title">${c.name}</h3>
        <div class="meta-row">
          <span class="meta-item">📍 ${c.location}</span>
          <span class="meta-item">🎯 ${c.domain}</span>
        </div>
        <p class="card-desc">${c.desc}</p>
      </div>
      <div class="card-footer">
        <span style="font-size: 12px; color: var(--text-muted)">Verified Career Link</span>
        <a href="${c.portal}" target="_blank" rel="noopener noreferrer" class="action-link">Portal ↗</a>
      </div>
    </div>
  `).join("");
}

// Search Handler
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  renderCompanies();
});

// Category Filter Handler
categoryFilters.addEventListener("click", (e) => {
  if (e.target.classList.contains("pill-btn")) {
    document.querySelectorAll(".pill-btn").forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    activeFilter = e.target.dataset.filter;
    renderCompanies();
  }
});

// Copy to Clipboard Handler
copyButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      navigator.clipboard.writeText(targetElement.innerText).then(() => {
        showToast();
      }).catch((err) => {
        console.error("Failed to copy text: ", err);
      });
    }
  });
});

function showToast() {
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

// Navigation active state toggle
document.querySelectorAll(".nav-item").forEach((link) => {
  link.addEventListener("click", function() {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
  });
});

// Initial Render
renderCompanies();