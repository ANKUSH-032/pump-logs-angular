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
  
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.dtOptions = {
  pagingType: 'simple_numbers',
  pageLength: 10,
  ordering: true,
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
    search: 'Description Search:',  // ✅ changed here
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
      Start: 0, 
      PageSize: -1,
      SortCol: '',
    };

    this.authService.postReq('PumpLog/list', apiParams).subscribe(
      (data) => {
        this.dispenserList = data['data'];
        this.dtTrigger.next(); 
      },
      (error) => {
        console.error('Error fetching dispenser list:', error);
        
      }
    );
  }

  downloadRecord(item: any): void {
    // Example: download JSON file or PDF from backend
    const fileName = `dispensing_${item.dispenserNo}.json`;
    const fileData = JSON.stringify(item, null, 2);
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    window.URL.revokeObjectURL(url);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
  