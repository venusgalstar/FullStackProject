import { Injectable } from '@nestjs/common';
import { MailData } from './mail.interface';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class AppService {

  constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    return 'Hello World!ef';
  }

  mailTo(mailData: MailData):string  {
    console.log(mailData);
    this.mailerService
      .sendMail({
        to: "humanbright529@gmail.com", // list of receivers
        from: 'EugineePizerbert107@gmail.com', // sender address
        subject: 'PurseManager Project Issue✔', // Subject line
        text: 'test',
        html: '<b>welcome</b><br>' + mailData.content + '<br><b>from</b><br>' + mailData.contact, // HTML body content
      })
      .then(() => {
        console.log("ok");
      })
      .catch((e) => {
        console.log("fail",e);
      });
    return "0";
  }
}
