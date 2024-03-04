import "express-async-errors";
import { Router } from "express";

import authRouter from "./auth.route";
import healthRouter from "./health.route";
import expenseRouter from "./expense.route";
import currenciesRouter from "./currencies.route";
import authMiddleware from "../middleware/auth.middleware";
import profileRouter from "./userProfile.route"

const router = Router();

router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/currencies", currenciesRouter);

// Apply authorization middleware to all routes declared after this point
router.use(authMiddleware.authorizeUser);
router.use("/profile", profileRouter)

router.use("/expenses", expenseRouter);


router.get("/", (_, res) => {
  res.redirect("/api/docs");
});

export default router;
