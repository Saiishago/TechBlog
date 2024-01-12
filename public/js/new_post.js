const newPFormH = async(event) => {
    event.preventDefault();
    const title = document.querySelector("#title-new-p").value.trim();
    const content = document.querySelector("#content-new-p").value.trim();
    if(title && content){
        const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({title, content}),
            headers: {"Content-Type": "application/json"},
        });
        if(response.ok){document.location.replace("/dash");
        } else {
            alert("Could not create new post.");
        }
    }
};

const newPForm = document.querySelector(".new-p-form");
if(newPForm){newPForm.addEventListener("submit", newPFormH);
}