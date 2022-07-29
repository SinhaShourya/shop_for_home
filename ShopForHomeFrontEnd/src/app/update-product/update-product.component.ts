import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  fg: FormGroup;
  model: any = {};
  cats: any[];
  list: any[];
  id: number;
  filePath = '../assets/upload.png';
  image: any;
  submitted = false;
  upload = false;
  productData: any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
    this.loadData();
  }

  loadData() {
    this.api.getProductById(this.id).subscribe({
      next: (data) => {
        this.productData = data;
        console.log(this.productData);
      },
    });
    this.api.listcategories().subscribe({
      next: (resp) => (this.cats = resp),
    });
    this.api.listproducts().subscribe({
      next: (resp) => {
        this.list = resp;
      },
    });
  }

  updateProduct(f: any) {
    console.log(f);
    this.api.updateProduct(this.id, f).subscribe((data) => {
      console.log(data);
      //this.router.navigate('dashboard');
    });
  }

  // createForm() {
  //   this.fg = this.fb.group({
  //     pname: ['', Validators.required],
  //     category: ['', Validators.required],
  //     descr: ['', Validators.required],
  //     price: ['', Validators.required],
  //     pic: ['', Validators.required],
  //     stock: ['', Validators.required],
  //     id: ['0', Validators.required],
  //   });
  // }
  createForm() {
    this.fg = this.fb.group({
      pname: ['', Validators.required],
      category: ['category', Validators.required],
      descr: ['descr', Validators.required],
      price: ['price', Validators.required],
      pic: ['pic', Validators.required],
      stock: ['stock', Validators.required],
      id: ['id', Validators.required],
    });
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

  // updateProduct(f: any) {
  //   this.submitted = true;
  //   this.fg.get('id').setValue('0');
  //   if (this.fg.valid && this.upload) {
  //     console.log('Valid', this.fg.valid);
  //     let fd = new FormData();

  //     console.log(f);
  //     for (let ele in this.fg.value) {
  //       console.log(ele);
  //       fd.append(ele, <any>this.fg.get(ele).value);
  //     }
  //     fd.append('pic', this.image);

  //     this.api.saveproduct(fd).subscribe({
  //       next: (resp) => {
  //         this.toast.success('Product saved successfully');
  //         this.fg.reset();
  //         this.submitted = false;
  //         //this.filePath="../assets/upload.png"
  //         this.loadData();
  //       },
  //       error: (err) => console.log(err.error),
  //     });
  //   }
  // }

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
}
