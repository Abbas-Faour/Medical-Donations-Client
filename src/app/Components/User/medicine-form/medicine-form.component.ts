import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthService } from 'src/app/Services/auth.service';
import { MedicinesService } from 'src/app/Services/medicines.service';
import { blobStorage } from 'src/environments/environment';

@Component({
  selector: 'app-medicine-form',
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.css']
})
export class MedicineFormComponent implements OnInit {

  heading : string = "Add Post"
  requestSent : boolean = false

  medicine : any = {}
  categories : any[] = []
  url : any
  msg : string = ""
  img : any
  category : string = ""

  constructor(
    private medicineService : MedicinesService,
    private toastr : ToastService, 
    private router : Router,
    private route : ActivatedRoute,
    private auth : AuthService) { 
       // check if there is id sent in case of update
       this.route.params.subscribe(res => this.medicine.id = +res['id'] || 0)
    }


  ngOnInit(): void {
    this.medicineService.getCategories().subscribe(res => {
      this.categories = res
    })

    if(this.medicine.id){
      this.heading = "Edit Post"
      this.medicineService.getMedicineById(this.medicine.id)
        .subscribe(res => {
          this.setPost(res)
        })

    }
  }

  submit(){

    this.requestSent = true

    if(this.medicine.id){

      //check if image changed 
      if(this.medicine.imageUrl === this.url){
        this.medicineService.editMedicine(this.medicine,this.medicine.id).subscribe(res =>{
            this.toastr.success("updated successfully!")
            this.requestSent = false
            this.router.navigate(['/user/medicines-list'])
            
        },err => {
          this.toastr.error(err)
          this.requestSent = false})
      }
      else{
        this.medicineService.deleteImage({fileName: this.medicine.imageUrl}).subscribe(res => {

            this.medicineService.uploadImage(this.img).subscribe(res => {

                this.medicine.imageUrl = blobStorage+res.fileName
                this.medicine.userEmail = this.auth.getUserEmail()
      
                this.medicineService.editMedicine(this.medicine,this.medicine.id).subscribe(res => {
                  this.toastr.success("updated successfully!")
                  this.requestSent = false
                  this.router.navigate(['/user/medicines-list'])
                },err => {
                  this.toastr.error(err.error)
                  this.requestSent = false})
              })
        },err => {
          this.toastr.error(err)
          this.requestSent = false})
        
      }
    }
    else{
      if(this.img){
        this.medicineService.uploadImage(this.img).subscribe(res => {
          this.medicine.imageUrl = blobStorage+res.fileName
          this.medicine.userEmail = this.auth.getUserEmail()
  
          this.medicineService.addMedicine(this.medicine).subscribe(res => {
            this.toastr.success("Post is added successfully")
            this.requestSent = false
            this.router.navigate(['/user/medicines-list'])
          }, err => {
            this.toastr.error(err)
            this.requestSent = false
          })})
      }else{
        this.toastr.error("Image is required")
        this.requestSent = false
      }
     
    }

    }


  onCategoryChange(event : any){
    var id = event.target.value;
    id -=1;
    if(id < 0)
      this.category = ""
    else
      this.category = this.categories[id].name

  }

  onFileSelect(event : any){
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}

    var mimeType = event.target.files[0].type;
    this.img = event.target.files[0]
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
	}

  private setPost(b : any){
    this.medicine.name = b.name
    this.medicine.description = b.description,
    this.medicine.quantity = b.quantity
    this.medicine.categoryId = b.category.id
    this.category = b.category.name,
    this.medicine.imageUrl = b.imageUrl
    this.url = b.imageUrl,
    this.medicine.userEmail = b.user.email
  }

}

