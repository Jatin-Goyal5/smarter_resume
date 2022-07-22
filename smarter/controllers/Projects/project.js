const Project = require('../../models/project')

module.exports = {
    /**
     * 
     * Get Users Project
     */
    getProjects: async (req, res) => {
        try {
            let project = await Project.find({ user: req.userData.userId });
            if (project.length) {
                res.json({
                    status: {
                        message: "successful",
                        code: 200,
                    },
                    data: project,
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
     * Add Users Project
     */
    addProject: async (req, res) => {
        try {
            const project = new Project({
                title: req.body.title,
                description: req.body.description,
                user: req.userData.userId,
                skills: req.body.skills,
            })
            console.log(req.body.skills);
            const result = await project.save();
            res.json({
                status: {
                    message: "project created successfully",
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