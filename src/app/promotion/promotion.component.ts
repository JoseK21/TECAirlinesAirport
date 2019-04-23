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
  dateNOW: string;
  dateMIN: string;
  fligth_ids = [];
  loadF_ids: boolean = false;

  msj: string = "";
  text: string = "";
  type: string = "";
  showMessage: boolean = false;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.dateNOW = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.getList_idFlight();
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
    this.showMessage = true;
    this.msj = msg;
    this.text = text;
    this.type = type;
  }

  /**
   * Creation of a Sale/Promotion
   * create
   */
  public create(Fid: string, DS: string, DE: string, D: string) {
    console.log(Number(D));
    if (DE == "") {
      this.editAlert("Warning! ", "Set a day to finish the promotion, please.", "warning");
    }
    else if (Number(D) < 0) {
      this.editAlert("Warning! ", "Establish a positive discount.", "warning");
    } else {
      const json = { flight_id: Fid, discount: Number(D), exp_date: DE };
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
    if (!this.loadF_ids) {
      this.service.getListFlights_id().subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); // Object to String
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json
        if (jsonWEBAPI.http_result == 1) {
          this.fligth_ids = jsonWEBAPI.flights;
          this.loadF_ids = true;
        } else if (jsonWEBAPI.http_result == 0) {
          alert("ERROR Universidades no cargadas");
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
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
      this.imgURL = reader.result;
      this.img = reader.result;
    }
  }

}
