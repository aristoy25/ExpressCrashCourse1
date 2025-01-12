import colors from 'colors';

//middleware logger
const logger = (req,res,next) => {
    const methodColors={
        GET: 'green',
        POST: 'blue',
        PUT: 'yellow',
        DELETE: 'red'
    };
    const methodColor = methodColors[req.method] || 'white';

    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}` 
    [methodColor]
);
    next();
};

export default logger;