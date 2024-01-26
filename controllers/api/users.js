const {MongoClient} = require ('mongodb');
const uri = 'mongodb+srv://carnealao:Mookie123!@cluster0.hheozaf.mongodb.net/?retryWrites=true&w=majority'
const { v4: uuidv4} = require ('uuid')
const jwt = require('jsonwebtoken');
const { error } = require('console');
const bcrypt = require('bcrypt');

module.exports = {
    signUp,
    getAllUsers,
    login
}

async function signUp (req,res) {
    const client = new MongoClient(uri);
    const {email, password } = req.body;
    console.log(req.body)
    const generatedUserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        client.connect()
        const database = client.db('app-data');    
        const users = database.collection('users');

        const existingUser = await users.findOne({ email })

        if (existingUser) {
            return res.status(409).send('User already exists. Please login')
        }

        const sanitizedEmail = email.toLowerCase();
        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }
        const insertedUser = await users.insertOne(data);

        const token = jwt.sign(insertedUser, sanitizedEmail,{
            expiresIn: 60 * 32,
        })

        res.status(201).json({token, user_id: generatedUserId, email: sanitizedEmail})
        
        } catch (err) {
            console.log(error);
        }

}

async function getAllUsers (req,res) {

    const client = new MongoClient(uri);

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const returnedUsers = await users.find().toArray();
        res.send(returnedUsers)
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
            res.status(201).json({token, userId: user.user_id, email})
        } 
        res.status(400).send('invalid Credentials')
            }catch (err) {
        console.log(err)
    }
}
    
