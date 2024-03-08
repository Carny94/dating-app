const {MongoClient} = require ('mongodb');
const uri = 'mongodb+srv://carnealao:Mookie123!@cluster0.hheozaf.mongodb.net/?retryWrites=true&w=majority'
const { v4: uuidv4} = require ('uuid')
const jwt = require('jsonwebtoken');
const { error } = require('console');
const bcrypt = require('bcrypt');

module.exports = {
    signUp,
    genderedUsers,
    login,
    user,
    getUsers,
    addMatch
}

async function signUp(req, res) {
    const client = new MongoClient(uri);
    const { email, password } = req.body;
    console.log(req.body);
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


async function genderedUsers (req,res) {

    const client = new MongoClient(uri);
    const gender = req.query.gender;
    console.log('gender', gender)
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = {gender_identity: {$eq : gender} }
        const foundUsers = await users.find(query).toArray()

        res.send(foundUsers)
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

async function user (req, res) {
    const client = new MongoClient(uri);
    const formData = req.body.formData

    console.log(formData)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_id: formData.user_id}
        console.log(query)
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
                about: formData,
                matches: formData.matches
            },
        }
            const insertedUser = await users.updateOne(query, updateDocument)
            res.send(insertedUser)

        } finally {
            await client.close()
    }
}

async function getUsers (req, res) {
    const client = new MongoClient(uri);
    const userId = req.query.userId

    console.log('userId', userId)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_id: userId}
        const user = await users.findOne(query)
        res.send(user)
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
            $push: {matches: { user_id: matchedUserId}},
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }
}

    

    