import express from 'express';

const router = express.Router();

let posts = [
    {id: 1, title: 'Post 1'},
    {id: 2, title: 'Post 2'},
    {id: 3, title: 'Post 3'}
];

// Get all posts
router.get('/', (req,res) => {
    res.status(200).json(posts);
});

// Get single post
router.get('/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {
        res.status(404)
        .json({message: `No post with the id of ${id}`});
    } 
    res.status(200).json(post);
});

// Create new post
router.post('/', (req,res) => {
    const title = req.body.title;
    if(String(title).length < 3) {
        return res.status(400).json({message: 'Please enter a title with at least 3 characters'});
    }
    const id = posts.length + 1;
    const newPost = {id, title};

    posts.push(newPost);
    res.status(201).json(newPost);
})

// Update post
router.put('/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const post = posts.find( post => post.id === id);
    if (!post) {
        res.status(404)
        .json({message: `No post with the id of ${id}`});
    }
    const title = req.body.title;
    if(String(title).length < 3) {
        return res.status(400).json({message: 'Please enter a title with at least 3 characters'});
    }
    post.title = title;
    res.status(200).json(post);
});

export default router;