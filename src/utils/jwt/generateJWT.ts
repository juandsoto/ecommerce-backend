const jwt = require("jsonwebtoken");

export const generateJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      },
      (err: any, token: string) => {
        if (err) {
          reject("Authentication error, try again later");
        } else {
          resolve(token);
        }
      }
    );
  });
};
