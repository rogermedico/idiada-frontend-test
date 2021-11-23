import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenavContent } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('sidenav') sidenav!: ElementRef;
  @ViewChild('sidenavContent') sidenavContent!: MatSidenavContent;

  public title: string = 'idiada-exercice-frontend-angular-v12';
  public theme!: string;
  public sidenavOpened!: boolean;
  public sidenavMode!: MatDrawerMode;
  public sidenavMarginTop!: number;
  public sidenavDisableClose!: boolean;

  public XSmallBreakpointSubscriber!: Subscription;
  public smallBreakpointSubscriber!: Subscription;
  public largeBreakpointSubscriber!: Subscription;

  constructor(
    public themeService: ThemeService,
    private bpo: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.theme = this.themeService.initTheme();

    this.XSmallBreakpointSubscriber = this.bpo.observe([Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidenavOpened = false;
        this.sidenavDisableClose = false;
        this.sidenavMode = "over";
        this.sidenavMarginTop = 56;
      }
    });

    this.smallBreakpointSubscriber = this.bpo.observe([Breakpoints.Small]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidenavOpened = false;
        this.sidenavDisableClose = false;
        this.sidenavMode = "over";
        this.sidenavMarginTop = 64;
      }
    });

    this.largeBreakpointSubscriber = this.bpo.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidenavOpened = true;
        this.sidenavDisableClose = true;
        this.sidenavMode = "side";
        this.sidenavMarginTop = 64;
      }
    });
  }

  ngOnDestroy(): void {
    this.XSmallBreakpointSubscriber.unsubscribe();
    this.smallBreakpointSubscriber.unsubscribe();
    this.largeBreakpointSubscriber.unsubscribe();
  }

  switchTheme(): void {
    if (this.themeService.isLightMode()) {
      this.themeService.update('dark-mode');
    }
    else {
      this.themeService.update('light-mode');
    }

  }

}
