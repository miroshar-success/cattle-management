import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  console.log(`En test!`);

  return res.send("HOLA EN TEST!");
});

export default router;
