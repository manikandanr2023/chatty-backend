import HTTP_STATUS from "http-status-codes";
import { IFileImageDocument } from "@image/interfaces/image.interface";
import { imageService } from "@service/db/image.service";
import { Request, Response } from "express";

export class Get {
  public async images(req: Request, res: Response): Promise<void> {
    const images: IFileImageDocument[] = await imageService.getImages(req.params.userId);
    res.status(HTTP_STATUS.OK).json({
      message: "User images",
      images
    });
  }
}
