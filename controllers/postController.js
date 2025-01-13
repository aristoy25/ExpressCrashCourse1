let posts = [
    {id: 1, title: 'Post 1'},
    {id: 2, title: 'Post 2'},
    {id: 3, title: 'Post 3'}
];
// @desc: Get all posts
// @route: GET /api/posts
const getPosts= (req, res, next) => {
    const limit = parseInt(req.query.limit) || 10;
    if(!isNaN(limit) && limit > 0) {
        res.status(200).json(posts.slice(0, limit));
    }
    res.status(200).json(posts);
};

// @desc: Get single post
// @route: GET /api/posts/:id
const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {
        const err = new Error(`No post with the id of ${id}`);
        err.status = 404;
        return next(err);
    } 
    res.status(200).json(post);
};

// @desc: Create new post
// @route: POST /api/posts
const createPost = (req,res, next) => {
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
};

// @desc: Update post
// @route: PUT /api/posts/:id
const updatePost = (req,res, next) => {
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
};

// @desc: Delete post
// @route: DELETE /api/posts/:id
const deletePost = (req,res) => {
    const id = parseInt(req.params.id);
    const newPosts=posts.filter((post) => {
        return post.id !== id;
    })
    posts = newPosts;
    res.status(200).json(posts);
};

export {
    posts,
    getPosts, 
    getPost, 
    createPost, 
    updatePost,
    deletePost
};