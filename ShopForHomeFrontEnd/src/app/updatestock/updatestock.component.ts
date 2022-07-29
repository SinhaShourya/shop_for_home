import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-updatestock',
  templateUrl: './updatestock.component.html',
  styleUrls: ['./updatestock.component.css'],
})
export class UpdatestockComponent implements OnInit {
  //fg: FormGroup;
  model: any = {};
  cats: any[];
  list: any[];
  filePath = '../assets/upload.png';
  image: any;
  submitted = false;
  upload = false;
  id: number;
  p: any;

  fg = new FormGroup({
    stock: new FormControl(''),
  });

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.api.getproduct(this.id).subscribe((data) => {
      this.p = data.data;
      console.log(this.p);
    });
    // this.api.getproduct(this.route.snapshot.params.id).subscribe
    //   console.log(this.route.snapshot.params['id']);
    //   this.api
    //     .getproduct(this.route.snapshot.params['id'])
    //     .subscribe((result) => {
    //       this.fg = new FormGroup({
    //         stock: new FormControl(result['stock']),
    //       });
    //     });
  }
  // savestock() {
  //   this.submitted = true;
  //   this.api
  //     .savestock(this.route.snapshot.params['id'], this.fg.value)
  //     .subscribe((result) => console.log(result, 'stock update successfull'));
  // }

  updatestock(value, stock: number) {
    let newStock = value.stock;
    console.log(newStock);
    console.log(stock);
    let stock1 = newStock + stock;
    console.log(stock1);
    this.p['stock'] = stock1;

    this.submitted = true;
    this.id = this.route.snapshot.params['id'];
    //change
    this.api.savestock(this.id, this.p).subscribe({
      next: (resp) => {
        console.log(resp);
        this.toast.success('Stock updated successfully');
        this.fg.reset();
        this.submitted = false;
        // this._router.navigate(['dashboard']);
      },
      error: (err) => console.log(err.error),
    });
  }
  savestock(f: any) {
    this.submitted = true;
    //this._router.navigate(['dashboard']);

    // let data = { stock: f };
    // console.log(data);
    this.id = this.route.snapshot.params['id'];
    this.api.savestock(this.id, this.fg.value).subscribe({
      next: (resp) => {
        this.toast.success('Stock updated successfully');
        this.fg.reset();
        this.submitted = false;
        // this._router.navigate(['dashboard']);
      },
      error: (err) => console.log(err.error),
    });
  }
  // savestock(f: any) {
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
}
