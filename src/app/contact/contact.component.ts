import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  FormData: FormGroup;
  contact;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.FormData = this.formBuilder.group({
      Fullname: new FormControl('', [Validators.required]),
      // Email: new FormControl('', [
      //   Validators.compose([Validators.required, Validators.email]),
      // ]),
      Email: new FormControl('', [Validators.required]),
      Comment: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(FormData) {
    console.log(FormData);
    this.contact.PostMessage(FormData).subscribe(
      (response) => {
        location.href = 'https://mailthis.to/confirm';
        console.log(response);
      },
      (error) => {
        console.warn(error.responseText);
        console.log({ error });
      }
    );
  }
}
