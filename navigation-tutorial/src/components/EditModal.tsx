import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useRef, useState } from 'react';

const EditModal: React.FC<{
  show: boolean;
  onCancel: () => void;
  editedGoal: { id: string; text: string } | null;
  onSave: (goalText: string) => void;
}> = (props) => {
  const [error, setError] = useState('');
  const textRef = useRef<HTMLIonInputElement>(null);

  const saveHandler = () => {
    const enteredText = textRef.current!.value;

    if (!enteredText || enteredText.toString().trim().length === 0) {
      setError('Please enter a valid text.');
      return;
    }

    props.onSave(enteredText.toString());
    setError('');
  };

  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.editedGoal ? 'Edit' : 'Add'} Goal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  ref={textRef}
                  type='text'
                  label='Your Goal'
                  labelPlacement='floating'
                  value={props.editedGoal?.text}
                />
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

export default EditModal;
