import express from "express";
import { addFilter, getAllFilters } from "../controllers/filters";
import { AddFilterRequest } from "../types";

const router = express.Router();

// Add filter route
router.post("/add_filter", async (req, res) => {
  addFilter(req as AddFilterRequest, res);
});

// Get filters route
router.get("/all_filters", getAllFilters);

export default router;
