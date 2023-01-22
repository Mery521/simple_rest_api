const db = require("../../models");
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require("apollo-server");
const {secret} = require("../../config");

const generateAccessToken = (id) => {
    const payload = {id}
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

module.exports = {
    Query: {
        users: async () => {
          try {
            let user = await User.find();
            if (!user) throw new UserInputError("User not found");
            return user;
          } catch (err) {
            console.log(err);
          }
        },
    },
    Mutation: {
        signup: async (_, args) => {
            let { firstname, lastname, password, email } = args;
            try {
                if (!firstname || !lastname || !email || !password) {
                    return 'Please provide valid credentials';
                }
                const hashPassword = bcrypt.hash(password, 8);
                const user = new User({
                    firstname,
                    lastname,
                    email,
                    password: hashPassword,
                });
                const res = await user.save();
                return res;
            } catch (err) {
                console.log(err);
            }
        },
        login: async (_, args) => {
            const { email, password } = args;
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new err("User not found");
                }
                const validPassword = await bcrypt.compare(password, user.password);
                if (!validPassword) {
                    throw new UserInputError("Password is incorrect");
                }
                const token = generateAccessToken(user.id);
                return {...user.toJSON(), token};

            } catch (err) {
                console.log(err);
            }
        }
    }
};