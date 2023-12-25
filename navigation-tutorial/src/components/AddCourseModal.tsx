import {
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useRef, useState } from 'react';

const AddCourseModal: React.FC<{
  show: boolean;
  onCancel: () => void;
  onSave: (title: string, date: Date) => void;
}> = (props) => {
  const [error, setError] = useState('');

  const titleRef = useRef<HTMLIonInputElement>(null);
  const dateRef = useRef<HTMLIonDatetimeElement>(null);

  const saveHandler = () => {
    const enteredTitle = titleRef.current!.value;
    const selectedDate = dateRef.current!.value;

    if (
      !enteredTitle ||
      !selectedDate ||
      enteredTitle?.toString().trim().length === 0 ||
      selectedDate.toString().trim().length === 0
    ) {
      setError('Please enter a valid title and select a valid date.');
      return;
    }
    setError('');

    props.onSave(enteredTitle.toString(), new Date(selectedDate.toString()));
  };

  return (
    <IonModal isOpen={props.show}>
      <IonModal trigger='open-modal' keepContentsMounted showBackdrop>
        <IonDatetime
          ref={dateRef}
          id='datetime'
          presentation='date'
          preferWheel
          value={new Date().toISOString()}
        />
      </IonModal>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Course</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  ref={titleRef}
                  type='text'
                  label='Course Title'
                  labelPlacement='floating'
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem id='open-modal'>
                <IonLabel>Enrolment Date</IonLabel>
                <IonDatetimeButton datetime='datetime' />
              </IonItem>
            </IonCol>
          </IonRow>
          {error && (
            <IonRow className='ion-text-center'>
              <IonCol>
                <IonText color='danger'>
                  <p>{error}</p>
                </IonText>
              </IonCol>
            </IonRow>
          )}
          <IonRow className='ion-text-center'>
            <IonCol>
              <IonButton fill='clear' onClick={props.onCancel}>
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton color='secondary' expand='block' onClick={saveHandler}>
                Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default AddCourseModal;
