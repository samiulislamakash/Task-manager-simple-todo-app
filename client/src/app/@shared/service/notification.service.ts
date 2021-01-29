import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar) { }

    showPopupSuccess(text) {
        this.snackBar.open(text, '', {
            duration: 5000,
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: "snackbar-success"
        });
    }

    showPopupDanger(text) {
        this.snackBar.open(text, '', {
            duration: 5000,
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: "snackbar-danger"
        });
    }

    showPopupInfo(text) {
        this.snackBar.open(text, '', {
            duration: 5000,
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: "snackbar-info"
        });
    }

    showPopupWarning(text) {
        this.snackBar.open(text, '', {
            duration: 5000,
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: "snackbar-warning"
        });
    }
}