import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { UpdateDeleteModalComponent } from '../update-delete-modal/update-delete-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  fg: FormGroup;
  model: any = {};
  cats: any[];
  list: any[];
  filePath = '../assets/upload.png';
  image: any;
  submitted = false;
  upload = false;

  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.createForm();
  }
  createForm() {
    this.fg = this.fb.group({
      pname: ['', Validators.required],
      category: ['', Validators.required],
      descr: ['', Validators.required],
      price: ['', Validators.required],
      pic: ['',Validators.required],
      stock: ['', Validators.required],
    });
  }

  loadData() {
    this.api.listcategories().subscribe({
      next: (resp) => (this.cats = resp),
    });
    this.api.listproducts().subscribe({
      next: (resp) => {
        this.list = resp;
      },
    });
  }



  saveFile(e: any) {
    const ele = e.target as HTMLInputElement;
    const file = ele.files?.item(0);
    console.log(file);
    this.image = file;
    this.upload = true;
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = () => {
      this.filePath = reader.result as string;
      //this.fg.patchValue({pic:reader.result})
    };
  }

  deleteProduct(id: number) {
    this.api.deleteproduct(id).subscribe({
      next: (resp) => {
        this.toast.success('Product deleted');
        this.loadData();
      },
      error: (err) => this.toast.error('Product cannot delete'),
    });
  }

  updateProduct(p) {
    const dialogRef = this.dialog.open(UpdateDeleteModalComponent, {
      data: p,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
    //this.router.navigate(['update-product', id]);
  }

  saveproduct(f: any) {
    this.submitted = true;
    //this.fg.get('id').setValue('0');
    if (this.fg.valid && this.upload) {
      console.log('Valid', this.fg.valid);
      let fd = new FormData();
      console.log(f);
      for (let ele in this.fg.value) {
        console.log(ele);
        fd.append(ele, <any>this.fg.get(ele).value);
      }
      fd.append('pic', this.image);

      this.api.saveproduct(fd).subscribe({
        next: (resp) => {
          this.toast.success('Product saved successfully');
          this.fg.reset();
          this.submitted = false;
          //this.filePath="../assets/upload.png"
          this.loadData();
        },
        error: (err) => console.log(err.error),
      });
    }
  }
 
}
