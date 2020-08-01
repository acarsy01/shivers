import { Channel } from "../modules/Discordeno/structures/channel.ts";
import { Message } from "../modules/Discordeno/structures/message.ts";

import EventEmitter from "../modules/events/mod.ts";
import { eventHandlers } from "../modules/Discordeno/module/client.ts";

export const messageCollectors: messageCollector[] = [];

export interface messageCollectorOptions {
  time?: number;
  maxMatches?: number;
}

export class messageCollector extends EventEmitter {
  filter: ((message: Message) => boolean);
  channel: Channel;
  options: messageCollectorOptions;
  ended: boolean;
  collected: Message[];

  constructor(channel: Channel, filter: ((message: Message) => boolean), options: messageCollectorOptions = {}) {
    super();

    this.filter = filter;
    this.channel = channel;
    this.options = options;
    this.ended = false;
    this.collected = [];

    messageCollectors.push(this);

    if (options.time) {
      setTimeout(() => {
        this.stop("time");
      }, options.time);
    }
  }

  verify(message: Message) {
    if (this.channel.id !== message.channel.id) {
      return false;
    }

    if (this.filter(message)) {
      this.collected.push(message);

      this.emit("message", message);
      if ((typeof this.options.maxMatches === "number") && (this.collected.length >= this.options.maxMatches)) this.stop("maxMatches");
      return true;
    }

    return false;
  }

  stop(reason: string) {
    if (this.ended) return;
    this.ended = true;

    messageCollectors.splice(messageCollectors.indexOf(this), 1);
    this.emit("end", this.collected, reason);
  }
}

export let messageListening = false;

export const awaitMessages = ((channel: Channel, filter: ((message: Message) => boolean), options: messageCollectorOptions = {}): Message[] => {
  if (!messageListening) {
    messageListening = true;
  }

  const collector = new messageCollector(channel, filter, options);
  return (new Promise(resolve => collector.on("end", resolve)) as any);
});