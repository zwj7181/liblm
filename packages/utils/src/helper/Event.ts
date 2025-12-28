// legacy

import { EventEmitter } from "@noah-libjs/utils";

export type EventCallback_Old = (data: any) => void;

export class EventEmitter_Old {
  /**
   * 事件集
   */
  private static events = new Map<string, Array<EventCallback_Old>>();
  private static getCb(e: string) {
    return EventEmitter_Old.events.get(e) ?? []
  }
  /**
   * 分发事件
   * @param event
   * @param data
   */
  public static dispatch = (event: string, data?: any) => {
    if (!EventEmitter_Old.events.get(event)) {
      return;
    }
    const callbacks: Array<EventCallback_Old> = EventEmitter_Old.getCb(event);
    callbacks.forEach((callback) => {
      callback(data);
    });
  };

  /**
   * 订阅事件
   */
  public static subscribe = (event: string, callback: EventCallback_Old) => {
    let callbacks: Array<EventCallback_Old> = EventEmitter_Old.getCb(event);
    if (!callbacks) {
      callbacks = Array<EventCallback_Old>();
    }
    callbacks.push(callback);
    EventEmitter_Old.events.set(event, callbacks);
  };

  /**
   * 取消事件订阅
   */
  public static unSubscribe = (event: string, callback: EventCallback_Old) => {
    let callbacks: Array<EventCallback_Old> = EventEmitter_Old.getCb(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback, 0);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
      EventEmitter_Old.events.set(event, callbacks);
    }
  };
}



export const event = new EventEmitter();



