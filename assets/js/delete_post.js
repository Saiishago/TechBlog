const deleteP = async(post_id) => {
    const response = await fetch(`api/posts/${post_id}`, {
        method: "delete",
        header: {"ContentType": "application/json"},
    });
    if (response.ok){
        document.location.reload();
    } else {
        alert("Nope, I'm staying right here!");
    }
};

const deletePHandler = (event) => {
    if (event.target.matches(".delete_post")){
        const post_id = event.target.getAttribute("data-post-id");
        deleteP(post_id);
    }
};

document.addEventListener("click", deletePHandler);