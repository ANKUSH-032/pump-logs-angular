import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dispensing-add',
  templateUrl: './dispensing-add.component.html',
  styleUrls: ['./dispensing-add.component.scss']
})
export class DispensingAddComponent implements OnInit {

  addDispensing!: FormGroup;
  dispenserList: any[] = [];
  paymentModes: any[] = [];
  selectedFile: File | null = null;  
  isLoading = true;
  fileError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addDispensing = this.fb.group({
      DispenserNo: ['', Validators.required],
      QuantityFilled: ['', Validators.required],
      VehicleNumber: ['', Validators.required],
      PaymentMode: ['', Validators.required],
      File: [null] // ✅ file field
    });

    this.loadMasters();
  }

  /** 🔹 Load both master APIs using forkJoin (parallel calls) */
  loadMasters() {
    const dispenserApi = this.auth.postReq('Master/GetDispenserList', {});
    const paymentApi = this.auth.postReq('Master/GetPaymentModes', {});

    forkJoin([dispenserApi, paymentApi]).subscribe({
      next: ([dispenserRes, paymentRes]) => {
        this.dispenserList = dispenserRes?.data || [];
        this.paymentModes = paymentRes?.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error('Failed to load master data');
        console.error('Master data error:', err);
        this.isLoading = false;
      }
    });
  }

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      this.fileError = true;
      this.selectedFile = null;
    } else {
      this.fileError = false;
      this.selectedFile = file;
    }
  }
}


 onSubmit() {
  // Mark all fields as touched to trigger validation messages
  this.addDispensing.markAllAsTouched();

  if (this.addDispensing.valid && !this.fileError) {
    const formData = new FormData();
    Object.entries(this.addDispensing.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (this.selectedFile) {
      formData.append('File', this.selectedFile, this.selectedFile.name);
    }

    this.auth.postRequest('PumpLog/insert', formData).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message || 'Record added successfully!');
        this.router.navigate(['/dispensing-list']);
      },
      error: (err) => {
        this.toastr.error(err.message || 'Something went wrong!');
      }
    });
  } 
}

}
