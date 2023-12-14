import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';

@Component({
  selector: 'app-e-sign',
  templateUrl: './e-sign.component.html',
  styleUrls: ['./e-sign.component.scss']
})
export class ESignComponent implements AfterViewInit,OnInit {
 
  Esignimg:any="";
  fileError: any;
  showEsign:boolean=true;
  isImageUploaded: boolean=false;
  isCheckboxChecked: boolean = false;
  selectedFile: File | null = null;
  pdfUrl: any;
  hide:boolean = true
  pdfUrlpath: any='';
  constructor(private sharedData:SharedDataService, private http: HttpClient, private toastrService: ToastrService, private services:ApiDataService, private rout:Router){
  }
  @ViewChild('signature')
  public signaturePad!: SignaturePadComponent;

  public signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    minWidth: 5,
    canvasWidth: 300,
    canvasHeight: 175
  };
  
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
  clear(){
    this.signaturePad.clear();
    this.activeSave = false
  }

  drawComplete(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onEnd event
    console.log('Completed drawing', event);
    console.log(this.signaturePad.toDataURL());
    this.activeSave = true
  }
  save(){
    this.uploadBase64(this.signaturePad.toDataURL());
    
  }
  activeSave:any = false
  drawStart(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('Start drawing', event);
    // this.activeSave = true
  }
  
uploadPath: any
  uploadBase64(val:any){
   
    let obj={
      "base64Image": val
    }
       this.sharedData.loader(true);
       this.http.post('https://p2p.bitziana.com:5000/upload/', obj)
           .subscribe((response: any) => {
            this.sharedData.loader(false);
             console.log(response);
             if(response.Result==true){
               
               this.isImageUploaded=true;
               this.uploadPath=response.url
             }
            else{
             this.sharedData.loader(false);
             this.toastrService.error('Your E Sign is not uploaded.', 'Please try again!');
            }
           
           },((error:any)=>{
             this.sharedData.loader(false);
             this.toastrService.error('Your E Sign is not uploaded.', 'Please try again!');
             
           }));
            
           
     
 
   }

  ngOnInit(): void {

    this.sharedData.toggleClassValue(5);
    this.sharedData.kysStage(5)

  }

  
  onFileSelected(event: any): void {
    this.removePDF();   
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
      this.uploadFile();
    } else {
      this.pdfUrl = null;
    }
  }
  
  uploadImgCont:boolean=false;
  uploadFile(): void {
   
  
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('ttl', 'infinity');
      console.log(this.selectedFile)
  
      this.http.post('https://persist.signzy.tech/api/files/upload', formData).subscribe(
        (response:any) => {
      

          if(response.file.filetype=="application/pdf"){
            this.pdfUrlpath= response.file.directURL;
            
            this.uploadESigndb(this.pdfUrlpath);
           
           
            this.isImageUploaded = true;
            
            this.uploadImgCont=true;

          }else{
            this.Esignimg=response.file.directURL;
            this.uploadESigndb(this.Esignimg);
            this.uploadImgCont=false;
            this.isImageUploaded = true;
           
          }


        },
        (error) => {
          // Handle upload error
          console.error('Error uploading file:', error);
        }
      );
    }
  }
  removePDF(){
    this.uploadImgCont=false;
    
    this.Esignimg='';
  }

  uploadESigndb(val:any){
    let obj= {
      "Path": val,
      "Details":"",
      "oStage":6,
      "oKYC_DOC":{
          "ProfileId":localStorage.getItem('ProfileID'),
          "oKYC_Type":5,
          "oStatus":2
      },
      "Key":""
    }
    this.services.UPLOAD_KYC_DOC(obj).subscribe((data:any)=>{
      console.log(data)
      if(data.Result=true){
        this.sharedData.loader(false);
        localStorage.setItem('kycValue', '6')
          this.toastrService.success('E-sign has been uploaded successfully.', 'Success!');

      }
      },(error)=>{
      
        this.toastrService.error('Something went Wrong!!!. Please try again.','Error!')
        this.sharedData.loader(false)
      });
  }
  navigate(){
    this.uploadESigndb(this.uploadPath);
    setTimeout(() => {
      Swal.fire('Congratulations!', 'Your Profile has been uploaded and is under verification. You can Re-Login after ! Hour!!!'),
      localStorage.clear();
       sessionStorage.clear();
      this.rout.navigate(['/login']);
    }, 3000);
   

    
  

  
  }



  onCheckboxChange(event: any): void {
    this.isCheckboxChecked = event.target.checked;
  }
  
  ngOnDestroy(): void {
   
     sessionStorage.clear();
     localStorage.clear();
    
      if(localStorage.getItem("kycValue")=="5"){
        this.rout.navigateByUrl("/onboading-kyc/esign")
      }
    }
  
}
