export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export interface Content {
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  public: Scalars['Int'];
  url: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  recommend: Scalars['Boolean'];
  source: Source;
}

export interface Query {
  content: Content;
  contents: Content[];
  source: Source;
  sources: Source[];
}

export interface QueryContentArgs {
  id: Scalars['ID'];
}

export interface QuerySourceArgs {
  id: Scalars['ID'];
}

export interface Source {
  id: Scalars['ID'];
  name: Scalars['String'];
  latinName: Scalars['String'];
  ruby: Scalars['String'];
  avatar: Scalars['String'];
  color: Scalars['String'];
  description: Scalars['String'];
  public: Scalars['Int'];
  position: Scalars['Int'];
  association?: Maybe<SourceAssociation>;
}

export interface SourceAssociation {
  youtube?: Maybe<YoutubeChannel>;
  twitter?: Maybe<TwitterAccount>;
}

export interface TwitterAccount {
  id: Scalars['ID'];
  source: Scalars['ID'];
  screenName: Scalars['String'];
}

export interface YoutubeChannel {
  id: Scalars['ID'];
  source: Scalars['ID'];
  channel: Scalars['ID'];
  channelName: Scalars['String'];
  creationOrder: Scalars['Int'];
}
import { Context } from '../context';

import { GraphQLResolveInfo } from 'graphql';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export interface StitchingResolver<TResult, TParent, TContext, TArgs> {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: {};
  ID: Scalars['ID'];
  Content: Content;
  string: Scalars['String'];
  Int: Scalars['Int'];
  boolean: Scalars['Boolean'];
  Source: Source;
  SourceAssociation: SourceAssociation;
  YoutubeChannel: YoutubeChannel;
  TwitterAccount: TwitterAccount;
}>;

export type ContentResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Content']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  public?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recommend?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['Source'], ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Query']
> = ResolversObject<{
  content?: Resolver<
    ResolversTypes['Content'],
    ParentType,
    ContextType,
    QueryContentArgs
  >;
  contents?: Resolver<ResolversTypes['Content'][], ParentType, ContextType>;
  source?: Resolver<
    ResolversTypes['Source'],
    ParentType,
    ContextType,
    QuerySourceArgs
  >;
  sources?: Resolver<ResolversTypes['Source'][], ParentType, ContextType>;
}>;

export type SourceResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Source']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latinName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ruby?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  public?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  association?: Resolver<
    Maybe<ResolversTypes['SourceAssociation']>,
    ParentType,
    ContextType
  >;
}>;

export type SourceAssociationResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['SourceAssociation']
> = ResolversObject<{
  youtube?: Resolver<
    Maybe<ResolversTypes['YoutubeChannel']>,
    ParentType,
    ContextType
  >;
  twitter?: Resolver<
    Maybe<ResolversTypes['TwitterAccount']>,
    ParentType,
    ContextType
  >;
}>;

export type TwitterAccountResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['TwitterAccount']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  screenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type YoutubeChannelResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['YoutubeChannel']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  channelName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creationOrder?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Content?: ContentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Source?: SourceResolvers<ContextType>;
  SourceAssociation?: SourceAssociationResolvers<ContextType>;
  TwitterAccount?: TwitterAccountResolvers<ContextType>;
  YoutubeChannel?: YoutubeChannelResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
