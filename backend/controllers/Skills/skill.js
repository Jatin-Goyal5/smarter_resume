const Skill = require('../../models/skill');

module.exports = {
    /**
     * GET user skill
     */
    getSkills: async (req, res) => {
        try {
            if (!req.userData.userId) {
                return res.status(401).json(
                    {
                        status: {
                            code: 401,
                            message: "user Id is not present"
                        },
                    }
                );
            }
            let skill = await Skill.find({ user: req.userData.userId });
            if (skill.length) {
                res.json({
                    status: {
                        message: "successful",
                        code: 200,
                    },
                    data: skill,
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
    * Add user skill
    */
    addSkill: async (req, res) => {
        try {
            const skill = new Skill({
                name: req.body.name,
                rating: req.body.rating === null ? 0 : req.body.rating,
                user: req.userData.userId
            })
            const result = await skill.save();
            console.log(result);
            res.json({
                status: {
                    message: "skill created successfully",
                    code: 201
                },
                data: result
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

    }
}