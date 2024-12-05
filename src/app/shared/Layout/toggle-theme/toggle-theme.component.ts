import { Component } from "@angular/core";

@Component({
	selector: "app-toggle-theme",
	standalone: true,
	imports: [],
	templateUrl: "./toggle-theme.component.html",
})
export class ToggleThemeComponent {
	isDarkMode: boolean;

	constructor() {
		this.isDarkMode = false;
	}

	ngOnInit(): void {
		// Initialize theme based on local storage or system preference
		this.isDarkMode =
			localStorage.getItem("color-theme") === "dark" ||
			(!localStorage.getItem("color-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);

		if (this.isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}

	toggleTheme(): void {
		this.isDarkMode = !this.isDarkMode;

		if (this.isDarkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("color-theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("color-theme", "light");
		}
	}
}
