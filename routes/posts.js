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
router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {
        const err = new Error(`No post with the id of ${id}`);
        err.status = 404;
        return next(err);
    } 
    res.status(200).json(post);
});
// Create new post
router.post('/', (req,res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    };
    if(!newPost.title) {
        const err = new Error(`Please include a title`);
        err.status = 400;
        return next(err);    
    } 
    posts.push(newPost);
    res.status(201).json(newPost);
})
// Update post
router.put('/:id', (req,res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find( post => post.id === id);
    if (!post) {
        const err = new Error(`No post with the id of ${id}`);
        err.status = 404;
        return next(err);
    }
    const title = req.body.title;
    if(!title || title.length < 3) {
        const err = new Error(`Please enter a title with at least 3 characters`);
        err.status = 404;
        return next(err);
    }
    post.title = title;
    res.status(200).json(post);
});
// Delete post
router.delete('/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const newPosts=posts.filter((post) => {
        return post.id !== id;
    })
    posts = newPosts;
    res.status(200).json(posts);
});

export default router;