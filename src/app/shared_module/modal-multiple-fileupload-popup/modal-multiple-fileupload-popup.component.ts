import { Component } from '@angular/core';
import { EventEmitter,Input, Output } from '@angular/core';
@Component({
  selector: 'app-modal-multiple-fileupload-popup',
  templateUrl: './modal-multiple-fileupload-popup.component.html',
  styleUrls: ['./modal-multiple-fileupload-popup.component.css']
})
export class ModalMultipleFileuploadPopupComponent {
  title?: string;
  closeBtnName?: string;
  list: any[] = [];

  dtOptions: any = {};
  @Input() public modalData:any;
  @Output() itemData: EventEmitter<any> = new EventEmitter();
  selectedItem: any = [];



  constructor() {}
 
  ngOnInit() {
    this.list.push('PROFIT!!!');
  }
  removeImage(){

  }
  ngAfterViewInit(): void {

  }
images: any = []
  formData: any;
  imageData: any = [];
  logo: any = "";
  getFiles(files: any, val: any) {
    let filesData = files.target.files;
    var self = this;

    this.images = []
    this.formData = new FormData();

    let len = filesData.length;
    // if ((files.target.files[0].size / 1024 > 1024)) {
    //   Swal.fire("", "Max image size limit is 1024KB!", "error");
    // }
    // else {
      this.logo = "";
      for (var i = 0; i < len; i++) {
        this.images.push(filesData[i].name.trim())
        this.formData.append("file", filesData[i], filesData[i].name.replace(/\s/g, ''))
      }
  //  this.loader = true;
      // this.service.uploadImages(this.formData).subscribe((data: any) =>
      // (
      //   this.loader = false,
      //   this.imageData = data.data,
     
      //   self.imgCintFunc(this.imageData, val)

      // ),
      //   (error: any) => (
        
      //     this.loader = false,
      //     self.imError(this.imageData, val),

      //     Swal.fire('oops!', error.error.message, "error")


      //   ));


    // }
  }
  imError(val1: any, val2: any) {
    // if (val2 == "profile") {
    //   this.logo = "";
    // }

    // }else{
    //   this.logo="";
    // }
  }
  imgCintFunc(val1: any, val2: any) {
    // if (val2 == "profile") {
    //   this.logo = val1[0];
    


    // } else {
    //   // this.mobileBannerImage=val1.data[0];
    // }
  }
  // removeImage() {
  //   this.logo = "";


  }





