import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useContext, useState } from 'react';
import AddCourseModal from '../components/AddCourseModal';
import CourseItem from '../components/CourseItem';
import CoursesContext from '../data/courses-context';

export const COURSE_DATA = [
  {
    id: 'c1',
    title: 'Ionic + React - The Practical Guid',
    enrolled: new Date('03/22/2019'),
    goals: [
      { id: 'c1g1', text: 'Finish the course!' },
      { id: 'c1g2', text: 'Learn a lot!' },
    ],
  },
  {
    id: 'c2',
    title: 'React.js - The Complete Guide',
    enrolled: new Date('03/24/2019'),
    goals: [
      { id: 'c2g1', text: 'Finish the course!' },
      { id: 'c2g2', text: 'Learn a lot!' },
    ],
  },
  {
    id: 'c3',
    title: 'Javascript - The Complete Guide',
    enrolled: new Date('03/30/2019'),
    goals: [
      { id: 'c3g1', text: 'Finish the course!' },
      { id: 'c3g2', text: 'Learn a lot!' },
    ],
  },
];

const Courses: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);

  const coursesCtx = useContext(CoursesContext);

  const startAddCourseHandler = () => {
    setIsAdding(true);
  };

  const cancelAddCourseHandler = () => {
    setIsAdding(false);
  };

  const courseAddHandler = (title: string, date: Date) => {
    coursesCtx.addCourse(title, date);
    setIsAdding(false);
  };

  return (
    <>
      <AddCourseModal
        show={isAdding}
        onCancel={cancelAddCourseHandler}
        onSave={courseAddHandler}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Courses</IonTitle>
            {!isPlatform('android') && (
              <IonButtons slot='end'>
                <IonButton onClick={startAddCourseHandler}>
                  <IonIcon slot='icon-only' icon={addOutline} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            {coursesCtx.courses.map((course) => (
              <IonRow key={course.id}>
                <IonCol sizeMd='4' offsetMd='4'>
                  <CourseItem
                    id={course.id}
                    title={course.title}
                    enrolmentDate={course.enrolled}
                  />
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
          {isPlatform('android') && (
            <IonFab horizontal='end' vertical='bottom' slot='fixed'>
              <IonFabButton color='secondary' onClick={startAddCourseHandler}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Courses;
