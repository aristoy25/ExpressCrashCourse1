
const output = document.getElementById('output'); 
const getThePosts = document.getElementById('getPosts');
const addPostForm = document.getElementById('addPostForm');

async function showPosts() {
    try {
const res = await fetch('http://localhost:8000/api/posts');
if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
};

const posts = await res.json();
posts.map(post => {
    const postElement = document.createElement('div');
    postElement.appendChild(document.createElement('h2')).textContent = `Title: ${post.title}`;
    postElement.appendChild(document.createElement('p')).textContent = `id: ${post.id}`;
    output.appendChild(postElement);
})
    }
    catch (err) {
        console.error('Error getting posts', err);
    }

};

//submit button new post
async function addPost(e) {
e.preventDefault();
const formData = new FormData(this);
const title = formData.get('title');

try{
    const res = await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title})
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    };

    const newPost = await res.json();
    const postElement = document.createElement('div');
    postElement.appendChild(document.createElement('h2')).textContent = `Title: ${newPost.title}`;
    postElement.appendChild(document.createElement('p')).textContent = `id: ${newPost.id}`;
    output.appendChild(postElement);
}
catch (err) {
    console.error('Error adding post', err);
}
}

getThePosts.addEventListener('click', showPosts);
addPostForm.addEventListener('submit', addPost);







