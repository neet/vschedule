export const TYPES = Object.freeze({
  YoutubeApiService: Symbol('YoutubeApiService'),
  YoutubeWebsubService: Symbol('YoutubeWebsubService'),

  ActorRepository: Symbol('IActorRepository'),
  MediaAttachmentRepository: Symbol('MediaAttachmentRepository'),
  StreamRepository: Symbol('StreamRepository'),
  JobRepository: Symbol('JobRepository'),

  PrismaClient: Symbol('PrismaClient'),
  Storage: Symbol('Storage'),
  AppConfig: Symbol('AppConfig'),

  YoutubeHmacMiddleware: Symbol('YoutubeHmacMiddleware'),
});
