import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

export const COURSE_DATA = [
  { id: 'c1', title: 'Ionic + React - The Practical Guid' },
  { id: 'c2', title: 'React.js - The Complete Guide' },
  { id: 'c3', title: 'Javascript - The Complete Guide' },
];

const Courses: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {COURSE_DATA.map((course) => (
            <IonRow key={course.id}>
              <IonCol sizeMd='4' offsetMd='4'>
                <IonCard>
                  <IonCardContent>
                    <h2 className='ion-text-center'>{course.title}</h2>
                    <IonButton routerLink={`/courses/${course.id}`}>
                      View Course Goals
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Courses;
