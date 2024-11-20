import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isModalVisible=false;
  isModalVisible1=false;


  openModal() {
    this.isModalVisible = true;
  }

  onModalClose() {
    this.isModalVisible = false;
  }

  onModalConfirm() {
    // Perform confirmation action
    this.isModalVisible = false;
    console.log('Confirmed!');
  }

  openModal4(){
    this.isModalVisible1 = true;
  }
  onModalClose1(){
    this.isModalVisible1 = false;
  }

  onModalConfirm1(){
    this.isModalVisible1 = false;
    console.log('Confirmed!');
  }
}
