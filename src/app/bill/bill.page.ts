import { Component, OnInit } from '@angular/core';
import { MatTableDataSource , MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage implements OnInit {
  public data = new MatTableDataSource<any>()
  addq = [{}]
  
  displayedColumns: string[] = ['code', 'itemName', 'price', 'quantity'];

  constructor() { }

  ngOnInit() {
  }

  add(){
    this.addq.push( { code: '001', itemName: 'Item 1', price: 10, quantity: 5 })
    this.addq.push( { code: '001', itemName: 'Item 1', price: 10, quantity: 5 })
    this.addq.push( { code: '001', itemName: 'Item 1', price: 10, quantity: 5 })
    this.addq.push( { code: '001', itemName: 'Item 1', price: 10, quantity: 5 })
    this.data= new MatTableDataSource(this.addq)
  } 

}
