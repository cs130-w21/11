const express = require('express')
const sequelize =  require('./utils/sequelize/index')
const authRoutes = require('./routes/auth/index')

const app = express();
app.use(express.json())
const port = process.env.PORT || "8000";

//Verify DB Connection
async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
    // await sequelize.sync()
}
assertDatabaseConnectionOk()

//Creates Tables in DB if they don't exist

//set up Routes
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Sportify");
});

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});