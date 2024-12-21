import mongoose, { Model, model, Schema } from "mongoose";
import { notificationService } from "@service/db/notification.service";
import { INotification, INotificationDocument } from "@notification/interfaces/notification.interface";

const notificationSchema: Schema = new Schema({
  userTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  userFrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  read: { type: Boolean, default: false },
  message: { type: String, default: "" },
  notificationTypes: String,
  entityId: mongoose.Types.ObjectId,
  createdItemId: mongoose.Types.ObjectId,
  comment: { type: String, default: "" },
  reaction: { type: String, default: "" },
  post: { type: String, default: "" },
  imgId: { type: String, default: "" },
  imgVersion: { type: String, default: "" },
  gifUrl: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now() }
});

notificationSchema.methods.insertNotification = async function (body: INotification) {
  const {
    userTo,
    userFrom,
    message,
    notificationType,
    entityId,
    createdItemId,
    createdAt,
    comment,
    reaction,
    post,
    imgId,
    imgVersion,
    gifUrl
  } = body;

  await NotificationModel.create({
    userTo,
    userFrom,
    message,
    notificationType,
    entityId,
    createdItemId,
    createdAt,
    comment,
    reaction,
    post,
    imgId,
    imgVersion,
    gifUrl
  });

  try {
    const notification: INotificationDocument[] = await notificationService.getNotifications(userTo);
    return notification;
  } catch (error) {
    return error;
  }
};
const NotificationModel: Model<INotificationDocument> = model<INotificationDocument>("Notification", notificationSchema, "Notification");
export { NotificationModel };
