import { Router } from "express";
const router = Router();

// Product
router.get("/product", (req, res) => {
  res.json({
    hello: "GET status???",
  });
});
router.get("/product/:id", () => {});
router.put("/product/:id", () => {});
router.post("/product", () => {});
router.delete("/product/:id", () => {});

// Update
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.delete("/update/:id", () => {});

// Points
router.get("/update-point", () => {});
// : is a placeholder for a variable
// it is a route parameter
router.get("/update-point/:id", () => {});
router.put("/update-point/:id", () => {});
router.post("/update-point", () => {});
router.delete("/update-point/:id", () => {});

export default router;
