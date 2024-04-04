const jwt = require("jsonwebtoken");

export const checkAuth = async (req: any, res: any,next:() => any) => {
  try {
    const token = req?.cookies?.token;

    if (token) {
      //decoding token
      const decodedToken = jwt.decode(token);

      //   setting user_id in request to find the user in callback of /checkAuth endpoint.
      req.user_id = decodedToken?.user_id;
      next();
    }
    else {
      return res.status(200).send({ Success: false });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
