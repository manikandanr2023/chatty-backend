import { authMockRequest, authMockResponse, authUserPayload } from "@root/mocks/auth.mock";
import { userQueue } from "@service/queues/user.queue";
import { UserCache } from "@service/redis/user.cache";
import { Request, Response } from "express";
import { UpdateSettings } from "../update-settings";

jest.useFakeTimers();
jest.mock("@service/queues/base.queue");
jest.mock("@service/redis/user.cache");

describe("settings", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe("update", () => {
    it('should call "addUserJob" methods', async () => {
      const settings = {
        messages: true,
        reactions: false,
        comments: true,
        follows: false
      };
      const req: Request = authMockRequest({}, settings, authUserPayload) as Request;
      const res: Response = authMockResponse();
      jest.spyOn(UserCache.prototype, "updateSingleUserItemInCache");
      jest.spyOn(userQueue, "addUserJob");

      await UpdateSettings.prototype.notification(req, res);
      expect(UserCache.prototype.updateSingleUserItemInCache).toHaveBeenCalledWith(`${req.currentUser?.userId}`, "notifications", req.body);
      expect(userQueue.addUserJob).toHaveBeenCalledWith("updateNotificationSettings", {
        key: `${req.currentUser!.userId}`,
        value: req.body
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Notification settings updated successfully", settings: req.body });
    });
  });
});
