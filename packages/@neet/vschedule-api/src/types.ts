export const TYPES = Object.freeze({
  YoutubeApiService: Symbol('YoutubeApiService'),
  YoutubeWebsubService: Symbol('YoutubeWebsubService'),
  YoutubeWebsubParser: Symbol('YoutubeWebsubParser'),

  PerformerRepository: Symbol('PerformerRepository'),
  OrganizationRepository: Symbol('OrganizationRepository'),
  MediaAttachmentRepository: Symbol('MediaAttachmentRepository'),
  StreamRepository: Symbol('StreamRepository'),
  ResubscriptionTaskRepository: Symbol('ResubscriptionTaskRepository'),
  TokenRepository: Symbol('TokenRepository'),
  UserRepository: Symbol('UserRepository'),

  StreamQueryService: Symbol('StreamQueryService'),
  PerformerQueryService: Symbol('PerformerQueryService'),
  OrganizationQueryService: Symbol('OrganizationQueryService'),

  PrismaClient: Symbol('PrismaClient'),
  Storage: Symbol('Storage'),
  Logger: Symbol('Logger'),
  AppConfig: Symbol('AppConfig'),

  Authenticated: Symbol('Authenticated'),
  Authenticate: Symbol('Authenticate'),
});
