import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

// AIzaSyDACsxzsC1MwlFBGR2_BI-B6m9jhE6_pao

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      transport: {
        service: "gmail",
        auth: {
          // user: "DavidSparker0417@gmail.com",
          // pass: "apawxyotyerpxwxt",
          user: "EugineePizerbert107@gmail.com",
          pass: "pteuvrhdhzfilhai",
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
