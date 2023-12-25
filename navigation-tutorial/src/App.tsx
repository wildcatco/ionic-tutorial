import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, options } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import CourseTabs from './pages/CourseTabs';
import Filter from './pages/Filter';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import './theme/theme.css';
import './theme/variables.css';
import SideDrawer from './components/SideDrawer';
import CoursesContextProvider from './data/CoursesContextProvider';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <SideDrawer />
      <CoursesContextProvider>
        <IonRouterOutlet id='main'>
          <Route path='/filter'>
            <Filter />
          </Route>
          <Route path='/courses'>
            <CourseTabs />
          </Route>
          <Redirect path='/' to='/courses' exact />
        </IonRouterOutlet>
      </CoursesContextProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
