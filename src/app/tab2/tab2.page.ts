import {Component, OnInit} from '@angular/core';
import {PhotoService, UserPhoto} from '../services/photo.service';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(
    private photoService: PhotoService,
    private actionSheetController: ActionSheetController
  ) {
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  public async showActionSheet(photo: UserPhoto, index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: ()=>{
          this.photoService.deletePicture(photo, index);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: ()=>{

        }
      }

      ]
    });

    await actionSheet.present();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
