import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  img: any = "assets/image1200400.jpg";
  imageurl:any;
  dateNOW: string;
  dateMIN: string;
  fligth_ids = [];
  loadF_ids: boolean = false;

  msj: string = "";
  text: string = "";
  type: string = "";
  showMessage: boolean = false;
  selectFile: File = null;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.dateNOW = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }


  onUpload() {
    const fb = new FormData();
    fb.append('image', this.selectFile, this.selectFile.name);
    return fb;
  }

  /**
   * setDate
   */
  public setDate(dateMin: string) {
    this.dateMIN = dateMin;
  }

  /**
  * editAlert
  */
  public editAlert(msg: string, text: string, type: string) {
    this.msj = msg;
    this.text = text;
    this.type = type;
    this.showMessage = true;
  }

  /**
   * Creation of a Sale/Promotion
   * create
   */
  public create(Fid: string, DS: string, DE: string, D: string) {
    if (DE == "") {
      this.editAlert("Warning! ", "Set a day to finish the promotion, please.", "warning");
    }
    else if (Number(D) < 1) {
      this.editAlert("Warning! ", "Establish a positive discount.", "warning");
    } else {
      const json = { flight_id: Fid, discount: Number(D), exp_date: DE };
      console.log(JSON.parse(JSON.stringify(json)));
      this.service.createSale(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); // Object to String
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json
        if (jsonWEBAPI.http_result == 1) {
          this.editAlert("Success! ", jsonWEBAPI.msg, "success");
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "danger");
        } else {
          alert("ERROR DEL JSON.... sign-up.componet");
        }
      });

    }
  }

  /**
   * closeMessage
   */
  public closeMessage() {
    this.showMessage = false;
  }

  /**
   * getList_idFlight
   */
  public getList_idFlight() {
    this.service.getListFlights_id().subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer); // Object to String
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json
      if (jsonWEBAPI.http_result == 1) {
        this.fligth_ids = jsonWEBAPI.flights;
      } else if (jsonWEBAPI.http_result == 0) {
      } else {
        alert("ERROR DEL JSON.... home.componet");
      }
    });
  }

  //Load img in window
  public imagePath: any;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.img = reader.result;
      const TYPED_ARRAY = new Uint8Array(this.img);
      const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
      let base64String = btoa(STRING_CHAR);
      
    //  this.imageurl = this..domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64String);

    console.log("Image base64");
    console.log(STRING_CHAR);
    
      console.log(base64String);
      
    }

  }

  /**
   * dataURItoBlob  Load image to api
   */
  public dataURItoBlob(file) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

}
