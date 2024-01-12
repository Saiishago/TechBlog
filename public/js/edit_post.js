const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 2
];

const updatePFormH = async(event) => {
    event.preventDefault();
    const title = document.querySelector("#title-update-p").value.trim();
    const content = document.querySelector("#content-update-p").value.trim();

    if(title&&content) {
        const response = await fetch(`/api/post/${post_id}`, {
            method: "PUT",
            body: JSON.stringify({title, content}),
            headers: {"Content-Type": "application/json"},
        });
        if(response.ok) {document.location.replace("/dash");
        } else {
            alert("Could not update post.");
        }
    }
};

const deletePFormH = async(event) => {
    event.preventDefault();
    const response = await fetch(`/api/posts/${post_id}`,{
        method: "DELETE",
    });
    if(response.ok) {document.location.replace("/dash");
    } else {
        alert("Could not delete post.");
    }
};

const updatePButton = document.querySelector("#update-p");
if(updatePButton) {updatePButton.addEventListener("click", updatePFormH);
}

const deletePButton = document.querySelector("#delete-p");
if(deletePButton) {deletePButton.addEventListener("click", deletePFormH);
}