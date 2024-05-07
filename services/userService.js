const db = require("./databaseService");
const auth = require("../services/autentication");
const validators = require("../middleware/userValidations");
const { identifyId, identifyUser } = require("../utils/userUtils");

const signInWithEmailorName = async (email, name, password) => {
  try {
    const user = await identifyUser(email, name);
    const isMatch = await auth.comparePassword(password, user[0].password);
    if (isMatch) {
      return { status: 200, data: auth.createToken(user[0])};
    } else {
      return {
        status: 400,
        data: "The user or password are incorrect, try again",
      };
    }
  } catch (error) {
    console.error("Error in signInWithEmailorName:", error);
    return {
      status: 500,
      data: "An internal error has occurred, please contact your administrator",
    };
  }
}

const getUserById = async (_id) => {
  return await db.createQuery(`SELECT * FROM users WHERE id = ?`, [_id]);
};

const getAllUsers = async () => {
  return await db.createQuery(`SELECT * FROM users`);
};

const signIn = async (_id, password) => {
  const searchedUser = await identifyId(_id);
  return await auth
    .comparePassword(password, searchedUser[0].password)
    .then(async (isMatch) => {
      if (isMatch) {
        return { status: 200, data: auth.createToken(searchedUser) };
      } else {
        return {
          status: 400,
          data: "The user or password are incorrect, try again",
        };
      }
    })
    .catch((error) => {
      return {
        status: 500,
        data: "An internal error has ocurred, please contact with your administrator",
      };
    });
};

const signUp = async (user) => {
  user.password = await auth.encrypt(user.password);
  let token = await new Promise(async (resolve, reject) => {
    if (!validators) {
      reject({ status: 400, data: "Some fields were filled incorrectly, please fix it." });
    } else {
      await db.createQuery("INSERT INTO USERS (fullname, role, email, password) VALUES (?,?,?,?)", [
        user.fullname,
        user.role,
        user.email,
        user.password,
      ])
     const result = await db.createQuery("SELECT id FROM USERS ORDER BY id DESC LIMIT 1;");
     user.id = result[0].id;
     return resolve(auth.createToken(user));
    }
  });
  return token;
};

const updateUser = async (id, user) => {
  user.password = await auth.encrypt(user.password);
  return await db.createQuery("UPDATE USERS SET fullname = ?, role = ?, email = ?, password = ? WHERE id = ?", [
    user.fullname,
    user.role,
    user.email,
    user.password,
    id,
  ]);
}

const deleteUser = async (id) => {
  return await db.createQuery("DELETE FROM USERS WHERE id = ?", [id]);
}

module.exports = {
  getUserById,
  getAllUsers,
  signIn,
  signInWithEmailorName,
  signUp,
  updateUser,
  deleteUser,
};
