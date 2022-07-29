import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css'],
})
export class AdminhomeComponent implements OnInit {
  list: any[];
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private _ro: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      const catid = params['catid'];
      const search = params['search'];
      if (catid) this.loadcatlist(catid);
      else if (search) this.loadsearchresult(search);
      else this.loadData();
    });
  }
  loadsearchresult(search: string) {
    this.api.searchproducts(search).subscribe({
      next: (resp) => (this.list = resp),
    });
  }

  loadcatlist(catid: number) {
    this.api.catproducts(catid).subscribe({
      next: (resp) => (this.list = resp),
    });
  }

  addstock(id: number) {
    this._ro.navigate(['/updatestock', id]);
  }

  loadData() {
    this.api.listproducts().subscribe({
      next: (resp) => {
        this.list = resp;
        console.log(this.list);
      },
    });
  }
}
