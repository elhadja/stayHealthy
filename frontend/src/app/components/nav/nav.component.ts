import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { InteractionsService } from '../../services/interactions.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private tools: InteractionsService) {}

  disconnect(): void {
    // clear authorization and profile
    this.tools.reset();
    this.tools.openSnackBar('Déconnecté');
  }

  isLogin(): boolean {
    return this.tools.isDoctorConnected() || this.tools.isPatientConnected();
  }

  getHomePage(): string {
    if (this.tools.isDoctorConnected()) {
      return '/doctor';
    } else if (this.tools.isPatientConnected()) {
      return '/patient';
    } else {
      return '/';
    }
  }
}
