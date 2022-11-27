require("dotenv").config({ path: "configs/.env" });
const mysql = require("mysql");
const jwt = require("jsonwebtoken");


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to database");
    }
});
exports.getUsers = async (req, res, next) => {
    const sql =
        "SELECT userID,userName,orgName,categoryName from users LEFT OUTER JOIN organizations ON users.orgID=organizations.orgID LEFT OUTER JOIN category ON users.categoryID = category.categoryID";

    connection.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.json(result);
    });
};

exports.addUsers = async (req, res) => {
    const { userName, orgName, categoryName } = req.body;

    const sql = "SELECT orgID FROM organizations WHERE orgName = ?";
    connection.query(sql, [orgName], (err, result) => {
        const object = {
            userName: userName,
            orgID: null,
            categoryID: null,
        };
        if (err) throw err;
        object.orgID = result[0].orgID;
        const sql2 = "SELECT categoryID FROM category WHERE categoryName = ?";
        connection.query(sql2, [categoryName], (err, result) => {
            if (err) throw err;
            // console.log("categoryID", result[0].categoryID);
            object.categoryID = result[0].categoryID;
            console.log("object", object);
            const sql3 = "INSERT INTO users SET ?";
            connection.query(sql3, object, (err, result) => {
                if (err) throw err;
                // console.log(result);
                const sql4 =
                    "SELECT userID,userName,orgName,categoryName from users LEFT OUTER JOIN organizations ON users.orgID=organizations.orgID LEFT OUTER JOIN category ON users.categoryID = category.categoryID";
                connection.query(sql4, (err, result) => {
                    if (err) throw err;
                    // console.log(result);
                    res.json(result);
                });
            });
        });
    });
}

exports.getOrganizations = async (req, res, next) => {
    const sql = "SELECT * from organizations";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
}


exports.addOrganizations = async (req, res, next) => {
    const sql = "INSERT INTO organizations SET ?";
    const orgName = req.body;
    // console.log(orgName);
    connection.query(sql, orgName, (err, result) => {
        if (err) throw err;
        // console.log(result);
    });
    const organizations = "SELECT * from organizations";
    connection.query(organizations, function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.json(result);
    });
}

exports.getGroups = async (req, res, next) => {
    const sql = "SELECT * from category";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.json(result);
    });
}

exports.addGroups = async (req, res) => {
    const sql = "INSERT INTO category SET ?";
    const categoryName = req.body;
    // console.log(categoryName);
    connection.query(sql, categoryName, (err, result) => {
        if (err) throw err;
        // console.log(result);
    });
    const category = "SELECT * from category";
    connection.query(category, function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.json(result);
    });
}



exports.auth = async (req, res, next) => {
    const token = req.session.token;
    const cookie = req.cookies.access_token;

    console.log(token, cookie);
    if (token !== undefined || cookie !== undefined) {
        if (token === cookie) {
            res.status(200).json({ auth: true, token });
        }
    } else {
        res.status(401).json({ auth: false, message: "unauthorized" });
    }
}

exports.login = async (req, res, next) => {

    const category =
        "CREATE TABLE IF NOT EXISTS category (categoryID INT AUTO_INCREMENT PRIMARY KEY, categoryName VARCHAR(255))";
    connection.query(category, (err, res) => {
        if (err) throw err;
        // console.log("table2 created");
    });
    const organizations =
        "CREATE TABLE IF NOT EXISTS organizations(orgID INT AUTO_INCREMENT PRIMARY KEY, orgName VARCHAR(255))";
    connection.query(organizations, function (err, res) {
        if (err) throw err;
        // console.log("table3 created");
    });
    const user =
        "CREATE TABLE IF NOT EXISTS users (userID INT AUTO_INCREMENT PRIMARY KEY, userName VARCHAR(255), categoryID INT,orgID INT,FOREIGN KEY(orgID) REFERENCES organizations(orgID),FOREIGN KEY(categoryID) REFERENCES category(categoryID))";
    connection.query(user, function (err, res) {
        if (err) throw err;
        // console.log("table1 created");
    });

    const secret = "secret123";
    const admin = {
        email: "admin@gmail.com",
        password: "admin",
    };
    const { email, password } = req.body;
    // console.log(email, password);
    if (email === admin.email && password === admin.password) {
        const token = jwt.sign({ admin }, secret);

        req.session.token = token;
        res
            .cookie("access_token", token, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
            })
            .status(200)
            .json({ severity: "success", token, message: "Login successfully" });
    }
    else {
        res.status(401).json({ severity: "error", message: "Invalid credentials" });
    }
}

exports.logout = async (req, res, next) => {
    req.session.destroy();
    res.clearCookie("access_token");
    res.json({ auth: false, message: "logged out" });
}


