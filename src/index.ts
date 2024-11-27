import { Elysia, t } from "elysia";
import { createDb } from "./db/db";
import { faker } from "@faker-js/faker";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import dotenv from "dotenv";
import courseRoutes from "./routes/course.routes";
// Load environment variables from .env file
dotenv.config();
const app = new Elysia()
  .use(swagger())
  .use(cors())
  .decorate("db", createDb())
  .get("/", () => "Hello Elysia")
  .use(courseRoutes)
  /*   .post("/seed", ({ db }): string => {
    console.log("Seeding database with test data");
    const insertCourse = db.prepare(
      "INSERT INTO COURSES (name,course_no,description) VALUES ($name, $course_no, $description) RETURNING *"
    );
    for (let i = 0; i < 50; i++) {
      const insertedCourse = insertCourse.get({
        $name: faker.person.fullName(),
        $course_no: faker.string.uuid(),
        $description: faker.lorem.text(),
      });
      console.log(`Inserted product ${insertedCourse}`);
    }
    return "done";
  })
  .get(
    "/courses",
    ({ db, query }) => {
      const limit = query.limit;
      console.log(`getting list of courses with limit ${limit} `);
      return db
        .query("SELECT * FROM courses order by created_at desc LIMIT $limit")
        .all({
          $limit: limit,
        });
    },
    {
      query: t.Object({
        limit: t.Numeric(),
      }),
    }
  )
  .get(
    "/course/:id",
    ({ db, params }) => {
      return db.query("SELECT * FROM courses WHERE course_id=$course_id").get({
        $course_id: params.id,
      });
    },
    {
      params: t.Object({ id: t.Numeric() }),
    }
  )
  .post(
    "/courses",
    ({ db, body }) => {
      const insertCourse = db.prepare(
        "INSERT INTO COURSES (name,course_no,description) VALUES ($name, $course_no, $description) RETURNING *"
      );
      return insertCourse.get({
        $name: body.name,
        $course_no: body.course_no,
        $description: body.description,
      });
    },
    {
      body: t.Object({
        name: t.String(),
        course_no: t.String(),
        description: t.String(),
      }),
    }
  )
  .put(
    "/course/:id",
    async ({ db, body, params }) => {
      const courseId = parseInt(params.id, 10); // Ensure id is parsed as integer

      if (isNaN(courseId)) {
        return { error: "Invalid product ID" };
      }
      try {
        await db
          .query(
            `UPDATE COURSES SET name = $name, course_no =  $course_no, description = $description WHERE course_id = $courseId`
          )
          .run({
            $name: body.name,
            $course_no: body.course_no,
            $description: body.description,
            $courseId: courseId,
          });
        return { message: "Course updated successfully!" };
      } catch (error) {
        console.error(error);
        return { error: "Failed to update course" };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        course_no: t.String(),
        description: t.String(),
      }),
    }
  )
  .delete(
    "/course/:id",
    ({ db, params }) => {
      return db.query("DELETE From COURSES WHERE course_id=$course_id").get({
        $course_id: params.id,
      });
    },
    {
      params: t.Object({ id: t.Numeric() }),
    }
  ) */
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// app.use(userRoutes);
// app.use(courseRoutes);
