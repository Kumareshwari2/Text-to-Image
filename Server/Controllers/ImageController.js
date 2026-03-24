import userModel from "../models/UserModel.js";
import FormData from "form-data";
import axios from "axios";

const generateImage = async (req, res) => {
    try {
        const userId = req.userId;
        const { prompt } = req.body;

        // 🔹 Validate input
        if (!userId || !prompt) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // 🔹 Find user
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // 🔹 Check credits
        if (user.creditBalance <= 0) {
            return res.json({
                success: false,
                message: "No Credit Balance",
                creditBalance: user.creditBalance,
            });
        }

        // 🔹 Prepare form data
        const formData = new FormData();
        formData.append("prompt", prompt);

        // 🔹 Call ClipDrop API
        const { data } = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            formData,
            {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API,
                    ...formData.getHeaders(), // ✅ important fix
                },
                responseType: "arraybuffer",
            }
        );

        // 🔹 Convert image to base64
        const base64Image = Buffer.from(data, "binary").toString("base64");
        const resultImage = `data:image/png;base64,${base64Image}`; // ✅ fixed (no space)

        // 🔹 Safely update credits
        const updatedUser = await userModel.findByIdAndUpdate(
            user._id,
            { $inc: { creditBalance: -1 } },
            { new: true }
        );

        // 🔹 Send response
        res.json({
            success: true,
            message: "Image Generated",
            creditBalance: updatedUser.creditBalance,
            resultImage,
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default generateImage;