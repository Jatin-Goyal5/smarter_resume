const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    /**
     * Login Controller
     */
    login: async (req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const isValid = await bcrypt.compare(req.body.password, user.password);
                if (isValid) {
                    const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_KEY, { expiresIn: "1h" })
                    return res.json({
                        status: {
                            message: "login successful",
                            code: 200
                        },
                        data: {
                            token: token,
                            expiresIn: 3600,
                            userId: user._id
                        }
                    })
                } else {
                    return res.status(401).json({
                        status: {
                            message: "Auth Failed",
                            code: 401
                        }
                    })
                }
            } else {
                return res.status(401).json({
                    status: {
                        message: "user not present",
                        code: 401
                    }
                })
            }
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({
                status: {
                    error: e,
                    message: e.message,
                    code: 500
                }
            })
        }

    },

    /**
     * Signup Controller
     */
    signup: async (req, res, next) => {
        try {
            const hash = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                email: req.body.email,
                password: hash,
            })
            const result = await user.save();
            console.log(result);
            const token = jwt.sign({ email: result.email, userId: result._id }, process.env.JWT_KEY, { expiresIn: "1h" })
            return res.json({
                status: {
                    message: "signup successful",
                    code: 200
                },
                data: {
                    token: token,
                    expiresIn: 3600,
                    userId: result._id
                }
            })


        } catch (e) {
            console.log(e.message);
            res.status(500).json({
                status: {
                    error: e,
                    message: e.message,
                    code: 500
                }
            })

        }

    },

    /**
    * Get User
    */
    getUser: async (req, res) => {
        try {
            if (req.userData == null || req.userData == undefined) {
                return res.json(
                    {
                        status: {
                            code: 401,
                            message: "Auth Failed"
                        },
                    }
                );
            }
            let response = await User.findOne({ _id: req.userData.userId });
            console.log("response", response);
            if (response) {
                res.json({
                    status: {
                        message: "successful",
                        code: 200,
                    },
                    data: response,
                });
            } else {
                res.json({
                    status: {
                        message: "successful",
                        code: 200,
                    },
                    data: [],
                });
            }
        } catch (err) {
            console.log(err.message);
            res.json(
                {
                    status: {
                        code: 401,
                        message: err.message
                    },
                }
            );
        }
    },

    /**
      * Update Controller
      */
    updateUser: async (req, res, next) => {
        let updateObj = {};
        for (let i in req.body) {
            if (req.body[i].length)
                updateObj[i] = req.body[i];
        }

        updateObj = {
            ...updateObj,
            _id: req.userData.userId
        }
        console.log(updateObj);
        const user = new User(updateObj);
        console.log(user);

        let response = await User.updateOne({ _id: req.userData.userId }, user);
        if (response) {
            // console.log(user);
            res.status(201).json({
                status: {
                    code: 201,
                    message: "successful",
                },
                data: response
            })
        } else {
            res.status(203).json({
                status: {
                    code: 203,
                    message: "unable to data",
                }

            })
        }
    },

    /**
      * Dellete Controller
      */
    deleteUser: async (req, res, next) => { }
}