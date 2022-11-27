const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "mydb",
});
connection.connect(async function (err) {
  if (err) throw err;
  const user = `CREATE TABLE IF NOT EXISTS users (userID INT AUTO_INCREMENT PRIMARY KEY, userName VARCHAR(255), groupID INT)`;
  await connection.query(user, function (err, result) {
    if (err) throw err;
    // console.log("Table created");
  });
  const groups =
    "CREATE TABLE IF NOT EXISTS category (categoryID INT AUTO_INCREMENT PRIMARY KEY, categoryName VARCHAR(255),userID INT, CONSTRAINT fk_users FOREIGN KEY (userID) REFERENCES users(userID))";
  await connection.query(groups, function (err, result) {
    if (err) throw err;
    // console.log("Table created");
  });
  const organizations =
    "CREATE TABLE IF NOT EXISTS organizations(orgID INT AUTO_INCREMENT PRIMARY KEY, orgName VARCHAR(255),userID INT,categoryID INT, CONSTRAINT fk_user FOREIGN KEY(userID) REFERENCES users(userID),CONSTRAINT fk_category FOREIGN KEY(categoryID) REFERENCES category(categoryID))";
  await connection.query(organizations, function (err, result) {
    if (err) throw err;
    // console.log("Table created");
  });
  connection.end();
});
