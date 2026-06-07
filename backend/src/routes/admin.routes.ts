import { Router } from "express";
import {
  getInvestorPortfolioAdmin,
  getProjectOwnerPortfolioAdmin,
  listInvestors,
  listProjectOwners,
} from "../controller/Admin.Controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect, restrictTo("admin"));

router.get("/investors", listInvestors);

router.get("/project-owners", listProjectOwners);

router.get("/investors/:investorId/portfolio", getInvestorPortfolioAdmin);

router.get("/project-owners/:ownerId/portfolio", getProjectOwnerPortfolioAdmin);

export default router;
