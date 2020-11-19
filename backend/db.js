const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dbName = 'stayHealthy'
const uri = "mongodb+srv://elhadjium:270795mongo@cluster0.u6wuq.mongodb.net/'+ dbName +'?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

let db;

exports.init = () => {
    return new Promise((resolve, reject) => {
        mongoClient.connect((err, client) => {
            if (err) {
                return reject(err);
            }
            console.log("mongo dabase reached");
            db = client.db(dbName);
            resolve();
        })
    });
}

exports.addUser = (user) => {
    return new Promise((resolve, reject) => {
        if (!user || !user.firstName || !user.lastName || !user.email || !user.adress || !user.password || !user.role) 
            reject({error:'user must have: firstName, lastName, email, adress, password, role'});

        if (user.role != "doctor" && user.role != "patient")
            reject({error:'user rôle should be doctor or patient'});

        bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
                const userCollection = mongoClient.db("stayHealthy").collection("users");
                userCollection.findOne({email: user.email}).then(res => {
                    if (res)
                        reject({error:'a user with this email already exist'});
                    userCollection.insertOne(user);
                    resolve({message: 'user added'});
                })
            .catch(err => reject(err));
        });
    });
}

exports.logsUser = (email, password) => {
    return new Promise((resolve, reject) => {
        if (!email || !password)
            reject("password and email can't be null");

        const userCollection = mongoClient.db("stayHealthy").collection("users");
        userCollection.findOne({email: email}).then(res => {
            if (!res)
                reject('user not found !');
            console.log(password);
            bcrypt.compare(password, res.password)
                .then(valid => {
                    if (!valid)
                        reject("incorrect password");
                    resolve({
                        id: res._id,
                        token: jwt.sign(
                            { userId: res._id },
                            'RANOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(err => reject('hehe'));

        })
        .catch(err => reject("hehe"));

    });
    
}