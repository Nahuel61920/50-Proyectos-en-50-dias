const comments = [];

const inputContainer = document.createElement("div");
const input = document.createElement("input");
input.classList.add("input");
const commentsContainer = document.querySelector("#comments-container");

commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input);

input.addEventListener("keydown", (e) => {
  handleEnter(e, null);
});

function handleEnter(e, current) {
  if (e.key === "Enter" && e.target.value != "") {
    const newComment = {
      text: e.target.value,
      likes: 0,
      responses: [],
    };
    if (current === null) {
      comments.unshift(newComment);
    } else {
      current.responses.unshift(newComment);
    }
    e.target.value = "";
    commentsContainer.innerHTML = "";
    commentsContainer.appendChild(inputContainer);
    renderComments(comments, commentsContainer);
  }
}

function renderComments(arr, parent) {
  arr.forEach((element) => {
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-container");
    const responsesContainer = document.createElement("div");
    responsesContainer.classList.add("responses-container");
    const replyButton = document.createElement("button");
    const likeButton = document.createElement("button");

    replyButton.textContent = "Reply";
    likeButton.textContent = "Like";
    replyButton.addEventListener("click", (e) => {
      const newInput = inputContainer.cloneNode(true);
      newInput.value = "";
      newInput.focus();
      newInput.addEventListener("keydown", (e) => {
        handleEnter(e, element);
      });
      commentContainer.insertBefore(newInput, responsesContainer);
    });
    likeButton.addEventListener("click", (e) => {
      element.likes++;
      likeButton.textContent = `${
        element.likes > 0 ? element.likes : ""
      } Likes`;
    });
    const divContent = document.createElement("div");
    divContent.textContent = element.text;
    const divActions = document.createElement("div");
    //commentContainer.appendChild(document.createTextNode(element.text));
    commentContainer.appendChild(divContent);
    commentContainer.appendChild(divActions);
    divActions.appendChild(replyButton);
    divActions.appendChild(likeButton);
    commentContainer.appendChild(responsesContainer);
    if (element.responses.length > 0) {
      renderComments(element.responses, responsesContainer);
    }
    parent.appendChild(commentContainer);
  });
}
