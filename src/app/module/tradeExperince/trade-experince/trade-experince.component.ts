import { Component } from '@angular/core';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import { GlobalService } from 'src/app/services/global.service';
import{SharedDataService} from "../../../services/sharedData/shared-data.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-trade-experince',
  templateUrl: './trade-experince.component.html',
  styleUrls: ['./trade-experince.component.scss']
})
export class TradeExperinceComponent {
myForm:any = FormGroup;


constructor(private formBuilder: FormBuilder, 
  private sharedData:SharedDataService,
 private services: ApiDataService, 
 private globalService: GlobalService, 
 private router: Router, 
 private toastrService: ToastrService) { }


 get f2() { return this.myForm.controls; }
  

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      trdexp1: ['', [Validators.required]],
      trdexp2:['', Validators.required],
      trdexp3:['',[Validators.required]],
      trdexp4:['', Validators.required],
      trdexp5:['',[Validators.required]],
      ai1:['', Validators.required],
      ai2:['',[Validators.required]],
      ai3:['', Validators.required],
      ai4:['',[Validators.required]],
      uocc1:['', Validators.required],
      uocc2:['',[Validators.required]],
      uocc3:['', Validators.required],
      uocc4:['',[Validators.required]],
      uocc5:['', Validators.required],
      uocc6:['',[Validators.required]],
      uocc7:['', Validators.required],
      uocc8:['',[Validators.required]],
      uocc9:['', Validators.required],
     
    });
  }
  onSubmit() {
    const formValues = this.myForm.value;
    console.log(formValues);
  }


}
