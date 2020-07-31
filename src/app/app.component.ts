import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'demo';
  public errorMsg='';
  public employees:any=[];
 
  constructor(private fb:FormBuilder,private servive:ApiService){
    
  }
  ngOnInit(){
    this.getData(); 
  }

  //////to display the user who has logged in we use @viewchild for it!
  
  @ViewChild('temp') temp:ElementRef;
  ngAfterViewInit() {
   console.log("afterinit");
   setTimeout(() => {
     console.log(`welcome ${this.temp.nativeElement.value}!!`);
   }, 1000);
 }
 
  ngForm=this.fb.group({
    userName:['venkat',Validators.required ],
    password:['',Validators.compose([Validators.required,Validators.minLength(3)])],
    confirmPassword:['',Validators.compose([Validators.required,Validators.minLength(3)])]
  })

  get userName(){
    return this.ngForm.controls['userName'];
  }

  get password(){
    return this.ngForm.controls['password'];
  }
 get confirmPassword(){
   return this.ngForm.controls['confirmPassword'];
 }

 getData(){
   this.servive.get().subscribe(data=>{
     this.employees=data
    })
  
 }


 enroll(){
  this.servive.post(this.ngForm.value).subscribe(data=>{
    this.getData()
    console.log(data);
  })
  ,(error:any)=>{
    this.errorMsg=error.statusText;
}
 }

}
