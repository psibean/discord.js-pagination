import { EmojiIdentifierResolvable, Message, MessageEmbed, MessageReaction, ReactionCollector, ReactionCollectorOptions, User } from "discord.js";

interface PageResolverParameters {
  paginatedEmbedMessage?: MessageEmbed;
  pages?: MessageEmbed[];
  emojiList?: string[];
  currentPageIndex?: number;
  reaction?: MessageReaction;
}

interface CollectorFilterParameters {
  reaction?: MessageReaction;
  user?: User;
  emojiList: string[];
}

interface BaseHandlerParameters {
  receivedMessage?: Message;
  paginatedEmbedMessage?: MessageEmbed;
}

interface CollectErrorHandlerParameters extends BaseHandlerParameters {
  error?: Error;
  reactionCollector?: ReactionCollector;
}

interface CollectEndHandlerParameters extends BaseHandlerParameters {
  collected?: Collection<Snowflake, MessageReaction>;
  reason?: string;
}

interface PaginationOptions extends ReactionCollectorOptions {
  emojiList?: EmojiIdentifierResolvable[];
  footerResolver?(pageIndex: number, pagesLength: number): string;
  sendMessage?(receivedMessage: Message, pageEmbed: MessageEmbed): Promise<Message>;
  collectorFilter?(collectorFilterParameters?: CollectorFilterParameters): boolean | Promise<boolean>;
  pageResolver?(pageResolverParameters?: PageResolverParameters): number | Promise<number>;
  collectErrorHandler?(collectErrorHandlerParameters?: CollectErrorHandlerParameters): void | Promise<void>;
  collectorEndHandler?(collectorEndHandlerParameters?: CollectEndHandlerParameters): void | Promise<void>;
}

declare function paginationEmbed(receivedMessage: Message, pages: MessageEmbed[], paginationOptions?: PaginationOptions): Promise<Message>;

export = paginationEmbed;
