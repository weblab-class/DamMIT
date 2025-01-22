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

  newChallenge
    .save()
    .then((challenge) => res.send(challenge))
    .catch((err) => {
      console.error("Error saving challenge:", err);
      res.status(500).send("Internal Server Error");
    });
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

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    if (like) {
      user.likedChallenges.addToSet(req.params.id);
      challenge.likes += 1;
    } else {
      user.likedChallenges.pull(req.params.id);
      challenge.likes = Math.max(0, challenge.likes - 1);
    }

    await user.save();
    await challenge.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/challenge/:id/todo", async (req, res) => {
  try {
    const { userId, addToTodo } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (addToTodo) {
      user.todoChallenges.addToSet(req.params.id);
    } else {
      user.todoChallenges.pull(req.params.id);
    }

    await user.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user/:userId/todos", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.todoChallenges);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user/:userId/completed", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.completedChallenges);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/challenge/:id/complete", async (req, res) => {
  try {
    const { userId, complete } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    if (complete) {
      user.completedChallenges.addToSet(req.params.id);
      challenge.num_completed += 1;
    } else {
      user.completedChallenges.pull(req.params.id);
      challenge.num_completed = Math.max(0, challenge.num_completed - 1);
    }

    await user.save();
    await challenge.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/challenge/new", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newChallenge = new Challenge({
      title,
      content: description,
      creator_id: req.user._id, // Assuming user is authenticated
      creator_name: req.user.name, // Assuming user is authenticated
      likes: 0,
      num_completed: 0,
    });
    await newChallenge.save();
    res.status(201).json({ success: true, challenge: newChallenge });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signup", (req, res) => {
  const { googleId, classYear, username, major, dorm } = req.body;

  const newUser = new User({
    name: username,
    googleid: googleId,
    classYear,
    major,
    dorm,
    likedChallenges: [],
    todoChallenges: [],
    completedChallenges: [],
  });

  newUser
    .save()
    .then((user) => res.status(201).send(user))
    .catch((error) => {
      console.error("Error creating user:", error);
      res
        .status(400)
        .send({ error: "Error creating user", details: error.message });
    });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
