import express from "express";
import {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/Place.js";

const router = express.Router();

router.get("/places", getPlaces);
router.get("/place/:id", getPlaceById);
router.post("/place", createPlace);
router.patch("/place/:id", updatePlace);
router.delete("/place/:id", deletePlace);

export default router;
