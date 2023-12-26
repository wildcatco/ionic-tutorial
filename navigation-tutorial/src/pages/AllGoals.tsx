import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useContext } from 'react';
import CoursesContext from '../data/courses-context';

const AllGoals: React.FC = () => {
  const coursesCtx = useContext(CoursesContext);
  const goals = coursesCtx.courses
    .filter((course) => course.included)
    .flatMap((course) =>
      course.goals.map((goal) => ({ ...goal, courseTitle: course.title }))
    );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>All Goals</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {goals.length === 0 && (
          <h2 className='ion-text-center'>No goals found!</h2>
        )}
        {goals.length > 0 && (
          <IonList>
            {goals.map((goal) => (
              <IonItem key={goal.id}>
                <IonLabel>
                  <h2>{goal.text}</h2>
                  <p>{goal.courseTitle}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AllGoals;
