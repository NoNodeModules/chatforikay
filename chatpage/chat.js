let socket = io.connect("http://localhost:4000");
const date = new Date();
const profile = [
  "https://www.w3schools.com/w3images/avatar2.png",
  "https://www.w3schools.com/w3images/avatar4.png",
  "https://www.w3schools.com/w3images/avatar3.png",
  "https://www.w3schools.com/w3images/avatar5.png",
  "https://www.w3schools.com/w3images/avatar6.png"
];
const profilePick = profile[Math.floor(Math.random() * profile.length)];
const username = prompt("Enter a Username");

/*document.querySelector("body").innerHTML += `
<p>${username} joined the chat</p>
<sub id="new">${new Date().getHours() + ":" + new Date().getMinutes()}</sub>
<br>
`*/

document.getElementById("app").innerHTML = ` 
<div class="wrapper">
<div class="input-data">
<input type="text" id="text" placeholder="Type Comment" size="50">
<button class="send-btn"><img src="https://static.thenounproject.com/png/1054386-200.png" alt="send-btn"></button>
</div>
</div>`;

document.querySelector("input").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        console.log("enter");
      socket.emit('chat', {
          message: document.getElementById("text").value,
          handle: username
      })
    }
  });

  document.querySelector(".send-btn").addEventListener("click", () => {
    socket.emit('chat', {
      message: document.getElementById("text").value,
      handle: username
  })
  })

  if(username){
    socket.emit("add_user", {
      name: username
    })
  }

 socket.on("add_user",user => {
  var tag = document.createElement("p");
  var secondTag = document.createElement("sub")
  secondTag.id = "new"
  var secondText = document.createTextNode(`${new Date().getHours() + ":" + new Date().getMinutes()}`)
  secondTag.appendChild(secondText)
  document.querySelector("body").appendChild(secondTag);
  var text = document.createTextNode(`${user.name} has joined the chat`);
   tag.appendChild(text);
   document.querySelector("body").appendChild(tag);
  /*document.querySelector("body").innerHTML += `
  <p>${user.name} joined the chat</p>
  <sub id="new">${new Date().getHours() + ":" + new Date().getMinutes()}</sub>
  <br>
  `*/
 })

  socket.on('chat', (data) => {
    console.log("something")

    if (data.message !== "") {
        document.querySelector("body").innerHTML += `
        <div class="container">
        <img id="profilepic" src="${profilePick}">
        <p style="color:teal;">${data.handle}</p>
        <p>${data.message}</p>
        <span class="time-right">${new Date().getHours() + ":" + new Date().getMinutes()}</span>
      </div>







        <!--Old unusable code<img src="${profilePick}" width="40px">
     <sub>${data.handle}</sub> 
     <sup>${new Date().getHours() + ":" + new Date().getMinutes()}</sup>
      <h3>${data.message}</h3>-->
      `;
      }
     document.getElementById("text").value = "";
      document.querySelector("input").addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          console.log("message sent!")
            socket.emit('chat', {
                message: document.getElementById("text").value,
                handle: username
            })
        }
      });

      document.querySelector(".send-btn").addEventListener("click", () => {
        socket.emit('chat', {
          message: document.getElementById("text").value,
          handle: username
      })
      })
  })

