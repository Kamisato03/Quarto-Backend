import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("Conectado a la base de datos de MongoDB ok");
} catch (error) {
  console.log("Error de conexión a mongodb: " + error);
}
