"use strict";

var express = require("express");

var app = express();

var mysql = require("mysql");

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "mydb"
});
app.get("/", function _callee(req, res) {
  var sql, category, organizations, user, sql1;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sql = "CREATE DATABASE IF NOT EXISTS mydb";
          _context.next = 3;
          return regeneratorRuntime.awrap(connection.query(sql, function (err, res) {
            if (err) throw err;
            // console.log(res);
            console.log("Database created");
          }));

        case 3:
          category = "CREATE TABLE IF NOT EXISTS category (categoryID INT AUTO_INCREMENT PRIMARY KEY, categoryName VARCHAR(255))";
          connection.query(category, function (err, res) {
            if (err) throw err;
            // console.log("table2 created");
          });
          organizations = "CREATE TABLE IF NOT EXISTS organizations(orgID INT AUTO_INCREMENT PRIMARY KEY, orgName VARCHAR(255))";
          connection.query(organizations, function (err, res) {
            if (err) throw err;
            // console.log("table3 created");
          });
          user = "CREATE TABLE IF NOT EXISTS users (userID INT AUTO_INCREMENT PRIMARY KEY, userName VARCHAR(255), categoryID INT,orgID INT,FOREIGN KEY(orgID) REFERENCES organizations(orgID),FOREIGN KEY(categoryID) REFERENCES category(categoryID))";
          connection.query(user, function (err, res) {
            if (err) throw err;
            // console.log("table1 created");
          });
          sql1 = "SELECT * FROM users";
          connection.query(sql1, function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(result);
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post("/category", function _callee2(req, res) {
  var categoryName, sql, category;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // console.log(req.body);
          categoryName = req.body;
          sql = "INSERT INTO category SET ?";
          _context2.next = 5;
          return regeneratorRuntime.awrap(connection.query(sql, categoryName, function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send("category added");
          }));

        case 5:
          category = "SELECT * FROM category";
          _context2.next = 8;
          return regeneratorRuntime.awrap(connection.query(category, function (err, result) {
            // console.log(result);
          }));

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post("/organizations", function _callee3(req, res) {
  var orgName, sql, org;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // console.log(req.body);
          orgName = req.body;
          sql = "INSERT INTO organizations SET ?";
          _context3.next = 5;
          return regeneratorRuntime.awrap(connection.query(sql, orgName, function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send("organization added");
          }));

        case 5:
          org = "SELECT * FROM organizations";
          _context3.next = 8;
          return regeneratorRuntime.awrap(connection.query(org, function (err, result) {
            // console.log(result);
          }));

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post("/users", function _callee4(req, res) {
  var user, sql;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // console.log(req.body);
          user = req.body;
          sql = "INSERT INTO users SET ?";
          _context4.next = 5;
          return regeneratorRuntime.awrap(connection.query(sql, user, function (err, result) {
            // console.log(result);
            res.send("user added");
          }));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.get("/users", function _callee5(req, res) {
  var sql;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          sql = "SELECT * FROM users";
          connection.query(sql, function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(result);
          });

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.get("/organizations", function _callee6(req, res) {
  var sql;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          sql = "SELECT * FROM organizations";
          connection.query(sql, function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(result);
          });

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.get("/groups", function _callee7(req, res) {
  var sql;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          sql = "SELECT * FROM category";
          connection.query(sql, function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(result);
          });

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.get("/final", function _callee8(req, res) {
  var sql;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          sql = "SELECT userID,userName,orgName,categoryName from users LEFT OUTER JOIN organizations ON users.orgID=organizations.orgID LEFT OUTER JOIN category ON users.categoryID = category.categoryID";
          _context8.next = 3;
          return regeneratorRuntime.awrap(connection.query(sql, function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(result);
          }));

        case 3:
        case "end":
          return _context8.stop();
      }
    }
  });
});
app.get("/selectedusers", function (req, res) {
  var sql = "SELECT * FROM users WHERE userID=1";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    res.send(result);
  });
});
app.listen(8000, function () {
  console.log("Server is running on port 8000");
});