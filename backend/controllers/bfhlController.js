const { graphProcessor } = require("../utils/graphProcessor");

const processGraph = (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                message: "data should be an array"
            });
        }

        const result = graphProcessor(data);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {processGraph};