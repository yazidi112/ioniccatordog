import  { IonButtons, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar,   IonButton, IonText, IonIcon } from '@ionic/react';
import axios from 'axios';
import React from 'react';
 
import './Page.css';
import { useCamera, availableFeatures } from '@capacitor-community/react-hooks/camera';
import { CameraResultType } from "@capacitor/core";
import { home, search } from 'ionicons/icons';



const Page: React.FC = () => {


  const { photo, getPhoto} = useCamera();
  const [showLoading, setShowLoading] = React.useState(false);

  const [result,setResult] = React.useState('')
  
  const handleTakePhoto = () => {
    if(availableFeatures.getPhoto) {
      getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      })
    }
  }

  const onImageUpload = () => {
        
    if (photo) {       
      setShowLoading(true) 
      axios.get('http://127.0.0.1:5000?image='+photo.dataUrl).then(
        res =>{
            setResult(res.data)
            setShowLoading(false) 
        }) 
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon icon={home}></IonIcon>
          </IonButtons>
          <IonTitle>Coovid 19 Prediction</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      <IonLoading
        cssClass='my-custom-class'
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Merci de patienter un peu...'}
      />
      {availableFeatures.getPhoto ? (
          <div>
            <div><IonButton expand="full"  onClick={handleTakePhoto}>Prendre une photo</IonButton></div>
            <div>{photo && <img alt="" src={photo.dataUrl} />}</div>
      <div>{photo && <IonButton expand="full"  onClick={onImageUpload}>Prédire</IonButton>}</div>
          </div>
        ) : <div>Camera not available on this platform</div>}
        {result && <IonText>Résultat de prédiction: <strong>{result}</strong></IonText> }
      </IonContent>
    </IonPage>
  );
};

export default Page;
