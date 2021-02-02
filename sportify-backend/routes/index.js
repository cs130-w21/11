module.exports = function(app) {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to Sportify");
    });
    app.use("/", require('./main'));
};