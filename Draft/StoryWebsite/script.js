// Utility functions
function getStories() {
  const stored = localStorage.getItem("stories")
  return stored ? JSON.parse(stored) : []
}

function saveStories(stories) {
  localStorage.setItem("stories", JSON.stringify(stories))
}

// Page: create.html logic
const saveBtn = document.getElementById("saveBtn")
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const title = document.getElementById("title").value.trim()
    const content = document.getElementById("content").value.trim()

    if (!title || !content) {
      alert("Please enter both title and content.")
      return
    }

    const stories = getStories()
    stories.push({ title, content })
    saveStories(stories)

    alert("Story saved!")
    document.getElementById("title").value = ""
    document.getElementById("content").value = ""
  })
}

// Page: view.html logic
const storyList = document.getElementById("storyList")
if (storyList) {
  const stories = getStories()

  if (stories.length === 0) {
    storyList.innerHTML = "<p>No stories yet.</p>"
  } else {
    stories.forEach((story, index) => {
      const btn = document.createElement("button")
      btn.textContent = story.title
      btn.addEventListener("click", () => displayStory(index))
      storyList.appendChild(btn)
    })
  }
}

function displayStory(index) {
  const stories = getStories()
  const story = stories[index]
  document.getElementById("viewerTitle").textContent = story.title
  document.getElementById("viewerContent").textContent = story.content
  document.getElementById("viewer").classList.remove("hidden")
}