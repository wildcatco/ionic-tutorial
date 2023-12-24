import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { COURSE_DATA } from './Courses';

const CourseGoals: React.FC = () => {
  const params = useParams<{ courseId: string }>();
  const selectedCourseId = params.courseId;
  const selectedCourse = COURSE_DATA.find((c) => c.id === selectedCourseId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>
            {selectedCourse ? selectedCourse.title : 'No course found!'}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>course goals page!</IonContent>
    </IonPage>
  );
};

export default CourseGoals;
