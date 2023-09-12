import express, { Request, Response, NextFunction } from "express";
import {
  changePassword,
  login,
  passwordRecovery,
  refreshToken,
  register,
} from "../controllers/authController";
import passport from "passport";

const router = express.Router();

// GET /auth/login
router.post("/login", login);

// POST /auth/register
router.post("/register", register);

// POST /auth/password-recovery
router.post("/password-recovery", passwordRecovery);

// POST /auth/change-password
router.post("/change-password", changePassword);

// POST /auth/refresh-token
router.post("/refresh-token", refreshToken);

// GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

// GET /auth/logout
router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout({}, () => {
    res.redirect("/");
  });
});

export default router;
