const {client, syncAndSeed, getTitans, getMembers} = require('./db');
const express = require('express');
const app = express();
const path = require('path');
const {head} = require('./assets/html')
const port = process.env.PORT || 3000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', async(req,res,next) => {
    try{
       const titans = await getTitans(); 
       res.send(`
            <html>
                ${head({title:'TITANS'})}
                <body class='titans'>
                    <h1>TEEN TITANS</h1>
                    <div>
                    ${
                        titans.map(currTitan => `
                            <h2><a href='/members/${currTitan.id}'>${currTitan.name}</a></h2>
                        `).join('')
                    }
                    </div>
                </body>
            </html>

       `)
    } catch(ex){
        next(ex)
    }
});

app.get('/members/:id', async(req,res,next) => {
    try{
        const [member] = await getMembers(req.params.id);
        res.send(`
            <html>
               ${head({title:'MEMBER'})}
               <body>
               <h2><a href='/'>MEMBER</a></h2>
                <img src='${member.img}'/>
                <p>${member.bio}</p>
               </body> 
            </html>
        `)
    } catch(ex){
        next(ex)
    }
})



const init = async() => {
    try{
        await client.connect();
        await syncAndSeed();

        app.listen(port, () => console.log(`listening on port ${port}`))
    } catch(ex){
        console.log(ex)
    }
}
init()