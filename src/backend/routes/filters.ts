import express from "express";
import { addFilter, getAllFilters } from "../controllers/filters";

const router = express.Router();

// Add filter route
router.post("/add_filter", addFilter);

// Get filters route
router.get("/all_filters", getAllFilters);

export default router;