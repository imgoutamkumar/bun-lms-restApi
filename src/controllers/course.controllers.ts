//import {userSchema} from "../models/course.model";
import { t } from "elysia";
import db from "../models/course.models";
import { AllCourses } from "../models/course.models";
import { successResponse, errorResponse } from "../utils/responseHandler";
export const createCourse = async ({ body }) => {
  try {
    const insertCourse = db
      .prepare(
        "INSERT INTO COURSES (title,description,price,level) VALUES ($title, $description, $price, $level) RETURNING *"
      )
      .get({
        $title: body.title,
        $description: body.description,
        $price: body.price,
        $level: body.level,
      });

    return insertCourse;
  } catch (error: any) {
    throw new Error(`Failed to create course: ${error.message}`);
  }
};

export const createCourseSchema = {
  body: t.Object({
    title: t.String(),
    description: t.String(),
    price: t.Number(),
    level: t.String(),
  }),
};

export const fetchAllCourses = () => {
  return AllCourses();
};

export const getAllCourses = async ({ query }) => {
  try {
    const limit = query.limit;
    const level = query.level;
    const sort = query.sort;
    const page = query.page;
    const offset = (page - 1) * limit;
    console.log(
      `getting list of courses with limit ${limit}, level ${level}, sort ${sort} and page ${page}  `
    );
    const data = await db
      .query(
        "SELECT * FROM courses WHERE (level LIKE $level) ORDER BY $sort ASC LIMIT $limit OFFSET $offset"
      )
      .all({
        $level: level,
        $limit: limit,
        $sort: sort,
        //$page: page,
        $offset: offset,
      });
    return successResponse(data, "List of all the courses");
  } catch (error: any) {
    throw new Error(`Failed to get courses: ${error.message}`);
  }
};

export const getAllCoursesSchema = {
  query: t.Object({
    level: t.String({ default: "%" }),
    limit: t.Numeric({ default: 10 }),
    sort: t.String({ default: "created_at" }),
    page: t.Numeric({ default: 1 }),
  }),
};

export const getCourseById = async ({ params }) => {
  try {
    const course = db.query("SELECT * FROM courses WHERE id=$id").get({
      $id: params.id,
    });
    if (!course) {
      return errorResponse("", `course not found with id: ${params.id}`);
    }
    return course;
  } catch (error: any) {
    throw new Error(`Failed to create course: ${error.message}`);
  }
};

export const getCourseByIdSchema = {
  params: t.Object({ id: t.Numeric() }),
};

export const updateCourseById = async ({ params, body }) => {
  const courseId = parseInt(params.id, 10);

  if (isNaN(courseId)) {
    return { error: "Invalid product ID" };
  }
  try {
    const course = db.query("SELECT * FROM courses WHERE id=$id").get({
      $id: params.id,
    });
    if (course) {
      await db
        .query(
          `UPDATE COURSES SET title = $title, description = $description, price=$price ,level=$level WHERE id = $courseId`
        )
        .run({
          $title: body.title,
          $description: body.description,
          $price: body.price,
          $level: body.level,
        });
      return { message: "Course updated successfully!" };
    }
    return `course not found of id: ${params.id}`;
  } catch (error) {
    console.error(error);
    return { error: "Failed to update course" };
  }
};
export const updateCourseByIdSchema = {
  body: t.Object({
    title: t.String(),
    description: t.String(),
    price: t.Number(),
    level: t.String(),
  }),
  params: t.Object({ id: t.Numeric() }),
};

export const deleteCourseById = async ({ params }) => {
  const response = db.query("DELETE From COURSES WHERE id=$course_id").get({
    $course_id: params.id,
  });
  return response;
};

export const deleteCourseByIdSchema = {
  params: t.Object({ id: t.Numeric() }),
};
