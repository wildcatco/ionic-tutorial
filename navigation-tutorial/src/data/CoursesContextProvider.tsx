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
      included: true,
    },
  ]);

  const addCourse = (title: string, date: Date) => {
    const newCourse: Course = {
      id: Math.random().toString(),
      title,
      enrolled: date,
      goals: [],
      included: true,
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

    setCourses((curCourse) => {
      const updatedCourses = [...curCourse];
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

  const deleteGoal = (courseId: string, goalId: string) => {
    setCourses((curCourse) => {
      const updatedCourses = [...curCourse];
      const updatedCourseIndex = updatedCourses.findIndex(
        (course) => course.id === courseId
      );
      const updatedCourseGoals = updatedCourses[
        updatedCourseIndex
      ].goals.filter((goal) => goal.id !== goalId);
      const updatedCourse = { ...updatedCourses[updatedCourseIndex] };
      updatedCourse.goals = updatedCourseGoals;
      updatedCourses[updatedCourseIndex] = updatedCourse;
      return updatedCourses;
    });
  };

  const updateGoal = (courseId: string, goalId: string, newText: string) => {
    setCourses((curCourse) => {
      const updatedCourses = [...curCourse];
      const updatedCourseIndex = updatedCourses.findIndex(
        (course) => course.id === courseId
      );
      const updatedCourseGoals =
        updatedCourses[updatedCourseIndex].goals.slice();
      const updatedCourseGoalIndex = updatedCourseGoals.findIndex(
        (goal) => goal.id === goalId
      );
      const updatedGoal = {
        ...updatedCourseGoals[updatedCourseGoalIndex],
        text: newText,
      };
      updatedCourseGoals[updatedCourseGoalIndex] = updatedGoal;
      const updatedCourse = { ...updatedCourses[updatedCourseIndex] };
      updatedCourse.goals = updatedCourseGoals;
      updatedCourses[updatedCourseIndex] = updatedCourse;
      return updatedCourses;
    });
  };

  const changeCourseFilter = (courseId: string, isIncluded: boolean) => {
    setCourses((curCourse) => {
      const updatedCourses = [...curCourse];
      const updatedCourseIndex = updatedCourses.findIndex(
        (course) => course.id === courseId
      );

      const updatedCourse: Course = {
        ...updatedCourses[updatedCourseIndex],
        included: isIncluded,
      };
      updatedCourses[updatedCourseIndex] = updatedCourse;
      return updatedCourses;
    });
  };

  return (
    <CoursesContext.Provider
      value={{
        courses,
        addCourse,
        addGoal,
        deleteGoal,
        updateGoal,
        changeCourseFilter,
      }}
    >
      {props.children}
    </CoursesContext.Provider>
  );
};

export default CoursesContextProvider;
