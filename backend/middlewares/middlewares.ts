const User = require("../models/user");
const jwt = require("jsonwebtoken");

export const checkAuth = async (req: any, res: any, next: () => any) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      //decoding token
      const decodedToken = jwt.decode(token);
      // finding user to verify is token correct or not,
      const user = await User.findById(decodedToken?.user_id);

      if (!user) {
        return res.status(401).send({
          Success: false,
          message:
            "Heyy man, You have entered wrong token, can you follow login process?",
        });
      }

      //   setting user_id in request to find the user in callback of /checkAuth endpoint or anywhere else.
      req.user_id = decodedToken?.user_id;
      next();
    } else {
      return res
        .status(401)
        .send({ Success: false, message: "Please login first" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
