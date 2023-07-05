const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(cors());

const credentialList = [];
readFromFile();

app.post('/signup', (req, res) => {
    const { fullName, email, contact, password, add } = req.body;
    if (!fullName || !email || !contact || !password || !add) {
        res.json({ message: "please enter valid details" });
        return;
    } else {
        for (let i = 0; i < credentialList.length; i++) {
            if (credentialList[i].email == email) {
                res.json({ message: "user already exist" });
                return;
            }
        }
        credentialList.push({ fullName, email, contact, password, add });
        res.json({ message: "user created successfully" });
    }
    console.log(credentialList);
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    for (i = 0; i < credentialList.length; i++) {
        if (credentialList[i].email == email && credentialList[i].password == password) {
            res.json({ message: "login successful" });
            return;
        }
    }
    res.json({ message: "Invalid email or password" });
});
function readFromFile(){fs.readFile('cred.json', (err, data)=>{
    if(err){
        console.log("error in reading file", err);
    }
    else{
        console.log(data.toString());
    }
})
}


function writeFromFile(){fs.writeFile('cred.json',jsondata,(err)=>{
    if(err){
        console.log("error in writing file", err);
    }
})
}

const port = 3001;
app.listen(port, () => {
    console.log(`server is running in port ${port}`);
});