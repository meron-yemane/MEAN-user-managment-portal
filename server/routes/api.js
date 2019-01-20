const express = require('express');
const UserModel = require('./schemas/users.schema');
const RolesModel = require('./schemas/roles.schema');
const router = express.Router();

// check if GET api listening
router.get('/', (req, res) => {
  res.send('api is working properly');
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/api/users", function(req, res) {
  UserModel.find({}, function(err, users) {
    if (err) {
      handleError(res, err.message, "Failed to get users");
    } else {
      res.status(200).json(users);
    }
  });
});

app.get("/api/roles", function(req, res) {
  RolesModel.find({}, function(err, roles) {
    if (err) {
      handleError(res, err.message, "Failed to get users");
    } else {
      res.status(200).json(roles);
    }
  });  
});

app.post("/api/roles", function(req, res) {
  const newRole = RolesModel(req.body);
  if (err) {
    handleError(res, "Invalid user input", 400);
  } else {
    newRole.save(function(err) {
      if (err) throw err;

    });
  }
});

app.post("/api/users", function(req, res) {
  const newUser = UserModel(req.body);
  if (err) {
    handleError(res, "Invalid user input", 400);
  } else {
    newUser.save(function(err) {
      if (err) throw err;

    });
  }
});

app.patch("/api/users/:id", function(req, res) {

});

app.put("/api/users/:id", function(req, res) {
});

module.exports = router;