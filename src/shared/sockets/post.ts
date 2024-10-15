import { Server, Socket } from "socket.io";

export let socketIOPostObject: Server;

export class SocketIOPostHandler {
  private io: Server;
  constructor(io: Server) {
    this.io = io;
    socketIOPostObject = io;
  }
  public listen(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.io.on("connection", (socket: Socket) => {
      console.log("Post socketio handler");
    });
  }
}

export function prototype(prototype: any, arg1: string) {
  throw new Error('Function not implemented.');
}
