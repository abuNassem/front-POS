export interface Context{
    notify: Notification;
       setNotify: (val: Notification) => void;
       clearNotify: () => void;
}


export interface Notification {
    message: string;
    type: "success" | "error" | null;
    errorCode?: string;
}