import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';

import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-centrocupones',
  templateUrl: 'centrocupones.html',
})
export class CentrocuponesPage {

  constructor(public navCtrl: NavController, private DomSanitizer: DomSanitizer,public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController,public events: Events, public apiProvider: ApiProvider, public alertCtrl: AlertController) {

    this.latitudePerson =0;
  this.longitudePerson=0;
this.idCuponActivo=0;
this.favoritos=[];

  }

  ionViewDidLoad() {

  	this.idCuponActivo = this.navParams.get('idCupon');
    this.apiProvider.verificarLogin()
    .then(data => { 
      console.log(data);
      if(data){
      this.dataUser = data;
      }
      else{
      console.log('error');
      } 
      this.getCC();
     });
  }



      getServiciosGPS(){
       /*
          this.latitudePerson = 9.9931605;
          this.longitudePerson = -84.2307427;
      */

    let loading = this.loadingCtrl.create({content : "Obteniendo ubicacion",enableBackdropDismiss: false});
    loading.present();

      console.log('gps');
        navigator.geolocation.getCurrentPosition((pos) => {

          console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
          this.latitudePerson = pos.coords.latitude;
          this.longitudePerson = pos.coords.longitude;
          loading.dismiss();
     


        }, function(error) {
          console.log('some err');
          console.log(error);
          loading.dismiss();
        },{ enableHighAccuracy: true, timeout: 30000 });

   
      }




  getCC() {
	let dataE = {idCupon:this.idCuponActivo};
      console.log(dataE);
        this.apiProvider.getCC(dataE)
      .then(data => {
       console.log(data);
              if(data){

         this.favoritos = data || [];
       }
       else{
       console.log('Ha ocurrido un error');
       this.reintentarAlert(this.getCC.bind(this));
       }

       
      });
  }
  reintentarAlert(funcionEnviar){

    var mensaje = `<div>  
                      <p>No hemos podido conectar. 
                      Verifica tu conexión a Internet para continuar</p>
                      
                   <div>`;
    let alert = this.alertCtrl.create({
      title: 'Error de conexión',
      subTitle: this.DomSanitizer.bypassSecurityTrustHtml(mensaje),
       buttons: [
 
           {
        text: 'Reintentar',
        handler: () => {
          funcionEnviar();
        }
      },
    ],
      enableBackdropDismiss: false
    });
    alert.present();

  }
  filtroCategoria() {
    //console.log('ionViewDidLoad FavoritosPage');
     this.showCheckbox();
  }

  showCheckbox() {
    let alert = this.alertCtrl.create({ cssClass: 'alertCustomCss'});
    alert.setTitle('Filtra por categoria');

    alert.addInput({
      type: 'checkbox',
      label: 'Rostro y Cuerpo',
      value: 'Rostro y Cuerpo',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Peluqueria',
      value: 'Peluqueria'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Uñas',
      value: 'Uñas'
    });



    alert.addInput({
      type: 'checkbox',
      label: 'Masaje',
      value: 'Masaje',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Depilacion',
      value: 'Depilacion'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Bienestar',
      value: 'Bienestar'
    });



    alert.addInput({
      type: 'checkbox',
      label: 'Paquetes',
      value: 'Paquetes',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Ofertas',
      value: 'Ofertas'
    });





    alert.addButton('Cancel');
    alert.addButton({
      text: 'Seleccionar',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
  }


    goCentro(idCentro) {
    // this.navCtrl.push('PerfilCentroPage');  
     //  this.navCtrl.push('PerfilCentroPage', {'idCentro':idCentro, 'idServicioSeleccionado':this.categoriaSeleccionada});

         this.navCtrl.push('PerfilCentroPage', {'idCentro':idCentro, 'idServicioSeleccionado':0});


      }
  

}
