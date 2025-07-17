const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get("role") || "student";
const mode = urlParams.get("mode") || "view";
const storyId = urlParams.get("id") || "1";

function goBack() {
  window.location.href = role === 'teacher' ? 'teacher.html' : 'student.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const storyData = loadStoryData(storyId);

  if (mode === 'create') {
    renderEditableStory(); // new story
  } else if (mode === 'edit') {
    renderEditableStory(storyData); // edit existing
  } else {
    renderReadonlyStory(storyData); // view-only
  }

  if (role === 'teacher') {
    renderQuestionsSection(storyData.questions || []);
    renderStudentTable(storyData.students || []);
  }

  if (role === 'student') {
    renderFeedbackSection(storyData); // mock or real
  }
});

function renderEditableStory(story = { title: "", content: "" }) {
  const html = `
    <input type="text" id="story-title" value="${story.title}" placeholder="Enter title" style="width: 100%; font-size: 1.4em;"><br><br>
    <textarea id="story-content" rows="8" style="width: 100%;">${story.content}</textarea><br>
    <button onclick="saveStory()">Save</button>
    <button onclick="cancelEdit()">Cancel</button>
  `;
  document.getElementById("story-section").innerHTML = html;
}

function renderReadonlyStory(story) {
  const html = `
    <h2>${story.title}</h2>
    <p>${story.content}</p>
    ${role === 'student' ? '<button onclick="startQuiz()">Continue to Quiz</button>' : ''}
    ${role === 'teacher' ? '<button onclick="enterEditMode()">Edit</button>' : ''}
  `;
  document.getElementById("story-section").innerHTML = html;
}

function renderQuestionsSection(questions = []) {
  let html = `<h3>Quiz Questions</h3>`;

  questions.forEach((q, index) => {
    html += `
      <div class="question-block">
        <strong>Q${index + 1}:</strong> ${q.question}
        <ul>${q.options.map(opt => `<li>${opt}</li>`).join('')}</ul>
        <button onclick="editQuestion(${index})">Edit</button>
        <button onclick="deleteQuestion(${index})">Delete</button>
      </div>
    `;
  });

  html += `<button onclick="createNewQuestion()">Create New Question</button>`;
  document.getElementById("questions-section").innerHTML = html;
}

function renderStudentTable(students = []) {
  let html = `<h3>Student Grades</h3>
    <table><tr><th>Name</th><th>Score</th></tr>`;
  students.forEach(s => {
    html += `<tr><td>${s.name}</td><td>${s.score || '-'}</td></tr>`;
  });
  html += `</table>`;
  document.getElementById("students-section").innerHTML = html;
}

function renderFeedbackSection(storyData) {
  // Mocked values
  const score = localStorage.getItem('quizScore') || '0';
  const attempts = localStorage.getItem('quizAttempts') || '0';

  const html = `
    <h3>Your Performance</h3>
    <p><strong>Score:</strong> ${score}/${storyData.questions?.length || 0}</p>
    <p><strong>Attempts:</strong> ${attempts}</p>
    <button onclick="goBack()">Return</button>
  `;
  document.getElementById("feedback-section").innerHTML = html;
}

function saveStory() {
  const title = document.getElementById("story-title").value;
  const content = document.getElementById("story-content").value;

  alert("Story saved! (This is a placeholder)");

  // You’d send this data to a server or localStorage in a real app.
}

function cancelEdit() {
  window.location.reload();
}

function enterEditMode() {
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set("mode", "edit");
  window.location.href = newUrl.toString();
}

function startQuiz() {
  alert("Starting quiz... (Redirect or render quiz view)");
}

function loadStoryData(storyId) {
  const stories = {
    "1": {
      title: "The Lost Treasure",
      content: "Once upon a time, a pirate ship set sail in search of a lost treasure...",
      questions: [
        {
          question: "Where did the pirate ship go?",
          options: ["To the island", "To the moon", "To the desert", "To the jungle"],
          answer: "To the island"
        },
        {
          question: "What were they searching for?",
          options: ["A mermaid", "A treasure", "A map", "A ship"],
          answer: "A treasure"
        }
      ],
      students: [
        { name: "Alice", score: 2 },
        { name: "Bob", score: 1 }
      ]
    }
  };
  return stories[storyId] || { title: "", content: "", questions: [], students: [] };
}