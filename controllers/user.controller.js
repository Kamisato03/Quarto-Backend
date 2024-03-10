import { User } from "../models/user.js";
import {generateRefreshToken,generateToken} from "../utils/tokenManager.js"
import { uploadFile } from "./s3.controller.js";

export const register = async (req, res) => {
  const { name, phone, email, password, image } = req.body;
  try {
    //alternativa de validacion por email
    let user = await User.findOne({ email });

    if (user) throw { code: 11000 };

    user = new User({ name, phone, email, password, image });
    await user.save();

    //jwt token
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.status(201).json({ token, expiresIn, user });
  } catch (error) {
    console.log(error);
    //alternativa por defecto mongoose
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Ya existe este correo de usuario" });
    }
    return res.status(500).json({ errorSever: "Error del servidor", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ error: "No existe el usuario con ese correo" });

    const resPassword = await user.comparePassword(password);
    if (!resPassword)
      return res.status(403).json({ error: "password incorrecta" });

    //generar jwt token
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.json({ token, expiresIn, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorSever: "Error del servidor", error });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const user = await User.findById(req.uid);
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorSever: "Error del servidor", error });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};


//Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, password } = req.body;

    const user = await User.findById(id);

    let updUser;

    if (!user) {
      return res.status(404).json({ error: "No existe el usuario" });
    }

    if (req.files && req.files["image"]) {
      const result = await uploadFile(req.files["image"]);

      updUser = {
        name,
        phone,
        email,
        password, 
        image: result.objectUrl,
        fileName: result.fileName,
      };
    } else {
      updUser = {
        name,
        phone,
        email,
        password, 
      };
    }

    for (const key in updUser) {
      if (Object.prototype.hasOwnProperty.call(updUser, key)) {
        user[key] = updUser[key];
      }
    }

    const updatedUser = await user.save();
    return res.status(200).json({
      msg: "Usuario actualizado con éxito",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ errorSever: "Error de servidor", error });
  }
};