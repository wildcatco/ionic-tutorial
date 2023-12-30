import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useContext } from 'react';
import MemoriesContext from '../data/memories-context';

const GoodMemories: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext);

  const goodMemories = memoriesCtx.memories.filter(
    (memory) => memory.type === 'good'
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Good Memories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {goodMemories.length === 0 && (
            <IonRow>
              <IonCol className='ion-text-center'>
                <h2>No good memories found.</h2>
              </IonCol>
            </IonRow>
          )}
          {goodMemories.map((memory) => (
            <IonRow key={memory.id}>
              <IonCol>
                <IonCard>
                  <img src={memory.base64Url} alt={memory.title} />
                  <IonCardHeader>
                    <IonCardTitle>{memory.title}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
        <IonFab horizontal='end' vertical='bottom' slot='fixed'>
          <IonFabButton routerLink='/new-memory'>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default GoodMemories;
