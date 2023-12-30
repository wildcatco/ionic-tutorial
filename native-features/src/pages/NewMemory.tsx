import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { camera } from 'ionicons/icons';
import './NewMemory.css';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { useContext, useRef, useState } from 'react';
import MemoriesContext from '../data/memories-context';
import { useHistory } from 'react-router-dom';
import { base64FromPath } from '../utils/base64FromPath';

const NewMemory: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string;
    preview: string;
  }>();
  const [chosenMemoryType, setChosenMemoryType] = useState<'good' | 'bad'>(
    'good'
  );

  const memoriesCtx = useContext(MemoriesContext);

  const titleRef = useRef<HTMLIonInputElement>(null);

  const history = useHistory();

  const selectMemoryTypeHandler = (event: CustomEvent) => {
    const selectedMemoryType = event.detail.value;
    setChosenMemoryType(selectedMemoryType);
  };

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500,
    });

    if (!photo || !photo.path || !photo.webPath) {
      return;
    }

    setTakenPhoto({
      path: photo.path,
      preview: photo.webPath,
    });
  };

  const addMemoryHandler = async () => {
    const enteredTitle = titleRef.current?.value;

    if (
      !enteredTitle ||
      enteredTitle.toString().trim().length === 0 ||
      !takenPhoto
    ) {
      return;
    }

    const fileName = new Date().getTime() + '.jpeg';
    const base64Data = await base64FromPath(takenPhoto.preview);
    Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    memoriesCtx.addMemory(
      fileName,
      base64Data,
      enteredTitle.toString(),
      chosenMemoryType
    );

    history.length > 0 ? history.goBack() : history.replace('/good-memories');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/good-memories' />
          </IonButtons>
          <IonTitle>Add New Memory</IonTitle>
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
                  label='Memory Title'
                  labelPlacement='floating'
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className='ion-text-center'>
            <IonCol>
              <div className='image-preview'>
                {!takenPhoto && <h3>No photo chosen.</h3>}
                {takenPhoto && <img src={takenPhoto.preview} alt='Preview' />}
              </div>
              <IonButton fill='clear' onClick={takePhotoHandler}>
                <IonIcon icon={camera} slot='start' />
                <IonLabel>Take Photo</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonSelect
                onIonChange={selectMemoryTypeHandler}
                value={chosenMemoryType}
              >
                <IonSelectOption value='good'>Good Memory</IonSelectOption>
                <IonSelectOption value='bad'>Bad Memory</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow className='ion-margin-top'>
            <IonCol className='ion-text-center'>
              <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NewMemory;
