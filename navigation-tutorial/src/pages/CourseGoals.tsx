import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  isPlatform,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { MouseEvent, useContext, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditModal from '../components/EditModal';
import EditableGoalItem from '../components/EditableGoalItem';
import CoursesContext from '../data/courses-context';

const CourseGoals: React.FC = () => {
  const [startedDeleting, setStartedDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const coursesCtx = useContext(CoursesContext);

  const slidingOptionRef = useRef<HTMLIonItemSlidingElement>(null);

  const params = useParams<{ courseId: string }>();
  const selectedCourseId = params.courseId;
  const selectedCourse = coursesCtx.courses.find(
    (c) => c.id === selectedCourseId
  );

  const startDeleteGoalHandler = () => {
    setStartedDeleting(true);
  };

  const deleteGoalHandler = () => {
    setStartedDeleting(false);
    setToastMessage('Deleted goal!');
  };

  const startEditGoalHandler = (event: MouseEvent, goalId: string) => {
    event.stopPropagation();
    const goal = selectedCourse?.goals.find((g) => g.id === goalId);
    if (!goal) {
      return;
    }
    slidingOptionRef.current?.closeOpened();
    setIsEditing(true);
    setSelectedGoal(goal);
  };

  const startAddGoalHandler = () => {
    setIsEditing(true);
  };

  const cancelEditGoalHandler = () => {
    setIsEditing(false);
    setSelectedGoal(null);
  };

  const addGoalHandler = (text: string) => {
    coursesCtx.addGoal(selectedCourseId, text);
    setIsEditing(false);
  };

  return (
    <>
      <EditModal
        show={isEditing}
        onCancel={cancelEditGoalHandler}
        editedGoal={selectedGoal}
        onSave={addGoalHandler}
      />
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setToastMessage('')}
      />
      <IonAlert
        isOpen={startedDeleting}
        header='Are you sure?'
        message='Do you want to delete the goal? This cannot be undone.'
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              setStartedDeleting(false);
            },
          },
          {
            text: 'Yes',
            handler: deleteGoalHandler,
          },
        ]}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonBackButton defaultHref='/courses/list' />
            </IonButtons>
            <IonTitle>
              {selectedCourse ? selectedCourse.title : 'No course found!'}
            </IonTitle>
            {!isPlatform('android') && (
              <IonButtons slot='end'>
                <IonButton onClick={startAddGoalHandler}>
                  <IonIcon slot='icon-only' icon={addOutline} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {selectedCourse && (
            <IonList>
              {selectedCourse.goals.map((goal) => (
                <EditableGoalItem
                  key={goal.id}
                  slidingRef={slidingOptionRef}
                  text={goal.text}
                  onStartDelete={startDeleteGoalHandler}
                  onStartEdit={(e) => startEditGoalHandler(e, goal.id)}
                />
              ))}
            </IonList>
          )}
          {isPlatform('android') && (
            <IonFab horizontal='end' vertical='bottom' slot='fixed'>
              <IonFabButton color='secondary' onClick={startAddGoalHandler}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default CourseGoals;
