import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-dispensing-list',
  templateUrl: './dispensing-list.component.html',
  styleUrls: ['./dispensing-list.component.scss'],
})
export class DispensingListComponent implements OnInit {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dispenserList: any = [];
  // patinet: DoctorList = {
  //   firstName: '',
  //   lastName: '',
  //   contactNo: '',
  //   gender: '',
  //   email: '',
  //   roleId: '',
  //   address: '',
  //   hospitalName: '',
  //   zipCode: ''
  // }
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      ordering: true, // Enable global ordering

      searching: true,
      lengthChange: true,
      info: true,
      autoWidth: true,
      responsive: true,
      language: {
        paginate: {
          first: 'First',
          last: 'Last',
          next: 'Next',
          previous: 'Previous',
        },
        search: 'Doctor Name Search:',
        lengthMenu: 'Show _MENU_ entries',
        info: 'Showing _START_ to _END_ of _TOTAL_ entries',
        infoEmpty: 'Showing 0 to 0 of 0 entries',
        infoFiltered: '(filtered from _MAX_ total entries)',
      },
    };
  }

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    const apiParams = {
      SearchKey: '',
      Start: 0, // You can set appropriate values for Start, PageSize, and SortCol
      PageSize: -1,
      SortCol: '',
    };

    this.authService.postReq('PumpLog/list', apiParams).subscribe(
      (data) => {
        this.dispenserList = data['data'];
        this.dtTrigger.next(); // Trigger DataTable update after data is loaded
      },
      (error) => {
        console.error('Error fetching dispenser list:', error);
        // Handle error
      }
    );
  }

  onViewData(): boolean {
    const viewData = this.storageService.get('role');
    return viewData.toLowerCase() === 'admin';
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
  