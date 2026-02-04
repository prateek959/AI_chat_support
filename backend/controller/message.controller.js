import { Message } from '../model/message.schema.js';
import { AI } from '../service/gemini.service.js';

const userMessage = async (req, res) => {
    try {
        const { sessionId, message } = req.body;

        const data = Message.aggregate([
            { $match: { sessionId } },
            { $sort: { createdAt: -1 } },
            { $limit: 10 },
            {
                $project: {
                    _id: 0,
                    messages: [
                        { role: "user", content: "$message" },
                        { role: "assistant", content: "$reply" }
                    ]
                }
            }
        ])

        const response = await AI({ message, data });
        await Message.create({
            sessionId,
            message,
            reply: response
        });
        res.status(200).json({ reply: response, sessionId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};


const userHistory = async (req, res) => {
    try {
        const {sessionId} = req.body;

        const data = await Message.aggregate([
            {$match:{sessionId:sessionId}},
            {$sort:{createdAt:1}},
            {
        $project: {
          _id: 0,
          messages: [
            { sender: "user", text: "$message" },
            { sender: "ai", text: "$reply" }
          ]
        },
      },

      { $unwind: "$messages" },
      { $replaceRoot: { newRoot: "$messages" } }


        ]);

        res.status(200).json({data});

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
}


export { userMessage, userHistory };