import { Component } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: 'header.component.html',
  //styleUrl: './header.component.css'
})
export class HeaderComponent {
  //the dropdown code is from Br. Del Sol's video (Thank you)
  isUserDropDownOpen: boolean = false;
  isNavbarCollapsed: boolean = true;

  toggleUserDropdown() {
    this.isUserDropDownOpen = !this.isUserDropDownOpen;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

      
}
