import { Router } from "express";
import { AuthenticateUser } from "../../domain/use_cases/authenticate_user";
import { DbFindUserByUsernameRepository } from "../../infra/database/repositories/find_user_by_username_repository";
import { AppDataSource } from "../../infra/database/data-source";
import { RegisterUser } from "../../domain/use_cases/register_user";
import { DbRegisterUserRepository } from "../../infra/database/repositories/register_user_repository";

const userController = Router();

userController.post("/login", async (req, res) => {
  try {
    const authenticateUser = new AuthenticateUser(
      new DbFindUserByUsernameRepository(AppDataSource)
    );
    const result = await authenticateUser.call(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userController.post("/register", async (req, res) => {
  try {
    const registerUser = new RegisterUser(new DbRegisterUserRepository(AppDataSource));
    const result = await registerUser.call(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default userController;
