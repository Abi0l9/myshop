const { connect } = require("mongoose");
const { DB } = require("./utils/config");

connect(DB)
    .then(() => console.log("connected to DB"))
    .catch((err) => console.error("something happened... " + err.message));
