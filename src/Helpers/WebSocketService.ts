// WebSocketService.ts

class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: { [key: string]: ((data: any) => void)[] } = {};

  connect(url: string) {
    try {
      this.socket = new WebSocket(url);

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type && this.listeners[data.type]) {
            this.listeners[data.type].forEach((listener) => listener(data));
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      this.socket.onopen = () => {
        console.log("WebSocket connected");
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      this.socket.onclose = (event) => {
        console.log("WebSocket disconnected:", event.reason);
      };
    } catch (error) {
      console.error("Error connecting to WebSocket:", error);
    }
  }

  subscribe(type: string, callback: (data: any) => void) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

  unsubscribe(type: string, callback: (data: any) => void) {
    if (this.listeners[type]) {
      this.listeners[type] = this.listeners[type].filter(
        (cb) => cb !== callback
      );
    }
  }

  send(message: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify(message));
      } catch (error) {
        console.error("Error sending WebSocket message:", error);
      }
    } else {
      console.error("WebSocket is not connected");
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const webSocketService = new WebSocketService();
