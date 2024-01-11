import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalAPIService } from 'src/app/service/global-api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss'],
})
export class GatewayComponent implements OnInit {
  checkboxes = [
    {
      Gateway: 'UPI',
      GatewayID: 1001,
      key: null,
      oStatus: 2,
      flag: false,
    },
    {
      Gateway: 'Razorpay',
      GatewayID: 1002,
      key: null,
      oStatus: 2,
      flag: false,
    },
    {
      Gateway: 'PHONE PE',
      GatewayID: 1003,
      key: null,
      oStatus: 2,
      flag: false,
    },
    {
      Gateway: 'Google Pay',
      GatewayID: 1004,
      key: null,
      oStatus: 2,
      flag: false,
    },
    {
      Gateway: 'Paypal',
      GatewayID: 1005,
      key: null,
      oStatus: 2,
      flag: false,
    },
    {
      Gateway: 'Perfect Money',
      GatewayID: 1006,
      key: null,
      oStatus: 2,
      flag: false,
    },
    {
      Gateway: 'Bhartipay',
      GatewayID: 1007,
      key: null,
      oStatus: 2,
      flag: false,
    },
    {
      Gateway: 'RTGS',
      GatewayID: 1008,
      key: null,
      oStatus: 2,
      flag: false,
    },
    {
      Gateway: 'Coinpayment',
      GatewayID: 1009,
      key: null,
      oStatus: 2,
      flag: false,
    },
    {
      Gateway: 'IMPS',
      GatewayID: 1010,
      key: null,
      oStatus: 2,
      flag: false,
    },
    {
      Gateway: 'NEFT',
      GatewayID: 1011,
      key: null,
      oStatus: 2,
      flag: false,
    },
  ];
  constructor(private api: GlobalAPIService, private toster: ToastrService) {}

  ngOnInit() {
    this.getAllGateways();
  }
  statusChecked: any
  getAllGateways() {
    this.api.getGatewayData().subscribe({
      next: (res: any) => {
        // console.log('this.tradeList', res);

     this.checkboxes.forEach((item:any)=>{
   console.log("item",item);
   
      res.forEach((item1:any)=>{
        console.log("item1",item1);
       if( item1.Gateway==item.Gateway){
        item.flag=true;
        this.statusChecked = item.flag
       }

      })

     })
     
        
      },
      error: (err: any) => {
        console.log('server not responding', err);
        this.toster.error('server not responding', 'Error');
      },
    });
  }

// ==========================================================================  ======================================================================

  onCheckboxChange(gateway: string, event: any) {
    const isChecked = event.target.checked;

    if (isChecked) {
      const requestData1 = {
        Key: '',
        GatewayID: this.getGatewayIDByName(gateway),
        Gateway: gateway,
        oStatus: 2,
      };

      // Make an API call to add the data

      this.api.addGateway(requestData1).subscribe({
        next: (res: any) => {
          this.toster.success('Gateway added successfully', 'Success');
          this.getAllGateways();
        },
        error: (err: any) => {
          console.log(err);
          this.toster.error(err, 'Error');
        },
      });
    } else {
      const requestData = {
        Key: '',
        GatewayID: this.getGatewayIDByName(gateway),
        Status: 2,
      };
      
      
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        denyButtonText: `Cancel`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Deleted!', '', 'success')
          this.api.deleteGateway(requestData).subscribe({
                  next: (res: any) => {
                    // this.toster.success('Gateway deleted successfully', 'Success');
                    this.getAllGateways();
                  },
                  error: (err: any) => {
                    console.log(err);
                    this.toster.error(err, 'Error');
                  },
                });
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
          location.reload();
          // this.getAllGateways();
        }
      })
   
    }
  }

  getGatewayIDByName(gateway: string): number {
    const gatewayLookup: { [name: string]: number } = {
      'Razorpay': 1002,
      'PHONE PE': 1003,
      'UPI': 1001,
      'Google Pay': 1004,
      'Paypal': 1005,
      'Perfect Money': 1006,
      'Bhartipay': 1007,
      'RTGS': 1008,
      'Coinpayment': 1009,
      'IMPS': 1010,
      'NEFT': 1011,

      // Add more mappings as needed
    };

    return gatewayLookup[gateway] || -1; // Default value if mapping not found
  }
}
