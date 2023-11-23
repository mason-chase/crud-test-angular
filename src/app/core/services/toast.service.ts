import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ToastPopupService {

    constructor(private _snackBar: MatSnackBar) { }

    public onErrorMessage(message: string) {
        this._snackBar.open(
            message, undefined, {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ["mat-snack-bar-container-danger"]
        }
        )
    }
    public onSuccessMessage(message: string) {
        this._snackBar.open(
            message, undefined, {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ["mat-snack-bar-container-success"]
        }
        )
    }
}
