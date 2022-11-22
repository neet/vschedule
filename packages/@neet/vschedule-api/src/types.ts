export const TYPES = Object.freeze({
  YoutubeApiService: Symbol('YoutubeApiService'),
  YoutubeWebsubService: Symbol('YoutubeWebsubService'),
  YoutubeWebsubParser: Symbol('YoutubeWebsubParser'),

  PerformerRepository: Symbol('PerformerRepository'),
  OrganizationRepository: Symbol('OrganizationRepository'),
  OrganizationFactory: Symbol('OrganizationFactory'),
  PerformerFactory: Symbol('PerformerFactory'),
  MediaAttachmentRepository: Symbol('MediaAttachmentRepository'),
  StreamRepository: Symbol('StreamRepository'),
  ResubscriptionTaskRepository: Symbol('ResubscriptionTaskRepository'),
  TokenRepository: Symbol('TokenRepository'),
  UserRepository: Symbol('UserRepository'),
  ChannelRepository: Symbol('ChannelRepository'),

  StreamQueryService: Symbol('StreamQueryService'),
  PerformerQueryService: Symbol('PerformerQueryService'),
  OrganizationQueryService: Symbol('OrganizationQueryService'),

  PrismaClient: Symbol('PrismaClient'),
  Storage: Symbol('Storage'),
  Logger: Symbol('Logger'),
  Config: Symbol('Config'),

  Authenticated: Symbol('Authenticated'),
  Authenticate: Symbol('Authenticate'),
});
