const socket = io("http://localhost:8000");

const name = prompt("Enter your name for Join the Chat");
const container = document.querySelector(".containerBox");
const send = document.getElementById("send");
const usersBox = document.querySelector(".users");
const messagebox = document.getElementById("message");

const append = (message, classname) => {
  const box = document.createElement("div");
  container.appendChild(box);
  box.classList.add(classname);
  box.innerHTML = message;
};

socket.on("connection");
socket.emit("new-user-joined", name);

socket.on("user-joined", (user) => {
  append(`${user} Joined the chat`, "user-info");
});

send.addEventListener("click", () => {
  const message = messagebox.value;
  console.log(message);

  append(`you: ${message}`, "send");

  socket.emit("send", message);
  messagebox.value = "";
});
socket.on("recieve-message", (data) => {
  console.log(data.message);
  append(
    data.name == null ? "unknown" : data.name + ": " + data.message,
    "recieve"
  );
});
socket.on("leave", (name) => {
  if (name != null) {
    append(`${name} left the chat`, "user-info");
  }
});
