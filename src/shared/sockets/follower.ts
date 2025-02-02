import { Socket, Server } from "socket.io";
import { IFollowers } from "@follower/interfaces/follower.interface";
export let socketIOFollowerObject: Server;

export class SocketIOFollowersHandler {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    socketIOFollowerObject = io;
  }

  public listen(): void {
    this.io.on("connection", (socket: Socket) => {
      socket.on("unfollow user", (data: IFollowers) => {
        this.io.emit("remove follower", data);
      });
    });
  }
}
