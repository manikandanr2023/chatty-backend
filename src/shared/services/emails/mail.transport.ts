import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import Logger from "bunyan";
import sendGridMail from "@sendgrid/mail";
import { config } from "@root/config";
import { BadRequestError } from "@global/helpers/error-handler";

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}
const log: Logger = config.createLogger("mailOptions");
console.log(config.NODE_ENV);
sendGridMail.setApiKey(config.SENDGRID_API_KEY!);

class MailTransport {
  public async sendEmail(receiverEmail: string, subject: string, body: string): Promise<void> {
    if (config.NODE_ENV === "test" || config.NODE_ENV === "development") {
      this.developmentEmailSender(receiverEmail, subject, body);
    } else {
      this.productionEmailSender(receiverEmail, subject, body);
    }
  }
  private async developmentEmailSender(receiverEmail: string, subject: string, body: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,

      auth: {
        user: config.SENDER_EMAIL!,
        pass: config.SENDER_EMAIL_PASSWORD!
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions: IMailOptions = {
      from: `Chatty APP <${config.SENDER_EMAIL!}>`,
      to: receiverEmail,
      subject,
      html: body
    };

    try {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log("Error occurred. " + err.message);
          return process.exit(1);
        }

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
      log.info("Development email sent successfully.");
    } catch (error) {
      log.error("Error sending email", error);
      throw new BadRequestError("Error sending email");
    }
  }
  private async productionEmailSender(receiverEmail: string, subject: string, body: string): Promise<void> {
    const mailOptions: IMailOptions = {
      from: `Chatty APP <${config.SENDER_EMAIL!}>`,
      to: receiverEmail,
      subject,
      html: body
    };

    try {
      await sendGridMail.send(mailOptions);
      log.info("Production email sent successfully.");
    } catch (error) {
      log.error("Error sending email", error);
      throw new BadRequestError("Error sending email");
    }
  }
}

export const mailTransport: MailTransport = new MailTransport();
