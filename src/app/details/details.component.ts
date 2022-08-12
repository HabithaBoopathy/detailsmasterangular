import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Details } from '../models/details';
import { Master } from '../models/master';
import { Measure } from '../models/measure';
import { DetailsService } from '../services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  measures:Measure[]=[
    {id:1,name:'litres'},
    {id:2,name:'Kilo'},
    {id:3,name:'gram'},
    {id:4,name:'ton'},
     ];

details:Details;
detailses:Details[];
master:Master;
  masters:Master[];
constructor(private httpClient: HttpClient,
  private router: Router,private detailsService:DetailsService) {
        this.details=new Details();
        this.detailses = [];
        this.master = new Master();
        this.masters = [];
   }

ngOnInit(): void {
 
  this.fetchDetails();
}
reloadData() {
 
  this.details=new Details();

this.fetchDetails();

}
fetchDetails() {
this.detailsService.getDetails().subscribe(
(data) => {
  this.detailses = data;
},
(err) => {
  console.log(err);
}
);  
}
validateDetailsData(): boolean {
let flag = false;
if (this.details.serialNo == '') {
  alert('Please enter serial no');
} else if (this.details.measure == '') {
  alert('Please enter unit');
} else if (this.details.particulars == '') {
  alert('Please fill the particulars');
}
else if (this.details.quantity == '') {
  alert('Please enter quantity');
}
 else {
  flag = true;
}
return flag;
}

onClick() {
if (this.validateDetailsData()) {
  //asynchronous vs synchronous programming
    this.detailsService.createDetails(this.details).subscribe(//check the change
    (data) => {
      if (data) { 
        console.log('Checkpoint 3');
        //reload data since new record has been added
        this.reloadData();
        alert('User registered successfully')
      } 
      else
      alert(
        ' already exists'
      ); 
      },
    
    (err) => {
      console.log(err);
    }
  );
  
  }
}
onClear(no: string) {
this.detailsService.deleteDetails(no).subscribe(
(data) => {
  if (data) {
    this.reloadData();
  } else {
    alert(
      'Error while deleting. Please look onto the backend logs'
    );
  }
},
(err) => {
  console.log(err);
}
); 
}


}