/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Challenge = require("./models/challenge");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(
      req.user,
      socketManager.getSocketFromSocketID(req.body.socketid)
    );
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/challenges", (req, res) => {
  // empty selector means get all documents
  Challenge.find({}).then((challenges) => res.send(challenges));
});

router.post("/challenge", auth.ensureLoggedIn, (req, res) => {
  const newChallenge = new Challenge({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
    title: req.body.title,
  });

  newChallenge.save().then((challenge) => res.send(challenge));
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send("User Not");
    });
});

router.get("/user/:userId/likes", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.likedChallenges);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/challenge/:id/like", async (req, res) => {
  try {
    const { userId, like } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (like) {
      user.likedChallenges.addToSet(req.params.id);
    } else {
      user.likedChallenges.pull(req.params.id);
    }

    await user.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/challenge/:id/todo', async (req, res) => {
  try {
    const { userId, addToTodo } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (addToTodo) {
      user.todoChallenges.addToSet(req.params.id);
    } else {
      user.todoChallenges.pull(req.params.id);
    }

    await user.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/user/:userId/todos', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.todoChallenges);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
