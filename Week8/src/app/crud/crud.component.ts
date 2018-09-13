import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  productname: string = '';
  productprice: string = '';
  producttype: string = '';
  productdesc: string = '';
  collectionname: string = '';
  products = [{}];
  deletedproduct: string;
  newproductname: string = '';
  newproductprice: string = '';
  newproducttype: string = '';
  newproductdesc: string = '';
  ogproductname: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  public createcollection(){
    event.preventDefault();
    const req = this.http.post('http://localhost:3000/api/add', {
      collectionname: this.collectionname,
    })
      .subscribe((data: any) => {
        alert("Successfully created collection!");
        console.log(data.success);
      },
        err => {
          alert('An error has occured trying to create new collection.')
          console.log("Error occured");
          return;
        });
  }

  public createProduct(){
    event.preventDefault();
    const req = this.http.post('http://localhost:3000/api/create', {
      productname: this.productname,
      productprice: this.productprice,
      producttype: this.producttype,
      productdesc: this.productdesc,
    })
      .subscribe((data: any) => {
        alert("Successfully created product!");
        console.log(data.success);
      },
        err => {
          alert('An error has occured trying to create new product.')
          console.log("Error occured");
          return;
        });
    }

    public readdatabase(){
      event.preventDefault();
      const req = this.http.post('http://localhost:3000/api/read', {})
        .subscribe((data: any) => {
          alert("Successfully read database!");
          console.log(data.success, data.result);
          this.products = data.result;
        },
          err => {
            alert('An error has occured trying to read database.')
            console.log("Error occured");
            return;
          });
    }

    public updatedata(){
      event.preventDefault();
      console.log(this.ogproductname, this.newproductname);
      const req = this.http.post('http://localhost:3000/api/update', {
        ogproductname: this.ogproductname,
        newproductname: this.newproductname,
        newproductprice: this.newproductprice,
        newproducttype: this.newproducttype,
        newproductdesc: this.newproductdesc,
      })
        .subscribe((data: any) => {
          alert("Successfully updated product!");
          console.log(data.success);
        },
          err => {
            alert('An error has occured trying to update new product.')
            console.log("Error occured");
            return;
          });
    }



    public deleteproduct(deletedproduct){
      if (deletedproduct) {
        event.preventDefault();
        console.log(deletedproduct);
        const req = this.http.post('http://localhost:3000/api/delete', {
            deletedproduct: this.deletedproduct
          })
          .subscribe((data: any) => {
              console.log(data);
              console.log(data.success);

              if (data.success) {
                alert('Group deleted successfully!');
                this.deletedproduct = '';

              } else {
                alert('This group does not exist!');
                return;
              }
            },
            err => {
              alert('An error has occured trying to delete group.')
              console.log("Error occured", err);
              return;
            });
      } else {
        alert("You did not select a group to delete!");
      }
    }
}
