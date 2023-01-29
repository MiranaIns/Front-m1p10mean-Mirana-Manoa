import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {VoituresService} from "../../../../../data/services/voitures/voitures.service";
import {HttpStatusConst} from "../../../../../shared/constant/http-status.const";
import {LocalStorageConst} from "../../../../../shared/constant/local-storage.const";
import {DataRoutingConst} from "../../../../../data/constant/data-routing.const";
import {SnackBarComponent} from "../../../../../shared/components/snack-bar/snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DataErrorConst} from "../../../../../data/constant/data-error.const";
import { VoitureInterface} from "../../../../../data/interfaces/voiture.interface";

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css']
})
export class VoituresComponent implements OnInit {
  voitures : VoitureInterface[] = []

  constructor(
    private _snackBar: MatSnackBar,
    private voituresService: VoituresService
  ) {}

  ngOnInit() {
    this.voituresService.getAllVoitures().subscribe({
      next: res => {
        if(res.status != HttpStatusConst.SUCCESS ){
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        }
        else {
          let data = res.data;
          if(data!=undefined) {
            try {
              // @ts-ignore
              this.voitures = data.voitures;
            }
            catch (e) {
              console.log(e);
              this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
            }
          }
          else {
            this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
          }
        }
      },
        error: () => {
        this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
      },
        complete: () => {}
    })
  }

  openErrorSnackBar(errorMessage: String) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data : {
        message : errorMessage
      },
      duration: 3000,
      verticalPosition : 'bottom',
      horizontalPosition : 'center',
      panelClass : 'error'
    });
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<any, any>) {
    // @ts-ignore
    if (event.previousContainer === event.container) {
      // @ts-ignore
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(event!=undefined) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
      else {
        this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
      }
    }
  }
}
