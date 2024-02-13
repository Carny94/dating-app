// const { MongoClient } = require ('mongodb');
// const uri = 'mongodb+srv://carnealao:Mookie123!@cluster0.hheozaf.mongodb.net/?retryWrites=true&w=majority'


// async function genderedUsers (req,res) {

//     const client = new MongoClient(uri);
//     const gender = req.query.gender;
//     try {
//         await client.connect()
//         const database = client.db('app-data')
//         const users = database.collection('users')
//         const query = {gender_identity: {$eq : gender} }
//         const foundUsers = await users.find(query).toArray()

//         res.send(foundUsers)
//         console.log(foundUsers)
//     } finally {
//         await client.close();

//     }

// }

// module.exports = { genderedUsers };ynasync function genderedUsers (req,res) {

