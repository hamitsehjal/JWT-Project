const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()

require("dotenv").config();


const posts = [
    {
        username: "Kyle",
        title: "Post 1"
    },
    {
        username: "Jim",
        title: "Post 2"
    }
]

app.use(express.json())
// Designing the middleware
const authenticiateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    const token=authHeader&&authHeader.split(" ")[1]

    if(token==null)
    {
        return res.sendStatus(401)

    }

    jwt.verify(token,process.env.ACCESS_SECRET,(err,user)=>{
        if(err)
        {
            return res.sendStatus(403)
        }

        req.user=user
        next()
    })

}
app.get("/posts",authenticiateToken, (req, res) => {
    res.json(posts.filter(post=>post.username==req.user.name))
})




app.listen(3000, () => {
    console.log("Express Server listening on Port: 3000")
})