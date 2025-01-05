import fs from "fs";
import ejs from "ejs";

class ForgotPasswordTemplate {
  public passwordResetTemplate(username: string, resetLink: string): string {
    return ejs.render(fs.readFileSync(__dirname + "/forgot-password-template.ejs", "utf8"), {
      username,
      resetLink,
      image_url: "https://www.pngfind.com/pngs/m/202-2021817_password-icon-png-forgot-password-icon-transparent-png.png"
    });
  }
}
export const forgotPasswordTemplate: ForgotPasswordTemplate = new ForgotPasswordTemplate();
