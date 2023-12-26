import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import { useContext } from 'react';
import CoursesContext from '../data/courses-context';

const Filter: React.FC = () => {
  const coursesCtx = useContext(CoursesContext);

  const courseFilterChangeHandler = (event: CustomEvent) => {
    coursesCtx.changeCourseFilter(event.detail.value, event.detail.checked);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Filter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {coursesCtx.courses.map((course) => (
            <IonItem key={course.id}>
              <IonToggle
                value={course.id}
                onIonChange={courseFilterChangeHandler}
                checked={course.included}
              >
                {course.title}
              </IonToggle>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Filter;
