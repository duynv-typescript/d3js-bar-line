import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public idSelect = 'graphic';
  title = 'app';
  selectOption(value) {
    if (value === 'chart1') {
      this.idSelect = 'graphic';
    } else if (value === 'chart2') {
      this.idSelect = 'graphic2';
    } else if (value === 'chart3') {
      this.idSelect = 'graphic3';
    } else {
      this.idSelect = 'graphic-4';
    }
  }
  print() {
    console.log(this.idSelect);
    const  prtContent = document.getElementById(this.idSelect);
    const WinPrint = window.open('', '', 'left=0,top=0,width=1200,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  }
}
