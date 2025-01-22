const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");

// create a new OAuth client used to verify google sign-in
//    TODO: replace with your own CLIENT_ID
const CLIENT_ID =
  "868412125046-d7vkgkl4dml38m39rqjemrnjbb49dojm.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

// gets user from DB, or returns null if it doesn't exist yet
function getUser(user) {
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    return existingUser || null;
  });
}

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user) {
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser) return { user: existingUser, isNew: false };

    const newUser = new User({
      name: user.name,
      googleid: user.sub,
      likedChallenges: [],
      todoChallenges: [],
      completedChallenges: [], // Initialize completedChallenges array for new users
    });

    return newUser.save().then((user) => ({ user, isNew: true }));
  });
}

function login(req, res) {
  verify(req.body.token)
    .then((user) => {
      return getUser(user).then((existingUser) => ({ user, existingUser }));
    })
    .then(({ user, existingUser }) => {
      if (existingUser) {
        req.session.user = existingUser;
        res.send({ user: existingUser, isNew: false });
      } else {
        req.session.pendingUser = user;
        res.send({ isNew: true });
      }
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err: "Unauthorized access" });
    });
}

function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};
