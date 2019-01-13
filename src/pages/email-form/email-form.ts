import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ImageProvider } from '../../providers/image/image';
import { EmailProvider } from '../../providers/email/email';

@Component({
  selector: 'page-email-form',
  templateUrl: 'email-form.html',
})
export class EmailFormPage {
  public form  : FormGroup;
  private _attachment : any;

  constructor(public navCtrl 		: NavController,
              private _ALERT       : AlertController,
              private _FORM	    : FormBuilder,
              private _IMAGE 		: ImageProvider,
              private _EMAIL       : EmailProvider) {
    // Create a FormGroup object to implement validation
    // on the template fields
    // VERY basic validation as you can see - I.e. NO empty fields!
    this.form = this._FORM.group({
      "to"            : ["", Validators.required],
      "cc"            : ["", Validators.required],
      "bcc"           : ["", Validators.required],
      "subject"       : ["", Validators.required],
      "message"       : ["", Validators.required]
    });
  }

  
  /**
  *
  * @public
  * @method retrieveAttachment
  * @return {none}
  */
  retrieveAttachment() : void {
    this._IMAGE.selectPhotograph()
    .then((attachment : any) =>
    {
      // Assign retrieved image to private property
      // which we'll subsequently access within the
      // sendMessage method
      this._attachment = attachment;
    });
  }


  /**
  *
  * @public
  * @method displayMessage
  * @param title    	{string}      Heading for the alert window
  * @param subTitle   {string}      Message for the alert window
  * @return {none}
  */
  displayMessage(title : string, subTitle : string) : void {
    let alert : any 		=  this._ALERT.create({
    title 		: title,
    subTitle 	: subTitle,
    buttons    : ['Got it']
    });
    alert.present();
  }

  /**
  *
  * @public
  * @method sendMessage
  * @return {none}
  */
  sendMessage() : void {
    // Retrieve the validated form fields
    let to 		: string		= this.form.controls["to"].value,
    cc 		: string		= this.form.controls["cc"].value,
    bcc 		: string		= this.form.controls["cc"].value,
    subject 	: string		= this.form.controls["subject"].value,
    message 	: string		= this.form.controls["message"].value;

    // Has the user selected an attachment?
    if(this._attachment.length > 1){
      // If so call the sendEmail method of the EmailProvider service, pass in
      // the retrieved form data and watch the magic happen! :)
      this._EMAIL.sendEmail(to, cc, bcc, this._attachment, subject, message);
    }
    else
    {
      // Inform the user that they need to add an attachment
      this.displayMessage('Error', 'You need to select an attachment');
    }
  }


}
