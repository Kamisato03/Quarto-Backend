import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const expiresIn = 60 * 60;
  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 86400;
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
      sameSite: process.env.MODO === "developer" ? "Strict" : "None", //cuando se deploya la app.
    });
  } catch (error) {
    console.log(error);
  }
};

export const tokenVerificationErrors = {
  "invalid signature": "La firma del jwt no es valida",
  "jwt expired": "JWT expirado",
  "invalid token": "Token no valido",
  "No Beaver": "Utiliza formato Beaver",
  "jwt malformed": "JWT formato no valido",
  Unauthorized: "acceso no autorizado",
};
