import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from '../auth.service';
import{FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { ProfileImage } from "src/app/models/profile-image";
import { ProfileImageService } from "src/app/services/profile-image.service";

import{ApiService} from './../api.service'

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css'],

})
export class AdminRegistrationComponent implements OnInit {



public registerObj ={Image:'' ,firstName:'' ,lastName:'',email:'',password:''}

  constructor(private api : ApiService,private profileService: ProfileImageService) {

   }




  url="./assets/img_avatar.png";


  sendData(){
    console.log(this.registerObj)
    this.api.registerAdmin(this.registerObj)
    alert('Register sucess')
  }

  form: FormGroup;
  profile: ProfileImage;
  imageData: string;



  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.profileService.addProfile(this.form.value.name, this.form.value.image);
    this.form.reset();
    this.imageData = null;
  }

}





