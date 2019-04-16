import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  img:any="assets/image1200400.jpg";
  dateNOW:string;
  dateMIN:string;
  constructor() { }

  ngOnInit() {   
    this.dateNOW= formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  /**
   * setDate
   */
  public setDate(dateMin:string) {
    this.dateMIN=dateMin;    
  }

  /**
   * create
   */
  public create(Fid:string,DS:string,DE:string,D:string) {
    console.log(Fid+" "+DS+" "+DE+" "+D+" ");  
    alert("message here .... ");
    
  }
  public imagePath;
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
