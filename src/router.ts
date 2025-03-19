import { Router } from "express";

const router = Router();

router.get("/status", async (req, res, next) => {
  try {
    res.json({ message: "OK" })
  } catch (error) {
    next(error)
  }
})

export { router }