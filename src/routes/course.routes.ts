import { Elysia, t } from "elysia";
import {
  createCourse,
  getAllCourses,
  updateCourseById,
  deleteCourseById,
  getCourseById,
  getAllCoursesSchema,
  createCourseSchema,
  getCourseByIdSchema,
  updateCourseByIdSchema,
  deleteCourseByIdSchema,
  fetchAllCourses,
} from "../controllers/course.controllers";

const courseRoutes = new Elysia({ prefix: "/courses" })
  .get("/allCourses", () => fetchAllCourses)
  .get("/", ({ query }) => getAllCourses({ query }), getAllCoursesSchema)
  .post("/", ({ body }) => createCourse({ body }), createCourseSchema)
  .get("/:id", ({ params }) => getCourseById({ params }), getCourseByIdSchema)
  .put(
    "/:id",
    ({ params, body }) => updateCourseById({ params, body }),
    updateCourseByIdSchema
  )
  .delete(
    "/:id",
    ({ params }) => deleteCourseById({ params }),
    deleteCourseByIdSchema
  );
export default courseRoutes;
