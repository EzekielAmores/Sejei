const params = new URLSearchParams(window.location.search);
const role = params.get("role") || "guest";
const name = params.get("name") || "Unknown";

document.getElementById("greeting").textContent = `Welcome, ${capitalize(role)} ${name}!`;

const weeksContainer = document.getElementById("weeks-container");

// Generate 3 weeks × 5 days
for (let week = 1; week <= 3; week++) {
  const weekDiv = document.createElement("div");
  weekDiv.className = "week";

  const weekTitle = document.createElement("h3");
  weekTitle.textContent = `Week ${week}`;
  weekDiv.appendChild(weekTitle);

  const daysDiv = document.createElement("div");
  daysDiv.className = "days";

  for (let day = 1; day <= 5; day++) {
    const button = document.createElement("button");
    button.textContent = `Day ${day}`;

    const storyId = `w${week}d${day}`;
    const mode = role === "teacher" ? "edit" : "view";

    button.onclick = () => {
      window.location.href = `story.html?role=${role}&mode=${mode}&id=${storyId}`;
    };

    daysDiv.appendChild(button);
  }

  weekDiv.appendChild(daysDiv);
  weeksContainer.appendChild(weekDiv);
}

// Show "Create Story" only if teacher
if (role === "teacher") {
  const createBtn = document.getElementById("createBtn");
  createBtn.style.display = "inline-block";
  createBtn.onclick = () => {
    window.location.href = `story.html?role=teacher&mode=create`;
  };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}