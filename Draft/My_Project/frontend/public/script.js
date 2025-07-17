async function submitInput() {
  const input = document.getElementById('userInput').value;
  if (!input.trim()) return;
  await fetch('/api/inputs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input })
  });
  document.getElementById('userInput').value = '';
  fetchInputs();
}

async function fetchInputs() {
  const res = await fetch('/api/inputs');
  const data = await res.json();
  const list = document.getElementById('list');
  list.innerHTML = '';
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}

fetchInputs();