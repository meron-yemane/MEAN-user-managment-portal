const express = require('express');
const router = express.Router();
const {UserModel} = require('../../schemas/users.schema.js');
const { RolesModel } = require('../../schemas/roles.schema.js');
const { PermissionsModel } = require('../../schemas/permissions.schema.js');
// check if GET api listening
router.get('/', (req, res) => {
  res.send('api is working properly');
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

router.get("/users", function(req, res) {
  UserModel.find({}, function(err, users) {
    if (err) {
      handleError(res, err.message, "Failed to get users");
    } else {
      return res.status(201).json(users);
    }
  });
});

router.get("/users/:id", function(req, res) {
  let id = req.params.id;
  UserModel.findById(id, function(err, user) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      return res.status(200).json(user)
    }
  });
});

router.get("/roles", function(req, res) {
  RolesModel.find({}, function(err, roles) {
    if (err) {
      handleError(res, err.message, "Failed to get roles");
    } else {
      res.status(200).json(roles);
    }
  });  
});

router.get("/permissions", function(req, res) {
  PermissionsModel.find({}, function(err, permissions) {
    if (err) {
      handleError(res, err.message, "Failed to get permissions");
    } else {
      res.status(200).json(permissions[0].permission);
    }
  });  
});

router.post("/roles", function(req, res) {
  const newRole = RolesModel(req.body);
  newRole.save(function(err) {
    if (err) {
      throw err;
    } else {
      return res.status(201).json();
    }
  });
});

router.post("/permissions", function(req, res) {
  const newPermission = PermissionsModel(req.body);
  newPermission.save(function(err) {
    if (err) {
      throw err;
    } else {
      return res.status(201);
    }
  });
});

router.post("/users", function(req, res) {
  const newUser = UserModel(req.body);
  newUser.save(function(err) {
    if (err) {
      throw err;
    } else {
      res.status(200).json();
    }
  });
});

router.patch("/users/:id", function(req, res) {
  let id = req.params.id;
  UserModel.findByIdAndUpdate(id, req.body, function(err) {
    if (err) {
      handleError(res, err.message, "Failed to update user");
    } else {
      return res.status(200).json();
    }
  });

});

router.put("/users/:id", function(req, res) {
});

module.exports = router;