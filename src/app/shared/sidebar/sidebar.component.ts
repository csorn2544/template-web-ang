import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  currentPath: string = "";

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    router.events.subscribe((state) => {
      if (state instanceof NavigationEnd) {
        this.currentPath = state.url?.split("/")?.[1] ?? "";
      }
    });
  }

  ngOnInit(): void {
  }
}
