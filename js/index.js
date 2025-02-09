// Add a Footer Element
const footerElement = document.createElement("footer");
const bodyElement = document.querySelector("body");
bodyElement.appendChild(footerElement);

// Insert Copyright Text in Footer
const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `© Mike McDonald ${thisYear}`;

footer.appendChild(copyright); 

// Styling for footer
footer.style.textAlign = "center";
footer.style.padding = "10px";

// Create List of Skills
const skills = ["HTML", "CSS", "Javascript", "GitHub", "Hilarious"];
const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

// For loop used to create List of Skills
for(let i=0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

// Variable to select the "leave_message" form by name attribute
const messageForm = document.forms["leave_message"];

// Function to handle message and submit functionality
messageForm.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.usersName.value;
    const email = event.target.email.value;
    const message = event.target.usersMessage.value;
    console.log(name, email, message);

    const messageSection = document.getElementById("messages");
    const messageList = messageSection.querySelector("ul");
    const newMessage = document.createElement("li");
    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a>
                            <span>: ${message}</span>`;

    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("id", "button");
    removeButton.addEventListener("click", handleRemoveButton);
    function handleRemoveButton() {
        const entry = removeButton.parentNode;
        entry.remove();
    }

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    messageForm.reset();
}

// ---Fetch API for Projects Section---

// Getting HTML elements
const projectSection = document.getElementById("projects");
const projectList = projectSection.querySelector("ul");

//Creating fetch, handling JSON data, handling errors, and adding portfolio project in Projects Section
fetch("https://api.github.com/users/MikeMcDonald1/repos")
.then((res) => {
    return res.json();
})
.then((repositories) => {
    console.log("repositories: ", repositories);

    for (let i = 0; i < repositories.length; i++) {
        const project = repositories[i].name;
        const repoURL = repositories[i].html_url;

        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = repoURL;
        link.innerHTML = project;
        link.target = "_blank";
        li.appendChild(link);
        projectList.appendChild(li);
    }
})
.catch((error) => {
    console.error("An error occurred:", error);
});  