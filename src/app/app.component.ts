import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {SplashScreenService} from "./core/splash-screen/splash-screen.service";
import {ApiService} from "./services/api/api.service";
import {take} from "rxjs";
import {TableExtendedService, TableService} from "./core/shared/crud-table";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private splashScreenService: SplashScreenService,
    private tableService: TableExtendedService
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && typeof window !== `undefined` && window.document) {

        // clear filtration paginations and others
        this.tableService.setDefaults();

        // scroll to top on every route change
        window.scrollTo({top: 0, behavior: "smooth"});

        // hide splash screen
        this.splashScreenService.hide();

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add('page-loaded');
          // document.body.style.overflowY = 'auto';
        }, 500);
      }
    });
  }

}
