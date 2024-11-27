import { Elysia } from "elysia";
const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", () => "get all users")
  .get("/:id", (id) => "get user by id")
  .post("/", () => "create new user")
  .put("/:id", () => "update user by id")
  .delete("/:id", () => "delete user by id");

export default userRoutes;
