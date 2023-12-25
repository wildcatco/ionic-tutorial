import { useState } from 'react';
import CoursesContext, { Course, Goal } from './courses-context';

const CoursesContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 'c1',
      title: 'Ionic + React - The Practical Guid',
      enrolled: new Date(),
      goals: [
        { id: 'c1g1', text: 'Finish the course!' },
        { id: 'c1g2', text: 'Learn a lot!' },
      ],
    },
  ]);

  const addCourse = (title: string, date: Date) => {
    const newCourse: Course = {
      id: Math.random().toString(),
      title,
      enrolled: date,
      goals: [],
    };

    setCourses((curCourses) => {
      return curCourses.concat(newCourse);
    });
  };

  const addGoal = (courseId: string, text: string) => {
    const newGoal: Goal = {
      id: Math.random().toString(),
      text,
    };

    setCourses((courses) => {
      const updatedCourses = [...courses];
      const updatedCourseIndex = updatedCourses.findIndex(
        (course) => course.id === courseId
      );
      const updatedCourseGoals =
        updatedCourses[updatedCourseIndex].goals.concat(newGoal);
      const updatedCourse = updatedCourses[updatedCourseIndex];
      updatedCourse.goals = updatedCourseGoals;
      updatedCourses[updatedCourseIndex] = updatedCourse;
      return updatedCourses;
    });
  };

  const deleteGoal = () => {};

  const updateGoal = () => {};

  return (
    <CoursesContext.Provider
      value={{ courses, addCourse, addGoal, deleteGoal, updateGoal }}
    >
      {props.children}
    </CoursesContext.Provider>
  );
};

export default CoursesContextProvider;
