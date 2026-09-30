
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>
/**
 * Model Gift
 * 
 */
export type Gift = $Result.DefaultSelection<Prisma.$GiftPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model Offer
 * 
 */
export type Offer = $Result.DefaultSelection<Prisma.$OfferPayload>
/**
 * Model PvpRoom
 * 
 */
export type PvpRoom = $Result.DefaultSelection<Prisma.$PvpRoomPayload>
/**
 * Model PvpParticipant
 * 
 */
export type PvpParticipant = $Result.DefaultSelection<Prisma.$PvpParticipantPayload>
/**
 * Model PvpInvitation
 * 
 */
export type PvpInvitation = $Result.DefaultSelection<Prisma.$PvpInvitationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gift`: Exposes CRUD operations for the **Gift** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Gifts
    * const gifts = await prisma.gift.findMany()
    * ```
    */
  get gift(): Prisma.GiftDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.offer`: Exposes CRUD operations for the **Offer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Offers
    * const offers = await prisma.offer.findMany()
    * ```
    */
  get offer(): Prisma.OfferDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pvpRoom`: Exposes CRUD operations for the **PvpRoom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PvpRooms
    * const pvpRooms = await prisma.pvpRoom.findMany()
    * ```
    */
  get pvpRoom(): Prisma.PvpRoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pvpParticipant`: Exposes CRUD operations for the **PvpParticipant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PvpParticipants
    * const pvpParticipants = await prisma.pvpParticipant.findMany()
    * ```
    */
  get pvpParticipant(): Prisma.PvpParticipantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pvpInvitation`: Exposes CRUD operations for the **PvpInvitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PvpInvitations
    * const pvpInvitations = await prisma.pvpInvitation.findMany()
    * ```
    */
  get pvpInvitation(): Prisma.PvpInvitationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Wallet: 'Wallet',
    Gift: 'Gift',
    Transaction: 'Transaction',
    Offer: 'Offer',
    PvpRoom: 'PvpRoom',
    PvpParticipant: 'PvpParticipant',
    PvpInvitation: 'PvpInvitation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "wallet" | "gift" | "transaction" | "offer" | "pvpRoom" | "pvpParticipant" | "pvpInvitation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Wallet: {
        payload: Prisma.$WalletPayload<ExtArgs>
        fields: Prisma.WalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findFirst: {
            args: Prisma.WalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findMany: {
            args: Prisma.WalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          create: {
            args: Prisma.WalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          createMany: {
            args: Prisma.WalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          delete: {
            args: Prisma.WalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          update: {
            args: Prisma.WalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          deleteMany: {
            args: Prisma.WalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          upsert: {
            args: Prisma.WalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.WalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
      Gift: {
        payload: Prisma.$GiftPayload<ExtArgs>
        fields: Prisma.GiftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GiftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GiftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          findFirst: {
            args: Prisma.GiftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GiftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          findMany: {
            args: Prisma.GiftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>[]
          }
          create: {
            args: Prisma.GiftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          createMany: {
            args: Prisma.GiftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GiftCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>[]
          }
          delete: {
            args: Prisma.GiftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          update: {
            args: Prisma.GiftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          deleteMany: {
            args: Prisma.GiftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GiftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GiftUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>[]
          }
          upsert: {
            args: Prisma.GiftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          aggregate: {
            args: Prisma.GiftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGift>
          }
          groupBy: {
            args: Prisma.GiftGroupByArgs<ExtArgs>
            result: $Utils.Optional<GiftGroupByOutputType>[]
          }
          count: {
            args: Prisma.GiftCountArgs<ExtArgs>
            result: $Utils.Optional<GiftCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      Offer: {
        payload: Prisma.$OfferPayload<ExtArgs>
        fields: Prisma.OfferFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfferFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfferFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          findFirst: {
            args: Prisma.OfferFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfferFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          findMany: {
            args: Prisma.OfferFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>[]
          }
          create: {
            args: Prisma.OfferCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          createMany: {
            args: Prisma.OfferCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OfferCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>[]
          }
          delete: {
            args: Prisma.OfferDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          update: {
            args: Prisma.OfferUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          deleteMany: {
            args: Prisma.OfferDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfferUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OfferUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>[]
          }
          upsert: {
            args: Prisma.OfferUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          aggregate: {
            args: Prisma.OfferAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOffer>
          }
          groupBy: {
            args: Prisma.OfferGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfferGroupByOutputType>[]
          }
          count: {
            args: Prisma.OfferCountArgs<ExtArgs>
            result: $Utils.Optional<OfferCountAggregateOutputType> | number
          }
        }
      }
      PvpRoom: {
        payload: Prisma.$PvpRoomPayload<ExtArgs>
        fields: Prisma.PvpRoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PvpRoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpRoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PvpRoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpRoomPayload>
          }
          findFirst: {
            args: Prisma.PvpRoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpRoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PvpRoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpRoomPayload>
          }
          findMany: {
            args: Prisma.PvpRoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpRoomPayload>[]
          }
          create: {
            args: Prisma.PvpRoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpRoomPayload>
          }
          createMany: {
            args: Prisma.PvpRoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PvpRoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpRoomPayload>[]
          }
          delete: {
            args: Prisma.PvpRoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpRoomPayload>
          }
          update: {
            args: Prisma.PvpRoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpRoomPayload>
          }
          deleteMany: {
            args: Prisma.PvpRoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PvpRoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PvpRoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpRoomPayload>[]
          }
          upsert: {
            args: Prisma.PvpRoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpRoomPayload>
          }
          aggregate: {
            args: Prisma.PvpRoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePvpRoom>
          }
          groupBy: {
            args: Prisma.PvpRoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<PvpRoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.PvpRoomCountArgs<ExtArgs>
            result: $Utils.Optional<PvpRoomCountAggregateOutputType> | number
          }
        }
      }
      PvpParticipant: {
        payload: Prisma.$PvpParticipantPayload<ExtArgs>
        fields: Prisma.PvpParticipantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PvpParticipantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpParticipantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PvpParticipantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpParticipantPayload>
          }
          findFirst: {
            args: Prisma.PvpParticipantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpParticipantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PvpParticipantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpParticipantPayload>
          }
          findMany: {
            args: Prisma.PvpParticipantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpParticipantPayload>[]
          }
          create: {
            args: Prisma.PvpParticipantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpParticipantPayload>
          }
          createMany: {
            args: Prisma.PvpParticipantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PvpParticipantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpParticipantPayload>[]
          }
          delete: {
            args: Prisma.PvpParticipantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpParticipantPayload>
          }
          update: {
            args: Prisma.PvpParticipantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpParticipantPayload>
          }
          deleteMany: {
            args: Prisma.PvpParticipantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PvpParticipantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PvpParticipantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpParticipantPayload>[]
          }
          upsert: {
            args: Prisma.PvpParticipantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpParticipantPayload>
          }
          aggregate: {
            args: Prisma.PvpParticipantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePvpParticipant>
          }
          groupBy: {
            args: Prisma.PvpParticipantGroupByArgs<ExtArgs>
            result: $Utils.Optional<PvpParticipantGroupByOutputType>[]
          }
          count: {
            args: Prisma.PvpParticipantCountArgs<ExtArgs>
            result: $Utils.Optional<PvpParticipantCountAggregateOutputType> | number
          }
        }
      }
      PvpInvitation: {
        payload: Prisma.$PvpInvitationPayload<ExtArgs>
        fields: Prisma.PvpInvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PvpInvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpInvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PvpInvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpInvitationPayload>
          }
          findFirst: {
            args: Prisma.PvpInvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpInvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PvpInvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpInvitationPayload>
          }
          findMany: {
            args: Prisma.PvpInvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpInvitationPayload>[]
          }
          create: {
            args: Prisma.PvpInvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpInvitationPayload>
          }
          createMany: {
            args: Prisma.PvpInvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PvpInvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpInvitationPayload>[]
          }
          delete: {
            args: Prisma.PvpInvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpInvitationPayload>
          }
          update: {
            args: Prisma.PvpInvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpInvitationPayload>
          }
          deleteMany: {
            args: Prisma.PvpInvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PvpInvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PvpInvitationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpInvitationPayload>[]
          }
          upsert: {
            args: Prisma.PvpInvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvpInvitationPayload>
          }
          aggregate: {
            args: Prisma.PvpInvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePvpInvitation>
          }
          groupBy: {
            args: Prisma.PvpInvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PvpInvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PvpInvitationCountArgs<ExtArgs>
            result: $Utils.Optional<PvpInvitationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    wallet?: WalletOmit
    gift?: GiftOmit
    transaction?: TransactionOmit
    offer?: OfferOmit
    pvpRoom?: PvpRoomOmit
    pvpParticipant?: PvpParticipantOmit
    pvpInvitation?: PvpInvitationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    wallets: number
    gifts: number
    buyerTransactions: number
    sellerTransactions: number
    buyerOffers: number
    sellerOffers: number
    createdPvpRooms: number
    wonPvpRooms: number
    pvpParticipations: number
    sentPvpInvitations: number
    receivedPvpInvitations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallets?: boolean | UserCountOutputTypeCountWalletsArgs
    gifts?: boolean | UserCountOutputTypeCountGiftsArgs
    buyerTransactions?: boolean | UserCountOutputTypeCountBuyerTransactionsArgs
    sellerTransactions?: boolean | UserCountOutputTypeCountSellerTransactionsArgs
    buyerOffers?: boolean | UserCountOutputTypeCountBuyerOffersArgs
    sellerOffers?: boolean | UserCountOutputTypeCountSellerOffersArgs
    createdPvpRooms?: boolean | UserCountOutputTypeCountCreatedPvpRoomsArgs
    wonPvpRooms?: boolean | UserCountOutputTypeCountWonPvpRoomsArgs
    pvpParticipations?: boolean | UserCountOutputTypeCountPvpParticipationsArgs
    sentPvpInvitations?: boolean | UserCountOutputTypeCountSentPvpInvitationsArgs
    receivedPvpInvitations?: boolean | UserCountOutputTypeCountReceivedPvpInvitationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWalletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGiftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GiftWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBuyerTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSellerTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBuyerOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSellerOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedPvpRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PvpRoomWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWonPvpRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PvpRoomWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPvpParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PvpParticipantWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentPvpInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PvpInvitationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedPvpInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PvpInvitationWhereInput
  }


  /**
   * Count Type GiftCountOutputType
   */

  export type GiftCountOutputType = {
    transactions: number
    offers: number
  }

  export type GiftCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | GiftCountOutputTypeCountTransactionsArgs
    offers?: boolean | GiftCountOutputTypeCountOffersArgs
  }

  // Custom InputTypes
  /**
   * GiftCountOutputType without action
   */
  export type GiftCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftCountOutputType
     */
    select?: GiftCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GiftCountOutputType without action
   */
  export type GiftCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * GiftCountOutputType without action
   */
  export type GiftCountOutputTypeCountOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferWhereInput
  }


  /**
   * Count Type PvpRoomCountOutputType
   */

  export type PvpRoomCountOutputType = {
    participants: number
    invitations: number
  }

  export type PvpRoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | PvpRoomCountOutputTypeCountParticipantsArgs
    invitations?: boolean | PvpRoomCountOutputTypeCountInvitationsArgs
  }

  // Custom InputTypes
  /**
   * PvpRoomCountOutputType without action
   */
  export type PvpRoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoomCountOutputType
     */
    select?: PvpRoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PvpRoomCountOutputType without action
   */
  export type PvpRoomCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PvpParticipantWhereInput
  }

  /**
   * PvpRoomCountOutputType without action
   */
  export type PvpRoomCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PvpInvitationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    telegramId: string | null
    username: string | null
    firstName: string | null
    lastName: string | null
    photoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    telegramId: string | null
    username: string | null
    firstName: string | null
    lastName: string | null
    photoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    telegramId: number
    username: number
    firstName: number
    lastName: number
    photoUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    lastName?: true
    photoUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    lastName?: true
    photoUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    lastName?: true
    photoUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    telegramId: string
    username: string | null
    firstName: string | null
    lastName: string | null
    photoUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    wallets?: boolean | User$walletsArgs<ExtArgs>
    gifts?: boolean | User$giftsArgs<ExtArgs>
    buyerTransactions?: boolean | User$buyerTransactionsArgs<ExtArgs>
    sellerTransactions?: boolean | User$sellerTransactionsArgs<ExtArgs>
    buyerOffers?: boolean | User$buyerOffersArgs<ExtArgs>
    sellerOffers?: boolean | User$sellerOffersArgs<ExtArgs>
    createdPvpRooms?: boolean | User$createdPvpRoomsArgs<ExtArgs>
    wonPvpRooms?: boolean | User$wonPvpRoomsArgs<ExtArgs>
    pvpParticipations?: boolean | User$pvpParticipationsArgs<ExtArgs>
    sentPvpInvitations?: boolean | User$sentPvpInvitationsArgs<ExtArgs>
    receivedPvpInvitations?: boolean | User$receivedPvpInvitationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "telegramId" | "username" | "firstName" | "lastName" | "photoUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallets?: boolean | User$walletsArgs<ExtArgs>
    gifts?: boolean | User$giftsArgs<ExtArgs>
    buyerTransactions?: boolean | User$buyerTransactionsArgs<ExtArgs>
    sellerTransactions?: boolean | User$sellerTransactionsArgs<ExtArgs>
    buyerOffers?: boolean | User$buyerOffersArgs<ExtArgs>
    sellerOffers?: boolean | User$sellerOffersArgs<ExtArgs>
    createdPvpRooms?: boolean | User$createdPvpRoomsArgs<ExtArgs>
    wonPvpRooms?: boolean | User$wonPvpRoomsArgs<ExtArgs>
    pvpParticipations?: boolean | User$pvpParticipationsArgs<ExtArgs>
    sentPvpInvitations?: boolean | User$sentPvpInvitationsArgs<ExtArgs>
    receivedPvpInvitations?: boolean | User$receivedPvpInvitationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      wallets: Prisma.$WalletPayload<ExtArgs>[]
      gifts: Prisma.$GiftPayload<ExtArgs>[]
      buyerTransactions: Prisma.$TransactionPayload<ExtArgs>[]
      sellerTransactions: Prisma.$TransactionPayload<ExtArgs>[]
      buyerOffers: Prisma.$OfferPayload<ExtArgs>[]
      sellerOffers: Prisma.$OfferPayload<ExtArgs>[]
      createdPvpRooms: Prisma.$PvpRoomPayload<ExtArgs>[]
      wonPvpRooms: Prisma.$PvpRoomPayload<ExtArgs>[]
      pvpParticipations: Prisma.$PvpParticipantPayload<ExtArgs>[]
      sentPvpInvitations: Prisma.$PvpInvitationPayload<ExtArgs>[]
      receivedPvpInvitations: Prisma.$PvpInvitationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      telegramId: string
      username: string | null
      firstName: string | null
      lastName: string | null
      photoUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallets<T extends User$walletsArgs<ExtArgs> = {}>(args?: Subset<T, User$walletsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gifts<T extends User$giftsArgs<ExtArgs> = {}>(args?: Subset<T, User$giftsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    buyerTransactions<T extends User$buyerTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$buyerTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sellerTransactions<T extends User$sellerTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sellerTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    buyerOffers<T extends User$buyerOffersArgs<ExtArgs> = {}>(args?: Subset<T, User$buyerOffersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sellerOffers<T extends User$sellerOffersArgs<ExtArgs> = {}>(args?: Subset<T, User$sellerOffersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdPvpRooms<T extends User$createdPvpRoomsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdPvpRoomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wonPvpRooms<T extends User$wonPvpRoomsArgs<ExtArgs> = {}>(args?: Subset<T, User$wonPvpRoomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pvpParticipations<T extends User$pvpParticipationsArgs<ExtArgs> = {}>(args?: Subset<T, User$pvpParticipationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentPvpInvitations<T extends User$sentPvpInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$sentPvpInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedPvpInvitations<T extends User$receivedPvpInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedPvpInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly telegramId: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly photoUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.wallets
   */
  export type User$walletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    cursor?: WalletWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * User.gifts
   */
  export type User$giftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    where?: GiftWhereInput
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    cursor?: GiftWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GiftScalarFieldEnum | GiftScalarFieldEnum[]
  }

  /**
   * User.buyerTransactions
   */
  export type User$buyerTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User.sellerTransactions
   */
  export type User$sellerTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User.buyerOffers
   */
  export type User$buyerOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    where?: OfferWhereInput
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    cursor?: OfferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * User.sellerOffers
   */
  export type User$sellerOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    where?: OfferWhereInput
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    cursor?: OfferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * User.createdPvpRooms
   */
  export type User$createdPvpRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomInclude<ExtArgs> | null
    where?: PvpRoomWhereInput
    orderBy?: PvpRoomOrderByWithRelationInput | PvpRoomOrderByWithRelationInput[]
    cursor?: PvpRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PvpRoomScalarFieldEnum | PvpRoomScalarFieldEnum[]
  }

  /**
   * User.wonPvpRooms
   */
  export type User$wonPvpRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomInclude<ExtArgs> | null
    where?: PvpRoomWhereInput
    orderBy?: PvpRoomOrderByWithRelationInput | PvpRoomOrderByWithRelationInput[]
    cursor?: PvpRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PvpRoomScalarFieldEnum | PvpRoomScalarFieldEnum[]
  }

  /**
   * User.pvpParticipations
   */
  export type User$pvpParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantInclude<ExtArgs> | null
    where?: PvpParticipantWhereInput
    orderBy?: PvpParticipantOrderByWithRelationInput | PvpParticipantOrderByWithRelationInput[]
    cursor?: PvpParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PvpParticipantScalarFieldEnum | PvpParticipantScalarFieldEnum[]
  }

  /**
   * User.sentPvpInvitations
   */
  export type User$sentPvpInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationInclude<ExtArgs> | null
    where?: PvpInvitationWhereInput
    orderBy?: PvpInvitationOrderByWithRelationInput | PvpInvitationOrderByWithRelationInput[]
    cursor?: PvpInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PvpInvitationScalarFieldEnum | PvpInvitationScalarFieldEnum[]
  }

  /**
   * User.receivedPvpInvitations
   */
  export type User$receivedPvpInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationInclude<ExtArgs> | null
    where?: PvpInvitationWhereInput
    orderBy?: PvpInvitationOrderByWithRelationInput | PvpInvitationOrderByWithRelationInput[]
    cursor?: PvpInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PvpInvitationScalarFieldEnum | PvpInvitationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletMinAggregateOutputType = {
    id: string | null
    address: string | null
    network: string | null
    isConnected: boolean | null
    createdAt: Date | null
    userId: string | null
  }

  export type WalletMaxAggregateOutputType = {
    id: string | null
    address: string | null
    network: string | null
    isConnected: boolean | null
    createdAt: Date | null
    userId: string | null
  }

  export type WalletCountAggregateOutputType = {
    id: number
    address: number
    network: number
    isConnected: number
    createdAt: number
    userId: number
    _all: number
  }


  export type WalletMinAggregateInputType = {
    id?: true
    address?: true
    network?: true
    isConnected?: true
    createdAt?: true
    userId?: true
  }

  export type WalletMaxAggregateInputType = {
    id?: true
    address?: true
    network?: true
    isConnected?: true
    createdAt?: true
    userId?: true
  }

  export type WalletCountAggregateInputType = {
    id?: true
    address?: true
    network?: true
    isConnected?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallet to aggregate.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type WalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithAggregationInput | WalletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: WalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    id: string
    address: string
    network: string
    isConnected: boolean
    createdAt: Date
    userId: string
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type WalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    network?: boolean
    isConnected?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    network?: boolean
    isConnected?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    network?: boolean
    isConnected?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectScalar = {
    id?: boolean
    address?: boolean
    network?: boolean
    isConnected?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type WalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "address" | "network" | "isConnected" | "createdAt" | "userId", ExtArgs["result"]["wallet"]>
  export type WalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WalletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      address: string
      network: string
      isConnected: boolean
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = $Result.GetResult<Prisma.$WalletPayload, S>

  type WalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface WalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallet'], meta: { name: 'Wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {WalletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletFindUniqueArgs>(args: SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletFindFirstArgs>(args?: SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletWithIdOnly = await prisma.wallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletFindManyArgs>(args?: SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallet.
     * @param {WalletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends WalletCreateArgs>(args: SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallets.
     * @param {WalletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletCreateManyArgs>(args?: SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallets and returns the data saved in the database.
     * @param {WalletCreateManyAndReturnArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wallet.
     * @param {WalletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends WalletDeleteArgs>(args: SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallet.
     * @param {WalletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletUpdateArgs>(args: SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallets.
     * @param {WalletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletDeleteManyArgs>(args?: SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletUpdateManyArgs>(args: SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets and returns the data updated in the database.
     * @param {WalletUpdateManyAndReturnArgs} args - Arguments to update many Wallets.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WalletUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wallet.
     * @param {WalletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends WalletUpsertArgs>(args: SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends WalletCountArgs>(
      args?: Subset<T, WalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletGroupByArgs['orderBy'] }
        : { orderBy?: WalletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallet model
   */
  readonly fields: WalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Wallet model
   */
  interface WalletFieldRefs {
    readonly id: FieldRef<"Wallet", 'String'>
    readonly address: FieldRef<"Wallet", 'String'>
    readonly network: FieldRef<"Wallet", 'String'>
    readonly isConnected: FieldRef<"Wallet", 'Boolean'>
    readonly createdAt: FieldRef<"Wallet", 'DateTime'>
    readonly userId: FieldRef<"Wallet", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Wallet findUnique
   */
  export type WalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findUniqueOrThrow
   */
  export type WalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findFirst
   */
  export type WalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findFirstOrThrow
   */
  export type WalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findMany
   */
  export type WalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallets to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet create
   */
  export type WalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to create a Wallet.
     */
    data: XOR<WalletCreateInput, WalletUncheckedCreateInput>
  }

  /**
   * Wallet createMany
   */
  export type WalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet createManyAndReturn
   */
  export type WalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet update
   */
  export type WalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to update a Wallet.
     */
    data: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
    /**
     * Choose, which Wallet to update.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet updateMany
   */
  export type WalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
  }

  /**
   * Wallet updateManyAndReturn
   */
  export type WalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet upsert
   */
  export type WalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The filter to search for the Wallet to update in case it exists.
     */
    where: WalletWhereUniqueInput
    /**
     * In case the Wallet found by the `where` argument doesn't exist, create a new Wallet with this data.
     */
    create: XOR<WalletCreateInput, WalletUncheckedCreateInput>
    /**
     * In case the Wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
  }

  /**
   * Wallet delete
   */
  export type WalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter which Wallet to delete.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet deleteMany
   */
  export type WalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallets to delete
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to delete.
     */
    limit?: number
  }

  /**
   * Wallet without action
   */
  export type WalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
  }


  /**
   * Model Gift
   */

  export type AggregateGift = {
    _count: GiftCountAggregateOutputType | null
    _avg: GiftAvgAggregateOutputType | null
    _sum: GiftSumAggregateOutputType | null
    _min: GiftMinAggregateOutputType | null
    _max: GiftMaxAggregateOutputType | null
  }

  export type GiftAvgAggregateOutputType = {
    priceTon: Decimal | null
  }

  export type GiftSumAggregateOutputType = {
    priceTon: Decimal | null
  }

  export type GiftMinAggregateOutputType = {
    id: string | null
    name: string | null
    collection: string | null
    emoji: string | null
    priceTon: Decimal | null
    backdropName: string | null
    backdropColor: string | null
    symbolName: string | null
    symbolImageUrl: string | null
    status: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GiftMaxAggregateOutputType = {
    id: string | null
    name: string | null
    collection: string | null
    emoji: string | null
    priceTon: Decimal | null
    backdropName: string | null
    backdropColor: string | null
    symbolName: string | null
    symbolImageUrl: string | null
    status: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GiftCountAggregateOutputType = {
    id: number
    name: number
    collection: number
    emoji: number
    priceTon: number
    backdropName: number
    backdropColor: number
    symbolName: number
    symbolImageUrl: number
    status: number
    ownerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GiftAvgAggregateInputType = {
    priceTon?: true
  }

  export type GiftSumAggregateInputType = {
    priceTon?: true
  }

  export type GiftMinAggregateInputType = {
    id?: true
    name?: true
    collection?: true
    emoji?: true
    priceTon?: true
    backdropName?: true
    backdropColor?: true
    symbolName?: true
    symbolImageUrl?: true
    status?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GiftMaxAggregateInputType = {
    id?: true
    name?: true
    collection?: true
    emoji?: true
    priceTon?: true
    backdropName?: true
    backdropColor?: true
    symbolName?: true
    symbolImageUrl?: true
    status?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GiftCountAggregateInputType = {
    id?: true
    name?: true
    collection?: true
    emoji?: true
    priceTon?: true
    backdropName?: true
    backdropColor?: true
    symbolName?: true
    symbolImageUrl?: true
    status?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GiftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gift to aggregate.
     */
    where?: GiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gifts to fetch.
     */
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Gifts
    **/
    _count?: true | GiftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GiftAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GiftSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GiftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GiftMaxAggregateInputType
  }

  export type GetGiftAggregateType<T extends GiftAggregateArgs> = {
        [P in keyof T & keyof AggregateGift]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGift[P]>
      : GetScalarType<T[P], AggregateGift[P]>
  }




  export type GiftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GiftWhereInput
    orderBy?: GiftOrderByWithAggregationInput | GiftOrderByWithAggregationInput[]
    by: GiftScalarFieldEnum[] | GiftScalarFieldEnum
    having?: GiftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GiftCountAggregateInputType | true
    _avg?: GiftAvgAggregateInputType
    _sum?: GiftSumAggregateInputType
    _min?: GiftMinAggregateInputType
    _max?: GiftMaxAggregateInputType
  }

  export type GiftGroupByOutputType = {
    id: string
    name: string
    collection: string
    emoji: string | null
    priceTon: Decimal
    backdropName: string | null
    backdropColor: string | null
    symbolName: string | null
    symbolImageUrl: string | null
    status: string
    ownerId: string | null
    createdAt: Date
    updatedAt: Date
    _count: GiftCountAggregateOutputType | null
    _avg: GiftAvgAggregateOutputType | null
    _sum: GiftSumAggregateOutputType | null
    _min: GiftMinAggregateOutputType | null
    _max: GiftMaxAggregateOutputType | null
  }

  type GetGiftGroupByPayload<T extends GiftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GiftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GiftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GiftGroupByOutputType[P]>
            : GetScalarType<T[P], GiftGroupByOutputType[P]>
        }
      >
    >


  export type GiftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    collection?: boolean
    emoji?: boolean
    priceTon?: boolean
    backdropName?: boolean
    backdropColor?: boolean
    symbolName?: boolean
    symbolImageUrl?: boolean
    status?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | Gift$ownerArgs<ExtArgs>
    transactions?: boolean | Gift$transactionsArgs<ExtArgs>
    offers?: boolean | Gift$offersArgs<ExtArgs>
    _count?: boolean | GiftCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gift"]>

  export type GiftSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    collection?: boolean
    emoji?: boolean
    priceTon?: boolean
    backdropName?: boolean
    backdropColor?: boolean
    symbolName?: boolean
    symbolImageUrl?: boolean
    status?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | Gift$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["gift"]>

  export type GiftSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    collection?: boolean
    emoji?: boolean
    priceTon?: boolean
    backdropName?: boolean
    backdropColor?: boolean
    symbolName?: boolean
    symbolImageUrl?: boolean
    status?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | Gift$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["gift"]>

  export type GiftSelectScalar = {
    id?: boolean
    name?: boolean
    collection?: boolean
    emoji?: boolean
    priceTon?: boolean
    backdropName?: boolean
    backdropColor?: boolean
    symbolName?: boolean
    symbolImageUrl?: boolean
    status?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GiftOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "collection" | "emoji" | "priceTon" | "backdropName" | "backdropColor" | "symbolName" | "symbolImageUrl" | "status" | "ownerId" | "createdAt" | "updatedAt", ExtArgs["result"]["gift"]>
  export type GiftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Gift$ownerArgs<ExtArgs>
    transactions?: boolean | Gift$transactionsArgs<ExtArgs>
    offers?: boolean | Gift$offersArgs<ExtArgs>
    _count?: boolean | GiftCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GiftIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Gift$ownerArgs<ExtArgs>
  }
  export type GiftIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Gift$ownerArgs<ExtArgs>
  }

  export type $GiftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Gift"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs> | null
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      offers: Prisma.$OfferPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      collection: string
      emoji: string | null
      priceTon: Prisma.Decimal
      backdropName: string | null
      backdropColor: string | null
      symbolName: string | null
      symbolImageUrl: string | null
      status: string
      ownerId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["gift"]>
    composites: {}
  }

  type GiftGetPayload<S extends boolean | null | undefined | GiftDefaultArgs> = $Result.GetResult<Prisma.$GiftPayload, S>

  type GiftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GiftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GiftCountAggregateInputType | true
    }

  export interface GiftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Gift'], meta: { name: 'Gift' } }
    /**
     * Find zero or one Gift that matches the filter.
     * @param {GiftFindUniqueArgs} args - Arguments to find a Gift
     * @example
     * // Get one Gift
     * const gift = await prisma.gift.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GiftFindUniqueArgs>(args: SelectSubset<T, GiftFindUniqueArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Gift that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GiftFindUniqueOrThrowArgs} args - Arguments to find a Gift
     * @example
     * // Get one Gift
     * const gift = await prisma.gift.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GiftFindUniqueOrThrowArgs>(args: SelectSubset<T, GiftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gift that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftFindFirstArgs} args - Arguments to find a Gift
     * @example
     * // Get one Gift
     * const gift = await prisma.gift.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GiftFindFirstArgs>(args?: SelectSubset<T, GiftFindFirstArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gift that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftFindFirstOrThrowArgs} args - Arguments to find a Gift
     * @example
     * // Get one Gift
     * const gift = await prisma.gift.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GiftFindFirstOrThrowArgs>(args?: SelectSubset<T, GiftFindFirstOrThrowArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Gifts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Gifts
     * const gifts = await prisma.gift.findMany()
     * 
     * // Get first 10 Gifts
     * const gifts = await prisma.gift.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const giftWithIdOnly = await prisma.gift.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GiftFindManyArgs>(args?: SelectSubset<T, GiftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Gift.
     * @param {GiftCreateArgs} args - Arguments to create a Gift.
     * @example
     * // Create one Gift
     * const Gift = await prisma.gift.create({
     *   data: {
     *     // ... data to create a Gift
     *   }
     * })
     * 
     */
    create<T extends GiftCreateArgs>(args: SelectSubset<T, GiftCreateArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Gifts.
     * @param {GiftCreateManyArgs} args - Arguments to create many Gifts.
     * @example
     * // Create many Gifts
     * const gift = await prisma.gift.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GiftCreateManyArgs>(args?: SelectSubset<T, GiftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Gifts and returns the data saved in the database.
     * @param {GiftCreateManyAndReturnArgs} args - Arguments to create many Gifts.
     * @example
     * // Create many Gifts
     * const gift = await prisma.gift.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Gifts and only return the `id`
     * const giftWithIdOnly = await prisma.gift.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GiftCreateManyAndReturnArgs>(args?: SelectSubset<T, GiftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Gift.
     * @param {GiftDeleteArgs} args - Arguments to delete one Gift.
     * @example
     * // Delete one Gift
     * const Gift = await prisma.gift.delete({
     *   where: {
     *     // ... filter to delete one Gift
     *   }
     * })
     * 
     */
    delete<T extends GiftDeleteArgs>(args: SelectSubset<T, GiftDeleteArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Gift.
     * @param {GiftUpdateArgs} args - Arguments to update one Gift.
     * @example
     * // Update one Gift
     * const gift = await prisma.gift.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GiftUpdateArgs>(args: SelectSubset<T, GiftUpdateArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Gifts.
     * @param {GiftDeleteManyArgs} args - Arguments to filter Gifts to delete.
     * @example
     * // Delete a few Gifts
     * const { count } = await prisma.gift.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GiftDeleteManyArgs>(args?: SelectSubset<T, GiftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Gifts
     * const gift = await prisma.gift.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GiftUpdateManyArgs>(args: SelectSubset<T, GiftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gifts and returns the data updated in the database.
     * @param {GiftUpdateManyAndReturnArgs} args - Arguments to update many Gifts.
     * @example
     * // Update many Gifts
     * const gift = await prisma.gift.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Gifts and only return the `id`
     * const giftWithIdOnly = await prisma.gift.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GiftUpdateManyAndReturnArgs>(args: SelectSubset<T, GiftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Gift.
     * @param {GiftUpsertArgs} args - Arguments to update or create a Gift.
     * @example
     * // Update or create a Gift
     * const gift = await prisma.gift.upsert({
     *   create: {
     *     // ... data to create a Gift
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Gift we want to update
     *   }
     * })
     */
    upsert<T extends GiftUpsertArgs>(args: SelectSubset<T, GiftUpsertArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Gifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftCountArgs} args - Arguments to filter Gifts to count.
     * @example
     * // Count the number of Gifts
     * const count = await prisma.gift.count({
     *   where: {
     *     // ... the filter for the Gifts we want to count
     *   }
     * })
    **/
    count<T extends GiftCountArgs>(
      args?: Subset<T, GiftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GiftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Gift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GiftAggregateArgs>(args: Subset<T, GiftAggregateArgs>): Prisma.PrismaPromise<GetGiftAggregateType<T>>

    /**
     * Group by Gift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GiftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GiftGroupByArgs['orderBy'] }
        : { orderBy?: GiftGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GiftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGiftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Gift model
   */
  readonly fields: GiftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Gift.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GiftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends Gift$ownerArgs<ExtArgs> = {}>(args?: Subset<T, Gift$ownerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Gift$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Gift$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    offers<T extends Gift$offersArgs<ExtArgs> = {}>(args?: Subset<T, Gift$offersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Gift model
   */
  interface GiftFieldRefs {
    readonly id: FieldRef<"Gift", 'String'>
    readonly name: FieldRef<"Gift", 'String'>
    readonly collection: FieldRef<"Gift", 'String'>
    readonly emoji: FieldRef<"Gift", 'String'>
    readonly priceTon: FieldRef<"Gift", 'Decimal'>
    readonly backdropName: FieldRef<"Gift", 'String'>
    readonly backdropColor: FieldRef<"Gift", 'String'>
    readonly symbolName: FieldRef<"Gift", 'String'>
    readonly symbolImageUrl: FieldRef<"Gift", 'String'>
    readonly status: FieldRef<"Gift", 'String'>
    readonly ownerId: FieldRef<"Gift", 'String'>
    readonly createdAt: FieldRef<"Gift", 'DateTime'>
    readonly updatedAt: FieldRef<"Gift", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Gift findUnique
   */
  export type GiftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gift to fetch.
     */
    where: GiftWhereUniqueInput
  }

  /**
   * Gift findUniqueOrThrow
   */
  export type GiftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gift to fetch.
     */
    where: GiftWhereUniqueInput
  }

  /**
   * Gift findFirst
   */
  export type GiftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gift to fetch.
     */
    where?: GiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gifts to fetch.
     */
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gifts.
     */
    cursor?: GiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gifts.
     */
    distinct?: GiftScalarFieldEnum | GiftScalarFieldEnum[]
  }

  /**
   * Gift findFirstOrThrow
   */
  export type GiftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gift to fetch.
     */
    where?: GiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gifts to fetch.
     */
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gifts.
     */
    cursor?: GiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gifts.
     */
    distinct?: GiftScalarFieldEnum | GiftScalarFieldEnum[]
  }

  /**
   * Gift findMany
   */
  export type GiftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gifts to fetch.
     */
    where?: GiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gifts to fetch.
     */
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Gifts.
     */
    cursor?: GiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gifts.
     */
    distinct?: GiftScalarFieldEnum | GiftScalarFieldEnum[]
  }

  /**
   * Gift create
   */
  export type GiftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * The data needed to create a Gift.
     */
    data: XOR<GiftCreateInput, GiftUncheckedCreateInput>
  }

  /**
   * Gift createMany
   */
  export type GiftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Gifts.
     */
    data: GiftCreateManyInput | GiftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Gift createManyAndReturn
   */
  export type GiftCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * The data used to create many Gifts.
     */
    data: GiftCreateManyInput | GiftCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Gift update
   */
  export type GiftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * The data needed to update a Gift.
     */
    data: XOR<GiftUpdateInput, GiftUncheckedUpdateInput>
    /**
     * Choose, which Gift to update.
     */
    where: GiftWhereUniqueInput
  }

  /**
   * Gift updateMany
   */
  export type GiftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Gifts.
     */
    data: XOR<GiftUpdateManyMutationInput, GiftUncheckedUpdateManyInput>
    /**
     * Filter which Gifts to update
     */
    where?: GiftWhereInput
    /**
     * Limit how many Gifts to update.
     */
    limit?: number
  }

  /**
   * Gift updateManyAndReturn
   */
  export type GiftUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * The data used to update Gifts.
     */
    data: XOR<GiftUpdateManyMutationInput, GiftUncheckedUpdateManyInput>
    /**
     * Filter which Gifts to update
     */
    where?: GiftWhereInput
    /**
     * Limit how many Gifts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Gift upsert
   */
  export type GiftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * The filter to search for the Gift to update in case it exists.
     */
    where: GiftWhereUniqueInput
    /**
     * In case the Gift found by the `where` argument doesn't exist, create a new Gift with this data.
     */
    create: XOR<GiftCreateInput, GiftUncheckedCreateInput>
    /**
     * In case the Gift was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GiftUpdateInput, GiftUncheckedUpdateInput>
  }

  /**
   * Gift delete
   */
  export type GiftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter which Gift to delete.
     */
    where: GiftWhereUniqueInput
  }

  /**
   * Gift deleteMany
   */
  export type GiftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gifts to delete
     */
    where?: GiftWhereInput
    /**
     * Limit how many Gifts to delete.
     */
    limit?: number
  }

  /**
   * Gift.owner
   */
  export type Gift$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Gift.transactions
   */
  export type Gift$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Gift.offers
   */
  export type Gift$offersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    where?: OfferWhereInput
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    cursor?: OfferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Gift without action
   */
  export type GiftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amountTon: Decimal | null
  }

  export type TransactionSumAggregateOutputType = {
    amountTon: Decimal | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    type: string | null
    status: string | null
    amountTon: Decimal | null
    giftId: string | null
    buyerId: string | null
    sellerId: string | null
    txHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    type: string | null
    status: string | null
    amountTon: Decimal | null
    giftId: string | null
    buyerId: string | null
    sellerId: string | null
    txHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    type: number
    status: number
    amountTon: number
    giftId: number
    buyerId: number
    sellerId: number
    txHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amountTon?: true
  }

  export type TransactionSumAggregateInputType = {
    amountTon?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    type?: true
    status?: true
    amountTon?: true
    giftId?: true
    buyerId?: true
    sellerId?: true
    txHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    type?: true
    status?: true
    amountTon?: true
    giftId?: true
    buyerId?: true
    sellerId?: true
    txHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    type?: true
    status?: true
    amountTon?: true
    giftId?: true
    buyerId?: true
    sellerId?: true
    txHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    type: string
    status: string
    amountTon: Decimal
    giftId: string | null
    buyerId: string | null
    sellerId: string | null
    txHash: string | null
    createdAt: Date
    updatedAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    amountTon?: boolean
    giftId?: boolean
    buyerId?: boolean
    sellerId?: boolean
    txHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gift?: boolean | Transaction$giftArgs<ExtArgs>
    buyer?: boolean | Transaction$buyerArgs<ExtArgs>
    seller?: boolean | Transaction$sellerArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    amountTon?: boolean
    giftId?: boolean
    buyerId?: boolean
    sellerId?: boolean
    txHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gift?: boolean | Transaction$giftArgs<ExtArgs>
    buyer?: boolean | Transaction$buyerArgs<ExtArgs>
    seller?: boolean | Transaction$sellerArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    amountTon?: boolean
    giftId?: boolean
    buyerId?: boolean
    sellerId?: boolean
    txHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gift?: boolean | Transaction$giftArgs<ExtArgs>
    buyer?: boolean | Transaction$buyerArgs<ExtArgs>
    seller?: boolean | Transaction$sellerArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    type?: boolean
    status?: boolean
    amountTon?: boolean
    giftId?: boolean
    buyerId?: boolean
    sellerId?: boolean
    txHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "status" | "amountTon" | "giftId" | "buyerId" | "sellerId" | "txHash" | "createdAt" | "updatedAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gift?: boolean | Transaction$giftArgs<ExtArgs>
    buyer?: boolean | Transaction$buyerArgs<ExtArgs>
    seller?: boolean | Transaction$sellerArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gift?: boolean | Transaction$giftArgs<ExtArgs>
    buyer?: boolean | Transaction$buyerArgs<ExtArgs>
    seller?: boolean | Transaction$sellerArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gift?: boolean | Transaction$giftArgs<ExtArgs>
    buyer?: boolean | Transaction$buyerArgs<ExtArgs>
    seller?: boolean | Transaction$sellerArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      gift: Prisma.$GiftPayload<ExtArgs> | null
      buyer: Prisma.$UserPayload<ExtArgs> | null
      seller: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      status: string
      amountTon: Prisma.Decimal
      giftId: string | null
      buyerId: string | null
      sellerId: string | null
      txHash: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gift<T extends Transaction$giftArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$giftArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    buyer<T extends Transaction$buyerArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$buyerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    seller<T extends Transaction$sellerArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$sellerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'String'>
    readonly status: FieldRef<"Transaction", 'String'>
    readonly amountTon: FieldRef<"Transaction", 'Decimal'>
    readonly giftId: FieldRef<"Transaction", 'String'>
    readonly buyerId: FieldRef<"Transaction", 'String'>
    readonly sellerId: FieldRef<"Transaction", 'String'>
    readonly txHash: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction.gift
   */
  export type Transaction$giftArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    where?: GiftWhereInput
  }

  /**
   * Transaction.buyer
   */
  export type Transaction$buyerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Transaction.seller
   */
  export type Transaction$sellerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model Offer
   */

  export type AggregateOffer = {
    _count: OfferCountAggregateOutputType | null
    _avg: OfferAvgAggregateOutputType | null
    _sum: OfferSumAggregateOutputType | null
    _min: OfferMinAggregateOutputType | null
    _max: OfferMaxAggregateOutputType | null
  }

  export type OfferAvgAggregateOutputType = {
    amountTon: Decimal | null
  }

  export type OfferSumAggregateOutputType = {
    amountTon: Decimal | null
  }

  export type OfferMinAggregateOutputType = {
    id: string | null
    amountTon: Decimal | null
    status: string | null
    giftId: string | null
    buyerId: string | null
    sellerId: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfferMaxAggregateOutputType = {
    id: string | null
    amountTon: Decimal | null
    status: string | null
    giftId: string | null
    buyerId: string | null
    sellerId: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfferCountAggregateOutputType = {
    id: number
    amountTon: number
    status: number
    giftId: number
    buyerId: number
    sellerId: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OfferAvgAggregateInputType = {
    amountTon?: true
  }

  export type OfferSumAggregateInputType = {
    amountTon?: true
  }

  export type OfferMinAggregateInputType = {
    id?: true
    amountTon?: true
    status?: true
    giftId?: true
    buyerId?: true
    sellerId?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfferMaxAggregateInputType = {
    id?: true
    amountTon?: true
    status?: true
    giftId?: true
    buyerId?: true
    sellerId?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfferCountAggregateInputType = {
    id?: true
    amountTon?: true
    status?: true
    giftId?: true
    buyerId?: true
    sellerId?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OfferAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Offer to aggregate.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Offers
    **/
    _count?: true | OfferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfferMaxAggregateInputType
  }

  export type GetOfferAggregateType<T extends OfferAggregateArgs> = {
        [P in keyof T & keyof AggregateOffer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOffer[P]>
      : GetScalarType<T[P], AggregateOffer[P]>
  }




  export type OfferGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferWhereInput
    orderBy?: OfferOrderByWithAggregationInput | OfferOrderByWithAggregationInput[]
    by: OfferScalarFieldEnum[] | OfferScalarFieldEnum
    having?: OfferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfferCountAggregateInputType | true
    _avg?: OfferAvgAggregateInputType
    _sum?: OfferSumAggregateInputType
    _min?: OfferMinAggregateInputType
    _max?: OfferMaxAggregateInputType
  }

  export type OfferGroupByOutputType = {
    id: string
    amountTon: Decimal
    status: string
    giftId: string
    buyerId: string
    sellerId: string | null
    expiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: OfferCountAggregateOutputType | null
    _avg: OfferAvgAggregateOutputType | null
    _sum: OfferSumAggregateOutputType | null
    _min: OfferMinAggregateOutputType | null
    _max: OfferMaxAggregateOutputType | null
  }

  type GetOfferGroupByPayload<T extends OfferGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfferGroupByOutputType[P]>
            : GetScalarType<T[P], OfferGroupByOutputType[P]>
        }
      >
    >


  export type OfferSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountTon?: boolean
    status?: boolean
    giftId?: boolean
    buyerId?: boolean
    sellerId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gift?: boolean | GiftDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    seller?: boolean | Offer$sellerArgs<ExtArgs>
  }, ExtArgs["result"]["offer"]>

  export type OfferSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountTon?: boolean
    status?: boolean
    giftId?: boolean
    buyerId?: boolean
    sellerId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gift?: boolean | GiftDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    seller?: boolean | Offer$sellerArgs<ExtArgs>
  }, ExtArgs["result"]["offer"]>

  export type OfferSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountTon?: boolean
    status?: boolean
    giftId?: boolean
    buyerId?: boolean
    sellerId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gift?: boolean | GiftDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    seller?: boolean | Offer$sellerArgs<ExtArgs>
  }, ExtArgs["result"]["offer"]>

  export type OfferSelectScalar = {
    id?: boolean
    amountTon?: boolean
    status?: boolean
    giftId?: boolean
    buyerId?: boolean
    sellerId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OfferOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amountTon" | "status" | "giftId" | "buyerId" | "sellerId" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["offer"]>
  export type OfferInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gift?: boolean | GiftDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    seller?: boolean | Offer$sellerArgs<ExtArgs>
  }
  export type OfferIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gift?: boolean | GiftDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    seller?: boolean | Offer$sellerArgs<ExtArgs>
  }
  export type OfferIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gift?: boolean | GiftDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    seller?: boolean | Offer$sellerArgs<ExtArgs>
  }

  export type $OfferPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Offer"
    objects: {
      gift: Prisma.$GiftPayload<ExtArgs>
      buyer: Prisma.$UserPayload<ExtArgs>
      seller: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amountTon: Prisma.Decimal
      status: string
      giftId: string
      buyerId: string
      sellerId: string | null
      expiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["offer"]>
    composites: {}
  }

  type OfferGetPayload<S extends boolean | null | undefined | OfferDefaultArgs> = $Result.GetResult<Prisma.$OfferPayload, S>

  type OfferCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OfferFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OfferCountAggregateInputType | true
    }

  export interface OfferDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Offer'], meta: { name: 'Offer' } }
    /**
     * Find zero or one Offer that matches the filter.
     * @param {OfferFindUniqueArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfferFindUniqueArgs>(args: SelectSubset<T, OfferFindUniqueArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Offer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OfferFindUniqueOrThrowArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfferFindUniqueOrThrowArgs>(args: SelectSubset<T, OfferFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Offer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindFirstArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfferFindFirstArgs>(args?: SelectSubset<T, OfferFindFirstArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Offer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindFirstOrThrowArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfferFindFirstOrThrowArgs>(args?: SelectSubset<T, OfferFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Offers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Offers
     * const offers = await prisma.offer.findMany()
     * 
     * // Get first 10 Offers
     * const offers = await prisma.offer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const offerWithIdOnly = await prisma.offer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OfferFindManyArgs>(args?: SelectSubset<T, OfferFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Offer.
     * @param {OfferCreateArgs} args - Arguments to create a Offer.
     * @example
     * // Create one Offer
     * const Offer = await prisma.offer.create({
     *   data: {
     *     // ... data to create a Offer
     *   }
     * })
     * 
     */
    create<T extends OfferCreateArgs>(args: SelectSubset<T, OfferCreateArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Offers.
     * @param {OfferCreateManyArgs} args - Arguments to create many Offers.
     * @example
     * // Create many Offers
     * const offer = await prisma.offer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfferCreateManyArgs>(args?: SelectSubset<T, OfferCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Offers and returns the data saved in the database.
     * @param {OfferCreateManyAndReturnArgs} args - Arguments to create many Offers.
     * @example
     * // Create many Offers
     * const offer = await prisma.offer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Offers and only return the `id`
     * const offerWithIdOnly = await prisma.offer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OfferCreateManyAndReturnArgs>(args?: SelectSubset<T, OfferCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Offer.
     * @param {OfferDeleteArgs} args - Arguments to delete one Offer.
     * @example
     * // Delete one Offer
     * const Offer = await prisma.offer.delete({
     *   where: {
     *     // ... filter to delete one Offer
     *   }
     * })
     * 
     */
    delete<T extends OfferDeleteArgs>(args: SelectSubset<T, OfferDeleteArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Offer.
     * @param {OfferUpdateArgs} args - Arguments to update one Offer.
     * @example
     * // Update one Offer
     * const offer = await prisma.offer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfferUpdateArgs>(args: SelectSubset<T, OfferUpdateArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Offers.
     * @param {OfferDeleteManyArgs} args - Arguments to filter Offers to delete.
     * @example
     * // Delete a few Offers
     * const { count } = await prisma.offer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfferDeleteManyArgs>(args?: SelectSubset<T, OfferDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Offers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Offers
     * const offer = await prisma.offer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfferUpdateManyArgs>(args: SelectSubset<T, OfferUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Offers and returns the data updated in the database.
     * @param {OfferUpdateManyAndReturnArgs} args - Arguments to update many Offers.
     * @example
     * // Update many Offers
     * const offer = await prisma.offer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Offers and only return the `id`
     * const offerWithIdOnly = await prisma.offer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OfferUpdateManyAndReturnArgs>(args: SelectSubset<T, OfferUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Offer.
     * @param {OfferUpsertArgs} args - Arguments to update or create a Offer.
     * @example
     * // Update or create a Offer
     * const offer = await prisma.offer.upsert({
     *   create: {
     *     // ... data to create a Offer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Offer we want to update
     *   }
     * })
     */
    upsert<T extends OfferUpsertArgs>(args: SelectSubset<T, OfferUpsertArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Offers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferCountArgs} args - Arguments to filter Offers to count.
     * @example
     * // Count the number of Offers
     * const count = await prisma.offer.count({
     *   where: {
     *     // ... the filter for the Offers we want to count
     *   }
     * })
    **/
    count<T extends OfferCountArgs>(
      args?: Subset<T, OfferCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Offer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfferAggregateArgs>(args: Subset<T, OfferAggregateArgs>): Prisma.PrismaPromise<GetOfferAggregateType<T>>

    /**
     * Group by Offer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OfferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfferGroupByArgs['orderBy'] }
        : { orderBy?: OfferGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OfferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Offer model
   */
  readonly fields: OfferFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Offer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfferClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gift<T extends GiftDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GiftDefaultArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    buyer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    seller<T extends Offer$sellerArgs<ExtArgs> = {}>(args?: Subset<T, Offer$sellerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Offer model
   */
  interface OfferFieldRefs {
    readonly id: FieldRef<"Offer", 'String'>
    readonly amountTon: FieldRef<"Offer", 'Decimal'>
    readonly status: FieldRef<"Offer", 'String'>
    readonly giftId: FieldRef<"Offer", 'String'>
    readonly buyerId: FieldRef<"Offer", 'String'>
    readonly sellerId: FieldRef<"Offer", 'String'>
    readonly expiresAt: FieldRef<"Offer", 'DateTime'>
    readonly createdAt: FieldRef<"Offer", 'DateTime'>
    readonly updatedAt: FieldRef<"Offer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Offer findUnique
   */
  export type OfferFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer findUniqueOrThrow
   */
  export type OfferFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer findFirst
   */
  export type OfferFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Offers.
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Offers.
     */
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Offer findFirstOrThrow
   */
  export type OfferFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Offers.
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Offers.
     */
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Offer findMany
   */
  export type OfferFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offers to fetch.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Offers.
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Offers.
     */
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Offer create
   */
  export type OfferCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * The data needed to create a Offer.
     */
    data: XOR<OfferCreateInput, OfferUncheckedCreateInput>
  }

  /**
   * Offer createMany
   */
  export type OfferCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Offers.
     */
    data: OfferCreateManyInput | OfferCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Offer createManyAndReturn
   */
  export type OfferCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * The data used to create many Offers.
     */
    data: OfferCreateManyInput | OfferCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Offer update
   */
  export type OfferUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * The data needed to update a Offer.
     */
    data: XOR<OfferUpdateInput, OfferUncheckedUpdateInput>
    /**
     * Choose, which Offer to update.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer updateMany
   */
  export type OfferUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Offers.
     */
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyInput>
    /**
     * Filter which Offers to update
     */
    where?: OfferWhereInput
    /**
     * Limit how many Offers to update.
     */
    limit?: number
  }

  /**
   * Offer updateManyAndReturn
   */
  export type OfferUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * The data used to update Offers.
     */
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyInput>
    /**
     * Filter which Offers to update
     */
    where?: OfferWhereInput
    /**
     * Limit how many Offers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Offer upsert
   */
  export type OfferUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * The filter to search for the Offer to update in case it exists.
     */
    where: OfferWhereUniqueInput
    /**
     * In case the Offer found by the `where` argument doesn't exist, create a new Offer with this data.
     */
    create: XOR<OfferCreateInput, OfferUncheckedCreateInput>
    /**
     * In case the Offer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfferUpdateInput, OfferUncheckedUpdateInput>
  }

  /**
   * Offer delete
   */
  export type OfferDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter which Offer to delete.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer deleteMany
   */
  export type OfferDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Offers to delete
     */
    where?: OfferWhereInput
    /**
     * Limit how many Offers to delete.
     */
    limit?: number
  }

  /**
   * Offer.seller
   */
  export type Offer$sellerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Offer without action
   */
  export type OfferDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
  }


  /**
   * Model PvpRoom
   */

  export type AggregatePvpRoom = {
    _count: PvpRoomCountAggregateOutputType | null
    _avg: PvpRoomAvgAggregateOutputType | null
    _sum: PvpRoomSumAggregateOutputType | null
    _min: PvpRoomMinAggregateOutputType | null
    _max: PvpRoomMaxAggregateOutputType | null
  }

  export type PvpRoomAvgAggregateOutputType = {
    stakeGram: Decimal | null
  }

  export type PvpRoomSumAggregateOutputType = {
    stakeGram: Decimal | null
  }

  export type PvpRoomMinAggregateOutputType = {
    id: string | null
    code: string | null
    stakeGram: Decimal | null
    status: string | null
    winnerId: string | null
    createdAt: Date | null
    startedAt: Date | null
    completedAt: Date | null
    creatorId: string | null
  }

  export type PvpRoomMaxAggregateOutputType = {
    id: string | null
    code: string | null
    stakeGram: Decimal | null
    status: string | null
    winnerId: string | null
    createdAt: Date | null
    startedAt: Date | null
    completedAt: Date | null
    creatorId: string | null
  }

  export type PvpRoomCountAggregateOutputType = {
    id: number
    code: number
    stakeGram: number
    status: number
    winnerId: number
    createdAt: number
    startedAt: number
    completedAt: number
    creatorId: number
    _all: number
  }


  export type PvpRoomAvgAggregateInputType = {
    stakeGram?: true
  }

  export type PvpRoomSumAggregateInputType = {
    stakeGram?: true
  }

  export type PvpRoomMinAggregateInputType = {
    id?: true
    code?: true
    stakeGram?: true
    status?: true
    winnerId?: true
    createdAt?: true
    startedAt?: true
    completedAt?: true
    creatorId?: true
  }

  export type PvpRoomMaxAggregateInputType = {
    id?: true
    code?: true
    stakeGram?: true
    status?: true
    winnerId?: true
    createdAt?: true
    startedAt?: true
    completedAt?: true
    creatorId?: true
  }

  export type PvpRoomCountAggregateInputType = {
    id?: true
    code?: true
    stakeGram?: true
    status?: true
    winnerId?: true
    createdAt?: true
    startedAt?: true
    completedAt?: true
    creatorId?: true
    _all?: true
  }

  export type PvpRoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PvpRoom to aggregate.
     */
    where?: PvpRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvpRooms to fetch.
     */
    orderBy?: PvpRoomOrderByWithRelationInput | PvpRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PvpRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvpRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvpRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PvpRooms
    **/
    _count?: true | PvpRoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PvpRoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PvpRoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PvpRoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PvpRoomMaxAggregateInputType
  }

  export type GetPvpRoomAggregateType<T extends PvpRoomAggregateArgs> = {
        [P in keyof T & keyof AggregatePvpRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePvpRoom[P]>
      : GetScalarType<T[P], AggregatePvpRoom[P]>
  }




  export type PvpRoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PvpRoomWhereInput
    orderBy?: PvpRoomOrderByWithAggregationInput | PvpRoomOrderByWithAggregationInput[]
    by: PvpRoomScalarFieldEnum[] | PvpRoomScalarFieldEnum
    having?: PvpRoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PvpRoomCountAggregateInputType | true
    _avg?: PvpRoomAvgAggregateInputType
    _sum?: PvpRoomSumAggregateInputType
    _min?: PvpRoomMinAggregateInputType
    _max?: PvpRoomMaxAggregateInputType
  }

  export type PvpRoomGroupByOutputType = {
    id: string
    code: string
    stakeGram: Decimal
    status: string
    winnerId: string | null
    createdAt: Date
    startedAt: Date | null
    completedAt: Date | null
    creatorId: string
    _count: PvpRoomCountAggregateOutputType | null
    _avg: PvpRoomAvgAggregateOutputType | null
    _sum: PvpRoomSumAggregateOutputType | null
    _min: PvpRoomMinAggregateOutputType | null
    _max: PvpRoomMaxAggregateOutputType | null
  }

  type GetPvpRoomGroupByPayload<T extends PvpRoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PvpRoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PvpRoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PvpRoomGroupByOutputType[P]>
            : GetScalarType<T[P], PvpRoomGroupByOutputType[P]>
        }
      >
    >


  export type PvpRoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    stakeGram?: boolean
    status?: boolean
    winnerId?: boolean
    createdAt?: boolean
    startedAt?: boolean
    completedAt?: boolean
    creatorId?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | PvpRoom$winnerArgs<ExtArgs>
    participants?: boolean | PvpRoom$participantsArgs<ExtArgs>
    invitations?: boolean | PvpRoom$invitationsArgs<ExtArgs>
    _count?: boolean | PvpRoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pvpRoom"]>

  export type PvpRoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    stakeGram?: boolean
    status?: boolean
    winnerId?: boolean
    createdAt?: boolean
    startedAt?: boolean
    completedAt?: boolean
    creatorId?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | PvpRoom$winnerArgs<ExtArgs>
  }, ExtArgs["result"]["pvpRoom"]>

  export type PvpRoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    stakeGram?: boolean
    status?: boolean
    winnerId?: boolean
    createdAt?: boolean
    startedAt?: boolean
    completedAt?: boolean
    creatorId?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | PvpRoom$winnerArgs<ExtArgs>
  }, ExtArgs["result"]["pvpRoom"]>

  export type PvpRoomSelectScalar = {
    id?: boolean
    code?: boolean
    stakeGram?: boolean
    status?: boolean
    winnerId?: boolean
    createdAt?: boolean
    startedAt?: boolean
    completedAt?: boolean
    creatorId?: boolean
  }

  export type PvpRoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "stakeGram" | "status" | "winnerId" | "createdAt" | "startedAt" | "completedAt" | "creatorId", ExtArgs["result"]["pvpRoom"]>
  export type PvpRoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | PvpRoom$winnerArgs<ExtArgs>
    participants?: boolean | PvpRoom$participantsArgs<ExtArgs>
    invitations?: boolean | PvpRoom$invitationsArgs<ExtArgs>
    _count?: boolean | PvpRoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PvpRoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | PvpRoom$winnerArgs<ExtArgs>
  }
  export type PvpRoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | PvpRoom$winnerArgs<ExtArgs>
  }

  export type $PvpRoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PvpRoom"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      winner: Prisma.$UserPayload<ExtArgs> | null
      participants: Prisma.$PvpParticipantPayload<ExtArgs>[]
      invitations: Prisma.$PvpInvitationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      stakeGram: Prisma.Decimal
      status: string
      winnerId: string | null
      createdAt: Date
      startedAt: Date | null
      completedAt: Date | null
      creatorId: string
    }, ExtArgs["result"]["pvpRoom"]>
    composites: {}
  }

  type PvpRoomGetPayload<S extends boolean | null | undefined | PvpRoomDefaultArgs> = $Result.GetResult<Prisma.$PvpRoomPayload, S>

  type PvpRoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PvpRoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PvpRoomCountAggregateInputType | true
    }

  export interface PvpRoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PvpRoom'], meta: { name: 'PvpRoom' } }
    /**
     * Find zero or one PvpRoom that matches the filter.
     * @param {PvpRoomFindUniqueArgs} args - Arguments to find a PvpRoom
     * @example
     * // Get one PvpRoom
     * const pvpRoom = await prisma.pvpRoom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PvpRoomFindUniqueArgs>(args: SelectSubset<T, PvpRoomFindUniqueArgs<ExtArgs>>): Prisma__PvpRoomClient<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PvpRoom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PvpRoomFindUniqueOrThrowArgs} args - Arguments to find a PvpRoom
     * @example
     * // Get one PvpRoom
     * const pvpRoom = await prisma.pvpRoom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PvpRoomFindUniqueOrThrowArgs>(args: SelectSubset<T, PvpRoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PvpRoomClient<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PvpRoom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpRoomFindFirstArgs} args - Arguments to find a PvpRoom
     * @example
     * // Get one PvpRoom
     * const pvpRoom = await prisma.pvpRoom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PvpRoomFindFirstArgs>(args?: SelectSubset<T, PvpRoomFindFirstArgs<ExtArgs>>): Prisma__PvpRoomClient<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PvpRoom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpRoomFindFirstOrThrowArgs} args - Arguments to find a PvpRoom
     * @example
     * // Get one PvpRoom
     * const pvpRoom = await prisma.pvpRoom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PvpRoomFindFirstOrThrowArgs>(args?: SelectSubset<T, PvpRoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__PvpRoomClient<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PvpRooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpRoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PvpRooms
     * const pvpRooms = await prisma.pvpRoom.findMany()
     * 
     * // Get first 10 PvpRooms
     * const pvpRooms = await prisma.pvpRoom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pvpRoomWithIdOnly = await prisma.pvpRoom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PvpRoomFindManyArgs>(args?: SelectSubset<T, PvpRoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PvpRoom.
     * @param {PvpRoomCreateArgs} args - Arguments to create a PvpRoom.
     * @example
     * // Create one PvpRoom
     * const PvpRoom = await prisma.pvpRoom.create({
     *   data: {
     *     // ... data to create a PvpRoom
     *   }
     * })
     * 
     */
    create<T extends PvpRoomCreateArgs>(args: SelectSubset<T, PvpRoomCreateArgs<ExtArgs>>): Prisma__PvpRoomClient<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PvpRooms.
     * @param {PvpRoomCreateManyArgs} args - Arguments to create many PvpRooms.
     * @example
     * // Create many PvpRooms
     * const pvpRoom = await prisma.pvpRoom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PvpRoomCreateManyArgs>(args?: SelectSubset<T, PvpRoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PvpRooms and returns the data saved in the database.
     * @param {PvpRoomCreateManyAndReturnArgs} args - Arguments to create many PvpRooms.
     * @example
     * // Create many PvpRooms
     * const pvpRoom = await prisma.pvpRoom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PvpRooms and only return the `id`
     * const pvpRoomWithIdOnly = await prisma.pvpRoom.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PvpRoomCreateManyAndReturnArgs>(args?: SelectSubset<T, PvpRoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PvpRoom.
     * @param {PvpRoomDeleteArgs} args - Arguments to delete one PvpRoom.
     * @example
     * // Delete one PvpRoom
     * const PvpRoom = await prisma.pvpRoom.delete({
     *   where: {
     *     // ... filter to delete one PvpRoom
     *   }
     * })
     * 
     */
    delete<T extends PvpRoomDeleteArgs>(args: SelectSubset<T, PvpRoomDeleteArgs<ExtArgs>>): Prisma__PvpRoomClient<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PvpRoom.
     * @param {PvpRoomUpdateArgs} args - Arguments to update one PvpRoom.
     * @example
     * // Update one PvpRoom
     * const pvpRoom = await prisma.pvpRoom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PvpRoomUpdateArgs>(args: SelectSubset<T, PvpRoomUpdateArgs<ExtArgs>>): Prisma__PvpRoomClient<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PvpRooms.
     * @param {PvpRoomDeleteManyArgs} args - Arguments to filter PvpRooms to delete.
     * @example
     * // Delete a few PvpRooms
     * const { count } = await prisma.pvpRoom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PvpRoomDeleteManyArgs>(args?: SelectSubset<T, PvpRoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PvpRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpRoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PvpRooms
     * const pvpRoom = await prisma.pvpRoom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PvpRoomUpdateManyArgs>(args: SelectSubset<T, PvpRoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PvpRooms and returns the data updated in the database.
     * @param {PvpRoomUpdateManyAndReturnArgs} args - Arguments to update many PvpRooms.
     * @example
     * // Update many PvpRooms
     * const pvpRoom = await prisma.pvpRoom.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PvpRooms and only return the `id`
     * const pvpRoomWithIdOnly = await prisma.pvpRoom.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PvpRoomUpdateManyAndReturnArgs>(args: SelectSubset<T, PvpRoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PvpRoom.
     * @param {PvpRoomUpsertArgs} args - Arguments to update or create a PvpRoom.
     * @example
     * // Update or create a PvpRoom
     * const pvpRoom = await prisma.pvpRoom.upsert({
     *   create: {
     *     // ... data to create a PvpRoom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PvpRoom we want to update
     *   }
     * })
     */
    upsert<T extends PvpRoomUpsertArgs>(args: SelectSubset<T, PvpRoomUpsertArgs<ExtArgs>>): Prisma__PvpRoomClient<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PvpRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpRoomCountArgs} args - Arguments to filter PvpRooms to count.
     * @example
     * // Count the number of PvpRooms
     * const count = await prisma.pvpRoom.count({
     *   where: {
     *     // ... the filter for the PvpRooms we want to count
     *   }
     * })
    **/
    count<T extends PvpRoomCountArgs>(
      args?: Subset<T, PvpRoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PvpRoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PvpRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpRoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PvpRoomAggregateArgs>(args: Subset<T, PvpRoomAggregateArgs>): Prisma.PrismaPromise<GetPvpRoomAggregateType<T>>

    /**
     * Group by PvpRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpRoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PvpRoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PvpRoomGroupByArgs['orderBy'] }
        : { orderBy?: PvpRoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PvpRoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPvpRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PvpRoom model
   */
  readonly fields: PvpRoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PvpRoom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PvpRoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    winner<T extends PvpRoom$winnerArgs<ExtArgs> = {}>(args?: Subset<T, PvpRoom$winnerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    participants<T extends PvpRoom$participantsArgs<ExtArgs> = {}>(args?: Subset<T, PvpRoom$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitations<T extends PvpRoom$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, PvpRoom$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PvpRoom model
   */
  interface PvpRoomFieldRefs {
    readonly id: FieldRef<"PvpRoom", 'String'>
    readonly code: FieldRef<"PvpRoom", 'String'>
    readonly stakeGram: FieldRef<"PvpRoom", 'Decimal'>
    readonly status: FieldRef<"PvpRoom", 'String'>
    readonly winnerId: FieldRef<"PvpRoom", 'String'>
    readonly createdAt: FieldRef<"PvpRoom", 'DateTime'>
    readonly startedAt: FieldRef<"PvpRoom", 'DateTime'>
    readonly completedAt: FieldRef<"PvpRoom", 'DateTime'>
    readonly creatorId: FieldRef<"PvpRoom", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PvpRoom findUnique
   */
  export type PvpRoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomInclude<ExtArgs> | null
    /**
     * Filter, which PvpRoom to fetch.
     */
    where: PvpRoomWhereUniqueInput
  }

  /**
   * PvpRoom findUniqueOrThrow
   */
  export type PvpRoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomInclude<ExtArgs> | null
    /**
     * Filter, which PvpRoom to fetch.
     */
    where: PvpRoomWhereUniqueInput
  }

  /**
   * PvpRoom findFirst
   */
  export type PvpRoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomInclude<ExtArgs> | null
    /**
     * Filter, which PvpRoom to fetch.
     */
    where?: PvpRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvpRooms to fetch.
     */
    orderBy?: PvpRoomOrderByWithRelationInput | PvpRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PvpRooms.
     */
    cursor?: PvpRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvpRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvpRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PvpRooms.
     */
    distinct?: PvpRoomScalarFieldEnum | PvpRoomScalarFieldEnum[]
  }

  /**
   * PvpRoom findFirstOrThrow
   */
  export type PvpRoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomInclude<ExtArgs> | null
    /**
     * Filter, which PvpRoom to fetch.
     */
    where?: PvpRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvpRooms to fetch.
     */
    orderBy?: PvpRoomOrderByWithRelationInput | PvpRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PvpRooms.
     */
    cursor?: PvpRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvpRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvpRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PvpRooms.
     */
    distinct?: PvpRoomScalarFieldEnum | PvpRoomScalarFieldEnum[]
  }

  /**
   * PvpRoom findMany
   */
  export type PvpRoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomInclude<ExtArgs> | null
    /**
     * Filter, which PvpRooms to fetch.
     */
    where?: PvpRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvpRooms to fetch.
     */
    orderBy?: PvpRoomOrderByWithRelationInput | PvpRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PvpRooms.
     */
    cursor?: PvpRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvpRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvpRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PvpRooms.
     */
    distinct?: PvpRoomScalarFieldEnum | PvpRoomScalarFieldEnum[]
  }

  /**
   * PvpRoom create
   */
  export type PvpRoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomInclude<ExtArgs> | null
    /**
     * The data needed to create a PvpRoom.
     */
    data: XOR<PvpRoomCreateInput, PvpRoomUncheckedCreateInput>
  }

  /**
   * PvpRoom createMany
   */
  export type PvpRoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PvpRooms.
     */
    data: PvpRoomCreateManyInput | PvpRoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PvpRoom createManyAndReturn
   */
  export type PvpRoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * The data used to create many PvpRooms.
     */
    data: PvpRoomCreateManyInput | PvpRoomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PvpRoom update
   */
  export type PvpRoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomInclude<ExtArgs> | null
    /**
     * The data needed to update a PvpRoom.
     */
    data: XOR<PvpRoomUpdateInput, PvpRoomUncheckedUpdateInput>
    /**
     * Choose, which PvpRoom to update.
     */
    where: PvpRoomWhereUniqueInput
  }

  /**
   * PvpRoom updateMany
   */
  export type PvpRoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PvpRooms.
     */
    data: XOR<PvpRoomUpdateManyMutationInput, PvpRoomUncheckedUpdateManyInput>
    /**
     * Filter which PvpRooms to update
     */
    where?: PvpRoomWhereInput
    /**
     * Limit how many PvpRooms to update.
     */
    limit?: number
  }

  /**
   * PvpRoom updateManyAndReturn
   */
  export type PvpRoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * The data used to update PvpRooms.
     */
    data: XOR<PvpRoomUpdateManyMutationInput, PvpRoomUncheckedUpdateManyInput>
    /**
     * Filter which PvpRooms to update
     */
    where?: PvpRoomWhereInput
    /**
     * Limit how many PvpRooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PvpRoom upsert
   */
  export type PvpRoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomInclude<ExtArgs> | null
    /**
     * The filter to search for the PvpRoom to update in case it exists.
     */
    where: PvpRoomWhereUniqueInput
    /**
     * In case the PvpRoom found by the `where` argument doesn't exist, create a new PvpRoom with this data.
     */
    create: XOR<PvpRoomCreateInput, PvpRoomUncheckedCreateInput>
    /**
     * In case the PvpRoom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PvpRoomUpdateInput, PvpRoomUncheckedUpdateInput>
  }

  /**
   * PvpRoom delete
   */
  export type PvpRoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomInclude<ExtArgs> | null
    /**
     * Filter which PvpRoom to delete.
     */
    where: PvpRoomWhereUniqueInput
  }

  /**
   * PvpRoom deleteMany
   */
  export type PvpRoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PvpRooms to delete
     */
    where?: PvpRoomWhereInput
    /**
     * Limit how many PvpRooms to delete.
     */
    limit?: number
  }

  /**
   * PvpRoom.winner
   */
  export type PvpRoom$winnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * PvpRoom.participants
   */
  export type PvpRoom$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantInclude<ExtArgs> | null
    where?: PvpParticipantWhereInput
    orderBy?: PvpParticipantOrderByWithRelationInput | PvpParticipantOrderByWithRelationInput[]
    cursor?: PvpParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PvpParticipantScalarFieldEnum | PvpParticipantScalarFieldEnum[]
  }

  /**
   * PvpRoom.invitations
   */
  export type PvpRoom$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationInclude<ExtArgs> | null
    where?: PvpInvitationWhereInput
    orderBy?: PvpInvitationOrderByWithRelationInput | PvpInvitationOrderByWithRelationInput[]
    cursor?: PvpInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PvpInvitationScalarFieldEnum | PvpInvitationScalarFieldEnum[]
  }

  /**
   * PvpRoom without action
   */
  export type PvpRoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpRoom
     */
    select?: PvpRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpRoom
     */
    omit?: PvpRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpRoomInclude<ExtArgs> | null
  }


  /**
   * Model PvpParticipant
   */

  export type AggregatePvpParticipant = {
    _count: PvpParticipantCountAggregateOutputType | null
    _min: PvpParticipantMinAggregateOutputType | null
    _max: PvpParticipantMaxAggregateOutputType | null
  }

  export type PvpParticipantMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    userId: string | null
    joinedAt: Date | null
  }

  export type PvpParticipantMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    userId: string | null
    joinedAt: Date | null
  }

  export type PvpParticipantCountAggregateOutputType = {
    id: number
    roomId: number
    userId: number
    joinedAt: number
    _all: number
  }


  export type PvpParticipantMinAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    joinedAt?: true
  }

  export type PvpParticipantMaxAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    joinedAt?: true
  }

  export type PvpParticipantCountAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    joinedAt?: true
    _all?: true
  }

  export type PvpParticipantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PvpParticipant to aggregate.
     */
    where?: PvpParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvpParticipants to fetch.
     */
    orderBy?: PvpParticipantOrderByWithRelationInput | PvpParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PvpParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvpParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvpParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PvpParticipants
    **/
    _count?: true | PvpParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PvpParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PvpParticipantMaxAggregateInputType
  }

  export type GetPvpParticipantAggregateType<T extends PvpParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregatePvpParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePvpParticipant[P]>
      : GetScalarType<T[P], AggregatePvpParticipant[P]>
  }




  export type PvpParticipantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PvpParticipantWhereInput
    orderBy?: PvpParticipantOrderByWithAggregationInput | PvpParticipantOrderByWithAggregationInput[]
    by: PvpParticipantScalarFieldEnum[] | PvpParticipantScalarFieldEnum
    having?: PvpParticipantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PvpParticipantCountAggregateInputType | true
    _min?: PvpParticipantMinAggregateInputType
    _max?: PvpParticipantMaxAggregateInputType
  }

  export type PvpParticipantGroupByOutputType = {
    id: string
    roomId: string
    userId: string
    joinedAt: Date
    _count: PvpParticipantCountAggregateOutputType | null
    _min: PvpParticipantMinAggregateOutputType | null
    _max: PvpParticipantMaxAggregateOutputType | null
  }

  type GetPvpParticipantGroupByPayload<T extends PvpParticipantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PvpParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PvpParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PvpParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], PvpParticipantGroupByOutputType[P]>
        }
      >
    >


  export type PvpParticipantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    joinedAt?: boolean
    room?: boolean | PvpRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pvpParticipant"]>

  export type PvpParticipantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    joinedAt?: boolean
    room?: boolean | PvpRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pvpParticipant"]>

  export type PvpParticipantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    joinedAt?: boolean
    room?: boolean | PvpRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pvpParticipant"]>

  export type PvpParticipantSelectScalar = {
    id?: boolean
    roomId?: boolean
    userId?: boolean
    joinedAt?: boolean
  }

  export type PvpParticipantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomId" | "userId" | "joinedAt", ExtArgs["result"]["pvpParticipant"]>
  export type PvpParticipantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | PvpRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PvpParticipantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | PvpRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PvpParticipantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | PvpRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PvpParticipantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PvpParticipant"
    objects: {
      room: Prisma.$PvpRoomPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      userId: string
      joinedAt: Date
    }, ExtArgs["result"]["pvpParticipant"]>
    composites: {}
  }

  type PvpParticipantGetPayload<S extends boolean | null | undefined | PvpParticipantDefaultArgs> = $Result.GetResult<Prisma.$PvpParticipantPayload, S>

  type PvpParticipantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PvpParticipantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PvpParticipantCountAggregateInputType | true
    }

  export interface PvpParticipantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PvpParticipant'], meta: { name: 'PvpParticipant' } }
    /**
     * Find zero or one PvpParticipant that matches the filter.
     * @param {PvpParticipantFindUniqueArgs} args - Arguments to find a PvpParticipant
     * @example
     * // Get one PvpParticipant
     * const pvpParticipant = await prisma.pvpParticipant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PvpParticipantFindUniqueArgs>(args: SelectSubset<T, PvpParticipantFindUniqueArgs<ExtArgs>>): Prisma__PvpParticipantClient<$Result.GetResult<Prisma.$PvpParticipantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PvpParticipant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PvpParticipantFindUniqueOrThrowArgs} args - Arguments to find a PvpParticipant
     * @example
     * // Get one PvpParticipant
     * const pvpParticipant = await prisma.pvpParticipant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PvpParticipantFindUniqueOrThrowArgs>(args: SelectSubset<T, PvpParticipantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PvpParticipantClient<$Result.GetResult<Prisma.$PvpParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PvpParticipant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpParticipantFindFirstArgs} args - Arguments to find a PvpParticipant
     * @example
     * // Get one PvpParticipant
     * const pvpParticipant = await prisma.pvpParticipant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PvpParticipantFindFirstArgs>(args?: SelectSubset<T, PvpParticipantFindFirstArgs<ExtArgs>>): Prisma__PvpParticipantClient<$Result.GetResult<Prisma.$PvpParticipantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PvpParticipant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpParticipantFindFirstOrThrowArgs} args - Arguments to find a PvpParticipant
     * @example
     * // Get one PvpParticipant
     * const pvpParticipant = await prisma.pvpParticipant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PvpParticipantFindFirstOrThrowArgs>(args?: SelectSubset<T, PvpParticipantFindFirstOrThrowArgs<ExtArgs>>): Prisma__PvpParticipantClient<$Result.GetResult<Prisma.$PvpParticipantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PvpParticipants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpParticipantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PvpParticipants
     * const pvpParticipants = await prisma.pvpParticipant.findMany()
     * 
     * // Get first 10 PvpParticipants
     * const pvpParticipants = await prisma.pvpParticipant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pvpParticipantWithIdOnly = await prisma.pvpParticipant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PvpParticipantFindManyArgs>(args?: SelectSubset<T, PvpParticipantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PvpParticipant.
     * @param {PvpParticipantCreateArgs} args - Arguments to create a PvpParticipant.
     * @example
     * // Create one PvpParticipant
     * const PvpParticipant = await prisma.pvpParticipant.create({
     *   data: {
     *     // ... data to create a PvpParticipant
     *   }
     * })
     * 
     */
    create<T extends PvpParticipantCreateArgs>(args: SelectSubset<T, PvpParticipantCreateArgs<ExtArgs>>): Prisma__PvpParticipantClient<$Result.GetResult<Prisma.$PvpParticipantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PvpParticipants.
     * @param {PvpParticipantCreateManyArgs} args - Arguments to create many PvpParticipants.
     * @example
     * // Create many PvpParticipants
     * const pvpParticipant = await prisma.pvpParticipant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PvpParticipantCreateManyArgs>(args?: SelectSubset<T, PvpParticipantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PvpParticipants and returns the data saved in the database.
     * @param {PvpParticipantCreateManyAndReturnArgs} args - Arguments to create many PvpParticipants.
     * @example
     * // Create many PvpParticipants
     * const pvpParticipant = await prisma.pvpParticipant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PvpParticipants and only return the `id`
     * const pvpParticipantWithIdOnly = await prisma.pvpParticipant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PvpParticipantCreateManyAndReturnArgs>(args?: SelectSubset<T, PvpParticipantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpParticipantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PvpParticipant.
     * @param {PvpParticipantDeleteArgs} args - Arguments to delete one PvpParticipant.
     * @example
     * // Delete one PvpParticipant
     * const PvpParticipant = await prisma.pvpParticipant.delete({
     *   where: {
     *     // ... filter to delete one PvpParticipant
     *   }
     * })
     * 
     */
    delete<T extends PvpParticipantDeleteArgs>(args: SelectSubset<T, PvpParticipantDeleteArgs<ExtArgs>>): Prisma__PvpParticipantClient<$Result.GetResult<Prisma.$PvpParticipantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PvpParticipant.
     * @param {PvpParticipantUpdateArgs} args - Arguments to update one PvpParticipant.
     * @example
     * // Update one PvpParticipant
     * const pvpParticipant = await prisma.pvpParticipant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PvpParticipantUpdateArgs>(args: SelectSubset<T, PvpParticipantUpdateArgs<ExtArgs>>): Prisma__PvpParticipantClient<$Result.GetResult<Prisma.$PvpParticipantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PvpParticipants.
     * @param {PvpParticipantDeleteManyArgs} args - Arguments to filter PvpParticipants to delete.
     * @example
     * // Delete a few PvpParticipants
     * const { count } = await prisma.pvpParticipant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PvpParticipantDeleteManyArgs>(args?: SelectSubset<T, PvpParticipantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PvpParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpParticipantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PvpParticipants
     * const pvpParticipant = await prisma.pvpParticipant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PvpParticipantUpdateManyArgs>(args: SelectSubset<T, PvpParticipantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PvpParticipants and returns the data updated in the database.
     * @param {PvpParticipantUpdateManyAndReturnArgs} args - Arguments to update many PvpParticipants.
     * @example
     * // Update many PvpParticipants
     * const pvpParticipant = await prisma.pvpParticipant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PvpParticipants and only return the `id`
     * const pvpParticipantWithIdOnly = await prisma.pvpParticipant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PvpParticipantUpdateManyAndReturnArgs>(args: SelectSubset<T, PvpParticipantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpParticipantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PvpParticipant.
     * @param {PvpParticipantUpsertArgs} args - Arguments to update or create a PvpParticipant.
     * @example
     * // Update or create a PvpParticipant
     * const pvpParticipant = await prisma.pvpParticipant.upsert({
     *   create: {
     *     // ... data to create a PvpParticipant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PvpParticipant we want to update
     *   }
     * })
     */
    upsert<T extends PvpParticipantUpsertArgs>(args: SelectSubset<T, PvpParticipantUpsertArgs<ExtArgs>>): Prisma__PvpParticipantClient<$Result.GetResult<Prisma.$PvpParticipantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PvpParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpParticipantCountArgs} args - Arguments to filter PvpParticipants to count.
     * @example
     * // Count the number of PvpParticipants
     * const count = await prisma.pvpParticipant.count({
     *   where: {
     *     // ... the filter for the PvpParticipants we want to count
     *   }
     * })
    **/
    count<T extends PvpParticipantCountArgs>(
      args?: Subset<T, PvpParticipantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PvpParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PvpParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PvpParticipantAggregateArgs>(args: Subset<T, PvpParticipantAggregateArgs>): Prisma.PrismaPromise<GetPvpParticipantAggregateType<T>>

    /**
     * Group by PvpParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpParticipantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PvpParticipantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PvpParticipantGroupByArgs['orderBy'] }
        : { orderBy?: PvpParticipantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PvpParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPvpParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PvpParticipant model
   */
  readonly fields: PvpParticipantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PvpParticipant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PvpParticipantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends PvpRoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PvpRoomDefaultArgs<ExtArgs>>): Prisma__PvpRoomClient<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PvpParticipant model
   */
  interface PvpParticipantFieldRefs {
    readonly id: FieldRef<"PvpParticipant", 'String'>
    readonly roomId: FieldRef<"PvpParticipant", 'String'>
    readonly userId: FieldRef<"PvpParticipant", 'String'>
    readonly joinedAt: FieldRef<"PvpParticipant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PvpParticipant findUnique
   */
  export type PvpParticipantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantInclude<ExtArgs> | null
    /**
     * Filter, which PvpParticipant to fetch.
     */
    where: PvpParticipantWhereUniqueInput
  }

  /**
   * PvpParticipant findUniqueOrThrow
   */
  export type PvpParticipantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantInclude<ExtArgs> | null
    /**
     * Filter, which PvpParticipant to fetch.
     */
    where: PvpParticipantWhereUniqueInput
  }

  /**
   * PvpParticipant findFirst
   */
  export type PvpParticipantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantInclude<ExtArgs> | null
    /**
     * Filter, which PvpParticipant to fetch.
     */
    where?: PvpParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvpParticipants to fetch.
     */
    orderBy?: PvpParticipantOrderByWithRelationInput | PvpParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PvpParticipants.
     */
    cursor?: PvpParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvpParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvpParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PvpParticipants.
     */
    distinct?: PvpParticipantScalarFieldEnum | PvpParticipantScalarFieldEnum[]
  }

  /**
   * PvpParticipant findFirstOrThrow
   */
  export type PvpParticipantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantInclude<ExtArgs> | null
    /**
     * Filter, which PvpParticipant to fetch.
     */
    where?: PvpParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvpParticipants to fetch.
     */
    orderBy?: PvpParticipantOrderByWithRelationInput | PvpParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PvpParticipants.
     */
    cursor?: PvpParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvpParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvpParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PvpParticipants.
     */
    distinct?: PvpParticipantScalarFieldEnum | PvpParticipantScalarFieldEnum[]
  }

  /**
   * PvpParticipant findMany
   */
  export type PvpParticipantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantInclude<ExtArgs> | null
    /**
     * Filter, which PvpParticipants to fetch.
     */
    where?: PvpParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvpParticipants to fetch.
     */
    orderBy?: PvpParticipantOrderByWithRelationInput | PvpParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PvpParticipants.
     */
    cursor?: PvpParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvpParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvpParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PvpParticipants.
     */
    distinct?: PvpParticipantScalarFieldEnum | PvpParticipantScalarFieldEnum[]
  }

  /**
   * PvpParticipant create
   */
  export type PvpParticipantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantInclude<ExtArgs> | null
    /**
     * The data needed to create a PvpParticipant.
     */
    data: XOR<PvpParticipantCreateInput, PvpParticipantUncheckedCreateInput>
  }

  /**
   * PvpParticipant createMany
   */
  export type PvpParticipantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PvpParticipants.
     */
    data: PvpParticipantCreateManyInput | PvpParticipantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PvpParticipant createManyAndReturn
   */
  export type PvpParticipantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * The data used to create many PvpParticipants.
     */
    data: PvpParticipantCreateManyInput | PvpParticipantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PvpParticipant update
   */
  export type PvpParticipantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantInclude<ExtArgs> | null
    /**
     * The data needed to update a PvpParticipant.
     */
    data: XOR<PvpParticipantUpdateInput, PvpParticipantUncheckedUpdateInput>
    /**
     * Choose, which PvpParticipant to update.
     */
    where: PvpParticipantWhereUniqueInput
  }

  /**
   * PvpParticipant updateMany
   */
  export type PvpParticipantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PvpParticipants.
     */
    data: XOR<PvpParticipantUpdateManyMutationInput, PvpParticipantUncheckedUpdateManyInput>
    /**
     * Filter which PvpParticipants to update
     */
    where?: PvpParticipantWhereInput
    /**
     * Limit how many PvpParticipants to update.
     */
    limit?: number
  }

  /**
   * PvpParticipant updateManyAndReturn
   */
  export type PvpParticipantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * The data used to update PvpParticipants.
     */
    data: XOR<PvpParticipantUpdateManyMutationInput, PvpParticipantUncheckedUpdateManyInput>
    /**
     * Filter which PvpParticipants to update
     */
    where?: PvpParticipantWhereInput
    /**
     * Limit how many PvpParticipants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PvpParticipant upsert
   */
  export type PvpParticipantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantInclude<ExtArgs> | null
    /**
     * The filter to search for the PvpParticipant to update in case it exists.
     */
    where: PvpParticipantWhereUniqueInput
    /**
     * In case the PvpParticipant found by the `where` argument doesn't exist, create a new PvpParticipant with this data.
     */
    create: XOR<PvpParticipantCreateInput, PvpParticipantUncheckedCreateInput>
    /**
     * In case the PvpParticipant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PvpParticipantUpdateInput, PvpParticipantUncheckedUpdateInput>
  }

  /**
   * PvpParticipant delete
   */
  export type PvpParticipantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantInclude<ExtArgs> | null
    /**
     * Filter which PvpParticipant to delete.
     */
    where: PvpParticipantWhereUniqueInput
  }

  /**
   * PvpParticipant deleteMany
   */
  export type PvpParticipantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PvpParticipants to delete
     */
    where?: PvpParticipantWhereInput
    /**
     * Limit how many PvpParticipants to delete.
     */
    limit?: number
  }

  /**
   * PvpParticipant without action
   */
  export type PvpParticipantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpParticipant
     */
    select?: PvpParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpParticipant
     */
    omit?: PvpParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpParticipantInclude<ExtArgs> | null
  }


  /**
   * Model PvpInvitation
   */

  export type AggregatePvpInvitation = {
    _count: PvpInvitationCountAggregateOutputType | null
    _min: PvpInvitationMinAggregateOutputType | null
    _max: PvpInvitationMaxAggregateOutputType | null
  }

  export type PvpInvitationMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    senderId: string | null
    recipientId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PvpInvitationMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    senderId: string | null
    recipientId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PvpInvitationCountAggregateOutputType = {
    id: number
    roomId: number
    senderId: number
    recipientId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PvpInvitationMinAggregateInputType = {
    id?: true
    roomId?: true
    senderId?: true
    recipientId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PvpInvitationMaxAggregateInputType = {
    id?: true
    roomId?: true
    senderId?: true
    recipientId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PvpInvitationCountAggregateInputType = {
    id?: true
    roomId?: true
    senderId?: true
    recipientId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PvpInvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PvpInvitation to aggregate.
     */
    where?: PvpInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvpInvitations to fetch.
     */
    orderBy?: PvpInvitationOrderByWithRelationInput | PvpInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PvpInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvpInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvpInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PvpInvitations
    **/
    _count?: true | PvpInvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PvpInvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PvpInvitationMaxAggregateInputType
  }

  export type GetPvpInvitationAggregateType<T extends PvpInvitationAggregateArgs> = {
        [P in keyof T & keyof AggregatePvpInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePvpInvitation[P]>
      : GetScalarType<T[P], AggregatePvpInvitation[P]>
  }




  export type PvpInvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PvpInvitationWhereInput
    orderBy?: PvpInvitationOrderByWithAggregationInput | PvpInvitationOrderByWithAggregationInput[]
    by: PvpInvitationScalarFieldEnum[] | PvpInvitationScalarFieldEnum
    having?: PvpInvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PvpInvitationCountAggregateInputType | true
    _min?: PvpInvitationMinAggregateInputType
    _max?: PvpInvitationMaxAggregateInputType
  }

  export type PvpInvitationGroupByOutputType = {
    id: string
    roomId: string
    senderId: string
    recipientId: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: PvpInvitationCountAggregateOutputType | null
    _min: PvpInvitationMinAggregateOutputType | null
    _max: PvpInvitationMaxAggregateOutputType | null
  }

  type GetPvpInvitationGroupByPayload<T extends PvpInvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PvpInvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PvpInvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PvpInvitationGroupByOutputType[P]>
            : GetScalarType<T[P], PvpInvitationGroupByOutputType[P]>
        }
      >
    >


  export type PvpInvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    recipientId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | PvpRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    recipient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pvpInvitation"]>

  export type PvpInvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    recipientId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | PvpRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    recipient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pvpInvitation"]>

  export type PvpInvitationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    recipientId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | PvpRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    recipient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pvpInvitation"]>

  export type PvpInvitationSelectScalar = {
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    recipientId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PvpInvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomId" | "senderId" | "recipientId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["pvpInvitation"]>
  export type PvpInvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | PvpRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    recipient?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PvpInvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | PvpRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    recipient?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PvpInvitationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | PvpRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    recipient?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PvpInvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PvpInvitation"
    objects: {
      room: Prisma.$PvpRoomPayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs>
      recipient: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      senderId: string
      recipientId: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pvpInvitation"]>
    composites: {}
  }

  type PvpInvitationGetPayload<S extends boolean | null | undefined | PvpInvitationDefaultArgs> = $Result.GetResult<Prisma.$PvpInvitationPayload, S>

  type PvpInvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PvpInvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PvpInvitationCountAggregateInputType | true
    }

  export interface PvpInvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PvpInvitation'], meta: { name: 'PvpInvitation' } }
    /**
     * Find zero or one PvpInvitation that matches the filter.
     * @param {PvpInvitationFindUniqueArgs} args - Arguments to find a PvpInvitation
     * @example
     * // Get one PvpInvitation
     * const pvpInvitation = await prisma.pvpInvitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PvpInvitationFindUniqueArgs>(args: SelectSubset<T, PvpInvitationFindUniqueArgs<ExtArgs>>): Prisma__PvpInvitationClient<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PvpInvitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PvpInvitationFindUniqueOrThrowArgs} args - Arguments to find a PvpInvitation
     * @example
     * // Get one PvpInvitation
     * const pvpInvitation = await prisma.pvpInvitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PvpInvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, PvpInvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PvpInvitationClient<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PvpInvitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpInvitationFindFirstArgs} args - Arguments to find a PvpInvitation
     * @example
     * // Get one PvpInvitation
     * const pvpInvitation = await prisma.pvpInvitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PvpInvitationFindFirstArgs>(args?: SelectSubset<T, PvpInvitationFindFirstArgs<ExtArgs>>): Prisma__PvpInvitationClient<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PvpInvitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpInvitationFindFirstOrThrowArgs} args - Arguments to find a PvpInvitation
     * @example
     * // Get one PvpInvitation
     * const pvpInvitation = await prisma.pvpInvitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PvpInvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, PvpInvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PvpInvitationClient<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PvpInvitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpInvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PvpInvitations
     * const pvpInvitations = await prisma.pvpInvitation.findMany()
     * 
     * // Get first 10 PvpInvitations
     * const pvpInvitations = await prisma.pvpInvitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pvpInvitationWithIdOnly = await prisma.pvpInvitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PvpInvitationFindManyArgs>(args?: SelectSubset<T, PvpInvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PvpInvitation.
     * @param {PvpInvitationCreateArgs} args - Arguments to create a PvpInvitation.
     * @example
     * // Create one PvpInvitation
     * const PvpInvitation = await prisma.pvpInvitation.create({
     *   data: {
     *     // ... data to create a PvpInvitation
     *   }
     * })
     * 
     */
    create<T extends PvpInvitationCreateArgs>(args: SelectSubset<T, PvpInvitationCreateArgs<ExtArgs>>): Prisma__PvpInvitationClient<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PvpInvitations.
     * @param {PvpInvitationCreateManyArgs} args - Arguments to create many PvpInvitations.
     * @example
     * // Create many PvpInvitations
     * const pvpInvitation = await prisma.pvpInvitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PvpInvitationCreateManyArgs>(args?: SelectSubset<T, PvpInvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PvpInvitations and returns the data saved in the database.
     * @param {PvpInvitationCreateManyAndReturnArgs} args - Arguments to create many PvpInvitations.
     * @example
     * // Create many PvpInvitations
     * const pvpInvitation = await prisma.pvpInvitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PvpInvitations and only return the `id`
     * const pvpInvitationWithIdOnly = await prisma.pvpInvitation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PvpInvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, PvpInvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PvpInvitation.
     * @param {PvpInvitationDeleteArgs} args - Arguments to delete one PvpInvitation.
     * @example
     * // Delete one PvpInvitation
     * const PvpInvitation = await prisma.pvpInvitation.delete({
     *   where: {
     *     // ... filter to delete one PvpInvitation
     *   }
     * })
     * 
     */
    delete<T extends PvpInvitationDeleteArgs>(args: SelectSubset<T, PvpInvitationDeleteArgs<ExtArgs>>): Prisma__PvpInvitationClient<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PvpInvitation.
     * @param {PvpInvitationUpdateArgs} args - Arguments to update one PvpInvitation.
     * @example
     * // Update one PvpInvitation
     * const pvpInvitation = await prisma.pvpInvitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PvpInvitationUpdateArgs>(args: SelectSubset<T, PvpInvitationUpdateArgs<ExtArgs>>): Prisma__PvpInvitationClient<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PvpInvitations.
     * @param {PvpInvitationDeleteManyArgs} args - Arguments to filter PvpInvitations to delete.
     * @example
     * // Delete a few PvpInvitations
     * const { count } = await prisma.pvpInvitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PvpInvitationDeleteManyArgs>(args?: SelectSubset<T, PvpInvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PvpInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpInvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PvpInvitations
     * const pvpInvitation = await prisma.pvpInvitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PvpInvitationUpdateManyArgs>(args: SelectSubset<T, PvpInvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PvpInvitations and returns the data updated in the database.
     * @param {PvpInvitationUpdateManyAndReturnArgs} args - Arguments to update many PvpInvitations.
     * @example
     * // Update many PvpInvitations
     * const pvpInvitation = await prisma.pvpInvitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PvpInvitations and only return the `id`
     * const pvpInvitationWithIdOnly = await prisma.pvpInvitation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PvpInvitationUpdateManyAndReturnArgs>(args: SelectSubset<T, PvpInvitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PvpInvitation.
     * @param {PvpInvitationUpsertArgs} args - Arguments to update or create a PvpInvitation.
     * @example
     * // Update or create a PvpInvitation
     * const pvpInvitation = await prisma.pvpInvitation.upsert({
     *   create: {
     *     // ... data to create a PvpInvitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PvpInvitation we want to update
     *   }
     * })
     */
    upsert<T extends PvpInvitationUpsertArgs>(args: SelectSubset<T, PvpInvitationUpsertArgs<ExtArgs>>): Prisma__PvpInvitationClient<$Result.GetResult<Prisma.$PvpInvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PvpInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpInvitationCountArgs} args - Arguments to filter PvpInvitations to count.
     * @example
     * // Count the number of PvpInvitations
     * const count = await prisma.pvpInvitation.count({
     *   where: {
     *     // ... the filter for the PvpInvitations we want to count
     *   }
     * })
    **/
    count<T extends PvpInvitationCountArgs>(
      args?: Subset<T, PvpInvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PvpInvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PvpInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpInvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PvpInvitationAggregateArgs>(args: Subset<T, PvpInvitationAggregateArgs>): Prisma.PrismaPromise<GetPvpInvitationAggregateType<T>>

    /**
     * Group by PvpInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvpInvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PvpInvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PvpInvitationGroupByArgs['orderBy'] }
        : { orderBy?: PvpInvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PvpInvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPvpInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PvpInvitation model
   */
  readonly fields: PvpInvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PvpInvitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PvpInvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends PvpRoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PvpRoomDefaultArgs<ExtArgs>>): Prisma__PvpRoomClient<$Result.GetResult<Prisma.$PvpRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recipient<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PvpInvitation model
   */
  interface PvpInvitationFieldRefs {
    readonly id: FieldRef<"PvpInvitation", 'String'>
    readonly roomId: FieldRef<"PvpInvitation", 'String'>
    readonly senderId: FieldRef<"PvpInvitation", 'String'>
    readonly recipientId: FieldRef<"PvpInvitation", 'String'>
    readonly status: FieldRef<"PvpInvitation", 'String'>
    readonly createdAt: FieldRef<"PvpInvitation", 'DateTime'>
    readonly updatedAt: FieldRef<"PvpInvitation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PvpInvitation findUnique
   */
  export type PvpInvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationInclude<ExtArgs> | null
    /**
     * Filter, which PvpInvitation to fetch.
     */
    where: PvpInvitationWhereUniqueInput
  }

  /**
   * PvpInvitation findUniqueOrThrow
   */
  export type PvpInvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationInclude<ExtArgs> | null
    /**
     * Filter, which PvpInvitation to fetch.
     */
    where: PvpInvitationWhereUniqueInput
  }

  /**
   * PvpInvitation findFirst
   */
  export type PvpInvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationInclude<ExtArgs> | null
    /**
     * Filter, which PvpInvitation to fetch.
     */
    where?: PvpInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvpInvitations to fetch.
     */
    orderBy?: PvpInvitationOrderByWithRelationInput | PvpInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PvpInvitations.
     */
    cursor?: PvpInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvpInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvpInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PvpInvitations.
     */
    distinct?: PvpInvitationScalarFieldEnum | PvpInvitationScalarFieldEnum[]
  }

  /**
   * PvpInvitation findFirstOrThrow
   */
  export type PvpInvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationInclude<ExtArgs> | null
    /**
     * Filter, which PvpInvitation to fetch.
     */
    where?: PvpInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvpInvitations to fetch.
     */
    orderBy?: PvpInvitationOrderByWithRelationInput | PvpInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PvpInvitations.
     */
    cursor?: PvpInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvpInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvpInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PvpInvitations.
     */
    distinct?: PvpInvitationScalarFieldEnum | PvpInvitationScalarFieldEnum[]
  }

  /**
   * PvpInvitation findMany
   */
  export type PvpInvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationInclude<ExtArgs> | null
    /**
     * Filter, which PvpInvitations to fetch.
     */
    where?: PvpInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvpInvitations to fetch.
     */
    orderBy?: PvpInvitationOrderByWithRelationInput | PvpInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PvpInvitations.
     */
    cursor?: PvpInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvpInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvpInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PvpInvitations.
     */
    distinct?: PvpInvitationScalarFieldEnum | PvpInvitationScalarFieldEnum[]
  }

  /**
   * PvpInvitation create
   */
  export type PvpInvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a PvpInvitation.
     */
    data: XOR<PvpInvitationCreateInput, PvpInvitationUncheckedCreateInput>
  }

  /**
   * PvpInvitation createMany
   */
  export type PvpInvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PvpInvitations.
     */
    data: PvpInvitationCreateManyInput | PvpInvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PvpInvitation createManyAndReturn
   */
  export type PvpInvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * The data used to create many PvpInvitations.
     */
    data: PvpInvitationCreateManyInput | PvpInvitationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PvpInvitation update
   */
  export type PvpInvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a PvpInvitation.
     */
    data: XOR<PvpInvitationUpdateInput, PvpInvitationUncheckedUpdateInput>
    /**
     * Choose, which PvpInvitation to update.
     */
    where: PvpInvitationWhereUniqueInput
  }

  /**
   * PvpInvitation updateMany
   */
  export type PvpInvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PvpInvitations.
     */
    data: XOR<PvpInvitationUpdateManyMutationInput, PvpInvitationUncheckedUpdateManyInput>
    /**
     * Filter which PvpInvitations to update
     */
    where?: PvpInvitationWhereInput
    /**
     * Limit how many PvpInvitations to update.
     */
    limit?: number
  }

  /**
   * PvpInvitation updateManyAndReturn
   */
  export type PvpInvitationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * The data used to update PvpInvitations.
     */
    data: XOR<PvpInvitationUpdateManyMutationInput, PvpInvitationUncheckedUpdateManyInput>
    /**
     * Filter which PvpInvitations to update
     */
    where?: PvpInvitationWhereInput
    /**
     * Limit how many PvpInvitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PvpInvitation upsert
   */
  export type PvpInvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the PvpInvitation to update in case it exists.
     */
    where: PvpInvitationWhereUniqueInput
    /**
     * In case the PvpInvitation found by the `where` argument doesn't exist, create a new PvpInvitation with this data.
     */
    create: XOR<PvpInvitationCreateInput, PvpInvitationUncheckedCreateInput>
    /**
     * In case the PvpInvitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PvpInvitationUpdateInput, PvpInvitationUncheckedUpdateInput>
  }

  /**
   * PvpInvitation delete
   */
  export type PvpInvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationInclude<ExtArgs> | null
    /**
     * Filter which PvpInvitation to delete.
     */
    where: PvpInvitationWhereUniqueInput
  }

  /**
   * PvpInvitation deleteMany
   */
  export type PvpInvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PvpInvitations to delete
     */
    where?: PvpInvitationWhereInput
    /**
     * Limit how many PvpInvitations to delete.
     */
    limit?: number
  }

  /**
   * PvpInvitation without action
   */
  export type PvpInvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvpInvitation
     */
    select?: PvpInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvpInvitation
     */
    omit?: PvpInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvpInvitationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    photoUrl: 'photoUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    id: 'id',
    address: 'address',
    network: 'network',
    isConnected: 'isConnected',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const GiftScalarFieldEnum: {
    id: 'id',
    name: 'name',
    collection: 'collection',
    emoji: 'emoji',
    priceTon: 'priceTon',
    backdropName: 'backdropName',
    backdropColor: 'backdropColor',
    symbolName: 'symbolName',
    symbolImageUrl: 'symbolImageUrl',
    status: 'status',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GiftScalarFieldEnum = (typeof GiftScalarFieldEnum)[keyof typeof GiftScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    type: 'type',
    status: 'status',
    amountTon: 'amountTon',
    giftId: 'giftId',
    buyerId: 'buyerId',
    sellerId: 'sellerId',
    txHash: 'txHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const OfferScalarFieldEnum: {
    id: 'id',
    amountTon: 'amountTon',
    status: 'status',
    giftId: 'giftId',
    buyerId: 'buyerId',
    sellerId: 'sellerId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OfferScalarFieldEnum = (typeof OfferScalarFieldEnum)[keyof typeof OfferScalarFieldEnum]


  export const PvpRoomScalarFieldEnum: {
    id: 'id',
    code: 'code',
    stakeGram: 'stakeGram',
    status: 'status',
    winnerId: 'winnerId',
    createdAt: 'createdAt',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    creatorId: 'creatorId'
  };

  export type PvpRoomScalarFieldEnum = (typeof PvpRoomScalarFieldEnum)[keyof typeof PvpRoomScalarFieldEnum]


  export const PvpParticipantScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    userId: 'userId',
    joinedAt: 'joinedAt'
  };

  export type PvpParticipantScalarFieldEnum = (typeof PvpParticipantScalarFieldEnum)[keyof typeof PvpParticipantScalarFieldEnum]


  export const PvpInvitationScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    senderId: 'senderId',
    recipientId: 'recipientId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PvpInvitationScalarFieldEnum = (typeof PvpInvitationScalarFieldEnum)[keyof typeof PvpInvitationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    telegramId?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    photoUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    wallets?: WalletListRelationFilter
    gifts?: GiftListRelationFilter
    buyerTransactions?: TransactionListRelationFilter
    sellerTransactions?: TransactionListRelationFilter
    buyerOffers?: OfferListRelationFilter
    sellerOffers?: OfferListRelationFilter
    createdPvpRooms?: PvpRoomListRelationFilter
    wonPvpRooms?: PvpRoomListRelationFilter
    pvpParticipations?: PvpParticipantListRelationFilter
    sentPvpInvitations?: PvpInvitationListRelationFilter
    receivedPvpInvitations?: PvpInvitationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    wallets?: WalletOrderByRelationAggregateInput
    gifts?: GiftOrderByRelationAggregateInput
    buyerTransactions?: TransactionOrderByRelationAggregateInput
    sellerTransactions?: TransactionOrderByRelationAggregateInput
    buyerOffers?: OfferOrderByRelationAggregateInput
    sellerOffers?: OfferOrderByRelationAggregateInput
    createdPvpRooms?: PvpRoomOrderByRelationAggregateInput
    wonPvpRooms?: PvpRoomOrderByRelationAggregateInput
    pvpParticipations?: PvpParticipantOrderByRelationAggregateInput
    sentPvpInvitations?: PvpInvitationOrderByRelationAggregateInput
    receivedPvpInvitations?: PvpInvitationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    telegramId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    photoUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    wallets?: WalletListRelationFilter
    gifts?: GiftListRelationFilter
    buyerTransactions?: TransactionListRelationFilter
    sellerTransactions?: TransactionListRelationFilter
    buyerOffers?: OfferListRelationFilter
    sellerOffers?: OfferListRelationFilter
    createdPvpRooms?: PvpRoomListRelationFilter
    wonPvpRooms?: PvpRoomListRelationFilter
    pvpParticipations?: PvpParticipantListRelationFilter
    sentPvpInvitations?: PvpInvitationListRelationFilter
    receivedPvpInvitations?: PvpInvitationListRelationFilter
  }, "id" | "telegramId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    telegramId?: StringWithAggregatesFilter<"User"> | string
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type WalletWhereInput = {
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    id?: StringFilter<"Wallet"> | string
    address?: StringFilter<"Wallet"> | string
    network?: StringFilter<"Wallet"> | string
    isConnected?: BoolFilter<"Wallet"> | boolean
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    userId?: StringFilter<"Wallet"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WalletOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrder
    network?: SortOrder
    isConnected?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    address?: string
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    network?: StringFilter<"Wallet"> | string
    isConnected?: BoolFilter<"Wallet"> | boolean
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    userId?: StringFilter<"Wallet"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "address">

  export type WalletOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    network?: SortOrder
    isConnected?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: WalletCountOrderByAggregateInput
    _max?: WalletMaxOrderByAggregateInput
    _min?: WalletMinOrderByAggregateInput
  }

  export type WalletScalarWhereWithAggregatesInput = {
    AND?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    OR?: WalletScalarWhereWithAggregatesInput[]
    NOT?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Wallet"> | string
    address?: StringWithAggregatesFilter<"Wallet"> | string
    network?: StringWithAggregatesFilter<"Wallet"> | string
    isConnected?: BoolWithAggregatesFilter<"Wallet"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
    userId?: StringWithAggregatesFilter<"Wallet"> | string
  }

  export type GiftWhereInput = {
    AND?: GiftWhereInput | GiftWhereInput[]
    OR?: GiftWhereInput[]
    NOT?: GiftWhereInput | GiftWhereInput[]
    id?: StringFilter<"Gift"> | string
    name?: StringFilter<"Gift"> | string
    collection?: StringFilter<"Gift"> | string
    emoji?: StringNullableFilter<"Gift"> | string | null
    priceTon?: DecimalFilter<"Gift"> | Decimal | DecimalJsLike | number | string
    backdropName?: StringNullableFilter<"Gift"> | string | null
    backdropColor?: StringNullableFilter<"Gift"> | string | null
    symbolName?: StringNullableFilter<"Gift"> | string | null
    symbolImageUrl?: StringNullableFilter<"Gift"> | string | null
    status?: StringFilter<"Gift"> | string
    ownerId?: StringNullableFilter<"Gift"> | string | null
    createdAt?: DateTimeFilter<"Gift"> | Date | string
    updatedAt?: DateTimeFilter<"Gift"> | Date | string
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    transactions?: TransactionListRelationFilter
    offers?: OfferListRelationFilter
  }

  export type GiftOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    collection?: SortOrder
    emoji?: SortOrderInput | SortOrder
    priceTon?: SortOrder
    backdropName?: SortOrderInput | SortOrder
    backdropColor?: SortOrderInput | SortOrder
    symbolName?: SortOrderInput | SortOrder
    symbolImageUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
    offers?: OfferOrderByRelationAggregateInput
  }

  export type GiftWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GiftWhereInput | GiftWhereInput[]
    OR?: GiftWhereInput[]
    NOT?: GiftWhereInput | GiftWhereInput[]
    name?: StringFilter<"Gift"> | string
    collection?: StringFilter<"Gift"> | string
    emoji?: StringNullableFilter<"Gift"> | string | null
    priceTon?: DecimalFilter<"Gift"> | Decimal | DecimalJsLike | number | string
    backdropName?: StringNullableFilter<"Gift"> | string | null
    backdropColor?: StringNullableFilter<"Gift"> | string | null
    symbolName?: StringNullableFilter<"Gift"> | string | null
    symbolImageUrl?: StringNullableFilter<"Gift"> | string | null
    status?: StringFilter<"Gift"> | string
    ownerId?: StringNullableFilter<"Gift"> | string | null
    createdAt?: DateTimeFilter<"Gift"> | Date | string
    updatedAt?: DateTimeFilter<"Gift"> | Date | string
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    transactions?: TransactionListRelationFilter
    offers?: OfferListRelationFilter
  }, "id">

  export type GiftOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    collection?: SortOrder
    emoji?: SortOrderInput | SortOrder
    priceTon?: SortOrder
    backdropName?: SortOrderInput | SortOrder
    backdropColor?: SortOrderInput | SortOrder
    symbolName?: SortOrderInput | SortOrder
    symbolImageUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GiftCountOrderByAggregateInput
    _avg?: GiftAvgOrderByAggregateInput
    _max?: GiftMaxOrderByAggregateInput
    _min?: GiftMinOrderByAggregateInput
    _sum?: GiftSumOrderByAggregateInput
  }

  export type GiftScalarWhereWithAggregatesInput = {
    AND?: GiftScalarWhereWithAggregatesInput | GiftScalarWhereWithAggregatesInput[]
    OR?: GiftScalarWhereWithAggregatesInput[]
    NOT?: GiftScalarWhereWithAggregatesInput | GiftScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Gift"> | string
    name?: StringWithAggregatesFilter<"Gift"> | string
    collection?: StringWithAggregatesFilter<"Gift"> | string
    emoji?: StringNullableWithAggregatesFilter<"Gift"> | string | null
    priceTon?: DecimalWithAggregatesFilter<"Gift"> | Decimal | DecimalJsLike | number | string
    backdropName?: StringNullableWithAggregatesFilter<"Gift"> | string | null
    backdropColor?: StringNullableWithAggregatesFilter<"Gift"> | string | null
    symbolName?: StringNullableWithAggregatesFilter<"Gift"> | string | null
    symbolImageUrl?: StringNullableWithAggregatesFilter<"Gift"> | string | null
    status?: StringWithAggregatesFilter<"Gift"> | string
    ownerId?: StringNullableWithAggregatesFilter<"Gift"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Gift"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Gift"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    amountTon?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    giftId?: StringNullableFilter<"Transaction"> | string | null
    buyerId?: StringNullableFilter<"Transaction"> | string | null
    sellerId?: StringNullableFilter<"Transaction"> | string | null
    txHash?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    gift?: XOR<GiftNullableScalarRelationFilter, GiftWhereInput> | null
    buyer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    seller?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    amountTon?: SortOrder
    giftId?: SortOrderInput | SortOrder
    buyerId?: SortOrderInput | SortOrder
    sellerId?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    gift?: GiftOrderByWithRelationInput
    buyer?: UserOrderByWithRelationInput
    seller?: UserOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    type?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    amountTon?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    giftId?: StringNullableFilter<"Transaction"> | string | null
    buyerId?: StringNullableFilter<"Transaction"> | string | null
    sellerId?: StringNullableFilter<"Transaction"> | string | null
    txHash?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    gift?: XOR<GiftNullableScalarRelationFilter, GiftWhereInput> | null
    buyer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    seller?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    amountTon?: SortOrder
    giftId?: SortOrderInput | SortOrder
    buyerId?: SortOrderInput | SortOrder
    sellerId?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    type?: StringWithAggregatesFilter<"Transaction"> | string
    status?: StringWithAggregatesFilter<"Transaction"> | string
    amountTon?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    giftId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    buyerId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    sellerId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    txHash?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type OfferWhereInput = {
    AND?: OfferWhereInput | OfferWhereInput[]
    OR?: OfferWhereInput[]
    NOT?: OfferWhereInput | OfferWhereInput[]
    id?: StringFilter<"Offer"> | string
    amountTon?: DecimalFilter<"Offer"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Offer"> | string
    giftId?: StringFilter<"Offer"> | string
    buyerId?: StringFilter<"Offer"> | string
    sellerId?: StringNullableFilter<"Offer"> | string | null
    expiresAt?: DateTimeNullableFilter<"Offer"> | Date | string | null
    createdAt?: DateTimeFilter<"Offer"> | Date | string
    updatedAt?: DateTimeFilter<"Offer"> | Date | string
    gift?: XOR<GiftScalarRelationFilter, GiftWhereInput>
    buyer?: XOR<UserScalarRelationFilter, UserWhereInput>
    seller?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type OfferOrderByWithRelationInput = {
    id?: SortOrder
    amountTon?: SortOrder
    status?: SortOrder
    giftId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    gift?: GiftOrderByWithRelationInput
    buyer?: UserOrderByWithRelationInput
    seller?: UserOrderByWithRelationInput
  }

  export type OfferWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OfferWhereInput | OfferWhereInput[]
    OR?: OfferWhereInput[]
    NOT?: OfferWhereInput | OfferWhereInput[]
    amountTon?: DecimalFilter<"Offer"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Offer"> | string
    giftId?: StringFilter<"Offer"> | string
    buyerId?: StringFilter<"Offer"> | string
    sellerId?: StringNullableFilter<"Offer"> | string | null
    expiresAt?: DateTimeNullableFilter<"Offer"> | Date | string | null
    createdAt?: DateTimeFilter<"Offer"> | Date | string
    updatedAt?: DateTimeFilter<"Offer"> | Date | string
    gift?: XOR<GiftScalarRelationFilter, GiftWhereInput>
    buyer?: XOR<UserScalarRelationFilter, UserWhereInput>
    seller?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type OfferOrderByWithAggregationInput = {
    id?: SortOrder
    amountTon?: SortOrder
    status?: SortOrder
    giftId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OfferCountOrderByAggregateInput
    _avg?: OfferAvgOrderByAggregateInput
    _max?: OfferMaxOrderByAggregateInput
    _min?: OfferMinOrderByAggregateInput
    _sum?: OfferSumOrderByAggregateInput
  }

  export type OfferScalarWhereWithAggregatesInput = {
    AND?: OfferScalarWhereWithAggregatesInput | OfferScalarWhereWithAggregatesInput[]
    OR?: OfferScalarWhereWithAggregatesInput[]
    NOT?: OfferScalarWhereWithAggregatesInput | OfferScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Offer"> | string
    amountTon?: DecimalWithAggregatesFilter<"Offer"> | Decimal | DecimalJsLike | number | string
    status?: StringWithAggregatesFilter<"Offer"> | string
    giftId?: StringWithAggregatesFilter<"Offer"> | string
    buyerId?: StringWithAggregatesFilter<"Offer"> | string
    sellerId?: StringNullableWithAggregatesFilter<"Offer"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Offer"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Offer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Offer"> | Date | string
  }

  export type PvpRoomWhereInput = {
    AND?: PvpRoomWhereInput | PvpRoomWhereInput[]
    OR?: PvpRoomWhereInput[]
    NOT?: PvpRoomWhereInput | PvpRoomWhereInput[]
    id?: StringFilter<"PvpRoom"> | string
    code?: StringFilter<"PvpRoom"> | string
    stakeGram?: DecimalFilter<"PvpRoom"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"PvpRoom"> | string
    winnerId?: StringNullableFilter<"PvpRoom"> | string | null
    createdAt?: DateTimeFilter<"PvpRoom"> | Date | string
    startedAt?: DateTimeNullableFilter<"PvpRoom"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"PvpRoom"> | Date | string | null
    creatorId?: StringFilter<"PvpRoom"> | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    winner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    participants?: PvpParticipantListRelationFilter
    invitations?: PvpInvitationListRelationFilter
  }

  export type PvpRoomOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    stakeGram?: SortOrder
    status?: SortOrder
    winnerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    creatorId?: SortOrder
    creator?: UserOrderByWithRelationInput
    winner?: UserOrderByWithRelationInput
    participants?: PvpParticipantOrderByRelationAggregateInput
    invitations?: PvpInvitationOrderByRelationAggregateInput
  }

  export type PvpRoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: PvpRoomWhereInput | PvpRoomWhereInput[]
    OR?: PvpRoomWhereInput[]
    NOT?: PvpRoomWhereInput | PvpRoomWhereInput[]
    stakeGram?: DecimalFilter<"PvpRoom"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"PvpRoom"> | string
    winnerId?: StringNullableFilter<"PvpRoom"> | string | null
    createdAt?: DateTimeFilter<"PvpRoom"> | Date | string
    startedAt?: DateTimeNullableFilter<"PvpRoom"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"PvpRoom"> | Date | string | null
    creatorId?: StringFilter<"PvpRoom"> | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    winner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    participants?: PvpParticipantListRelationFilter
    invitations?: PvpInvitationListRelationFilter
  }, "id" | "code">

  export type PvpRoomOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    stakeGram?: SortOrder
    status?: SortOrder
    winnerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    creatorId?: SortOrder
    _count?: PvpRoomCountOrderByAggregateInput
    _avg?: PvpRoomAvgOrderByAggregateInput
    _max?: PvpRoomMaxOrderByAggregateInput
    _min?: PvpRoomMinOrderByAggregateInput
    _sum?: PvpRoomSumOrderByAggregateInput
  }

  export type PvpRoomScalarWhereWithAggregatesInput = {
    AND?: PvpRoomScalarWhereWithAggregatesInput | PvpRoomScalarWhereWithAggregatesInput[]
    OR?: PvpRoomScalarWhereWithAggregatesInput[]
    NOT?: PvpRoomScalarWhereWithAggregatesInput | PvpRoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PvpRoom"> | string
    code?: StringWithAggregatesFilter<"PvpRoom"> | string
    stakeGram?: DecimalWithAggregatesFilter<"PvpRoom"> | Decimal | DecimalJsLike | number | string
    status?: StringWithAggregatesFilter<"PvpRoom"> | string
    winnerId?: StringNullableWithAggregatesFilter<"PvpRoom"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PvpRoom"> | Date | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"PvpRoom"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"PvpRoom"> | Date | string | null
    creatorId?: StringWithAggregatesFilter<"PvpRoom"> | string
  }

  export type PvpParticipantWhereInput = {
    AND?: PvpParticipantWhereInput | PvpParticipantWhereInput[]
    OR?: PvpParticipantWhereInput[]
    NOT?: PvpParticipantWhereInput | PvpParticipantWhereInput[]
    id?: StringFilter<"PvpParticipant"> | string
    roomId?: StringFilter<"PvpParticipant"> | string
    userId?: StringFilter<"PvpParticipant"> | string
    joinedAt?: DateTimeFilter<"PvpParticipant"> | Date | string
    room?: XOR<PvpRoomScalarRelationFilter, PvpRoomWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PvpParticipantOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
    room?: PvpRoomOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type PvpParticipantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roomId_userId?: PvpParticipantRoomIdUserIdCompoundUniqueInput
    AND?: PvpParticipantWhereInput | PvpParticipantWhereInput[]
    OR?: PvpParticipantWhereInput[]
    NOT?: PvpParticipantWhereInput | PvpParticipantWhereInput[]
    roomId?: StringFilter<"PvpParticipant"> | string
    userId?: StringFilter<"PvpParticipant"> | string
    joinedAt?: DateTimeFilter<"PvpParticipant"> | Date | string
    room?: XOR<PvpRoomScalarRelationFilter, PvpRoomWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "roomId_userId">

  export type PvpParticipantOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
    _count?: PvpParticipantCountOrderByAggregateInput
    _max?: PvpParticipantMaxOrderByAggregateInput
    _min?: PvpParticipantMinOrderByAggregateInput
  }

  export type PvpParticipantScalarWhereWithAggregatesInput = {
    AND?: PvpParticipantScalarWhereWithAggregatesInput | PvpParticipantScalarWhereWithAggregatesInput[]
    OR?: PvpParticipantScalarWhereWithAggregatesInput[]
    NOT?: PvpParticipantScalarWhereWithAggregatesInput | PvpParticipantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PvpParticipant"> | string
    roomId?: StringWithAggregatesFilter<"PvpParticipant"> | string
    userId?: StringWithAggregatesFilter<"PvpParticipant"> | string
    joinedAt?: DateTimeWithAggregatesFilter<"PvpParticipant"> | Date | string
  }

  export type PvpInvitationWhereInput = {
    AND?: PvpInvitationWhereInput | PvpInvitationWhereInput[]
    OR?: PvpInvitationWhereInput[]
    NOT?: PvpInvitationWhereInput | PvpInvitationWhereInput[]
    id?: StringFilter<"PvpInvitation"> | string
    roomId?: StringFilter<"PvpInvitation"> | string
    senderId?: StringFilter<"PvpInvitation"> | string
    recipientId?: StringFilter<"PvpInvitation"> | string
    status?: StringFilter<"PvpInvitation"> | string
    createdAt?: DateTimeFilter<"PvpInvitation"> | Date | string
    updatedAt?: DateTimeFilter<"PvpInvitation"> | Date | string
    room?: XOR<PvpRoomScalarRelationFilter, PvpRoomWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    recipient?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PvpInvitationOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    recipientId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    room?: PvpRoomOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
    recipient?: UserOrderByWithRelationInput
  }

  export type PvpInvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roomId_recipientId?: PvpInvitationRoomIdRecipientIdCompoundUniqueInput
    AND?: PvpInvitationWhereInput | PvpInvitationWhereInput[]
    OR?: PvpInvitationWhereInput[]
    NOT?: PvpInvitationWhereInput | PvpInvitationWhereInput[]
    roomId?: StringFilter<"PvpInvitation"> | string
    senderId?: StringFilter<"PvpInvitation"> | string
    recipientId?: StringFilter<"PvpInvitation"> | string
    status?: StringFilter<"PvpInvitation"> | string
    createdAt?: DateTimeFilter<"PvpInvitation"> | Date | string
    updatedAt?: DateTimeFilter<"PvpInvitation"> | Date | string
    room?: XOR<PvpRoomScalarRelationFilter, PvpRoomWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    recipient?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "roomId_recipientId">

  export type PvpInvitationOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    recipientId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PvpInvitationCountOrderByAggregateInput
    _max?: PvpInvitationMaxOrderByAggregateInput
    _min?: PvpInvitationMinOrderByAggregateInput
  }

  export type PvpInvitationScalarWhereWithAggregatesInput = {
    AND?: PvpInvitationScalarWhereWithAggregatesInput | PvpInvitationScalarWhereWithAggregatesInput[]
    OR?: PvpInvitationScalarWhereWithAggregatesInput[]
    NOT?: PvpInvitationScalarWhereWithAggregatesInput | PvpInvitationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PvpInvitation"> | string
    roomId?: StringWithAggregatesFilter<"PvpInvitation"> | string
    senderId?: StringWithAggregatesFilter<"PvpInvitation"> | string
    recipientId?: StringWithAggregatesFilter<"PvpInvitation"> | string
    status?: StringWithAggregatesFilter<"PvpInvitation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PvpInvitation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PvpInvitation"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletCreateNestedManyWithoutUserInput
    gifts?: GiftCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationCreateNestedManyWithoutRecipientInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    gifts?: GiftUncheckedCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionUncheckedCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionUncheckedCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferUncheckedCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferUncheckedCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantUncheckedCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutRecipientInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUpdateManyWithoutUserNestedInput
    gifts?: GiftUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUpdateManyWithoutRecipientNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUncheckedUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUncheckedUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUncheckedUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUncheckedUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUncheckedUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUncheckedUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUncheckedUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutRecipientNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletCreateInput = {
    id?: string
    address: string
    network?: string
    isConnected?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWalletsInput
  }

  export type WalletUncheckedCreateInput = {
    id?: string
    address: string
    network?: string
    isConnected?: boolean
    createdAt?: Date | string
    userId: string
  }

  export type WalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    isConnected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletsNestedInput
  }

  export type WalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    isConnected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type WalletCreateManyInput = {
    id?: string
    address: string
    network?: string
    isConnected?: boolean
    createdAt?: Date | string
    userId: string
  }

  export type WalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    isConnected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    isConnected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type GiftCreateInput = {
    id?: string
    name: string
    collection: string
    emoji?: string | null
    priceTon: Decimal | DecimalJsLike | number | string
    backdropName?: string | null
    backdropColor?: string | null
    symbolName?: string | null
    symbolImageUrl?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutGiftsInput
    transactions?: TransactionCreateNestedManyWithoutGiftInput
    offers?: OfferCreateNestedManyWithoutGiftInput
  }

  export type GiftUncheckedCreateInput = {
    id?: string
    name: string
    collection: string
    emoji?: string | null
    priceTon: Decimal | DecimalJsLike | number | string
    backdropName?: string | null
    backdropColor?: string | null
    symbolName?: string | null
    symbolImageUrl?: string | null
    status?: string
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutGiftInput
    offers?: OfferUncheckedCreateNestedManyWithoutGiftInput
  }

  export type GiftUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    collection?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    priceTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    backdropName?: NullableStringFieldUpdateOperationsInput | string | null
    backdropColor?: NullableStringFieldUpdateOperationsInput | string | null
    symbolName?: NullableStringFieldUpdateOperationsInput | string | null
    symbolImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutGiftsNestedInput
    transactions?: TransactionUpdateManyWithoutGiftNestedInput
    offers?: OfferUpdateManyWithoutGiftNestedInput
  }

  export type GiftUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    collection?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    priceTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    backdropName?: NullableStringFieldUpdateOperationsInput | string | null
    backdropColor?: NullableStringFieldUpdateOperationsInput | string | null
    symbolName?: NullableStringFieldUpdateOperationsInput | string | null
    symbolImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutGiftNestedInput
    offers?: OfferUncheckedUpdateManyWithoutGiftNestedInput
  }

  export type GiftCreateManyInput = {
    id?: string
    name: string
    collection: string
    emoji?: string | null
    priceTon: Decimal | DecimalJsLike | number | string
    backdropName?: string | null
    backdropColor?: string | null
    symbolName?: string | null
    symbolImageUrl?: string | null
    status?: string
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GiftUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    collection?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    priceTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    backdropName?: NullableStringFieldUpdateOperationsInput | string | null
    backdropColor?: NullableStringFieldUpdateOperationsInput | string | null
    symbolName?: NullableStringFieldUpdateOperationsInput | string | null
    symbolImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    collection?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    priceTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    backdropName?: NullableStringFieldUpdateOperationsInput | string | null
    backdropColor?: NullableStringFieldUpdateOperationsInput | string | null
    symbolName?: NullableStringFieldUpdateOperationsInput | string | null
    symbolImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    type: string
    status?: string
    amountTon: Decimal | DecimalJsLike | number | string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gift?: GiftCreateNestedOneWithoutTransactionsInput
    buyer?: UserCreateNestedOneWithoutBuyerTransactionsInput
    seller?: UserCreateNestedOneWithoutSellerTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    type: string
    status?: string
    amountTon: Decimal | DecimalJsLike | number | string
    giftId?: string | null
    buyerId?: string | null
    sellerId?: string | null
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gift?: GiftUpdateOneWithoutTransactionsNestedInput
    buyer?: UserUpdateOneWithoutBuyerTransactionsNestedInput
    seller?: UserUpdateOneWithoutSellerTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    buyerId?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    type: string
    status?: string
    amountTon: Decimal | DecimalJsLike | number | string
    giftId?: string | null
    buyerId?: string | null
    sellerId?: string | null
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    buyerId?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferCreateInput = {
    id?: string
    amountTon: Decimal | DecimalJsLike | number | string
    status?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gift: GiftCreateNestedOneWithoutOffersInput
    buyer: UserCreateNestedOneWithoutBuyerOffersInput
    seller?: UserCreateNestedOneWithoutSellerOffersInput
  }

  export type OfferUncheckedCreateInput = {
    id?: string
    amountTon: Decimal | DecimalJsLike | number | string
    status?: string
    giftId: string
    buyerId: string
    sellerId?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gift?: GiftUpdateOneRequiredWithoutOffersNestedInput
    buyer?: UserUpdateOneRequiredWithoutBuyerOffersNestedInput
    seller?: UserUpdateOneWithoutSellerOffersNestedInput
  }

  export type OfferUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    giftId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferCreateManyInput = {
    id?: string
    amountTon: Decimal | DecimalJsLike | number | string
    status?: string
    giftId: string
    buyerId: string
    sellerId?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    giftId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpRoomCreateInput = {
    id?: string
    code: string
    stakeGram: Decimal | DecimalJsLike | number | string
    status?: string
    createdAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    creator: UserCreateNestedOneWithoutCreatedPvpRoomsInput
    winner?: UserCreateNestedOneWithoutWonPvpRoomsInput
    participants?: PvpParticipantCreateNestedManyWithoutRoomInput
    invitations?: PvpInvitationCreateNestedManyWithoutRoomInput
  }

  export type PvpRoomUncheckedCreateInput = {
    id?: string
    code: string
    stakeGram: Decimal | DecimalJsLike | number | string
    status?: string
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    creatorId: string
    participants?: PvpParticipantUncheckedCreateNestedManyWithoutRoomInput
    invitations?: PvpInvitationUncheckedCreateNestedManyWithoutRoomInput
  }

  export type PvpRoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneRequiredWithoutCreatedPvpRoomsNestedInput
    winner?: UserUpdateOneWithoutWonPvpRoomsNestedInput
    participants?: PvpParticipantUpdateManyWithoutRoomNestedInput
    invitations?: PvpInvitationUpdateManyWithoutRoomNestedInput
  }

  export type PvpRoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    participants?: PvpParticipantUncheckedUpdateManyWithoutRoomNestedInput
    invitations?: PvpInvitationUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type PvpRoomCreateManyInput = {
    id?: string
    code: string
    stakeGram: Decimal | DecimalJsLike | number | string
    status?: string
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    creatorId: string
  }

  export type PvpRoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PvpRoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type PvpParticipantCreateInput = {
    id?: string
    joinedAt?: Date | string
    room: PvpRoomCreateNestedOneWithoutParticipantsInput
    user: UserCreateNestedOneWithoutPvpParticipationsInput
  }

  export type PvpParticipantUncheckedCreateInput = {
    id?: string
    roomId: string
    userId: string
    joinedAt?: Date | string
  }

  export type PvpParticipantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: PvpRoomUpdateOneRequiredWithoutParticipantsNestedInput
    user?: UserUpdateOneRequiredWithoutPvpParticipationsNestedInput
  }

  export type PvpParticipantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpParticipantCreateManyInput = {
    id?: string
    roomId: string
    userId: string
    joinedAt?: Date | string
  }

  export type PvpParticipantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpParticipantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpInvitationCreateInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    room: PvpRoomCreateNestedOneWithoutInvitationsInput
    sender: UserCreateNestedOneWithoutSentPvpInvitationsInput
    recipient: UserCreateNestedOneWithoutReceivedPvpInvitationsInput
  }

  export type PvpInvitationUncheckedCreateInput = {
    id?: string
    roomId: string
    senderId: string
    recipientId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PvpInvitationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: PvpRoomUpdateOneRequiredWithoutInvitationsNestedInput
    sender?: UserUpdateOneRequiredWithoutSentPvpInvitationsNestedInput
    recipient?: UserUpdateOneRequiredWithoutReceivedPvpInvitationsNestedInput
  }

  export type PvpInvitationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    recipientId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpInvitationCreateManyInput = {
    id?: string
    roomId: string
    senderId: string
    recipientId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PvpInvitationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpInvitationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    recipientId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WalletListRelationFilter = {
    every?: WalletWhereInput
    some?: WalletWhereInput
    none?: WalletWhereInput
  }

  export type GiftListRelationFilter = {
    every?: GiftWhereInput
    some?: GiftWhereInput
    none?: GiftWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type OfferListRelationFilter = {
    every?: OfferWhereInput
    some?: OfferWhereInput
    none?: OfferWhereInput
  }

  export type PvpRoomListRelationFilter = {
    every?: PvpRoomWhereInput
    some?: PvpRoomWhereInput
    none?: PvpRoomWhereInput
  }

  export type PvpParticipantListRelationFilter = {
    every?: PvpParticipantWhereInput
    some?: PvpParticipantWhereInput
    none?: PvpParticipantWhereInput
  }

  export type PvpInvitationListRelationFilter = {
    every?: PvpInvitationWhereInput
    some?: PvpInvitationWhereInput
    none?: PvpInvitationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WalletOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GiftOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OfferOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PvpRoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PvpParticipantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PvpInvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WalletCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    network?: SortOrder
    isConnected?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type WalletMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    network?: SortOrder
    isConnected?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type WalletMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    network?: SortOrder
    isConnected?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type GiftCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    collection?: SortOrder
    emoji?: SortOrder
    priceTon?: SortOrder
    backdropName?: SortOrder
    backdropColor?: SortOrder
    symbolName?: SortOrder
    symbolImageUrl?: SortOrder
    status?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GiftAvgOrderByAggregateInput = {
    priceTon?: SortOrder
  }

  export type GiftMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    collection?: SortOrder
    emoji?: SortOrder
    priceTon?: SortOrder
    backdropName?: SortOrder
    backdropColor?: SortOrder
    symbolName?: SortOrder
    symbolImageUrl?: SortOrder
    status?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GiftMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    collection?: SortOrder
    emoji?: SortOrder
    priceTon?: SortOrder
    backdropName?: SortOrder
    backdropColor?: SortOrder
    symbolName?: SortOrder
    symbolImageUrl?: SortOrder
    status?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GiftSumOrderByAggregateInput = {
    priceTon?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type GiftNullableScalarRelationFilter = {
    is?: GiftWhereInput | null
    isNot?: GiftWhereInput | null
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    amountTon?: SortOrder
    giftId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amountTon?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    amountTon?: SortOrder
    giftId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    amountTon?: SortOrder
    giftId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amountTon?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type GiftScalarRelationFilter = {
    is?: GiftWhereInput
    isNot?: GiftWhereInput
  }

  export type OfferCountOrderByAggregateInput = {
    id?: SortOrder
    amountTon?: SortOrder
    status?: SortOrder
    giftId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferAvgOrderByAggregateInput = {
    amountTon?: SortOrder
  }

  export type OfferMaxOrderByAggregateInput = {
    id?: SortOrder
    amountTon?: SortOrder
    status?: SortOrder
    giftId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferMinOrderByAggregateInput = {
    id?: SortOrder
    amountTon?: SortOrder
    status?: SortOrder
    giftId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferSumOrderByAggregateInput = {
    amountTon?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PvpRoomCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    stakeGram?: SortOrder
    status?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type PvpRoomAvgOrderByAggregateInput = {
    stakeGram?: SortOrder
  }

  export type PvpRoomMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    stakeGram?: SortOrder
    status?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type PvpRoomMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    stakeGram?: SortOrder
    status?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type PvpRoomSumOrderByAggregateInput = {
    stakeGram?: SortOrder
  }

  export type PvpRoomScalarRelationFilter = {
    is?: PvpRoomWhereInput
    isNot?: PvpRoomWhereInput
  }

  export type PvpParticipantRoomIdUserIdCompoundUniqueInput = {
    roomId: string
    userId: string
  }

  export type PvpParticipantCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
  }

  export type PvpParticipantMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
  }

  export type PvpParticipantMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
  }

  export type PvpInvitationRoomIdRecipientIdCompoundUniqueInput = {
    roomId: string
    recipientId: string
  }

  export type PvpInvitationCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    recipientId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PvpInvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    recipientId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PvpInvitationMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    recipientId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type GiftCreateNestedManyWithoutOwnerInput = {
    create?: XOR<GiftCreateWithoutOwnerInput, GiftUncheckedCreateWithoutOwnerInput> | GiftCreateWithoutOwnerInput[] | GiftUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: GiftCreateOrConnectWithoutOwnerInput | GiftCreateOrConnectWithoutOwnerInput[]
    createMany?: GiftCreateManyOwnerInputEnvelope
    connect?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutBuyerInput = {
    create?: XOR<TransactionCreateWithoutBuyerInput, TransactionUncheckedCreateWithoutBuyerInput> | TransactionCreateWithoutBuyerInput[] | TransactionUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutBuyerInput | TransactionCreateOrConnectWithoutBuyerInput[]
    createMany?: TransactionCreateManyBuyerInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutSellerInput = {
    create?: XOR<TransactionCreateWithoutSellerInput, TransactionUncheckedCreateWithoutSellerInput> | TransactionCreateWithoutSellerInput[] | TransactionUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutSellerInput | TransactionCreateOrConnectWithoutSellerInput[]
    createMany?: TransactionCreateManySellerInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type OfferCreateNestedManyWithoutBuyerInput = {
    create?: XOR<OfferCreateWithoutBuyerInput, OfferUncheckedCreateWithoutBuyerInput> | OfferCreateWithoutBuyerInput[] | OfferUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutBuyerInput | OfferCreateOrConnectWithoutBuyerInput[]
    createMany?: OfferCreateManyBuyerInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
  }

  export type OfferCreateNestedManyWithoutSellerInput = {
    create?: XOR<OfferCreateWithoutSellerInput, OfferUncheckedCreateWithoutSellerInput> | OfferCreateWithoutSellerInput[] | OfferUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutSellerInput | OfferCreateOrConnectWithoutSellerInput[]
    createMany?: OfferCreateManySellerInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
  }

  export type PvpRoomCreateNestedManyWithoutCreatorInput = {
    create?: XOR<PvpRoomCreateWithoutCreatorInput, PvpRoomUncheckedCreateWithoutCreatorInput> | PvpRoomCreateWithoutCreatorInput[] | PvpRoomUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PvpRoomCreateOrConnectWithoutCreatorInput | PvpRoomCreateOrConnectWithoutCreatorInput[]
    createMany?: PvpRoomCreateManyCreatorInputEnvelope
    connect?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
  }

  export type PvpRoomCreateNestedManyWithoutWinnerInput = {
    create?: XOR<PvpRoomCreateWithoutWinnerInput, PvpRoomUncheckedCreateWithoutWinnerInput> | PvpRoomCreateWithoutWinnerInput[] | PvpRoomUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: PvpRoomCreateOrConnectWithoutWinnerInput | PvpRoomCreateOrConnectWithoutWinnerInput[]
    createMany?: PvpRoomCreateManyWinnerInputEnvelope
    connect?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
  }

  export type PvpParticipantCreateNestedManyWithoutUserInput = {
    create?: XOR<PvpParticipantCreateWithoutUserInput, PvpParticipantUncheckedCreateWithoutUserInput> | PvpParticipantCreateWithoutUserInput[] | PvpParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PvpParticipantCreateOrConnectWithoutUserInput | PvpParticipantCreateOrConnectWithoutUserInput[]
    createMany?: PvpParticipantCreateManyUserInputEnvelope
    connect?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
  }

  export type PvpInvitationCreateNestedManyWithoutSenderInput = {
    create?: XOR<PvpInvitationCreateWithoutSenderInput, PvpInvitationUncheckedCreateWithoutSenderInput> | PvpInvitationCreateWithoutSenderInput[] | PvpInvitationUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: PvpInvitationCreateOrConnectWithoutSenderInput | PvpInvitationCreateOrConnectWithoutSenderInput[]
    createMany?: PvpInvitationCreateManySenderInputEnvelope
    connect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
  }

  export type PvpInvitationCreateNestedManyWithoutRecipientInput = {
    create?: XOR<PvpInvitationCreateWithoutRecipientInput, PvpInvitationUncheckedCreateWithoutRecipientInput> | PvpInvitationCreateWithoutRecipientInput[] | PvpInvitationUncheckedCreateWithoutRecipientInput[]
    connectOrCreate?: PvpInvitationCreateOrConnectWithoutRecipientInput | PvpInvitationCreateOrConnectWithoutRecipientInput[]
    createMany?: PvpInvitationCreateManyRecipientInputEnvelope
    connect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
  }

  export type WalletUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type GiftUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<GiftCreateWithoutOwnerInput, GiftUncheckedCreateWithoutOwnerInput> | GiftCreateWithoutOwnerInput[] | GiftUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: GiftCreateOrConnectWithoutOwnerInput | GiftCreateOrConnectWithoutOwnerInput[]
    createMany?: GiftCreateManyOwnerInputEnvelope
    connect?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutBuyerInput = {
    create?: XOR<TransactionCreateWithoutBuyerInput, TransactionUncheckedCreateWithoutBuyerInput> | TransactionCreateWithoutBuyerInput[] | TransactionUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutBuyerInput | TransactionCreateOrConnectWithoutBuyerInput[]
    createMany?: TransactionCreateManyBuyerInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutSellerInput = {
    create?: XOR<TransactionCreateWithoutSellerInput, TransactionUncheckedCreateWithoutSellerInput> | TransactionCreateWithoutSellerInput[] | TransactionUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutSellerInput | TransactionCreateOrConnectWithoutSellerInput[]
    createMany?: TransactionCreateManySellerInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type OfferUncheckedCreateNestedManyWithoutBuyerInput = {
    create?: XOR<OfferCreateWithoutBuyerInput, OfferUncheckedCreateWithoutBuyerInput> | OfferCreateWithoutBuyerInput[] | OfferUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutBuyerInput | OfferCreateOrConnectWithoutBuyerInput[]
    createMany?: OfferCreateManyBuyerInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
  }

  export type OfferUncheckedCreateNestedManyWithoutSellerInput = {
    create?: XOR<OfferCreateWithoutSellerInput, OfferUncheckedCreateWithoutSellerInput> | OfferCreateWithoutSellerInput[] | OfferUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutSellerInput | OfferCreateOrConnectWithoutSellerInput[]
    createMany?: OfferCreateManySellerInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
  }

  export type PvpRoomUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<PvpRoomCreateWithoutCreatorInput, PvpRoomUncheckedCreateWithoutCreatorInput> | PvpRoomCreateWithoutCreatorInput[] | PvpRoomUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PvpRoomCreateOrConnectWithoutCreatorInput | PvpRoomCreateOrConnectWithoutCreatorInput[]
    createMany?: PvpRoomCreateManyCreatorInputEnvelope
    connect?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
  }

  export type PvpRoomUncheckedCreateNestedManyWithoutWinnerInput = {
    create?: XOR<PvpRoomCreateWithoutWinnerInput, PvpRoomUncheckedCreateWithoutWinnerInput> | PvpRoomCreateWithoutWinnerInput[] | PvpRoomUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: PvpRoomCreateOrConnectWithoutWinnerInput | PvpRoomCreateOrConnectWithoutWinnerInput[]
    createMany?: PvpRoomCreateManyWinnerInputEnvelope
    connect?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
  }

  export type PvpParticipantUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PvpParticipantCreateWithoutUserInput, PvpParticipantUncheckedCreateWithoutUserInput> | PvpParticipantCreateWithoutUserInput[] | PvpParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PvpParticipantCreateOrConnectWithoutUserInput | PvpParticipantCreateOrConnectWithoutUserInput[]
    createMany?: PvpParticipantCreateManyUserInputEnvelope
    connect?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
  }

  export type PvpInvitationUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<PvpInvitationCreateWithoutSenderInput, PvpInvitationUncheckedCreateWithoutSenderInput> | PvpInvitationCreateWithoutSenderInput[] | PvpInvitationUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: PvpInvitationCreateOrConnectWithoutSenderInput | PvpInvitationCreateOrConnectWithoutSenderInput[]
    createMany?: PvpInvitationCreateManySenderInputEnvelope
    connect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
  }

  export type PvpInvitationUncheckedCreateNestedManyWithoutRecipientInput = {
    create?: XOR<PvpInvitationCreateWithoutRecipientInput, PvpInvitationUncheckedCreateWithoutRecipientInput> | PvpInvitationCreateWithoutRecipientInput[] | PvpInvitationUncheckedCreateWithoutRecipientInput[]
    connectOrCreate?: PvpInvitationCreateOrConnectWithoutRecipientInput | PvpInvitationCreateOrConnectWithoutRecipientInput[]
    createMany?: PvpInvitationCreateManyRecipientInputEnvelope
    connect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WalletUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type GiftUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<GiftCreateWithoutOwnerInput, GiftUncheckedCreateWithoutOwnerInput> | GiftCreateWithoutOwnerInput[] | GiftUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: GiftCreateOrConnectWithoutOwnerInput | GiftCreateOrConnectWithoutOwnerInput[]
    upsert?: GiftUpsertWithWhereUniqueWithoutOwnerInput | GiftUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: GiftCreateManyOwnerInputEnvelope
    set?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    disconnect?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    delete?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    connect?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    update?: GiftUpdateWithWhereUniqueWithoutOwnerInput | GiftUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: GiftUpdateManyWithWhereWithoutOwnerInput | GiftUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: GiftScalarWhereInput | GiftScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<TransactionCreateWithoutBuyerInput, TransactionUncheckedCreateWithoutBuyerInput> | TransactionCreateWithoutBuyerInput[] | TransactionUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutBuyerInput | TransactionCreateOrConnectWithoutBuyerInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutBuyerInput | TransactionUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: TransactionCreateManyBuyerInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutBuyerInput | TransactionUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutBuyerInput | TransactionUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutSellerNestedInput = {
    create?: XOR<TransactionCreateWithoutSellerInput, TransactionUncheckedCreateWithoutSellerInput> | TransactionCreateWithoutSellerInput[] | TransactionUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutSellerInput | TransactionCreateOrConnectWithoutSellerInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutSellerInput | TransactionUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: TransactionCreateManySellerInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutSellerInput | TransactionUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutSellerInput | TransactionUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type OfferUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<OfferCreateWithoutBuyerInput, OfferUncheckedCreateWithoutBuyerInput> | OfferCreateWithoutBuyerInput[] | OfferUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutBuyerInput | OfferCreateOrConnectWithoutBuyerInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutBuyerInput | OfferUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: OfferCreateManyBuyerInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutBuyerInput | OfferUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutBuyerInput | OfferUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
  }

  export type OfferUpdateManyWithoutSellerNestedInput = {
    create?: XOR<OfferCreateWithoutSellerInput, OfferUncheckedCreateWithoutSellerInput> | OfferCreateWithoutSellerInput[] | OfferUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutSellerInput | OfferCreateOrConnectWithoutSellerInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutSellerInput | OfferUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: OfferCreateManySellerInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutSellerInput | OfferUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutSellerInput | OfferUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
  }

  export type PvpRoomUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<PvpRoomCreateWithoutCreatorInput, PvpRoomUncheckedCreateWithoutCreatorInput> | PvpRoomCreateWithoutCreatorInput[] | PvpRoomUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PvpRoomCreateOrConnectWithoutCreatorInput | PvpRoomCreateOrConnectWithoutCreatorInput[]
    upsert?: PvpRoomUpsertWithWhereUniqueWithoutCreatorInput | PvpRoomUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: PvpRoomCreateManyCreatorInputEnvelope
    set?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    disconnect?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    delete?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    connect?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    update?: PvpRoomUpdateWithWhereUniqueWithoutCreatorInput | PvpRoomUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: PvpRoomUpdateManyWithWhereWithoutCreatorInput | PvpRoomUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: PvpRoomScalarWhereInput | PvpRoomScalarWhereInput[]
  }

  export type PvpRoomUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<PvpRoomCreateWithoutWinnerInput, PvpRoomUncheckedCreateWithoutWinnerInput> | PvpRoomCreateWithoutWinnerInput[] | PvpRoomUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: PvpRoomCreateOrConnectWithoutWinnerInput | PvpRoomCreateOrConnectWithoutWinnerInput[]
    upsert?: PvpRoomUpsertWithWhereUniqueWithoutWinnerInput | PvpRoomUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: PvpRoomCreateManyWinnerInputEnvelope
    set?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    disconnect?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    delete?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    connect?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    update?: PvpRoomUpdateWithWhereUniqueWithoutWinnerInput | PvpRoomUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: PvpRoomUpdateManyWithWhereWithoutWinnerInput | PvpRoomUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: PvpRoomScalarWhereInput | PvpRoomScalarWhereInput[]
  }

  export type PvpParticipantUpdateManyWithoutUserNestedInput = {
    create?: XOR<PvpParticipantCreateWithoutUserInput, PvpParticipantUncheckedCreateWithoutUserInput> | PvpParticipantCreateWithoutUserInput[] | PvpParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PvpParticipantCreateOrConnectWithoutUserInput | PvpParticipantCreateOrConnectWithoutUserInput[]
    upsert?: PvpParticipantUpsertWithWhereUniqueWithoutUserInput | PvpParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PvpParticipantCreateManyUserInputEnvelope
    set?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    disconnect?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    delete?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    connect?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    update?: PvpParticipantUpdateWithWhereUniqueWithoutUserInput | PvpParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PvpParticipantUpdateManyWithWhereWithoutUserInput | PvpParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PvpParticipantScalarWhereInput | PvpParticipantScalarWhereInput[]
  }

  export type PvpInvitationUpdateManyWithoutSenderNestedInput = {
    create?: XOR<PvpInvitationCreateWithoutSenderInput, PvpInvitationUncheckedCreateWithoutSenderInput> | PvpInvitationCreateWithoutSenderInput[] | PvpInvitationUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: PvpInvitationCreateOrConnectWithoutSenderInput | PvpInvitationCreateOrConnectWithoutSenderInput[]
    upsert?: PvpInvitationUpsertWithWhereUniqueWithoutSenderInput | PvpInvitationUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: PvpInvitationCreateManySenderInputEnvelope
    set?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    disconnect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    delete?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    connect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    update?: PvpInvitationUpdateWithWhereUniqueWithoutSenderInput | PvpInvitationUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: PvpInvitationUpdateManyWithWhereWithoutSenderInput | PvpInvitationUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: PvpInvitationScalarWhereInput | PvpInvitationScalarWhereInput[]
  }

  export type PvpInvitationUpdateManyWithoutRecipientNestedInput = {
    create?: XOR<PvpInvitationCreateWithoutRecipientInput, PvpInvitationUncheckedCreateWithoutRecipientInput> | PvpInvitationCreateWithoutRecipientInput[] | PvpInvitationUncheckedCreateWithoutRecipientInput[]
    connectOrCreate?: PvpInvitationCreateOrConnectWithoutRecipientInput | PvpInvitationCreateOrConnectWithoutRecipientInput[]
    upsert?: PvpInvitationUpsertWithWhereUniqueWithoutRecipientInput | PvpInvitationUpsertWithWhereUniqueWithoutRecipientInput[]
    createMany?: PvpInvitationCreateManyRecipientInputEnvelope
    set?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    disconnect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    delete?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    connect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    update?: PvpInvitationUpdateWithWhereUniqueWithoutRecipientInput | PvpInvitationUpdateWithWhereUniqueWithoutRecipientInput[]
    updateMany?: PvpInvitationUpdateManyWithWhereWithoutRecipientInput | PvpInvitationUpdateManyWithWhereWithoutRecipientInput[]
    deleteMany?: PvpInvitationScalarWhereInput | PvpInvitationScalarWhereInput[]
  }

  export type WalletUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type GiftUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<GiftCreateWithoutOwnerInput, GiftUncheckedCreateWithoutOwnerInput> | GiftCreateWithoutOwnerInput[] | GiftUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: GiftCreateOrConnectWithoutOwnerInput | GiftCreateOrConnectWithoutOwnerInput[]
    upsert?: GiftUpsertWithWhereUniqueWithoutOwnerInput | GiftUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: GiftCreateManyOwnerInputEnvelope
    set?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    disconnect?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    delete?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    connect?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    update?: GiftUpdateWithWhereUniqueWithoutOwnerInput | GiftUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: GiftUpdateManyWithWhereWithoutOwnerInput | GiftUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: GiftScalarWhereInput | GiftScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<TransactionCreateWithoutBuyerInput, TransactionUncheckedCreateWithoutBuyerInput> | TransactionCreateWithoutBuyerInput[] | TransactionUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutBuyerInput | TransactionCreateOrConnectWithoutBuyerInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutBuyerInput | TransactionUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: TransactionCreateManyBuyerInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutBuyerInput | TransactionUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutBuyerInput | TransactionUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutSellerNestedInput = {
    create?: XOR<TransactionCreateWithoutSellerInput, TransactionUncheckedCreateWithoutSellerInput> | TransactionCreateWithoutSellerInput[] | TransactionUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutSellerInput | TransactionCreateOrConnectWithoutSellerInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutSellerInput | TransactionUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: TransactionCreateManySellerInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutSellerInput | TransactionUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutSellerInput | TransactionUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type OfferUncheckedUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<OfferCreateWithoutBuyerInput, OfferUncheckedCreateWithoutBuyerInput> | OfferCreateWithoutBuyerInput[] | OfferUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutBuyerInput | OfferCreateOrConnectWithoutBuyerInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutBuyerInput | OfferUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: OfferCreateManyBuyerInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutBuyerInput | OfferUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutBuyerInput | OfferUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
  }

  export type OfferUncheckedUpdateManyWithoutSellerNestedInput = {
    create?: XOR<OfferCreateWithoutSellerInput, OfferUncheckedCreateWithoutSellerInput> | OfferCreateWithoutSellerInput[] | OfferUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutSellerInput | OfferCreateOrConnectWithoutSellerInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutSellerInput | OfferUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: OfferCreateManySellerInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutSellerInput | OfferUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutSellerInput | OfferUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
  }

  export type PvpRoomUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<PvpRoomCreateWithoutCreatorInput, PvpRoomUncheckedCreateWithoutCreatorInput> | PvpRoomCreateWithoutCreatorInput[] | PvpRoomUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PvpRoomCreateOrConnectWithoutCreatorInput | PvpRoomCreateOrConnectWithoutCreatorInput[]
    upsert?: PvpRoomUpsertWithWhereUniqueWithoutCreatorInput | PvpRoomUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: PvpRoomCreateManyCreatorInputEnvelope
    set?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    disconnect?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    delete?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    connect?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    update?: PvpRoomUpdateWithWhereUniqueWithoutCreatorInput | PvpRoomUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: PvpRoomUpdateManyWithWhereWithoutCreatorInput | PvpRoomUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: PvpRoomScalarWhereInput | PvpRoomScalarWhereInput[]
  }

  export type PvpRoomUncheckedUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<PvpRoomCreateWithoutWinnerInput, PvpRoomUncheckedCreateWithoutWinnerInput> | PvpRoomCreateWithoutWinnerInput[] | PvpRoomUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: PvpRoomCreateOrConnectWithoutWinnerInput | PvpRoomCreateOrConnectWithoutWinnerInput[]
    upsert?: PvpRoomUpsertWithWhereUniqueWithoutWinnerInput | PvpRoomUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: PvpRoomCreateManyWinnerInputEnvelope
    set?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    disconnect?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    delete?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    connect?: PvpRoomWhereUniqueInput | PvpRoomWhereUniqueInput[]
    update?: PvpRoomUpdateWithWhereUniqueWithoutWinnerInput | PvpRoomUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: PvpRoomUpdateManyWithWhereWithoutWinnerInput | PvpRoomUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: PvpRoomScalarWhereInput | PvpRoomScalarWhereInput[]
  }

  export type PvpParticipantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PvpParticipantCreateWithoutUserInput, PvpParticipantUncheckedCreateWithoutUserInput> | PvpParticipantCreateWithoutUserInput[] | PvpParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PvpParticipantCreateOrConnectWithoutUserInput | PvpParticipantCreateOrConnectWithoutUserInput[]
    upsert?: PvpParticipantUpsertWithWhereUniqueWithoutUserInput | PvpParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PvpParticipantCreateManyUserInputEnvelope
    set?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    disconnect?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    delete?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    connect?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    update?: PvpParticipantUpdateWithWhereUniqueWithoutUserInput | PvpParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PvpParticipantUpdateManyWithWhereWithoutUserInput | PvpParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PvpParticipantScalarWhereInput | PvpParticipantScalarWhereInput[]
  }

  export type PvpInvitationUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<PvpInvitationCreateWithoutSenderInput, PvpInvitationUncheckedCreateWithoutSenderInput> | PvpInvitationCreateWithoutSenderInput[] | PvpInvitationUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: PvpInvitationCreateOrConnectWithoutSenderInput | PvpInvitationCreateOrConnectWithoutSenderInput[]
    upsert?: PvpInvitationUpsertWithWhereUniqueWithoutSenderInput | PvpInvitationUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: PvpInvitationCreateManySenderInputEnvelope
    set?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    disconnect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    delete?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    connect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    update?: PvpInvitationUpdateWithWhereUniqueWithoutSenderInput | PvpInvitationUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: PvpInvitationUpdateManyWithWhereWithoutSenderInput | PvpInvitationUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: PvpInvitationScalarWhereInput | PvpInvitationScalarWhereInput[]
  }

  export type PvpInvitationUncheckedUpdateManyWithoutRecipientNestedInput = {
    create?: XOR<PvpInvitationCreateWithoutRecipientInput, PvpInvitationUncheckedCreateWithoutRecipientInput> | PvpInvitationCreateWithoutRecipientInput[] | PvpInvitationUncheckedCreateWithoutRecipientInput[]
    connectOrCreate?: PvpInvitationCreateOrConnectWithoutRecipientInput | PvpInvitationCreateOrConnectWithoutRecipientInput[]
    upsert?: PvpInvitationUpsertWithWhereUniqueWithoutRecipientInput | PvpInvitationUpsertWithWhereUniqueWithoutRecipientInput[]
    createMany?: PvpInvitationCreateManyRecipientInputEnvelope
    set?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    disconnect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    delete?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    connect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    update?: PvpInvitationUpdateWithWhereUniqueWithoutRecipientInput | PvpInvitationUpdateWithWhereUniqueWithoutRecipientInput[]
    updateMany?: PvpInvitationUpdateManyWithWhereWithoutRecipientInput | PvpInvitationUpdateManyWithWhereWithoutRecipientInput[]
    deleteMany?: PvpInvitationScalarWhereInput | PvpInvitationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWalletsInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutWalletsNestedInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    upsert?: UserUpsertWithoutWalletsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletsInput, UserUpdateWithoutWalletsInput>, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type UserCreateNestedOneWithoutGiftsInput = {
    create?: XOR<UserCreateWithoutGiftsInput, UserUncheckedCreateWithoutGiftsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGiftsInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutGiftInput = {
    create?: XOR<TransactionCreateWithoutGiftInput, TransactionUncheckedCreateWithoutGiftInput> | TransactionCreateWithoutGiftInput[] | TransactionUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutGiftInput | TransactionCreateOrConnectWithoutGiftInput[]
    createMany?: TransactionCreateManyGiftInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type OfferCreateNestedManyWithoutGiftInput = {
    create?: XOR<OfferCreateWithoutGiftInput, OfferUncheckedCreateWithoutGiftInput> | OfferCreateWithoutGiftInput[] | OfferUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutGiftInput | OfferCreateOrConnectWithoutGiftInput[]
    createMany?: OfferCreateManyGiftInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutGiftInput = {
    create?: XOR<TransactionCreateWithoutGiftInput, TransactionUncheckedCreateWithoutGiftInput> | TransactionCreateWithoutGiftInput[] | TransactionUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutGiftInput | TransactionCreateOrConnectWithoutGiftInput[]
    createMany?: TransactionCreateManyGiftInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type OfferUncheckedCreateNestedManyWithoutGiftInput = {
    create?: XOR<OfferCreateWithoutGiftInput, OfferUncheckedCreateWithoutGiftInput> | OfferCreateWithoutGiftInput[] | OfferUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutGiftInput | OfferCreateOrConnectWithoutGiftInput[]
    createMany?: OfferCreateManyGiftInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneWithoutGiftsNestedInput = {
    create?: XOR<UserCreateWithoutGiftsInput, UserUncheckedCreateWithoutGiftsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGiftsInput
    upsert?: UserUpsertWithoutGiftsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGiftsInput, UserUpdateWithoutGiftsInput>, UserUncheckedUpdateWithoutGiftsInput>
  }

  export type TransactionUpdateManyWithoutGiftNestedInput = {
    create?: XOR<TransactionCreateWithoutGiftInput, TransactionUncheckedCreateWithoutGiftInput> | TransactionCreateWithoutGiftInput[] | TransactionUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutGiftInput | TransactionCreateOrConnectWithoutGiftInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutGiftInput | TransactionUpsertWithWhereUniqueWithoutGiftInput[]
    createMany?: TransactionCreateManyGiftInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutGiftInput | TransactionUpdateWithWhereUniqueWithoutGiftInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutGiftInput | TransactionUpdateManyWithWhereWithoutGiftInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type OfferUpdateManyWithoutGiftNestedInput = {
    create?: XOR<OfferCreateWithoutGiftInput, OfferUncheckedCreateWithoutGiftInput> | OfferCreateWithoutGiftInput[] | OfferUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutGiftInput | OfferCreateOrConnectWithoutGiftInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutGiftInput | OfferUpsertWithWhereUniqueWithoutGiftInput[]
    createMany?: OfferCreateManyGiftInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutGiftInput | OfferUpdateWithWhereUniqueWithoutGiftInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutGiftInput | OfferUpdateManyWithWhereWithoutGiftInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutGiftNestedInput = {
    create?: XOR<TransactionCreateWithoutGiftInput, TransactionUncheckedCreateWithoutGiftInput> | TransactionCreateWithoutGiftInput[] | TransactionUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutGiftInput | TransactionCreateOrConnectWithoutGiftInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutGiftInput | TransactionUpsertWithWhereUniqueWithoutGiftInput[]
    createMany?: TransactionCreateManyGiftInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutGiftInput | TransactionUpdateWithWhereUniqueWithoutGiftInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutGiftInput | TransactionUpdateManyWithWhereWithoutGiftInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type OfferUncheckedUpdateManyWithoutGiftNestedInput = {
    create?: XOR<OfferCreateWithoutGiftInput, OfferUncheckedCreateWithoutGiftInput> | OfferCreateWithoutGiftInput[] | OfferUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutGiftInput | OfferCreateOrConnectWithoutGiftInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutGiftInput | OfferUpsertWithWhereUniqueWithoutGiftInput[]
    createMany?: OfferCreateManyGiftInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutGiftInput | OfferUpdateWithWhereUniqueWithoutGiftInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutGiftInput | OfferUpdateManyWithWhereWithoutGiftInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
  }

  export type GiftCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<GiftCreateWithoutTransactionsInput, GiftUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: GiftCreateOrConnectWithoutTransactionsInput
    connect?: GiftWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBuyerTransactionsInput = {
    create?: XOR<UserCreateWithoutBuyerTransactionsInput, UserUncheckedCreateWithoutBuyerTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBuyerTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSellerTransactionsInput = {
    create?: XOR<UserCreateWithoutSellerTransactionsInput, UserUncheckedCreateWithoutSellerTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSellerTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type GiftUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<GiftCreateWithoutTransactionsInput, GiftUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: GiftCreateOrConnectWithoutTransactionsInput
    upsert?: GiftUpsertWithoutTransactionsInput
    disconnect?: GiftWhereInput | boolean
    delete?: GiftWhereInput | boolean
    connect?: GiftWhereUniqueInput
    update?: XOR<XOR<GiftUpdateToOneWithWhereWithoutTransactionsInput, GiftUpdateWithoutTransactionsInput>, GiftUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateOneWithoutBuyerTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutBuyerTransactionsInput, UserUncheckedCreateWithoutBuyerTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBuyerTransactionsInput
    upsert?: UserUpsertWithoutBuyerTransactionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBuyerTransactionsInput, UserUpdateWithoutBuyerTransactionsInput>, UserUncheckedUpdateWithoutBuyerTransactionsInput>
  }

  export type UserUpdateOneWithoutSellerTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutSellerTransactionsInput, UserUncheckedCreateWithoutSellerTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSellerTransactionsInput
    upsert?: UserUpsertWithoutSellerTransactionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSellerTransactionsInput, UserUpdateWithoutSellerTransactionsInput>, UserUncheckedUpdateWithoutSellerTransactionsInput>
  }

  export type GiftCreateNestedOneWithoutOffersInput = {
    create?: XOR<GiftCreateWithoutOffersInput, GiftUncheckedCreateWithoutOffersInput>
    connectOrCreate?: GiftCreateOrConnectWithoutOffersInput
    connect?: GiftWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBuyerOffersInput = {
    create?: XOR<UserCreateWithoutBuyerOffersInput, UserUncheckedCreateWithoutBuyerOffersInput>
    connectOrCreate?: UserCreateOrConnectWithoutBuyerOffersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSellerOffersInput = {
    create?: XOR<UserCreateWithoutSellerOffersInput, UserUncheckedCreateWithoutSellerOffersInput>
    connectOrCreate?: UserCreateOrConnectWithoutSellerOffersInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type GiftUpdateOneRequiredWithoutOffersNestedInput = {
    create?: XOR<GiftCreateWithoutOffersInput, GiftUncheckedCreateWithoutOffersInput>
    connectOrCreate?: GiftCreateOrConnectWithoutOffersInput
    upsert?: GiftUpsertWithoutOffersInput
    connect?: GiftWhereUniqueInput
    update?: XOR<XOR<GiftUpdateToOneWithWhereWithoutOffersInput, GiftUpdateWithoutOffersInput>, GiftUncheckedUpdateWithoutOffersInput>
  }

  export type UserUpdateOneRequiredWithoutBuyerOffersNestedInput = {
    create?: XOR<UserCreateWithoutBuyerOffersInput, UserUncheckedCreateWithoutBuyerOffersInput>
    connectOrCreate?: UserCreateOrConnectWithoutBuyerOffersInput
    upsert?: UserUpsertWithoutBuyerOffersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBuyerOffersInput, UserUpdateWithoutBuyerOffersInput>, UserUncheckedUpdateWithoutBuyerOffersInput>
  }

  export type UserUpdateOneWithoutSellerOffersNestedInput = {
    create?: XOR<UserCreateWithoutSellerOffersInput, UserUncheckedCreateWithoutSellerOffersInput>
    connectOrCreate?: UserCreateOrConnectWithoutSellerOffersInput
    upsert?: UserUpsertWithoutSellerOffersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSellerOffersInput, UserUpdateWithoutSellerOffersInput>, UserUncheckedUpdateWithoutSellerOffersInput>
  }

  export type UserCreateNestedOneWithoutCreatedPvpRoomsInput = {
    create?: XOR<UserCreateWithoutCreatedPvpRoomsInput, UserUncheckedCreateWithoutCreatedPvpRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedPvpRoomsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWonPvpRoomsInput = {
    create?: XOR<UserCreateWithoutWonPvpRoomsInput, UserUncheckedCreateWithoutWonPvpRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWonPvpRoomsInput
    connect?: UserWhereUniqueInput
  }

  export type PvpParticipantCreateNestedManyWithoutRoomInput = {
    create?: XOR<PvpParticipantCreateWithoutRoomInput, PvpParticipantUncheckedCreateWithoutRoomInput> | PvpParticipantCreateWithoutRoomInput[] | PvpParticipantUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: PvpParticipantCreateOrConnectWithoutRoomInput | PvpParticipantCreateOrConnectWithoutRoomInput[]
    createMany?: PvpParticipantCreateManyRoomInputEnvelope
    connect?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
  }

  export type PvpInvitationCreateNestedManyWithoutRoomInput = {
    create?: XOR<PvpInvitationCreateWithoutRoomInput, PvpInvitationUncheckedCreateWithoutRoomInput> | PvpInvitationCreateWithoutRoomInput[] | PvpInvitationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: PvpInvitationCreateOrConnectWithoutRoomInput | PvpInvitationCreateOrConnectWithoutRoomInput[]
    createMany?: PvpInvitationCreateManyRoomInputEnvelope
    connect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
  }

  export type PvpParticipantUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<PvpParticipantCreateWithoutRoomInput, PvpParticipantUncheckedCreateWithoutRoomInput> | PvpParticipantCreateWithoutRoomInput[] | PvpParticipantUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: PvpParticipantCreateOrConnectWithoutRoomInput | PvpParticipantCreateOrConnectWithoutRoomInput[]
    createMany?: PvpParticipantCreateManyRoomInputEnvelope
    connect?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
  }

  export type PvpInvitationUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<PvpInvitationCreateWithoutRoomInput, PvpInvitationUncheckedCreateWithoutRoomInput> | PvpInvitationCreateWithoutRoomInput[] | PvpInvitationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: PvpInvitationCreateOrConnectWithoutRoomInput | PvpInvitationCreateOrConnectWithoutRoomInput[]
    createMany?: PvpInvitationCreateManyRoomInputEnvelope
    connect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCreatedPvpRoomsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedPvpRoomsInput, UserUncheckedCreateWithoutCreatedPvpRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedPvpRoomsInput
    upsert?: UserUpsertWithoutCreatedPvpRoomsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedPvpRoomsInput, UserUpdateWithoutCreatedPvpRoomsInput>, UserUncheckedUpdateWithoutCreatedPvpRoomsInput>
  }

  export type UserUpdateOneWithoutWonPvpRoomsNestedInput = {
    create?: XOR<UserCreateWithoutWonPvpRoomsInput, UserUncheckedCreateWithoutWonPvpRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWonPvpRoomsInput
    upsert?: UserUpsertWithoutWonPvpRoomsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWonPvpRoomsInput, UserUpdateWithoutWonPvpRoomsInput>, UserUncheckedUpdateWithoutWonPvpRoomsInput>
  }

  export type PvpParticipantUpdateManyWithoutRoomNestedInput = {
    create?: XOR<PvpParticipantCreateWithoutRoomInput, PvpParticipantUncheckedCreateWithoutRoomInput> | PvpParticipantCreateWithoutRoomInput[] | PvpParticipantUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: PvpParticipantCreateOrConnectWithoutRoomInput | PvpParticipantCreateOrConnectWithoutRoomInput[]
    upsert?: PvpParticipantUpsertWithWhereUniqueWithoutRoomInput | PvpParticipantUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: PvpParticipantCreateManyRoomInputEnvelope
    set?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    disconnect?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    delete?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    connect?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    update?: PvpParticipantUpdateWithWhereUniqueWithoutRoomInput | PvpParticipantUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: PvpParticipantUpdateManyWithWhereWithoutRoomInput | PvpParticipantUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: PvpParticipantScalarWhereInput | PvpParticipantScalarWhereInput[]
  }

  export type PvpInvitationUpdateManyWithoutRoomNestedInput = {
    create?: XOR<PvpInvitationCreateWithoutRoomInput, PvpInvitationUncheckedCreateWithoutRoomInput> | PvpInvitationCreateWithoutRoomInput[] | PvpInvitationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: PvpInvitationCreateOrConnectWithoutRoomInput | PvpInvitationCreateOrConnectWithoutRoomInput[]
    upsert?: PvpInvitationUpsertWithWhereUniqueWithoutRoomInput | PvpInvitationUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: PvpInvitationCreateManyRoomInputEnvelope
    set?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    disconnect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    delete?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    connect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    update?: PvpInvitationUpdateWithWhereUniqueWithoutRoomInput | PvpInvitationUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: PvpInvitationUpdateManyWithWhereWithoutRoomInput | PvpInvitationUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: PvpInvitationScalarWhereInput | PvpInvitationScalarWhereInput[]
  }

  export type PvpParticipantUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<PvpParticipantCreateWithoutRoomInput, PvpParticipantUncheckedCreateWithoutRoomInput> | PvpParticipantCreateWithoutRoomInput[] | PvpParticipantUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: PvpParticipantCreateOrConnectWithoutRoomInput | PvpParticipantCreateOrConnectWithoutRoomInput[]
    upsert?: PvpParticipantUpsertWithWhereUniqueWithoutRoomInput | PvpParticipantUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: PvpParticipantCreateManyRoomInputEnvelope
    set?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    disconnect?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    delete?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    connect?: PvpParticipantWhereUniqueInput | PvpParticipantWhereUniqueInput[]
    update?: PvpParticipantUpdateWithWhereUniqueWithoutRoomInput | PvpParticipantUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: PvpParticipantUpdateManyWithWhereWithoutRoomInput | PvpParticipantUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: PvpParticipantScalarWhereInput | PvpParticipantScalarWhereInput[]
  }

  export type PvpInvitationUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<PvpInvitationCreateWithoutRoomInput, PvpInvitationUncheckedCreateWithoutRoomInput> | PvpInvitationCreateWithoutRoomInput[] | PvpInvitationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: PvpInvitationCreateOrConnectWithoutRoomInput | PvpInvitationCreateOrConnectWithoutRoomInput[]
    upsert?: PvpInvitationUpsertWithWhereUniqueWithoutRoomInput | PvpInvitationUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: PvpInvitationCreateManyRoomInputEnvelope
    set?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    disconnect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    delete?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    connect?: PvpInvitationWhereUniqueInput | PvpInvitationWhereUniqueInput[]
    update?: PvpInvitationUpdateWithWhereUniqueWithoutRoomInput | PvpInvitationUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: PvpInvitationUpdateManyWithWhereWithoutRoomInput | PvpInvitationUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: PvpInvitationScalarWhereInput | PvpInvitationScalarWhereInput[]
  }

  export type PvpRoomCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<PvpRoomCreateWithoutParticipantsInput, PvpRoomUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: PvpRoomCreateOrConnectWithoutParticipantsInput
    connect?: PvpRoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPvpParticipationsInput = {
    create?: XOR<UserCreateWithoutPvpParticipationsInput, UserUncheckedCreateWithoutPvpParticipationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPvpParticipationsInput
    connect?: UserWhereUniqueInput
  }

  export type PvpRoomUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<PvpRoomCreateWithoutParticipantsInput, PvpRoomUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: PvpRoomCreateOrConnectWithoutParticipantsInput
    upsert?: PvpRoomUpsertWithoutParticipantsInput
    connect?: PvpRoomWhereUniqueInput
    update?: XOR<XOR<PvpRoomUpdateToOneWithWhereWithoutParticipantsInput, PvpRoomUpdateWithoutParticipantsInput>, PvpRoomUncheckedUpdateWithoutParticipantsInput>
  }

  export type UserUpdateOneRequiredWithoutPvpParticipationsNestedInput = {
    create?: XOR<UserCreateWithoutPvpParticipationsInput, UserUncheckedCreateWithoutPvpParticipationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPvpParticipationsInput
    upsert?: UserUpsertWithoutPvpParticipationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPvpParticipationsInput, UserUpdateWithoutPvpParticipationsInput>, UserUncheckedUpdateWithoutPvpParticipationsInput>
  }

  export type PvpRoomCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<PvpRoomCreateWithoutInvitationsInput, PvpRoomUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: PvpRoomCreateOrConnectWithoutInvitationsInput
    connect?: PvpRoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSentPvpInvitationsInput = {
    create?: XOR<UserCreateWithoutSentPvpInvitationsInput, UserUncheckedCreateWithoutSentPvpInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentPvpInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedPvpInvitationsInput = {
    create?: XOR<UserCreateWithoutReceivedPvpInvitationsInput, UserUncheckedCreateWithoutReceivedPvpInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedPvpInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type PvpRoomUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<PvpRoomCreateWithoutInvitationsInput, PvpRoomUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: PvpRoomCreateOrConnectWithoutInvitationsInput
    upsert?: PvpRoomUpsertWithoutInvitationsInput
    connect?: PvpRoomWhereUniqueInput
    update?: XOR<XOR<PvpRoomUpdateToOneWithWhereWithoutInvitationsInput, PvpRoomUpdateWithoutInvitationsInput>, PvpRoomUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserUpdateOneRequiredWithoutSentPvpInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutSentPvpInvitationsInput, UserUncheckedCreateWithoutSentPvpInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentPvpInvitationsInput
    upsert?: UserUpsertWithoutSentPvpInvitationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentPvpInvitationsInput, UserUpdateWithoutSentPvpInvitationsInput>, UserUncheckedUpdateWithoutSentPvpInvitationsInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedPvpInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutReceivedPvpInvitationsInput, UserUncheckedCreateWithoutReceivedPvpInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedPvpInvitationsInput
    upsert?: UserUpsertWithoutReceivedPvpInvitationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedPvpInvitationsInput, UserUpdateWithoutReceivedPvpInvitationsInput>, UserUncheckedUpdateWithoutReceivedPvpInvitationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type WalletCreateWithoutUserInput = {
    id?: string
    address: string
    network?: string
    isConnected?: boolean
    createdAt?: Date | string
  }

  export type WalletUncheckedCreateWithoutUserInput = {
    id?: string
    address: string
    network?: string
    isConnected?: boolean
    createdAt?: Date | string
  }

  export type WalletCreateOrConnectWithoutUserInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletCreateManyUserInputEnvelope = {
    data: WalletCreateManyUserInput | WalletCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GiftCreateWithoutOwnerInput = {
    id?: string
    name: string
    collection: string
    emoji?: string | null
    priceTon: Decimal | DecimalJsLike | number | string
    backdropName?: string | null
    backdropColor?: string | null
    symbolName?: string | null
    symbolImageUrl?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutGiftInput
    offers?: OfferCreateNestedManyWithoutGiftInput
  }

  export type GiftUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    collection: string
    emoji?: string | null
    priceTon: Decimal | DecimalJsLike | number | string
    backdropName?: string | null
    backdropColor?: string | null
    symbolName?: string | null
    symbolImageUrl?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutGiftInput
    offers?: OfferUncheckedCreateNestedManyWithoutGiftInput
  }

  export type GiftCreateOrConnectWithoutOwnerInput = {
    where: GiftWhereUniqueInput
    create: XOR<GiftCreateWithoutOwnerInput, GiftUncheckedCreateWithoutOwnerInput>
  }

  export type GiftCreateManyOwnerInputEnvelope = {
    data: GiftCreateManyOwnerInput | GiftCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutBuyerInput = {
    id?: string
    type: string
    status?: string
    amountTon: Decimal | DecimalJsLike | number | string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gift?: GiftCreateNestedOneWithoutTransactionsInput
    seller?: UserCreateNestedOneWithoutSellerTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutBuyerInput = {
    id?: string
    type: string
    status?: string
    amountTon: Decimal | DecimalJsLike | number | string
    giftId?: string | null
    sellerId?: string | null
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutBuyerInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutBuyerInput, TransactionUncheckedCreateWithoutBuyerInput>
  }

  export type TransactionCreateManyBuyerInputEnvelope = {
    data: TransactionCreateManyBuyerInput | TransactionCreateManyBuyerInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutSellerInput = {
    id?: string
    type: string
    status?: string
    amountTon: Decimal | DecimalJsLike | number | string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gift?: GiftCreateNestedOneWithoutTransactionsInput
    buyer?: UserCreateNestedOneWithoutBuyerTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutSellerInput = {
    id?: string
    type: string
    status?: string
    amountTon: Decimal | DecimalJsLike | number | string
    giftId?: string | null
    buyerId?: string | null
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutSellerInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutSellerInput, TransactionUncheckedCreateWithoutSellerInput>
  }

  export type TransactionCreateManySellerInputEnvelope = {
    data: TransactionCreateManySellerInput | TransactionCreateManySellerInput[]
    skipDuplicates?: boolean
  }

  export type OfferCreateWithoutBuyerInput = {
    id?: string
    amountTon: Decimal | DecimalJsLike | number | string
    status?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gift: GiftCreateNestedOneWithoutOffersInput
    seller?: UserCreateNestedOneWithoutSellerOffersInput
  }

  export type OfferUncheckedCreateWithoutBuyerInput = {
    id?: string
    amountTon: Decimal | DecimalJsLike | number | string
    status?: string
    giftId: string
    sellerId?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferCreateOrConnectWithoutBuyerInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutBuyerInput, OfferUncheckedCreateWithoutBuyerInput>
  }

  export type OfferCreateManyBuyerInputEnvelope = {
    data: OfferCreateManyBuyerInput | OfferCreateManyBuyerInput[]
    skipDuplicates?: boolean
  }

  export type OfferCreateWithoutSellerInput = {
    id?: string
    amountTon: Decimal | DecimalJsLike | number | string
    status?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gift: GiftCreateNestedOneWithoutOffersInput
    buyer: UserCreateNestedOneWithoutBuyerOffersInput
  }

  export type OfferUncheckedCreateWithoutSellerInput = {
    id?: string
    amountTon: Decimal | DecimalJsLike | number | string
    status?: string
    giftId: string
    buyerId: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferCreateOrConnectWithoutSellerInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutSellerInput, OfferUncheckedCreateWithoutSellerInput>
  }

  export type OfferCreateManySellerInputEnvelope = {
    data: OfferCreateManySellerInput | OfferCreateManySellerInput[]
    skipDuplicates?: boolean
  }

  export type PvpRoomCreateWithoutCreatorInput = {
    id?: string
    code: string
    stakeGram: Decimal | DecimalJsLike | number | string
    status?: string
    createdAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    winner?: UserCreateNestedOneWithoutWonPvpRoomsInput
    participants?: PvpParticipantCreateNestedManyWithoutRoomInput
    invitations?: PvpInvitationCreateNestedManyWithoutRoomInput
  }

  export type PvpRoomUncheckedCreateWithoutCreatorInput = {
    id?: string
    code: string
    stakeGram: Decimal | DecimalJsLike | number | string
    status?: string
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    participants?: PvpParticipantUncheckedCreateNestedManyWithoutRoomInput
    invitations?: PvpInvitationUncheckedCreateNestedManyWithoutRoomInput
  }

  export type PvpRoomCreateOrConnectWithoutCreatorInput = {
    where: PvpRoomWhereUniqueInput
    create: XOR<PvpRoomCreateWithoutCreatorInput, PvpRoomUncheckedCreateWithoutCreatorInput>
  }

  export type PvpRoomCreateManyCreatorInputEnvelope = {
    data: PvpRoomCreateManyCreatorInput | PvpRoomCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type PvpRoomCreateWithoutWinnerInput = {
    id?: string
    code: string
    stakeGram: Decimal | DecimalJsLike | number | string
    status?: string
    createdAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    creator: UserCreateNestedOneWithoutCreatedPvpRoomsInput
    participants?: PvpParticipantCreateNestedManyWithoutRoomInput
    invitations?: PvpInvitationCreateNestedManyWithoutRoomInput
  }

  export type PvpRoomUncheckedCreateWithoutWinnerInput = {
    id?: string
    code: string
    stakeGram: Decimal | DecimalJsLike | number | string
    status?: string
    createdAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    creatorId: string
    participants?: PvpParticipantUncheckedCreateNestedManyWithoutRoomInput
    invitations?: PvpInvitationUncheckedCreateNestedManyWithoutRoomInput
  }

  export type PvpRoomCreateOrConnectWithoutWinnerInput = {
    where: PvpRoomWhereUniqueInput
    create: XOR<PvpRoomCreateWithoutWinnerInput, PvpRoomUncheckedCreateWithoutWinnerInput>
  }

  export type PvpRoomCreateManyWinnerInputEnvelope = {
    data: PvpRoomCreateManyWinnerInput | PvpRoomCreateManyWinnerInput[]
    skipDuplicates?: boolean
  }

  export type PvpParticipantCreateWithoutUserInput = {
    id?: string
    joinedAt?: Date | string
    room: PvpRoomCreateNestedOneWithoutParticipantsInput
  }

  export type PvpParticipantUncheckedCreateWithoutUserInput = {
    id?: string
    roomId: string
    joinedAt?: Date | string
  }

  export type PvpParticipantCreateOrConnectWithoutUserInput = {
    where: PvpParticipantWhereUniqueInput
    create: XOR<PvpParticipantCreateWithoutUserInput, PvpParticipantUncheckedCreateWithoutUserInput>
  }

  export type PvpParticipantCreateManyUserInputEnvelope = {
    data: PvpParticipantCreateManyUserInput | PvpParticipantCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PvpInvitationCreateWithoutSenderInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    room: PvpRoomCreateNestedOneWithoutInvitationsInput
    recipient: UserCreateNestedOneWithoutReceivedPvpInvitationsInput
  }

  export type PvpInvitationUncheckedCreateWithoutSenderInput = {
    id?: string
    roomId: string
    recipientId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PvpInvitationCreateOrConnectWithoutSenderInput = {
    where: PvpInvitationWhereUniqueInput
    create: XOR<PvpInvitationCreateWithoutSenderInput, PvpInvitationUncheckedCreateWithoutSenderInput>
  }

  export type PvpInvitationCreateManySenderInputEnvelope = {
    data: PvpInvitationCreateManySenderInput | PvpInvitationCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type PvpInvitationCreateWithoutRecipientInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    room: PvpRoomCreateNestedOneWithoutInvitationsInput
    sender: UserCreateNestedOneWithoutSentPvpInvitationsInput
  }

  export type PvpInvitationUncheckedCreateWithoutRecipientInput = {
    id?: string
    roomId: string
    senderId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PvpInvitationCreateOrConnectWithoutRecipientInput = {
    where: PvpInvitationWhereUniqueInput
    create: XOR<PvpInvitationCreateWithoutRecipientInput, PvpInvitationUncheckedCreateWithoutRecipientInput>
  }

  export type PvpInvitationCreateManyRecipientInputEnvelope = {
    data: PvpInvitationCreateManyRecipientInput | PvpInvitationCreateManyRecipientInput[]
    skipDuplicates?: boolean
  }

  export type WalletUpsertWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    update: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletUpdateWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    data: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
  }

  export type WalletUpdateManyWithWhereWithoutUserInput = {
    where: WalletScalarWhereInput
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyWithoutUserInput>
  }

  export type WalletScalarWhereInput = {
    AND?: WalletScalarWhereInput | WalletScalarWhereInput[]
    OR?: WalletScalarWhereInput[]
    NOT?: WalletScalarWhereInput | WalletScalarWhereInput[]
    id?: StringFilter<"Wallet"> | string
    address?: StringFilter<"Wallet"> | string
    network?: StringFilter<"Wallet"> | string
    isConnected?: BoolFilter<"Wallet"> | boolean
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    userId?: StringFilter<"Wallet"> | string
  }

  export type GiftUpsertWithWhereUniqueWithoutOwnerInput = {
    where: GiftWhereUniqueInput
    update: XOR<GiftUpdateWithoutOwnerInput, GiftUncheckedUpdateWithoutOwnerInput>
    create: XOR<GiftCreateWithoutOwnerInput, GiftUncheckedCreateWithoutOwnerInput>
  }

  export type GiftUpdateWithWhereUniqueWithoutOwnerInput = {
    where: GiftWhereUniqueInput
    data: XOR<GiftUpdateWithoutOwnerInput, GiftUncheckedUpdateWithoutOwnerInput>
  }

  export type GiftUpdateManyWithWhereWithoutOwnerInput = {
    where: GiftScalarWhereInput
    data: XOR<GiftUpdateManyMutationInput, GiftUncheckedUpdateManyWithoutOwnerInput>
  }

  export type GiftScalarWhereInput = {
    AND?: GiftScalarWhereInput | GiftScalarWhereInput[]
    OR?: GiftScalarWhereInput[]
    NOT?: GiftScalarWhereInput | GiftScalarWhereInput[]
    id?: StringFilter<"Gift"> | string
    name?: StringFilter<"Gift"> | string
    collection?: StringFilter<"Gift"> | string
    emoji?: StringNullableFilter<"Gift"> | string | null
    priceTon?: DecimalFilter<"Gift"> | Decimal | DecimalJsLike | number | string
    backdropName?: StringNullableFilter<"Gift"> | string | null
    backdropColor?: StringNullableFilter<"Gift"> | string | null
    symbolName?: StringNullableFilter<"Gift"> | string | null
    symbolImageUrl?: StringNullableFilter<"Gift"> | string | null
    status?: StringFilter<"Gift"> | string
    ownerId?: StringNullableFilter<"Gift"> | string | null
    createdAt?: DateTimeFilter<"Gift"> | Date | string
    updatedAt?: DateTimeFilter<"Gift"> | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutBuyerInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutBuyerInput, TransactionUncheckedUpdateWithoutBuyerInput>
    create: XOR<TransactionCreateWithoutBuyerInput, TransactionUncheckedCreateWithoutBuyerInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutBuyerInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutBuyerInput, TransactionUncheckedUpdateWithoutBuyerInput>
  }

  export type TransactionUpdateManyWithWhereWithoutBuyerInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutBuyerInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    amountTon?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    giftId?: StringNullableFilter<"Transaction"> | string | null
    buyerId?: StringNullableFilter<"Transaction"> | string | null
    sellerId?: StringNullableFilter<"Transaction"> | string | null
    txHash?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutSellerInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutSellerInput, TransactionUncheckedUpdateWithoutSellerInput>
    create: XOR<TransactionCreateWithoutSellerInput, TransactionUncheckedCreateWithoutSellerInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutSellerInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutSellerInput, TransactionUncheckedUpdateWithoutSellerInput>
  }

  export type TransactionUpdateManyWithWhereWithoutSellerInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutSellerInput>
  }

  export type OfferUpsertWithWhereUniqueWithoutBuyerInput = {
    where: OfferWhereUniqueInput
    update: XOR<OfferUpdateWithoutBuyerInput, OfferUncheckedUpdateWithoutBuyerInput>
    create: XOR<OfferCreateWithoutBuyerInput, OfferUncheckedCreateWithoutBuyerInput>
  }

  export type OfferUpdateWithWhereUniqueWithoutBuyerInput = {
    where: OfferWhereUniqueInput
    data: XOR<OfferUpdateWithoutBuyerInput, OfferUncheckedUpdateWithoutBuyerInput>
  }

  export type OfferUpdateManyWithWhereWithoutBuyerInput = {
    where: OfferScalarWhereInput
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyWithoutBuyerInput>
  }

  export type OfferScalarWhereInput = {
    AND?: OfferScalarWhereInput | OfferScalarWhereInput[]
    OR?: OfferScalarWhereInput[]
    NOT?: OfferScalarWhereInput | OfferScalarWhereInput[]
    id?: StringFilter<"Offer"> | string
    amountTon?: DecimalFilter<"Offer"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Offer"> | string
    giftId?: StringFilter<"Offer"> | string
    buyerId?: StringFilter<"Offer"> | string
    sellerId?: StringNullableFilter<"Offer"> | string | null
    expiresAt?: DateTimeNullableFilter<"Offer"> | Date | string | null
    createdAt?: DateTimeFilter<"Offer"> | Date | string
    updatedAt?: DateTimeFilter<"Offer"> | Date | string
  }

  export type OfferUpsertWithWhereUniqueWithoutSellerInput = {
    where: OfferWhereUniqueInput
    update: XOR<OfferUpdateWithoutSellerInput, OfferUncheckedUpdateWithoutSellerInput>
    create: XOR<OfferCreateWithoutSellerInput, OfferUncheckedCreateWithoutSellerInput>
  }

  export type OfferUpdateWithWhereUniqueWithoutSellerInput = {
    where: OfferWhereUniqueInput
    data: XOR<OfferUpdateWithoutSellerInput, OfferUncheckedUpdateWithoutSellerInput>
  }

  export type OfferUpdateManyWithWhereWithoutSellerInput = {
    where: OfferScalarWhereInput
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyWithoutSellerInput>
  }

  export type PvpRoomUpsertWithWhereUniqueWithoutCreatorInput = {
    where: PvpRoomWhereUniqueInput
    update: XOR<PvpRoomUpdateWithoutCreatorInput, PvpRoomUncheckedUpdateWithoutCreatorInput>
    create: XOR<PvpRoomCreateWithoutCreatorInput, PvpRoomUncheckedCreateWithoutCreatorInput>
  }

  export type PvpRoomUpdateWithWhereUniqueWithoutCreatorInput = {
    where: PvpRoomWhereUniqueInput
    data: XOR<PvpRoomUpdateWithoutCreatorInput, PvpRoomUncheckedUpdateWithoutCreatorInput>
  }

  export type PvpRoomUpdateManyWithWhereWithoutCreatorInput = {
    where: PvpRoomScalarWhereInput
    data: XOR<PvpRoomUpdateManyMutationInput, PvpRoomUncheckedUpdateManyWithoutCreatorInput>
  }

  export type PvpRoomScalarWhereInput = {
    AND?: PvpRoomScalarWhereInput | PvpRoomScalarWhereInput[]
    OR?: PvpRoomScalarWhereInput[]
    NOT?: PvpRoomScalarWhereInput | PvpRoomScalarWhereInput[]
    id?: StringFilter<"PvpRoom"> | string
    code?: StringFilter<"PvpRoom"> | string
    stakeGram?: DecimalFilter<"PvpRoom"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"PvpRoom"> | string
    winnerId?: StringNullableFilter<"PvpRoom"> | string | null
    createdAt?: DateTimeFilter<"PvpRoom"> | Date | string
    startedAt?: DateTimeNullableFilter<"PvpRoom"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"PvpRoom"> | Date | string | null
    creatorId?: StringFilter<"PvpRoom"> | string
  }

  export type PvpRoomUpsertWithWhereUniqueWithoutWinnerInput = {
    where: PvpRoomWhereUniqueInput
    update: XOR<PvpRoomUpdateWithoutWinnerInput, PvpRoomUncheckedUpdateWithoutWinnerInput>
    create: XOR<PvpRoomCreateWithoutWinnerInput, PvpRoomUncheckedCreateWithoutWinnerInput>
  }

  export type PvpRoomUpdateWithWhereUniqueWithoutWinnerInput = {
    where: PvpRoomWhereUniqueInput
    data: XOR<PvpRoomUpdateWithoutWinnerInput, PvpRoomUncheckedUpdateWithoutWinnerInput>
  }

  export type PvpRoomUpdateManyWithWhereWithoutWinnerInput = {
    where: PvpRoomScalarWhereInput
    data: XOR<PvpRoomUpdateManyMutationInput, PvpRoomUncheckedUpdateManyWithoutWinnerInput>
  }

  export type PvpParticipantUpsertWithWhereUniqueWithoutUserInput = {
    where: PvpParticipantWhereUniqueInput
    update: XOR<PvpParticipantUpdateWithoutUserInput, PvpParticipantUncheckedUpdateWithoutUserInput>
    create: XOR<PvpParticipantCreateWithoutUserInput, PvpParticipantUncheckedCreateWithoutUserInput>
  }

  export type PvpParticipantUpdateWithWhereUniqueWithoutUserInput = {
    where: PvpParticipantWhereUniqueInput
    data: XOR<PvpParticipantUpdateWithoutUserInput, PvpParticipantUncheckedUpdateWithoutUserInput>
  }

  export type PvpParticipantUpdateManyWithWhereWithoutUserInput = {
    where: PvpParticipantScalarWhereInput
    data: XOR<PvpParticipantUpdateManyMutationInput, PvpParticipantUncheckedUpdateManyWithoutUserInput>
  }

  export type PvpParticipantScalarWhereInput = {
    AND?: PvpParticipantScalarWhereInput | PvpParticipantScalarWhereInput[]
    OR?: PvpParticipantScalarWhereInput[]
    NOT?: PvpParticipantScalarWhereInput | PvpParticipantScalarWhereInput[]
    id?: StringFilter<"PvpParticipant"> | string
    roomId?: StringFilter<"PvpParticipant"> | string
    userId?: StringFilter<"PvpParticipant"> | string
    joinedAt?: DateTimeFilter<"PvpParticipant"> | Date | string
  }

  export type PvpInvitationUpsertWithWhereUniqueWithoutSenderInput = {
    where: PvpInvitationWhereUniqueInput
    update: XOR<PvpInvitationUpdateWithoutSenderInput, PvpInvitationUncheckedUpdateWithoutSenderInput>
    create: XOR<PvpInvitationCreateWithoutSenderInput, PvpInvitationUncheckedCreateWithoutSenderInput>
  }

  export type PvpInvitationUpdateWithWhereUniqueWithoutSenderInput = {
    where: PvpInvitationWhereUniqueInput
    data: XOR<PvpInvitationUpdateWithoutSenderInput, PvpInvitationUncheckedUpdateWithoutSenderInput>
  }

  export type PvpInvitationUpdateManyWithWhereWithoutSenderInput = {
    where: PvpInvitationScalarWhereInput
    data: XOR<PvpInvitationUpdateManyMutationInput, PvpInvitationUncheckedUpdateManyWithoutSenderInput>
  }

  export type PvpInvitationScalarWhereInput = {
    AND?: PvpInvitationScalarWhereInput | PvpInvitationScalarWhereInput[]
    OR?: PvpInvitationScalarWhereInput[]
    NOT?: PvpInvitationScalarWhereInput | PvpInvitationScalarWhereInput[]
    id?: StringFilter<"PvpInvitation"> | string
    roomId?: StringFilter<"PvpInvitation"> | string
    senderId?: StringFilter<"PvpInvitation"> | string
    recipientId?: StringFilter<"PvpInvitation"> | string
    status?: StringFilter<"PvpInvitation"> | string
    createdAt?: DateTimeFilter<"PvpInvitation"> | Date | string
    updatedAt?: DateTimeFilter<"PvpInvitation"> | Date | string
  }

  export type PvpInvitationUpsertWithWhereUniqueWithoutRecipientInput = {
    where: PvpInvitationWhereUniqueInput
    update: XOR<PvpInvitationUpdateWithoutRecipientInput, PvpInvitationUncheckedUpdateWithoutRecipientInput>
    create: XOR<PvpInvitationCreateWithoutRecipientInput, PvpInvitationUncheckedCreateWithoutRecipientInput>
  }

  export type PvpInvitationUpdateWithWhereUniqueWithoutRecipientInput = {
    where: PvpInvitationWhereUniqueInput
    data: XOR<PvpInvitationUpdateWithoutRecipientInput, PvpInvitationUncheckedUpdateWithoutRecipientInput>
  }

  export type PvpInvitationUpdateManyWithWhereWithoutRecipientInput = {
    where: PvpInvitationScalarWhereInput
    data: XOR<PvpInvitationUpdateManyMutationInput, PvpInvitationUncheckedUpdateManyWithoutRecipientInput>
  }

  export type UserCreateWithoutWalletsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gifts?: GiftCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationCreateNestedManyWithoutRecipientInput
  }

  export type UserUncheckedCreateWithoutWalletsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gifts?: GiftUncheckedCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionUncheckedCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionUncheckedCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferUncheckedCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferUncheckedCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantUncheckedCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutRecipientInput
  }

  export type UserCreateOrConnectWithoutWalletsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
  }

  export type UserUpsertWithoutWalletsInput = {
    update: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type UserUpdateWithoutWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gifts?: GiftUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUpdateManyWithoutRecipientNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gifts?: GiftUncheckedUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUncheckedUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUncheckedUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUncheckedUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUncheckedUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUncheckedUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUncheckedUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUncheckedUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutRecipientNestedInput
  }

  export type UserCreateWithoutGiftsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletCreateNestedManyWithoutUserInput
    buyerTransactions?: TransactionCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationCreateNestedManyWithoutRecipientInput
  }

  export type UserUncheckedCreateWithoutGiftsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    buyerTransactions?: TransactionUncheckedCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionUncheckedCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferUncheckedCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferUncheckedCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantUncheckedCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutRecipientInput
  }

  export type UserCreateOrConnectWithoutGiftsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGiftsInput, UserUncheckedCreateWithoutGiftsInput>
  }

  export type TransactionCreateWithoutGiftInput = {
    id?: string
    type: string
    status?: string
    amountTon: Decimal | DecimalJsLike | number | string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    buyer?: UserCreateNestedOneWithoutBuyerTransactionsInput
    seller?: UserCreateNestedOneWithoutSellerTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutGiftInput = {
    id?: string
    type: string
    status?: string
    amountTon: Decimal | DecimalJsLike | number | string
    buyerId?: string | null
    sellerId?: string | null
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutGiftInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutGiftInput, TransactionUncheckedCreateWithoutGiftInput>
  }

  export type TransactionCreateManyGiftInputEnvelope = {
    data: TransactionCreateManyGiftInput | TransactionCreateManyGiftInput[]
    skipDuplicates?: boolean
  }

  export type OfferCreateWithoutGiftInput = {
    id?: string
    amountTon: Decimal | DecimalJsLike | number | string
    status?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    buyer: UserCreateNestedOneWithoutBuyerOffersInput
    seller?: UserCreateNestedOneWithoutSellerOffersInput
  }

  export type OfferUncheckedCreateWithoutGiftInput = {
    id?: string
    amountTon: Decimal | DecimalJsLike | number | string
    status?: string
    buyerId: string
    sellerId?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferCreateOrConnectWithoutGiftInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutGiftInput, OfferUncheckedCreateWithoutGiftInput>
  }

  export type OfferCreateManyGiftInputEnvelope = {
    data: OfferCreateManyGiftInput | OfferCreateManyGiftInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutGiftsInput = {
    update: XOR<UserUpdateWithoutGiftsInput, UserUncheckedUpdateWithoutGiftsInput>
    create: XOR<UserCreateWithoutGiftsInput, UserUncheckedCreateWithoutGiftsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGiftsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGiftsInput, UserUncheckedUpdateWithoutGiftsInput>
  }

  export type UserUpdateWithoutGiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUpdateManyWithoutUserNestedInput
    buyerTransactions?: TransactionUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUpdateManyWithoutRecipientNestedInput
  }

  export type UserUncheckedUpdateWithoutGiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    buyerTransactions?: TransactionUncheckedUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUncheckedUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUncheckedUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUncheckedUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUncheckedUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUncheckedUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUncheckedUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutRecipientNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutGiftInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutGiftInput, TransactionUncheckedUpdateWithoutGiftInput>
    create: XOR<TransactionCreateWithoutGiftInput, TransactionUncheckedCreateWithoutGiftInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutGiftInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutGiftInput, TransactionUncheckedUpdateWithoutGiftInput>
  }

  export type TransactionUpdateManyWithWhereWithoutGiftInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutGiftInput>
  }

  export type OfferUpsertWithWhereUniqueWithoutGiftInput = {
    where: OfferWhereUniqueInput
    update: XOR<OfferUpdateWithoutGiftInput, OfferUncheckedUpdateWithoutGiftInput>
    create: XOR<OfferCreateWithoutGiftInput, OfferUncheckedCreateWithoutGiftInput>
  }

  export type OfferUpdateWithWhereUniqueWithoutGiftInput = {
    where: OfferWhereUniqueInput
    data: XOR<OfferUpdateWithoutGiftInput, OfferUncheckedUpdateWithoutGiftInput>
  }

  export type OfferUpdateManyWithWhereWithoutGiftInput = {
    where: OfferScalarWhereInput
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyWithoutGiftInput>
  }

  export type GiftCreateWithoutTransactionsInput = {
    id?: string
    name: string
    collection: string
    emoji?: string | null
    priceTon: Decimal | DecimalJsLike | number | string
    backdropName?: string | null
    backdropColor?: string | null
    symbolName?: string | null
    symbolImageUrl?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutGiftsInput
    offers?: OfferCreateNestedManyWithoutGiftInput
  }

  export type GiftUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    collection: string
    emoji?: string | null
    priceTon: Decimal | DecimalJsLike | number | string
    backdropName?: string | null
    backdropColor?: string | null
    symbolName?: string | null
    symbolImageUrl?: string | null
    status?: string
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offers?: OfferUncheckedCreateNestedManyWithoutGiftInput
  }

  export type GiftCreateOrConnectWithoutTransactionsInput = {
    where: GiftWhereUniqueInput
    create: XOR<GiftCreateWithoutTransactionsInput, GiftUncheckedCreateWithoutTransactionsInput>
  }

  export type UserCreateWithoutBuyerTransactionsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletCreateNestedManyWithoutUserInput
    gifts?: GiftCreateNestedManyWithoutOwnerInput
    sellerTransactions?: TransactionCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationCreateNestedManyWithoutRecipientInput
  }

  export type UserUncheckedCreateWithoutBuyerTransactionsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    gifts?: GiftUncheckedCreateNestedManyWithoutOwnerInput
    sellerTransactions?: TransactionUncheckedCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferUncheckedCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferUncheckedCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantUncheckedCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutRecipientInput
  }

  export type UserCreateOrConnectWithoutBuyerTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBuyerTransactionsInput, UserUncheckedCreateWithoutBuyerTransactionsInput>
  }

  export type UserCreateWithoutSellerTransactionsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletCreateNestedManyWithoutUserInput
    gifts?: GiftCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionCreateNestedManyWithoutBuyerInput
    buyerOffers?: OfferCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationCreateNestedManyWithoutRecipientInput
  }

  export type UserUncheckedCreateWithoutSellerTransactionsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    gifts?: GiftUncheckedCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionUncheckedCreateNestedManyWithoutBuyerInput
    buyerOffers?: OfferUncheckedCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferUncheckedCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantUncheckedCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutRecipientInput
  }

  export type UserCreateOrConnectWithoutSellerTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSellerTransactionsInput, UserUncheckedCreateWithoutSellerTransactionsInput>
  }

  export type GiftUpsertWithoutTransactionsInput = {
    update: XOR<GiftUpdateWithoutTransactionsInput, GiftUncheckedUpdateWithoutTransactionsInput>
    create: XOR<GiftCreateWithoutTransactionsInput, GiftUncheckedCreateWithoutTransactionsInput>
    where?: GiftWhereInput
  }

  export type GiftUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: GiftWhereInput
    data: XOR<GiftUpdateWithoutTransactionsInput, GiftUncheckedUpdateWithoutTransactionsInput>
  }

  export type GiftUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    collection?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    priceTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    backdropName?: NullableStringFieldUpdateOperationsInput | string | null
    backdropColor?: NullableStringFieldUpdateOperationsInput | string | null
    symbolName?: NullableStringFieldUpdateOperationsInput | string | null
    symbolImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutGiftsNestedInput
    offers?: OfferUpdateManyWithoutGiftNestedInput
  }

  export type GiftUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    collection?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    priceTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    backdropName?: NullableStringFieldUpdateOperationsInput | string | null
    backdropColor?: NullableStringFieldUpdateOperationsInput | string | null
    symbolName?: NullableStringFieldUpdateOperationsInput | string | null
    symbolImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offers?: OfferUncheckedUpdateManyWithoutGiftNestedInput
  }

  export type UserUpsertWithoutBuyerTransactionsInput = {
    update: XOR<UserUpdateWithoutBuyerTransactionsInput, UserUncheckedUpdateWithoutBuyerTransactionsInput>
    create: XOR<UserCreateWithoutBuyerTransactionsInput, UserUncheckedCreateWithoutBuyerTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBuyerTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBuyerTransactionsInput, UserUncheckedUpdateWithoutBuyerTransactionsInput>
  }

  export type UserUpdateWithoutBuyerTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUpdateManyWithoutUserNestedInput
    gifts?: GiftUpdateManyWithoutOwnerNestedInput
    sellerTransactions?: TransactionUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUpdateManyWithoutRecipientNestedInput
  }

  export type UserUncheckedUpdateWithoutBuyerTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutOwnerNestedInput
    sellerTransactions?: TransactionUncheckedUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUncheckedUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUncheckedUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUncheckedUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUncheckedUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUncheckedUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutRecipientNestedInput
  }

  export type UserUpsertWithoutSellerTransactionsInput = {
    update: XOR<UserUpdateWithoutSellerTransactionsInput, UserUncheckedUpdateWithoutSellerTransactionsInput>
    create: XOR<UserCreateWithoutSellerTransactionsInput, UserUncheckedCreateWithoutSellerTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSellerTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSellerTransactionsInput, UserUncheckedUpdateWithoutSellerTransactionsInput>
  }

  export type UserUpdateWithoutSellerTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUpdateManyWithoutUserNestedInput
    gifts?: GiftUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUpdateManyWithoutBuyerNestedInput
    buyerOffers?: OfferUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUpdateManyWithoutRecipientNestedInput
  }

  export type UserUncheckedUpdateWithoutSellerTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUncheckedUpdateManyWithoutBuyerNestedInput
    buyerOffers?: OfferUncheckedUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUncheckedUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUncheckedUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUncheckedUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUncheckedUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutRecipientNestedInput
  }

  export type GiftCreateWithoutOffersInput = {
    id?: string
    name: string
    collection: string
    emoji?: string | null
    priceTon: Decimal | DecimalJsLike | number | string
    backdropName?: string | null
    backdropColor?: string | null
    symbolName?: string | null
    symbolImageUrl?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutGiftsInput
    transactions?: TransactionCreateNestedManyWithoutGiftInput
  }

  export type GiftUncheckedCreateWithoutOffersInput = {
    id?: string
    name: string
    collection: string
    emoji?: string | null
    priceTon: Decimal | DecimalJsLike | number | string
    backdropName?: string | null
    backdropColor?: string | null
    symbolName?: string | null
    symbolImageUrl?: string | null
    status?: string
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutGiftInput
  }

  export type GiftCreateOrConnectWithoutOffersInput = {
    where: GiftWhereUniqueInput
    create: XOR<GiftCreateWithoutOffersInput, GiftUncheckedCreateWithoutOffersInput>
  }

  export type UserCreateWithoutBuyerOffersInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletCreateNestedManyWithoutUserInput
    gifts?: GiftCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionCreateNestedManyWithoutSellerInput
    sellerOffers?: OfferCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationCreateNestedManyWithoutRecipientInput
  }

  export type UserUncheckedCreateWithoutBuyerOffersInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    gifts?: GiftUncheckedCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionUncheckedCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionUncheckedCreateNestedManyWithoutSellerInput
    sellerOffers?: OfferUncheckedCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantUncheckedCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutRecipientInput
  }

  export type UserCreateOrConnectWithoutBuyerOffersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBuyerOffersInput, UserUncheckedCreateWithoutBuyerOffersInput>
  }

  export type UserCreateWithoutSellerOffersInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletCreateNestedManyWithoutUserInput
    gifts?: GiftCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferCreateNestedManyWithoutBuyerInput
    createdPvpRooms?: PvpRoomCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationCreateNestedManyWithoutRecipientInput
  }

  export type UserUncheckedCreateWithoutSellerOffersInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    gifts?: GiftUncheckedCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionUncheckedCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionUncheckedCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferUncheckedCreateNestedManyWithoutBuyerInput
    createdPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantUncheckedCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutRecipientInput
  }

  export type UserCreateOrConnectWithoutSellerOffersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSellerOffersInput, UserUncheckedCreateWithoutSellerOffersInput>
  }

  export type GiftUpsertWithoutOffersInput = {
    update: XOR<GiftUpdateWithoutOffersInput, GiftUncheckedUpdateWithoutOffersInput>
    create: XOR<GiftCreateWithoutOffersInput, GiftUncheckedCreateWithoutOffersInput>
    where?: GiftWhereInput
  }

  export type GiftUpdateToOneWithWhereWithoutOffersInput = {
    where?: GiftWhereInput
    data: XOR<GiftUpdateWithoutOffersInput, GiftUncheckedUpdateWithoutOffersInput>
  }

  export type GiftUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    collection?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    priceTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    backdropName?: NullableStringFieldUpdateOperationsInput | string | null
    backdropColor?: NullableStringFieldUpdateOperationsInput | string | null
    symbolName?: NullableStringFieldUpdateOperationsInput | string | null
    symbolImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutGiftsNestedInput
    transactions?: TransactionUpdateManyWithoutGiftNestedInput
  }

  export type GiftUncheckedUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    collection?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    priceTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    backdropName?: NullableStringFieldUpdateOperationsInput | string | null
    backdropColor?: NullableStringFieldUpdateOperationsInput | string | null
    symbolName?: NullableStringFieldUpdateOperationsInput | string | null
    symbolImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutGiftNestedInput
  }

  export type UserUpsertWithoutBuyerOffersInput = {
    update: XOR<UserUpdateWithoutBuyerOffersInput, UserUncheckedUpdateWithoutBuyerOffersInput>
    create: XOR<UserCreateWithoutBuyerOffersInput, UserUncheckedCreateWithoutBuyerOffersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBuyerOffersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBuyerOffersInput, UserUncheckedUpdateWithoutBuyerOffersInput>
  }

  export type UserUpdateWithoutBuyerOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUpdateManyWithoutUserNestedInput
    gifts?: GiftUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUpdateManyWithoutSellerNestedInput
    sellerOffers?: OfferUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUpdateManyWithoutRecipientNestedInput
  }

  export type UserUncheckedUpdateWithoutBuyerOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUncheckedUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUncheckedUpdateManyWithoutSellerNestedInput
    sellerOffers?: OfferUncheckedUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUncheckedUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUncheckedUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUncheckedUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutRecipientNestedInput
  }

  export type UserUpsertWithoutSellerOffersInput = {
    update: XOR<UserUpdateWithoutSellerOffersInput, UserUncheckedUpdateWithoutSellerOffersInput>
    create: XOR<UserCreateWithoutSellerOffersInput, UserUncheckedCreateWithoutSellerOffersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSellerOffersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSellerOffersInput, UserUncheckedUpdateWithoutSellerOffersInput>
  }

  export type UserUpdateWithoutSellerOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUpdateManyWithoutUserNestedInput
    gifts?: GiftUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUpdateManyWithoutBuyerNestedInput
    createdPvpRooms?: PvpRoomUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUpdateManyWithoutRecipientNestedInput
  }

  export type UserUncheckedUpdateWithoutSellerOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUncheckedUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUncheckedUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUncheckedUpdateManyWithoutBuyerNestedInput
    createdPvpRooms?: PvpRoomUncheckedUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUncheckedUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUncheckedUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutRecipientNestedInput
  }

  export type UserCreateWithoutCreatedPvpRoomsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletCreateNestedManyWithoutUserInput
    gifts?: GiftCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferCreateNestedManyWithoutSellerInput
    wonPvpRooms?: PvpRoomCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationCreateNestedManyWithoutRecipientInput
  }

  export type UserUncheckedCreateWithoutCreatedPvpRoomsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    gifts?: GiftUncheckedCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionUncheckedCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionUncheckedCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferUncheckedCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferUncheckedCreateNestedManyWithoutSellerInput
    wonPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantUncheckedCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutRecipientInput
  }

  export type UserCreateOrConnectWithoutCreatedPvpRoomsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedPvpRoomsInput, UserUncheckedCreateWithoutCreatedPvpRoomsInput>
  }

  export type UserCreateWithoutWonPvpRoomsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletCreateNestedManyWithoutUserInput
    gifts?: GiftCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomCreateNestedManyWithoutCreatorInput
    pvpParticipations?: PvpParticipantCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationCreateNestedManyWithoutRecipientInput
  }

  export type UserUncheckedCreateWithoutWonPvpRoomsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    gifts?: GiftUncheckedCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionUncheckedCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionUncheckedCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferUncheckedCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferUncheckedCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutCreatorInput
    pvpParticipations?: PvpParticipantUncheckedCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutRecipientInput
  }

  export type UserCreateOrConnectWithoutWonPvpRoomsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWonPvpRoomsInput, UserUncheckedCreateWithoutWonPvpRoomsInput>
  }

  export type PvpParticipantCreateWithoutRoomInput = {
    id?: string
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutPvpParticipationsInput
  }

  export type PvpParticipantUncheckedCreateWithoutRoomInput = {
    id?: string
    userId: string
    joinedAt?: Date | string
  }

  export type PvpParticipantCreateOrConnectWithoutRoomInput = {
    where: PvpParticipantWhereUniqueInput
    create: XOR<PvpParticipantCreateWithoutRoomInput, PvpParticipantUncheckedCreateWithoutRoomInput>
  }

  export type PvpParticipantCreateManyRoomInputEnvelope = {
    data: PvpParticipantCreateManyRoomInput | PvpParticipantCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type PvpInvitationCreateWithoutRoomInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutSentPvpInvitationsInput
    recipient: UserCreateNestedOneWithoutReceivedPvpInvitationsInput
  }

  export type PvpInvitationUncheckedCreateWithoutRoomInput = {
    id?: string
    senderId: string
    recipientId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PvpInvitationCreateOrConnectWithoutRoomInput = {
    where: PvpInvitationWhereUniqueInput
    create: XOR<PvpInvitationCreateWithoutRoomInput, PvpInvitationUncheckedCreateWithoutRoomInput>
  }

  export type PvpInvitationCreateManyRoomInputEnvelope = {
    data: PvpInvitationCreateManyRoomInput | PvpInvitationCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedPvpRoomsInput = {
    update: XOR<UserUpdateWithoutCreatedPvpRoomsInput, UserUncheckedUpdateWithoutCreatedPvpRoomsInput>
    create: XOR<UserCreateWithoutCreatedPvpRoomsInput, UserUncheckedCreateWithoutCreatedPvpRoomsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedPvpRoomsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedPvpRoomsInput, UserUncheckedUpdateWithoutCreatedPvpRoomsInput>
  }

  export type UserUpdateWithoutCreatedPvpRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUpdateManyWithoutUserNestedInput
    gifts?: GiftUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUpdateManyWithoutSellerNestedInput
    wonPvpRooms?: PvpRoomUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUpdateManyWithoutRecipientNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedPvpRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUncheckedUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUncheckedUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUncheckedUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUncheckedUpdateManyWithoutSellerNestedInput
    wonPvpRooms?: PvpRoomUncheckedUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUncheckedUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutRecipientNestedInput
  }

  export type UserUpsertWithoutWonPvpRoomsInput = {
    update: XOR<UserUpdateWithoutWonPvpRoomsInput, UserUncheckedUpdateWithoutWonPvpRoomsInput>
    create: XOR<UserCreateWithoutWonPvpRoomsInput, UserUncheckedCreateWithoutWonPvpRoomsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWonPvpRoomsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWonPvpRoomsInput, UserUncheckedUpdateWithoutWonPvpRoomsInput>
  }

  export type UserUpdateWithoutWonPvpRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUpdateManyWithoutUserNestedInput
    gifts?: GiftUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUpdateManyWithoutCreatorNestedInput
    pvpParticipations?: PvpParticipantUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUpdateManyWithoutRecipientNestedInput
  }

  export type UserUncheckedUpdateWithoutWonPvpRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUncheckedUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUncheckedUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUncheckedUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUncheckedUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUncheckedUpdateManyWithoutCreatorNestedInput
    pvpParticipations?: PvpParticipantUncheckedUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutRecipientNestedInput
  }

  export type PvpParticipantUpsertWithWhereUniqueWithoutRoomInput = {
    where: PvpParticipantWhereUniqueInput
    update: XOR<PvpParticipantUpdateWithoutRoomInput, PvpParticipantUncheckedUpdateWithoutRoomInput>
    create: XOR<PvpParticipantCreateWithoutRoomInput, PvpParticipantUncheckedCreateWithoutRoomInput>
  }

  export type PvpParticipantUpdateWithWhereUniqueWithoutRoomInput = {
    where: PvpParticipantWhereUniqueInput
    data: XOR<PvpParticipantUpdateWithoutRoomInput, PvpParticipantUncheckedUpdateWithoutRoomInput>
  }

  export type PvpParticipantUpdateManyWithWhereWithoutRoomInput = {
    where: PvpParticipantScalarWhereInput
    data: XOR<PvpParticipantUpdateManyMutationInput, PvpParticipantUncheckedUpdateManyWithoutRoomInput>
  }

  export type PvpInvitationUpsertWithWhereUniqueWithoutRoomInput = {
    where: PvpInvitationWhereUniqueInput
    update: XOR<PvpInvitationUpdateWithoutRoomInput, PvpInvitationUncheckedUpdateWithoutRoomInput>
    create: XOR<PvpInvitationCreateWithoutRoomInput, PvpInvitationUncheckedCreateWithoutRoomInput>
  }

  export type PvpInvitationUpdateWithWhereUniqueWithoutRoomInput = {
    where: PvpInvitationWhereUniqueInput
    data: XOR<PvpInvitationUpdateWithoutRoomInput, PvpInvitationUncheckedUpdateWithoutRoomInput>
  }

  export type PvpInvitationUpdateManyWithWhereWithoutRoomInput = {
    where: PvpInvitationScalarWhereInput
    data: XOR<PvpInvitationUpdateManyMutationInput, PvpInvitationUncheckedUpdateManyWithoutRoomInput>
  }

  export type PvpRoomCreateWithoutParticipantsInput = {
    id?: string
    code: string
    stakeGram: Decimal | DecimalJsLike | number | string
    status?: string
    createdAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    creator: UserCreateNestedOneWithoutCreatedPvpRoomsInput
    winner?: UserCreateNestedOneWithoutWonPvpRoomsInput
    invitations?: PvpInvitationCreateNestedManyWithoutRoomInput
  }

  export type PvpRoomUncheckedCreateWithoutParticipantsInput = {
    id?: string
    code: string
    stakeGram: Decimal | DecimalJsLike | number | string
    status?: string
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    creatorId: string
    invitations?: PvpInvitationUncheckedCreateNestedManyWithoutRoomInput
  }

  export type PvpRoomCreateOrConnectWithoutParticipantsInput = {
    where: PvpRoomWhereUniqueInput
    create: XOR<PvpRoomCreateWithoutParticipantsInput, PvpRoomUncheckedCreateWithoutParticipantsInput>
  }

  export type UserCreateWithoutPvpParticipationsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletCreateNestedManyWithoutUserInput
    gifts?: GiftCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomCreateNestedManyWithoutWinnerInput
    sentPvpInvitations?: PvpInvitationCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationCreateNestedManyWithoutRecipientInput
  }

  export type UserUncheckedCreateWithoutPvpParticipationsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    gifts?: GiftUncheckedCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionUncheckedCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionUncheckedCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferUncheckedCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferUncheckedCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutWinnerInput
    sentPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutRecipientInput
  }

  export type UserCreateOrConnectWithoutPvpParticipationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPvpParticipationsInput, UserUncheckedCreateWithoutPvpParticipationsInput>
  }

  export type PvpRoomUpsertWithoutParticipantsInput = {
    update: XOR<PvpRoomUpdateWithoutParticipantsInput, PvpRoomUncheckedUpdateWithoutParticipantsInput>
    create: XOR<PvpRoomCreateWithoutParticipantsInput, PvpRoomUncheckedCreateWithoutParticipantsInput>
    where?: PvpRoomWhereInput
  }

  export type PvpRoomUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: PvpRoomWhereInput
    data: XOR<PvpRoomUpdateWithoutParticipantsInput, PvpRoomUncheckedUpdateWithoutParticipantsInput>
  }

  export type PvpRoomUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneRequiredWithoutCreatedPvpRoomsNestedInput
    winner?: UserUpdateOneWithoutWonPvpRoomsNestedInput
    invitations?: PvpInvitationUpdateManyWithoutRoomNestedInput
  }

  export type PvpRoomUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    invitations?: PvpInvitationUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserUpsertWithoutPvpParticipationsInput = {
    update: XOR<UserUpdateWithoutPvpParticipationsInput, UserUncheckedUpdateWithoutPvpParticipationsInput>
    create: XOR<UserCreateWithoutPvpParticipationsInput, UserUncheckedCreateWithoutPvpParticipationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPvpParticipationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPvpParticipationsInput, UserUncheckedUpdateWithoutPvpParticipationsInput>
  }

  export type UserUpdateWithoutPvpParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUpdateManyWithoutUserNestedInput
    gifts?: GiftUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUpdateManyWithoutWinnerNestedInput
    sentPvpInvitations?: PvpInvitationUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUpdateManyWithoutRecipientNestedInput
  }

  export type UserUncheckedUpdateWithoutPvpParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUncheckedUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUncheckedUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUncheckedUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUncheckedUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUncheckedUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUncheckedUpdateManyWithoutWinnerNestedInput
    sentPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutRecipientNestedInput
  }

  export type PvpRoomCreateWithoutInvitationsInput = {
    id?: string
    code: string
    stakeGram: Decimal | DecimalJsLike | number | string
    status?: string
    createdAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    creator: UserCreateNestedOneWithoutCreatedPvpRoomsInput
    winner?: UserCreateNestedOneWithoutWonPvpRoomsInput
    participants?: PvpParticipantCreateNestedManyWithoutRoomInput
  }

  export type PvpRoomUncheckedCreateWithoutInvitationsInput = {
    id?: string
    code: string
    stakeGram: Decimal | DecimalJsLike | number | string
    status?: string
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    creatorId: string
    participants?: PvpParticipantUncheckedCreateNestedManyWithoutRoomInput
  }

  export type PvpRoomCreateOrConnectWithoutInvitationsInput = {
    where: PvpRoomWhereUniqueInput
    create: XOR<PvpRoomCreateWithoutInvitationsInput, PvpRoomUncheckedCreateWithoutInvitationsInput>
  }

  export type UserCreateWithoutSentPvpInvitationsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletCreateNestedManyWithoutUserInput
    gifts?: GiftCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantCreateNestedManyWithoutUserInput
    receivedPvpInvitations?: PvpInvitationCreateNestedManyWithoutRecipientInput
  }

  export type UserUncheckedCreateWithoutSentPvpInvitationsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    gifts?: GiftUncheckedCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionUncheckedCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionUncheckedCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferUncheckedCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferUncheckedCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantUncheckedCreateNestedManyWithoutUserInput
    receivedPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutRecipientInput
  }

  export type UserCreateOrConnectWithoutSentPvpInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentPvpInvitationsInput, UserUncheckedCreateWithoutSentPvpInvitationsInput>
  }

  export type UserCreateWithoutReceivedPvpInvitationsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletCreateNestedManyWithoutUserInput
    gifts?: GiftCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutReceivedPvpInvitationsInput = {
    id?: string
    telegramId: string
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    gifts?: GiftUncheckedCreateNestedManyWithoutOwnerInput
    buyerTransactions?: TransactionUncheckedCreateNestedManyWithoutBuyerInput
    sellerTransactions?: TransactionUncheckedCreateNestedManyWithoutSellerInput
    buyerOffers?: OfferUncheckedCreateNestedManyWithoutBuyerInput
    sellerOffers?: OfferUncheckedCreateNestedManyWithoutSellerInput
    createdPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutCreatorInput
    wonPvpRooms?: PvpRoomUncheckedCreateNestedManyWithoutWinnerInput
    pvpParticipations?: PvpParticipantUncheckedCreateNestedManyWithoutUserInput
    sentPvpInvitations?: PvpInvitationUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutReceivedPvpInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedPvpInvitationsInput, UserUncheckedCreateWithoutReceivedPvpInvitationsInput>
  }

  export type PvpRoomUpsertWithoutInvitationsInput = {
    update: XOR<PvpRoomUpdateWithoutInvitationsInput, PvpRoomUncheckedUpdateWithoutInvitationsInput>
    create: XOR<PvpRoomCreateWithoutInvitationsInput, PvpRoomUncheckedCreateWithoutInvitationsInput>
    where?: PvpRoomWhereInput
  }

  export type PvpRoomUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: PvpRoomWhereInput
    data: XOR<PvpRoomUpdateWithoutInvitationsInput, PvpRoomUncheckedUpdateWithoutInvitationsInput>
  }

  export type PvpRoomUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneRequiredWithoutCreatedPvpRoomsNestedInput
    winner?: UserUpdateOneWithoutWonPvpRoomsNestedInput
    participants?: PvpParticipantUpdateManyWithoutRoomNestedInput
  }

  export type PvpRoomUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    participants?: PvpParticipantUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserUpsertWithoutSentPvpInvitationsInput = {
    update: XOR<UserUpdateWithoutSentPvpInvitationsInput, UserUncheckedUpdateWithoutSentPvpInvitationsInput>
    create: XOR<UserCreateWithoutSentPvpInvitationsInput, UserUncheckedCreateWithoutSentPvpInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentPvpInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentPvpInvitationsInput, UserUncheckedUpdateWithoutSentPvpInvitationsInput>
  }

  export type UserUpdateWithoutSentPvpInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUpdateManyWithoutUserNestedInput
    gifts?: GiftUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUpdateManyWithoutUserNestedInput
    receivedPvpInvitations?: PvpInvitationUpdateManyWithoutRecipientNestedInput
  }

  export type UserUncheckedUpdateWithoutSentPvpInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUncheckedUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUncheckedUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUncheckedUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUncheckedUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUncheckedUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUncheckedUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUncheckedUpdateManyWithoutUserNestedInput
    receivedPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutRecipientNestedInput
  }

  export type UserUpsertWithoutReceivedPvpInvitationsInput = {
    update: XOR<UserUpdateWithoutReceivedPvpInvitationsInput, UserUncheckedUpdateWithoutReceivedPvpInvitationsInput>
    create: XOR<UserCreateWithoutReceivedPvpInvitationsInput, UserUncheckedCreateWithoutReceivedPvpInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedPvpInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedPvpInvitationsInput, UserUncheckedUpdateWithoutReceivedPvpInvitationsInput>
  }

  export type UserUpdateWithoutReceivedPvpInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUpdateManyWithoutUserNestedInput
    gifts?: GiftUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedPvpInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutOwnerNestedInput
    buyerTransactions?: TransactionUncheckedUpdateManyWithoutBuyerNestedInput
    sellerTransactions?: TransactionUncheckedUpdateManyWithoutSellerNestedInput
    buyerOffers?: OfferUncheckedUpdateManyWithoutBuyerNestedInput
    sellerOffers?: OfferUncheckedUpdateManyWithoutSellerNestedInput
    createdPvpRooms?: PvpRoomUncheckedUpdateManyWithoutCreatorNestedInput
    wonPvpRooms?: PvpRoomUncheckedUpdateManyWithoutWinnerNestedInput
    pvpParticipations?: PvpParticipantUncheckedUpdateManyWithoutUserNestedInput
    sentPvpInvitations?: PvpInvitationUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type WalletCreateManyUserInput = {
    id?: string
    address: string
    network?: string
    isConnected?: boolean
    createdAt?: Date | string
  }

  export type GiftCreateManyOwnerInput = {
    id?: string
    name: string
    collection: string
    emoji?: string | null
    priceTon: Decimal | DecimalJsLike | number | string
    backdropName?: string | null
    backdropColor?: string | null
    symbolName?: string | null
    symbolImageUrl?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManyBuyerInput = {
    id?: string
    type: string
    status?: string
    amountTon: Decimal | DecimalJsLike | number | string
    giftId?: string | null
    sellerId?: string | null
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManySellerInput = {
    id?: string
    type: string
    status?: string
    amountTon: Decimal | DecimalJsLike | number | string
    giftId?: string | null
    buyerId?: string | null
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferCreateManyBuyerInput = {
    id?: string
    amountTon: Decimal | DecimalJsLike | number | string
    status?: string
    giftId: string
    sellerId?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferCreateManySellerInput = {
    id?: string
    amountTon: Decimal | DecimalJsLike | number | string
    status?: string
    giftId: string
    buyerId: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PvpRoomCreateManyCreatorInput = {
    id?: string
    code: string
    stakeGram: Decimal | DecimalJsLike | number | string
    status?: string
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
  }

  export type PvpRoomCreateManyWinnerInput = {
    id?: string
    code: string
    stakeGram: Decimal | DecimalJsLike | number | string
    status?: string
    createdAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    creatorId: string
  }

  export type PvpParticipantCreateManyUserInput = {
    id?: string
    roomId: string
    joinedAt?: Date | string
  }

  export type PvpInvitationCreateManySenderInput = {
    id?: string
    roomId: string
    recipientId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PvpInvitationCreateManyRecipientInput = {
    id?: string
    roomId: string
    senderId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    isConnected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    isConnected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    isConnected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    collection?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    priceTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    backdropName?: NullableStringFieldUpdateOperationsInput | string | null
    backdropColor?: NullableStringFieldUpdateOperationsInput | string | null
    symbolName?: NullableStringFieldUpdateOperationsInput | string | null
    symbolImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutGiftNestedInput
    offers?: OfferUpdateManyWithoutGiftNestedInput
  }

  export type GiftUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    collection?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    priceTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    backdropName?: NullableStringFieldUpdateOperationsInput | string | null
    backdropColor?: NullableStringFieldUpdateOperationsInput | string | null
    symbolName?: NullableStringFieldUpdateOperationsInput | string | null
    symbolImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutGiftNestedInput
    offers?: OfferUncheckedUpdateManyWithoutGiftNestedInput
  }

  export type GiftUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    collection?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    priceTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    backdropName?: NullableStringFieldUpdateOperationsInput | string | null
    backdropColor?: NullableStringFieldUpdateOperationsInput | string | null
    symbolName?: NullableStringFieldUpdateOperationsInput | string | null
    symbolImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gift?: GiftUpdateOneWithoutTransactionsNestedInput
    seller?: UserUpdateOneWithoutSellerTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gift?: GiftUpdateOneWithoutTransactionsNestedInput
    buyer?: UserUpdateOneWithoutBuyerTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    buyerId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    giftId?: NullableStringFieldUpdateOperationsInput | string | null
    buyerId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gift?: GiftUpdateOneRequiredWithoutOffersNestedInput
    seller?: UserUpdateOneWithoutSellerOffersNestedInput
  }

  export type OfferUncheckedUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    giftId?: StringFieldUpdateOperationsInput | string
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUncheckedUpdateManyWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    giftId?: StringFieldUpdateOperationsInput | string
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUpdateWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gift?: GiftUpdateOneRequiredWithoutOffersNestedInput
    buyer?: UserUpdateOneRequiredWithoutBuyerOffersNestedInput
  }

  export type OfferUncheckedUpdateWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    giftId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUncheckedUpdateManyWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    giftId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpRoomUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winner?: UserUpdateOneWithoutWonPvpRoomsNestedInput
    participants?: PvpParticipantUpdateManyWithoutRoomNestedInput
    invitations?: PvpInvitationUpdateManyWithoutRoomNestedInput
  }

  export type PvpRoomUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participants?: PvpParticipantUncheckedUpdateManyWithoutRoomNestedInput
    invitations?: PvpInvitationUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type PvpRoomUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PvpRoomUpdateWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneRequiredWithoutCreatedPvpRoomsNestedInput
    participants?: PvpParticipantUpdateManyWithoutRoomNestedInput
    invitations?: PvpInvitationUpdateManyWithoutRoomNestedInput
  }

  export type PvpRoomUncheckedUpdateWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    participants?: PvpParticipantUncheckedUpdateManyWithoutRoomNestedInput
    invitations?: PvpInvitationUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type PvpRoomUncheckedUpdateManyWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    stakeGram?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type PvpParticipantUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: PvpRoomUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type PvpParticipantUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpParticipantUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpInvitationUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: PvpRoomUpdateOneRequiredWithoutInvitationsNestedInput
    recipient?: UserUpdateOneRequiredWithoutReceivedPvpInvitationsNestedInput
  }

  export type PvpInvitationUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    recipientId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpInvitationUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    recipientId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpInvitationUpdateWithoutRecipientInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: PvpRoomUpdateOneRequiredWithoutInvitationsNestedInput
    sender?: UserUpdateOneRequiredWithoutSentPvpInvitationsNestedInput
  }

  export type PvpInvitationUncheckedUpdateWithoutRecipientInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpInvitationUncheckedUpdateManyWithoutRecipientInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyGiftInput = {
    id?: string
    type: string
    status?: string
    amountTon: Decimal | DecimalJsLike | number | string
    buyerId?: string | null
    sellerId?: string | null
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferCreateManyGiftInput = {
    id?: string
    amountTon: Decimal | DecimalJsLike | number | string
    status?: string
    buyerId: string
    sellerId?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateWithoutGiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buyer?: UserUpdateOneWithoutBuyerTransactionsNestedInput
    seller?: UserUpdateOneWithoutSellerTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutGiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    buyerId?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutGiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    buyerId?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUpdateWithoutGiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buyer?: UserUpdateOneRequiredWithoutBuyerOffersNestedInput
    seller?: UserUpdateOneWithoutSellerOffersNestedInput
  }

  export type OfferUncheckedUpdateWithoutGiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUncheckedUpdateManyWithoutGiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountTon?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpParticipantCreateManyRoomInput = {
    id?: string
    userId: string
    joinedAt?: Date | string
  }

  export type PvpInvitationCreateManyRoomInput = {
    id?: string
    senderId: string
    recipientId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PvpParticipantUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPvpParticipationsNestedInput
  }

  export type PvpParticipantUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpParticipantUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpInvitationUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentPvpInvitationsNestedInput
    recipient?: UserUpdateOneRequiredWithoutReceivedPvpInvitationsNestedInput
  }

  export type PvpInvitationUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    recipientId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvpInvitationUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    recipientId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}