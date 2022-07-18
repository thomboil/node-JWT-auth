const express = require('express')
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: "welcome to the API"
    })
});

app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Post created...',
                authData: authData
            })
        }
    })

});

app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'chad',
        email: 'chad@ezshop.ca'
    }

    jwt.sign({user: user}, 'secretkey', (err, token)=> {
        res.json({
            token: token
        })
    });
    
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    }else{
        // Forbidden
        res.sendStatus(403);
    }

}

app.listen(5000, () => console.log('Server started on 5000'));