import fs from "fs";
import ejs from "ejs";
import { IResetPasswordParams } from "@user/interfaces/user.interface";

class ResetPasswordTemplate {
  public passwordResetConfirmationTemplate(templateParams: IResetPasswordParams): string {
    const { username, email, ipaddress, date } = templateParams;
    return ejs.render(fs.readFileSync(__dirname + "/reset-password-template.ejs", "utf8"), {
      username,
      email,
      ipaddress,
      date,
      image_url: "https://www.pngfind.com/pngs/m/202-2021817_password-icon-png-forgot-password-icon-transparent-png.png"
    });
  }
}
export const resetPasswordTemplate: ResetPasswordTemplate = new ResetPasswordTemplate();
