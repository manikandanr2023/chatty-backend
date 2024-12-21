import { notificationService } from "@service/db/notification.service";
import { Request, Response } from "express";
import { authUserPayload } from "@root/mocks/auth.mock";
import { Get } from "@notification/controllers/get-notifications";
import { notificationData, notificationMockRequest, notificationMockResponse } from "@root/mocks/notification.mock";

jest.useFakeTimers();
jest.mock("@service/queues/base.queue");
jest.mock("@service/db/notification.service");

describe("Get", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("should send correct json response", async () => {
    const req: Request = notificationMockRequest({}, authUserPayload, { notificationId: "12345" }) as Request;
    const res: Response = notificationMockResponse();
    jest.spyOn(notificationService, "getNotifications").mockResolvedValue([notificationData]);

    await Get.prototype.notifications(req, res);
    expect(notificationService.getNotifications).toHaveBeenCalledWith(req.currentUser!.userId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User notifications",
      notifications: [notificationData]
    });
  });
});
