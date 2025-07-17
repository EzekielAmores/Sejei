// Extract URL parameters
const params = new URLSearchParams(window.location.search);
const role = params.get('role');
const mode = params.get('mode');
const storyId = params.get('id');

// Placeholder story database
const stories = {
  'w1d1': {
    title: "The Mysterious Forest",
    text: "Once upon a time in a mysterious forest, a group of travelers found themselves surrounded by trees that whispered secrets. The forest shifted with each step they took, as though guiding — or misleading — them.",
    score: 8,
    attempts: 2,
    quiz: [
      {
        question: "What kind of place did the travelers get lost in?",
        correct: "A mysterious forest",
        wrong: ["A desert", "A city", "A mountain"]
      },
      {
        question: "What was strange about the forest?",
        correct: "It shifted and changed with every step",
        wrong: ["It was always dark", "It was filled with fog", "It had no animals"]
      }
    ]
  }
};

const quizData = [];

// UI control logic
function setupPage() {
  const story = stories[storyId];
  if (!story) return alert("Story not found");

  if (role === 'student' && mode === 'view') {
    document.getElementById('student-view').style.display = 'block';
    document.getElementById('student-title').textContent = story.title;
    document.getElementById('student-text').textContent = story.text;
    document.getElementById('score').textContent = story.score;
    document.getElementById('attempts').textContent = story.attempts;
  }

  if (role === 'teacher' && mode === 'edit') {
    document.getElementById('teacher-view').style.display = 'block';
    document.getElementById('story-title').textContent = story.title;
    document.getElementById('story-text').textContent = story.text;
    quizData.push(...story.quiz.map(q => ({ ...q, editing: false })));
    renderQuiz();
  }

  if (role === 'teacher' && mode === 'create') {
    document.getElementById('teacher-view').style.display = 'block';
    toggleEdit(); // Start in edit mode
  }
}

function toggleEdit() {
  const currentTitle = document.getElementById("story-title").textContent;
  const currentText = document.getElementById("story-text").textContent;

  document.getElementById("edit-title").value = currentTitle;
  document.getElementById("edit-text").value = currentText;

  document.getElementById("story").style.display = "none";
  document.getElementById("edit-story").style.display = "block";
  document.getElementById("editBtn").style.display = "none";
  document.getElementById("saveBtn").style.display = "inline-block";
  document.getElementById("cancelBtn").style.display = "inline-block";
}

function saveStory() {
  const newTitle = document.getElementById("edit-title").value;
  const newText = document.getElementById("edit-text").value;

  document.getElementById("story-title").textContent = newTitle;
  document.getElementById("story-text").textContent = newText;

  cancelEdit();
}

function cancelEdit() {
  document.getElementById("story").style.display = "block";
  document.getElementById("edit-story").style.display = "none";
  document.getElementById("editBtn").style.display = "inline-block";
  document.getElementById("saveBtn").style.display = "none";
  document.getElementById("cancelBtn").style.display = "none";
}

// Quiz logic
function renderQuiz() {
  const panel = document.getElementById("quiz-panel");
  panel.innerHTML = "";

  quizData.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "quiz-item";

    if (q.editing) {
      div.innerHTML = \`
        <strong>Question \${i + 1}:</strong><br>
        <input type="text" id="edit-q-\${i}" value="\${q.question}" style="width: 100%; margin-bottom: 10px;"><br>
        <strong>Correct Answer:</strong><br>
        <input type="text" id="edit-correct-\${i}" value="\${q.correct}" style="width: 100%; margin-bottom: 10px;"><br>
        \${q.wrong.map((w, wi) => \`
          <strong>Wrong Answer \${wi + 1}:</strong><br>
          <input type="text" id="edit-wrong-\${i}-\${wi}" value="\${w}" style="width: 100%; margin-bottom: 5px;"><br>
        \`).join("")}
        <button onclick="saveQuestion(\${i})">Save</button>
        <button onclick="cancelEdit(\${i})">Cancel</button>
      \`;
    } else {
      div.innerHTML = \`
        <strong>Question \${i + 1}:</strong> <span>\${q.question}</span><br>
        <strong>Correct Answer:</strong> <span>\${q.correct}</span><br>
        <strong>Wrong Answers:</strong>
        <ul>\${q.wrong.map(ans => \`<li>\${ans}</li>\`).join("")}</ul>
        <div class="quiz-controls">
          <button onclick="editQuestion(\${i})">Edit</button>
          <button onclick="deleteQuestion(\${i})">Delete</button>
        </div>
      \`;
    }

    panel.appendChild(div);
  });
}

function createQuestion() {
  quizData.push({
    question: "",
    correct: "",
    wrong: ["", "", ""],
    editing: true
  });
  renderQuiz();
}

function editQuestion(index) {
  quizData[index].editing = true;
  renderQuiz();
}

function saveQuestion(index) {
  const newQ = document.getElementById(\`edit-q-\${index}\`).value.trim();
  const newC = document.getElementById(\`edit-correct-\${index}\`).value.trim();
  const newWrongs = [
    document.getElementById(\`edit-wrong-\${index}-0\`).value.trim(),
    document.getElementById(\`edit-wrong-\${index}-1\`).value.trim(),
    document.getElementById(\`edit-wrong-\${index}-2\`).value.trim()
  ];

  if (!newQ || !newC || newWrongs.some(w => !w)) {
    alert("Please complete the question and all answer fields.");
    return;
  }

  quizData[index] = {
    question: newQ,
    correct: newC,
    wrong: newWrongs,
    editing: false
  };

  renderQuiz();
}

function cancelEdit(index) {
  quizData[index].editing = false;
  renderQuiz();
}

function deleteQuestion(index) {
  if (confirm("Delete this question?")) {
    quizData.splice(index, 1);
    renderQuiz();
  }
}

window.onload = setupPage;
