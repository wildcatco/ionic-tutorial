import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from '@ionic/react';
import { create, trash } from 'ionicons/icons';
import { MouseEvent } from 'react';

const EditableGoalItem: React.FC<{
  slidingRef: React.Ref<HTMLIonItemSlidingElement>;
  onStartDelete: () => void;
  onStartEdit: (e: MouseEvent) => void;
  text: string;
}> = (props) => {
  return (
    <IonItemSliding ref={props.slidingRef}>
      <IonItemOptions side='start'>
        <IonItemOption onClick={props.onStartDelete} color='danger'>
          <IonIcon slot='icon-only' icon={trash} color='light' />
        </IonItemOption>
      </IonItemOptions>
      <IonItem lines='full'>
        <IonLabel>{props.text}</IonLabel>
      </IonItem>
      <IonItemOptions side='end'>
        <IonItemOption onClick={props.onStartEdit}>
          <IonIcon slot='icon-only' icon={create} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default EditableGoalItem;
