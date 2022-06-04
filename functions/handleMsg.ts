
 export default async function sendMessageFunc(senderId : string, receiverId : string, text : string, socket:any, senderName){

    await socket.emit("sendMessage", {
      senderId: senderId,
      receiverId,
      text: text,
      senderName : senderName
    });
    return true;
  };