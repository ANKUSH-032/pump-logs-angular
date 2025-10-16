import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
const baseURL = environment.api_url;
@Component({
  selector: 'app-dispensing-list',
  templateUrl: './dispensing-list.component.html',
  styleUrls: ['./dispensing-list.component.scss'],
})
export class DispensingListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dispenserList: any = [];
  startDate: string = '';
  endDate: string = '';
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: false,
      searching: true,
      ordering: true,
      lengthChange: true,
      autoWidth: false,
      responsive: true,
      language: {
        paginate: {
          first: 'First',
          last: 'Last',
          next: 'Next',
          previous: 'Previous',
        },
        search: 'Search:',
        lengthMenu: 'Show _MENU_ entries',
        info: 'Showing _START_ to _END_ of _TOTAL_ entries',
        infoEmpty: 'No records found',
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
  downloadRecordFromApi(fileUrl: string) {
    if (!fileUrl) return;

    const fileName = fileUrl.split('/').pop();
    const apiUrl = `${baseURL}PumpLog/download-file?fileName=${fileName}`;

    this.authService.getWithToken(apiUrl, 'blob').subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName!;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Download failed:', error);
      }
    );
  }

  filterByDate() {
    $.fn['dataTable'].ext.search = []; // Clear previous filters

    $.fn['dataTable'].ext.search.push(
      (settings: any, data: any, dataIndex: any) => {
        const min = this.startDate ? new Date(this.startDate) : null;
        const max = this.endDate ? new Date(this.endDate) : null;
        const createdOn = new Date(data[4]); // index 4 = CreatedOn column (0-based)

        if (
          (!min && !max) ||
          (!min && createdOn <= max!) ||
          (min! <= createdOn && !max) ||
          (min! <= createdOn && createdOn <= max!)
        ) {
          return true;
        }
        return false;
      }
    );

    // Redraw table with filter
    ($('table') as any).DataTable().draw();
  }
  resetDateFilter() {
    this.startDate = '';
    this.endDate = '';
    ($('table') as any).DataTable().draw();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
