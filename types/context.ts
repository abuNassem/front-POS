export interface Context{
    notify: Notification;
       setNotify: (val: Notification) => void;
       clearNotify: () => void;
       online:boolean,
       handlePing:(status:boolean)=>void
}


export interface Notification {
    message: string;
    type: "success" | "error" | null;
    errorCode?: string;
}