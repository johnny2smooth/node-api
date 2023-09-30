import { Router } from "express";
const router = Router();

// Product
router.get("/product", (req, res) => {
  res.json({
    hello: "You're valid af",
  });
});
router.get("/product/:id-:name", (req, res) => {
  console.log(req.params);
  res.json(req.params);
});
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

router.get("/testing/:firstName-:lastName", (req, res) => {
  const { firstName, lastName } = req.params;
});

export default router;
