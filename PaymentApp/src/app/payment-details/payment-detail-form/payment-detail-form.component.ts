import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service:PaymentDetailService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    
    if(this.service.formData.paymentDetailId==0)
    this.insertRecord(form);
    else
    this.updateForm(form);

  }
  insertRecord(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      res=>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted Successfully','Payment Detail Registered')

      },
      err=>{
        console.log(err);
        
        
      }
    );

  }

  updateForm(form:NgForm){

    this.service.updatePaymentDetail().subscribe(
      res=>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated Successfully','Payment Detail Registered')

      },
      err=>{
        console.log(err);
      
      }
    );

  }



  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }

}
