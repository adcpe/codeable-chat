const ws = new WebSocket(`ws://localhost:3000`);

const username = prompt('Username');

const generateDate = () => {
  return new Date().toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  });
};

const log = document.getElementById('log');

// Messages sent by me
document.querySelector('button').onclick = () => {
  let text = document.getElementById('text').value;
  ws.send(JSON.stringify({ username: username, body: text }));
  log.innerHTML += `${generateDate()} ${username}: ${text}<br>`;
};

ws.onmessage = (event) => {
  const json = JSON.parse(event.data);
  const user = json.username;
  const body = json.body;
  log.innerHTML += `${generateDate()} ${user}: ${body}<br>`;
};

ws.onerror = (error) => {
  console.log('Server error message: ', error.message);
};
