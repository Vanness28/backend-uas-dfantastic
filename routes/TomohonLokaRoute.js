import express from "express";
import {
  getTomohonLokas,
  getTomohonLokaById,
  updateTomohonLoka,
  deleteTomohonLoka,
  createTomohonLoka,
  getDestinasi,
  getRestoran,
} from "../controllers/TomohonLoka.js";

const router = express.Router();

router.get("/tomohonlokas", getTomohonLokas);
router.get("/tomohonloka/:id", getTomohonLokaById);
router.post("/tomohonloka", createTomohonLoka);
router.patch("/tomohonloka/:id", updateTomohonLoka);
router.delete("/tomohonloka/:id", deleteTomohonLoka);
router.get("/destinasis", getDestinasi);
router.get("/restorans", getRestoran);

export default router;
