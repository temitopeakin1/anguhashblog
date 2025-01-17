import { Component, ChangeDetectorRef, OnInit, OnDestroy, inject } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { NavItem } from "./models/nav-item";
import { SocialComponent } from "./components/social/social.component";
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ThemeService } from "./services/theme.service";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatIconModule } from "@angular/material/icon";


@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
    SocialComponent,
		HomeComponent,
		FooterComponent,
		MatSidenavModule,
		MatListModule,
		MatToolbarModule,
		MatButtonModule,
    MatSlideToggleModule,
		MatIconModule,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit, OnDestroy {
	title = "AnguHashBlog";
	snavIsOpen = true;
	mobileQuery: MediaQueryList;
  themeService: ThemeService = inject(ThemeService);

	navItems: NavItem [] = [
		{ name: "Home", route: "home", icon: "home" },
		{ name: "Demos", route: "demos", icon: "widgets" },
		{ name: "Contribute", route: "contribute", icon: "code" },
		{ name: "How To Use", route: "use", icon: "note" },
		{ name: "Contact", route: "contact", icon: "email" },
	];

	private _mobileQueryListener: () => void;

	constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
		this.mobileQuery = media.matchMedia("(max-width: 600px)");
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}


  ngOnInit(): void {

  }

  toggleTheme() {
    this.themeService.updateTheme();
  }

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
}
