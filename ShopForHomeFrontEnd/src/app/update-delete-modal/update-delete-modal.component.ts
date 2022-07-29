import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-update-delete-modal',
  templateUrl: './update-delete-modal.component.html',
  styleUrls: ['./update-delete-modal.component.css'],
})
export class UpdateDeleteModalComponent implements OnInit {
  fg: FormGroup;
  submitted = false;
  upload = false;
  image: any;
  cats: any[];
  filePath = '../assets/upload.png';

  constructor(
    @Inject(MAT_DIALOG_DATA) public p: any,
    private fb: FormBuilder,
    private api: ApiService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.api.listcategories().subscribe({
      next: (resp) => (this.cats = resp),
    });

    console.log(this.p);
  }

  createForm() {
    this.fg = this.fb.group({
      pname: ['', Validators.required],
      category: ['', Validators.required],
      descr: ['', Validators.required],
      price: ['', Validators.required],
      pic: [''],
      stock: ['', Validators.required],
      id: ['0', Validators.required],
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

  saveproduct(f: any) {
    console.log(f);
    this.submitted = true;
    //this.fg.get('id').setValue('0');
    if (this.fg.valid) {
      console.log('Valid', this.fg.valid);
      let fd = new FormData();

      console.log(f);
      for (let ele in this.fg.value) {
        console.log(ele);
        fd.append(ele, <any>this.fg.get(ele).value);
      }
      if (!this.image) {
        fd.append('pic', this.p.pic);
      }

      this.api.updateProduct(this.p.id, f).subscribe({
        next: (resp) => {
          this.toast.success('Product saved successfully');
          this.fg.reset();
          this.submitted = false;
          //this.filePath="../assets/upload.png"
          //this.loadData();
        },
        error: (err) => console.log(err.error),
      });
    }
  }
}
