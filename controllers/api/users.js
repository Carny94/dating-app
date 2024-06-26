const {MongoClient} = require ('mongodb');
const { v4: uuidv4} = require ('uuid')
const jwt = require('jsonwebtoken');
const { error } = require('console');
const bcrypt = require('bcrypt');

require('dotenv').config()
const uri = process.env.DATABASE_URL;

module.exports = {
    signUp,
    genderedUsers,
    login,
    user,
    getUsers,
    addMatch,
    users,
    messages,
    message
}

async function signUp(req, res) {
    const client = new MongoClient(uri);
    const { email, password } = req.body;

    const generatedUserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(409).send('User already exists. Please login');
        }

        const sanitizedEmail = email.toLowerCase();
        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        };

        const insertedUser = await users.insertOne(data);
        const token = jwt.sign({ user_id: generatedUserId }, sanitizedEmail, {
            expiresIn: 60 * 32,
        });

        res.status(201).json({ token, user_id: generatedUserId });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
}

async function login (req,res) {

    const client = new MongoClient(uri);
    const { email, password } = req.body;
   
    try {

        await client.connect()
        const database = client.db('app-data');
        const users = database.collection('users');
        const user = await users.findOne({email});
        const correctPassword = await bcrypt.compare(password, user.hashed_password)

        if (user && correctPassword) {

            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24
            })
            res.status(201).json({token, user_id: user.user_id})
        } 
        res.status(400).send('invalid Credentials')
            }catch (err) {
        console.log(err)
    }
}

async function getUsers (req, res) {
    const client = new MongoClient(uri);
    const userId = req.query.userId;

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');
        const query = { user_id: userId }; 
        const user = await users.findOne(query);
        
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
}

async function user (req, res) {
    const client = new MongoClient(uri);
    const formData = req.body.formData

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = { user_id: formData.user_id}
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches
            },
        }
            const insertedUser = await users.updateOne(query, updateDocument)
            res.json(insertedUser)

        } finally {
            await client.close()
    }
}


async function genderedUsers (req,res) {

    const client = new MongoClient(uri);
    const gender = req.query.gender;
    console.log("Received gender parameter:", gender); 
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = {gender_identity: {$eq : gender}}
        const foundUsers = await users.find(query).toArray()

        res.json(foundUsers)
    } finally {
        await client.close();

    }

}


async function addMatch (req, res) {
    const client = new MongoClient(uri);
    const { userId, matchedUserId} = req.body;

    try {
        await client.connect()
        const database = client.db('app-data');
        const users = database.collection('users');

        const query = { user_id: userId}
        const updateDocument = {
            $push: {matches: {user_id: matchedUserId}}
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }
}

async function users ( req, res) {
    const client = new MongoClient(uri);
    const userIds = JSON.parse(req.query.userIds);
    console.log(userIds)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const pipeline = 
        [
            {
                '$match': {
                    'user_id': {
                        '$in': userIds
                    }
                }
            }
        ]
       const foundUsers = await users.aggregate(pipeline).toArray();
       console.log(foundUsers)
       res.send(foundUsers)
    } finally {
        await client.close()
    }
}

async function messages (req, res) {
    const client = new MongoClient(uri);
    const { userId, correspondingUserId} = req.query
    console.log(user, correspondingUserId)
   try{
    await client.connect();
    const database = client.db('app-data');
    const messages = database.collection('messages');

    const query = {
        from_userId: userId, 
        to_userId: correspondingUserId
        };

    const foundMessages = await messages.find(query).toArray()
    res.send(foundMessages);

   } finally {
    await client.close()
   }
}

async function message (req, res) {
    const client = new MongoClient(uri);
    const message = req.body.message;
    try {
        await client.connect();
        const database = client.db('app-data');
        const messages = database.collection('messages');
        const insertertedMessage = await messages.insertOne(message)
        res.send(insertertedMessage)
    } finally {
        await client.close();
    }
}
    

    