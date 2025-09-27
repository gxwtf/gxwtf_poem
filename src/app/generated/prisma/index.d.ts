
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Poem
 * 
 */
export type Poem = $Result.DefaultSelection<Prisma.$PoemPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Star
 * 
 */
export type Star = $Result.DefaultSelection<Prisma.$StarPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Poems
 * const poems = await prisma.poem.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * const prisma = new PrismaClient()
   * // Fetch zero or more Poems
   * const poems = await prisma.poem.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.poem`: Exposes CRUD operations for the **Poem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Poems
    * const poems = await prisma.poem.findMany()
    * ```
    */
  get poem(): Prisma.PoemDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.star`: Exposes CRUD operations for the **Star** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stars
    * const stars = await prisma.star.findMany()
    * ```
    */
  get star(): Prisma.StarDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
      (Without<T, U> & U) | (Without<U, T> & T)
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
    Poem: 'Poem',
    User: 'User',
    Star: 'Star'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "poem" | "user" | "star"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Poem: {
        payload: Prisma.$PoemPayload<ExtArgs>
        fields: Prisma.PoemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PoemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PoemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>
          }
          findFirst: {
            args: Prisma.PoemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PoemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>
          }
          findMany: {
            args: Prisma.PoemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>[]
          }
          create: {
            args: Prisma.PoemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>
          }
          createMany: {
            args: Prisma.PoemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PoemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>[]
          }
          delete: {
            args: Prisma.PoemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>
          }
          update: {
            args: Prisma.PoemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>
          }
          deleteMany: {
            args: Prisma.PoemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PoemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PoemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>[]
          }
          upsert: {
            args: Prisma.PoemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>
          }
          aggregate: {
            args: Prisma.PoemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePoem>
          }
          groupBy: {
            args: Prisma.PoemGroupByArgs<ExtArgs>
            result: $Utils.Optional<PoemGroupByOutputType>[]
          }
          count: {
            args: Prisma.PoemCountArgs<ExtArgs>
            result: $Utils.Optional<PoemCountAggregateOutputType> | number
          }
        }
      }
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
      Star: {
        payload: Prisma.$StarPayload<ExtArgs>
        fields: Prisma.StarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StarPayload>
          }
          findFirst: {
            args: Prisma.StarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StarPayload>
          }
          findMany: {
            args: Prisma.StarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StarPayload>[]
          }
          create: {
            args: Prisma.StarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StarPayload>
          }
          createMany: {
            args: Prisma.StarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StarPayload>[]
          }
          delete: {
            args: Prisma.StarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StarPayload>
          }
          update: {
            args: Prisma.StarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StarPayload>
          }
          deleteMany: {
            args: Prisma.StarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StarUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StarPayload>[]
          }
          upsert: {
            args: Prisma.StarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StarPayload>
          }
          aggregate: {
            args: Prisma.StarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStar>
          }
          groupBy: {
            args: Prisma.StarGroupByArgs<ExtArgs>
            result: $Utils.Optional<StarGroupByOutputType>[]
          }
          count: {
            args: Prisma.StarCountArgs<ExtArgs>
            result: $Utils.Optional<StarCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }
  export type GlobalOmitConfig = {
    poem?: PoemOmit
    user?: UserOmit
    star?: StarOmit
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
   * Count Type PoemCountOutputType
   */

  export type PoemCountOutputType = {
    starredBy: number
  }

  export type PoemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    starredBy?: boolean | PoemCountOutputTypeCountStarredByArgs
  }

  // Custom InputTypes
  /**
   * PoemCountOutputType without action
   */
  export type PoemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoemCountOutputType
     */
    select?: PoemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PoemCountOutputType without action
   */
  export type PoemCountOutputTypeCountStarredByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StarWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    star: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    star?: boolean | UserCountOutputTypeCountStarArgs
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
  export type UserCountOutputTypeCountStarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StarWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Poem
   */

  export type AggregatePoem = {
    _count: PoemCountAggregateOutputType | null
    _min: PoemMinAggregateOutputType | null
    _max: PoemMaxAggregateOutputType | null
  }

  export type PoemMinAggregateOutputType = {
    id: string | null
    title: string | null
    version: string | null
    author: string | null
    dynasty: string | null
    mode: string | null
    content: string | null
  }

  export type PoemMaxAggregateOutputType = {
    id: string | null
    title: string | null
    version: string | null
    author: string | null
    dynasty: string | null
    mode: string | null
    content: string | null
  }

  export type PoemCountAggregateOutputType = {
    id: number
    title: number
    version: number
    tags: number
    author: number
    dynasty: number
    mode: number
    content: number
    _all: number
  }


  export type PoemMinAggregateInputType = {
    id?: true
    title?: true
    version?: true
    author?: true
    dynasty?: true
    mode?: true
    content?: true
  }

  export type PoemMaxAggregateInputType = {
    id?: true
    title?: true
    version?: true
    author?: true
    dynasty?: true
    mode?: true
    content?: true
  }

  export type PoemCountAggregateInputType = {
    id?: true
    title?: true
    version?: true
    tags?: true
    author?: true
    dynasty?: true
    mode?: true
    content?: true
    _all?: true
  }

  export type PoemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Poem to aggregate.
     */
    where?: PoemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Poems to fetch.
     */
    orderBy?: PoemOrderByWithRelationInput | PoemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PoemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Poems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Poems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Poems
    **/
    _count?: true | PoemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PoemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PoemMaxAggregateInputType
  }

  export type GetPoemAggregateType<T extends PoemAggregateArgs> = {
        [P in keyof T & keyof AggregatePoem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePoem[P]>
      : GetScalarType<T[P], AggregatePoem[P]>
  }




  export type PoemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoemWhereInput
    orderBy?: PoemOrderByWithAggregationInput | PoemOrderByWithAggregationInput[]
    by: PoemScalarFieldEnum[] | PoemScalarFieldEnum
    having?: PoemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PoemCountAggregateInputType | true
    _min?: PoemMinAggregateInputType
    _max?: PoemMaxAggregateInputType
  }

  export type PoemGroupByOutputType = {
    id: string
    title: string
    version: string
    tags: string[]
    author: string
    dynasty: string
    mode: string
    content: string
    _count: PoemCountAggregateOutputType | null
    _min: PoemMinAggregateOutputType | null
    _max: PoemMaxAggregateOutputType | null
  }

  type GetPoemGroupByPayload<T extends PoemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PoemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PoemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PoemGroupByOutputType[P]>
            : GetScalarType<T[P], PoemGroupByOutputType[P]>
        }
      >
    >


  export type PoemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    version?: boolean
    tags?: boolean
    author?: boolean
    dynasty?: boolean
    mode?: boolean
    content?: boolean
    starredBy?: boolean | Poem$starredByArgs<ExtArgs>
    _count?: boolean | PoemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poem"]>

  export type PoemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    version?: boolean
    tags?: boolean
    author?: boolean
    dynasty?: boolean
    mode?: boolean
    content?: boolean
  }, ExtArgs["result"]["poem"]>

  export type PoemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    version?: boolean
    tags?: boolean
    author?: boolean
    dynasty?: boolean
    mode?: boolean
    content?: boolean
  }, ExtArgs["result"]["poem"]>

  export type PoemSelectScalar = {
    id?: boolean
    title?: boolean
    version?: boolean
    tags?: boolean
    author?: boolean
    dynasty?: boolean
    mode?: boolean
    content?: boolean
  }

  export type PoemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "version" | "tags" | "author" | "dynasty" | "mode" | "content", ExtArgs["result"]["poem"]>
  export type PoemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    starredBy?: boolean | Poem$starredByArgs<ExtArgs>
    _count?: boolean | PoemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PoemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PoemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PoemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Poem"
    objects: {
      starredBy: Prisma.$StarPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      version: string
      tags: string[]
      author: string
      dynasty: string
      mode: string
      content: string
    }, ExtArgs["result"]["poem"]>
    composites: {}
  }

  type PoemGetPayload<S extends boolean | null | undefined | PoemDefaultArgs> = $Result.GetResult<Prisma.$PoemPayload, S>

  type PoemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PoemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PoemCountAggregateInputType | true
    }

  export interface PoemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Poem'], meta: { name: 'Poem' } }
    /**
     * Find zero or one Poem that matches the filter.
     * @param {PoemFindUniqueArgs} args - Arguments to find a Poem
     * @example
     * // Get one Poem
     * const poem = await prisma.poem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PoemFindUniqueArgs>(args: SelectSubset<T, PoemFindUniqueArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Poem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PoemFindUniqueOrThrowArgs} args - Arguments to find a Poem
     * @example
     * // Get one Poem
     * const poem = await prisma.poem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PoemFindUniqueOrThrowArgs>(args: SelectSubset<T, PoemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Poem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemFindFirstArgs} args - Arguments to find a Poem
     * @example
     * // Get one Poem
     * const poem = await prisma.poem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PoemFindFirstArgs>(args?: SelectSubset<T, PoemFindFirstArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Poem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemFindFirstOrThrowArgs} args - Arguments to find a Poem
     * @example
     * // Get one Poem
     * const poem = await prisma.poem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PoemFindFirstOrThrowArgs>(args?: SelectSubset<T, PoemFindFirstOrThrowArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Poems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Poems
     * const poems = await prisma.poem.findMany()
     * 
     * // Get first 10 Poems
     * const poems = await prisma.poem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const poemWithIdOnly = await prisma.poem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PoemFindManyArgs>(args?: SelectSubset<T, PoemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Poem.
     * @param {PoemCreateArgs} args - Arguments to create a Poem.
     * @example
     * // Create one Poem
     * const Poem = await prisma.poem.create({
     *   data: {
     *     // ... data to create a Poem
     *   }
     * })
     * 
     */
    create<T extends PoemCreateArgs>(args: SelectSubset<T, PoemCreateArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Poems.
     * @param {PoemCreateManyArgs} args - Arguments to create many Poems.
     * @example
     * // Create many Poems
     * const poem = await prisma.poem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PoemCreateManyArgs>(args?: SelectSubset<T, PoemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Poems and returns the data saved in the database.
     * @param {PoemCreateManyAndReturnArgs} args - Arguments to create many Poems.
     * @example
     * // Create many Poems
     * const poem = await prisma.poem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Poems and only return the `id`
     * const poemWithIdOnly = await prisma.poem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PoemCreateManyAndReturnArgs>(args?: SelectSubset<T, PoemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Poem.
     * @param {PoemDeleteArgs} args - Arguments to delete one Poem.
     * @example
     * // Delete one Poem
     * const Poem = await prisma.poem.delete({
     *   where: {
     *     // ... filter to delete one Poem
     *   }
     * })
     * 
     */
    delete<T extends PoemDeleteArgs>(args: SelectSubset<T, PoemDeleteArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Poem.
     * @param {PoemUpdateArgs} args - Arguments to update one Poem.
     * @example
     * // Update one Poem
     * const poem = await prisma.poem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PoemUpdateArgs>(args: SelectSubset<T, PoemUpdateArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Poems.
     * @param {PoemDeleteManyArgs} args - Arguments to filter Poems to delete.
     * @example
     * // Delete a few Poems
     * const { count } = await prisma.poem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PoemDeleteManyArgs>(args?: SelectSubset<T, PoemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Poems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Poems
     * const poem = await prisma.poem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PoemUpdateManyArgs>(args: SelectSubset<T, PoemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Poems and returns the data updated in the database.
     * @param {PoemUpdateManyAndReturnArgs} args - Arguments to update many Poems.
     * @example
     * // Update many Poems
     * const poem = await prisma.poem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Poems and only return the `id`
     * const poemWithIdOnly = await prisma.poem.updateManyAndReturn({
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
    updateManyAndReturn<T extends PoemUpdateManyAndReturnArgs>(args: SelectSubset<T, PoemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Poem.
     * @param {PoemUpsertArgs} args - Arguments to update or create a Poem.
     * @example
     * // Update or create a Poem
     * const poem = await prisma.poem.upsert({
     *   create: {
     *     // ... data to create a Poem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Poem we want to update
     *   }
     * })
     */
    upsert<T extends PoemUpsertArgs>(args: SelectSubset<T, PoemUpsertArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Poems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemCountArgs} args - Arguments to filter Poems to count.
     * @example
     * // Count the number of Poems
     * const count = await prisma.poem.count({
     *   where: {
     *     // ... the filter for the Poems we want to count
     *   }
     * })
    **/
    count<T extends PoemCountArgs>(
      args?: Subset<T, PoemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PoemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Poem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PoemAggregateArgs>(args: Subset<T, PoemAggregateArgs>): Prisma.PrismaPromise<GetPoemAggregateType<T>>

    /**
     * Group by Poem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemGroupByArgs} args - Group by arguments.
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
      T extends PoemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PoemGroupByArgs['orderBy'] }
        : { orderBy?: PoemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PoemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Poem model
   */
  readonly fields: PoemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Poem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PoemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    starredBy<T extends Poem$starredByArgs<ExtArgs> = {}>(args?: Subset<T, Poem$starredByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Poem model
   */
  interface PoemFieldRefs {
    readonly id: FieldRef<"Poem", 'String'>
    readonly title: FieldRef<"Poem", 'String'>
    readonly version: FieldRef<"Poem", 'String'>
    readonly tags: FieldRef<"Poem", 'String[]'>
    readonly author: FieldRef<"Poem", 'String'>
    readonly dynasty: FieldRef<"Poem", 'String'>
    readonly mode: FieldRef<"Poem", 'String'>
    readonly content: FieldRef<"Poem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Poem findUnique
   */
  export type PoemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoemInclude<ExtArgs> | null
    /**
     * Filter, which Poem to fetch.
     */
    where: PoemWhereUniqueInput
  }

  /**
   * Poem findUniqueOrThrow
   */
  export type PoemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoemInclude<ExtArgs> | null
    /**
     * Filter, which Poem to fetch.
     */
    where: PoemWhereUniqueInput
  }

  /**
   * Poem findFirst
   */
  export type PoemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoemInclude<ExtArgs> | null
    /**
     * Filter, which Poem to fetch.
     */
    where?: PoemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Poems to fetch.
     */
    orderBy?: PoemOrderByWithRelationInput | PoemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Poems.
     */
    cursor?: PoemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Poems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Poems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Poems.
     */
    distinct?: PoemScalarFieldEnum | PoemScalarFieldEnum[]
  }

  /**
   * Poem findFirstOrThrow
   */
  export type PoemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoemInclude<ExtArgs> | null
    /**
     * Filter, which Poem to fetch.
     */
    where?: PoemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Poems to fetch.
     */
    orderBy?: PoemOrderByWithRelationInput | PoemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Poems.
     */
    cursor?: PoemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Poems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Poems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Poems.
     */
    distinct?: PoemScalarFieldEnum | PoemScalarFieldEnum[]
  }

  /**
   * Poem findMany
   */
  export type PoemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoemInclude<ExtArgs> | null
    /**
     * Filter, which Poems to fetch.
     */
    where?: PoemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Poems to fetch.
     */
    orderBy?: PoemOrderByWithRelationInput | PoemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Poems.
     */
    cursor?: PoemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Poems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Poems.
     */
    skip?: number
    distinct?: PoemScalarFieldEnum | PoemScalarFieldEnum[]
  }

  /**
   * Poem create
   */
  export type PoemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoemInclude<ExtArgs> | null
    /**
     * The data needed to create a Poem.
     */
    data: XOR<PoemCreateInput, PoemUncheckedCreateInput>
  }

  /**
   * Poem createMany
   */
  export type PoemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Poems.
     */
    data: PoemCreateManyInput | PoemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Poem createManyAndReturn
   */
  export type PoemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * The data used to create many Poems.
     */
    data: PoemCreateManyInput | PoemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Poem update
   */
  export type PoemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoemInclude<ExtArgs> | null
    /**
     * The data needed to update a Poem.
     */
    data: XOR<PoemUpdateInput, PoemUncheckedUpdateInput>
    /**
     * Choose, which Poem to update.
     */
    where: PoemWhereUniqueInput
  }

  /**
   * Poem updateMany
   */
  export type PoemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Poems.
     */
    data: XOR<PoemUpdateManyMutationInput, PoemUncheckedUpdateManyInput>
    /**
     * Filter which Poems to update
     */
    where?: PoemWhereInput
    /**
     * Limit how many Poems to update.
     */
    limit?: number
  }

  /**
   * Poem updateManyAndReturn
   */
  export type PoemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * The data used to update Poems.
     */
    data: XOR<PoemUpdateManyMutationInput, PoemUncheckedUpdateManyInput>
    /**
     * Filter which Poems to update
     */
    where?: PoemWhereInput
    /**
     * Limit how many Poems to update.
     */
    limit?: number
  }

  /**
   * Poem upsert
   */
  export type PoemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoemInclude<ExtArgs> | null
    /**
     * The filter to search for the Poem to update in case it exists.
     */
    where: PoemWhereUniqueInput
    /**
     * In case the Poem found by the `where` argument doesn't exist, create a new Poem with this data.
     */
    create: XOR<PoemCreateInput, PoemUncheckedCreateInput>
    /**
     * In case the Poem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PoemUpdateInput, PoemUncheckedUpdateInput>
  }

  /**
   * Poem delete
   */
  export type PoemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoemInclude<ExtArgs> | null
    /**
     * Filter which Poem to delete.
     */
    where: PoemWhereUniqueInput
  }

  /**
   * Poem deleteMany
   */
  export type PoemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Poems to delete
     */
    where?: PoemWhereInput
    /**
     * Limit how many Poems to delete.
     */
    limit?: number
  }

  /**
   * Poem.starredBy
   */
  export type Poem$starredByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarInclude<ExtArgs> | null
    where?: StarWhereInput
    orderBy?: StarOrderByWithRelationInput | StarOrderByWithRelationInput[]
    cursor?: StarWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StarScalarFieldEnum | StarScalarFieldEnum[]
  }

  /**
   * Poem without action
   */
  export type PoemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoemInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    star?: boolean | User$starArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    star?: boolean | User$starArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      star: Prisma.$StarPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
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
    star<T extends User$starArgs<ExtArgs> = {}>(args?: Subset<T, User$starArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'Int'>
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
   * User.star
   */
  export type User$starArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarInclude<ExtArgs> | null
    where?: StarWhereInput
    orderBy?: StarOrderByWithRelationInput | StarOrderByWithRelationInput[]
    cursor?: StarWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StarScalarFieldEnum | StarScalarFieldEnum[]
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
   * Model Star
   */

  export type AggregateStar = {
    _count: StarCountAggregateOutputType | null
    _avg: StarAvgAggregateOutputType | null
    _sum: StarSumAggregateOutputType | null
    _min: StarMinAggregateOutputType | null
    _max: StarMaxAggregateOutputType | null
  }

  export type StarAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type StarSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type StarMinAggregateOutputType = {
    id: number | null
    userId: number | null
    poemId: string | null
  }

  export type StarMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    poemId: string | null
  }

  export type StarCountAggregateOutputType = {
    id: number
    userId: number
    poemId: number
    _all: number
  }


  export type StarAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type StarSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type StarMinAggregateInputType = {
    id?: true
    userId?: true
    poemId?: true
  }

  export type StarMaxAggregateInputType = {
    id?: true
    userId?: true
    poemId?: true
  }

  export type StarCountAggregateInputType = {
    id?: true
    userId?: true
    poemId?: true
    _all?: true
  }

  export type StarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Star to aggregate.
     */
    where?: StarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stars to fetch.
     */
    orderBy?: StarOrderByWithRelationInput | StarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stars
    **/
    _count?: true | StarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StarAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StarSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StarMaxAggregateInputType
  }

  export type GetStarAggregateType<T extends StarAggregateArgs> = {
        [P in keyof T & keyof AggregateStar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStar[P]>
      : GetScalarType<T[P], AggregateStar[P]>
  }




  export type StarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StarWhereInput
    orderBy?: StarOrderByWithAggregationInput | StarOrderByWithAggregationInput[]
    by: StarScalarFieldEnum[] | StarScalarFieldEnum
    having?: StarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StarCountAggregateInputType | true
    _avg?: StarAvgAggregateInputType
    _sum?: StarSumAggregateInputType
    _min?: StarMinAggregateInputType
    _max?: StarMaxAggregateInputType
  }

  export type StarGroupByOutputType = {
    id: number
    userId: number
    poemId: string
    _count: StarCountAggregateOutputType | null
    _avg: StarAvgAggregateOutputType | null
    _sum: StarSumAggregateOutputType | null
    _min: StarMinAggregateOutputType | null
    _max: StarMaxAggregateOutputType | null
  }

  type GetStarGroupByPayload<T extends StarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StarGroupByOutputType[P]>
            : GetScalarType<T[P], StarGroupByOutputType[P]>
        }
      >
    >


  export type StarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    poemId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    poem?: boolean | PoemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["star"]>

  export type StarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    poemId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    poem?: boolean | PoemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["star"]>

  export type StarSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    poemId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    poem?: boolean | PoemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["star"]>

  export type StarSelectScalar = {
    id?: boolean
    userId?: boolean
    poemId?: boolean
  }

  export type StarOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "poemId", ExtArgs["result"]["star"]>
  export type StarInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    poem?: boolean | PoemDefaultArgs<ExtArgs>
  }
  export type StarIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    poem?: boolean | PoemDefaultArgs<ExtArgs>
  }
  export type StarIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    poem?: boolean | PoemDefaultArgs<ExtArgs>
  }

  export type $StarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Star"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      poem: Prisma.$PoemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      poemId: string
    }, ExtArgs["result"]["star"]>
    composites: {}
  }

  type StarGetPayload<S extends boolean | null | undefined | StarDefaultArgs> = $Result.GetResult<Prisma.$StarPayload, S>

  type StarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StarCountAggregateInputType | true
    }

  export interface StarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Star'], meta: { name: 'Star' } }
    /**
     * Find zero or one Star that matches the filter.
     * @param {StarFindUniqueArgs} args - Arguments to find a Star
     * @example
     * // Get one Star
     * const star = await prisma.star.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StarFindUniqueArgs>(args: SelectSubset<T, StarFindUniqueArgs<ExtArgs>>): Prisma__StarClient<$Result.GetResult<Prisma.$StarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Star that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StarFindUniqueOrThrowArgs} args - Arguments to find a Star
     * @example
     * // Get one Star
     * const star = await prisma.star.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StarFindUniqueOrThrowArgs>(args: SelectSubset<T, StarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StarClient<$Result.GetResult<Prisma.$StarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Star that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StarFindFirstArgs} args - Arguments to find a Star
     * @example
     * // Get one Star
     * const star = await prisma.star.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StarFindFirstArgs>(args?: SelectSubset<T, StarFindFirstArgs<ExtArgs>>): Prisma__StarClient<$Result.GetResult<Prisma.$StarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Star that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StarFindFirstOrThrowArgs} args - Arguments to find a Star
     * @example
     * // Get one Star
     * const star = await prisma.star.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StarFindFirstOrThrowArgs>(args?: SelectSubset<T, StarFindFirstOrThrowArgs<ExtArgs>>): Prisma__StarClient<$Result.GetResult<Prisma.$StarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stars
     * const stars = await prisma.star.findMany()
     * 
     * // Get first 10 Stars
     * const stars = await prisma.star.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const starWithIdOnly = await prisma.star.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StarFindManyArgs>(args?: SelectSubset<T, StarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Star.
     * @param {StarCreateArgs} args - Arguments to create a Star.
     * @example
     * // Create one Star
     * const Star = await prisma.star.create({
     *   data: {
     *     // ... data to create a Star
     *   }
     * })
     * 
     */
    create<T extends StarCreateArgs>(args: SelectSubset<T, StarCreateArgs<ExtArgs>>): Prisma__StarClient<$Result.GetResult<Prisma.$StarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stars.
     * @param {StarCreateManyArgs} args - Arguments to create many Stars.
     * @example
     * // Create many Stars
     * const star = await prisma.star.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StarCreateManyArgs>(args?: SelectSubset<T, StarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stars and returns the data saved in the database.
     * @param {StarCreateManyAndReturnArgs} args - Arguments to create many Stars.
     * @example
     * // Create many Stars
     * const star = await prisma.star.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stars and only return the `id`
     * const starWithIdOnly = await prisma.star.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StarCreateManyAndReturnArgs>(args?: SelectSubset<T, StarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Star.
     * @param {StarDeleteArgs} args - Arguments to delete one Star.
     * @example
     * // Delete one Star
     * const Star = await prisma.star.delete({
     *   where: {
     *     // ... filter to delete one Star
     *   }
     * })
     * 
     */
    delete<T extends StarDeleteArgs>(args: SelectSubset<T, StarDeleteArgs<ExtArgs>>): Prisma__StarClient<$Result.GetResult<Prisma.$StarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Star.
     * @param {StarUpdateArgs} args - Arguments to update one Star.
     * @example
     * // Update one Star
     * const star = await prisma.star.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StarUpdateArgs>(args: SelectSubset<T, StarUpdateArgs<ExtArgs>>): Prisma__StarClient<$Result.GetResult<Prisma.$StarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stars.
     * @param {StarDeleteManyArgs} args - Arguments to filter Stars to delete.
     * @example
     * // Delete a few Stars
     * const { count } = await prisma.star.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StarDeleteManyArgs>(args?: SelectSubset<T, StarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stars
     * const star = await prisma.star.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StarUpdateManyArgs>(args: SelectSubset<T, StarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stars and returns the data updated in the database.
     * @param {StarUpdateManyAndReturnArgs} args - Arguments to update many Stars.
     * @example
     * // Update many Stars
     * const star = await prisma.star.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stars and only return the `id`
     * const starWithIdOnly = await prisma.star.updateManyAndReturn({
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
    updateManyAndReturn<T extends StarUpdateManyAndReturnArgs>(args: SelectSubset<T, StarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Star.
     * @param {StarUpsertArgs} args - Arguments to update or create a Star.
     * @example
     * // Update or create a Star
     * const star = await prisma.star.upsert({
     *   create: {
     *     // ... data to create a Star
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Star we want to update
     *   }
     * })
     */
    upsert<T extends StarUpsertArgs>(args: SelectSubset<T, StarUpsertArgs<ExtArgs>>): Prisma__StarClient<$Result.GetResult<Prisma.$StarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StarCountArgs} args - Arguments to filter Stars to count.
     * @example
     * // Count the number of Stars
     * const count = await prisma.star.count({
     *   where: {
     *     // ... the filter for the Stars we want to count
     *   }
     * })
    **/
    count<T extends StarCountArgs>(
      args?: Subset<T, StarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Star.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StarAggregateArgs>(args: Subset<T, StarAggregateArgs>): Prisma.PrismaPromise<GetStarAggregateType<T>>

    /**
     * Group by Star.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StarGroupByArgs} args - Group by arguments.
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
      T extends StarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StarGroupByArgs['orderBy'] }
        : { orderBy?: StarGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Star model
   */
  readonly fields: StarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Star.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    poem<T extends PoemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PoemDefaultArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Star model
   */
  interface StarFieldRefs {
    readonly id: FieldRef<"Star", 'Int'>
    readonly userId: FieldRef<"Star", 'Int'>
    readonly poemId: FieldRef<"Star", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Star findUnique
   */
  export type StarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarInclude<ExtArgs> | null
    /**
     * Filter, which Star to fetch.
     */
    where: StarWhereUniqueInput
  }

  /**
   * Star findUniqueOrThrow
   */
  export type StarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarInclude<ExtArgs> | null
    /**
     * Filter, which Star to fetch.
     */
    where: StarWhereUniqueInput
  }

  /**
   * Star findFirst
   */
  export type StarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarInclude<ExtArgs> | null
    /**
     * Filter, which Star to fetch.
     */
    where?: StarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stars to fetch.
     */
    orderBy?: StarOrderByWithRelationInput | StarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stars.
     */
    cursor?: StarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stars.
     */
    distinct?: StarScalarFieldEnum | StarScalarFieldEnum[]
  }

  /**
   * Star findFirstOrThrow
   */
  export type StarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarInclude<ExtArgs> | null
    /**
     * Filter, which Star to fetch.
     */
    where?: StarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stars to fetch.
     */
    orderBy?: StarOrderByWithRelationInput | StarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stars.
     */
    cursor?: StarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stars.
     */
    distinct?: StarScalarFieldEnum | StarScalarFieldEnum[]
  }

  /**
   * Star findMany
   */
  export type StarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarInclude<ExtArgs> | null
    /**
     * Filter, which Stars to fetch.
     */
    where?: StarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stars to fetch.
     */
    orderBy?: StarOrderByWithRelationInput | StarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stars.
     */
    cursor?: StarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stars.
     */
    skip?: number
    distinct?: StarScalarFieldEnum | StarScalarFieldEnum[]
  }

  /**
   * Star create
   */
  export type StarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarInclude<ExtArgs> | null
    /**
     * The data needed to create a Star.
     */
    data: XOR<StarCreateInput, StarUncheckedCreateInput>
  }

  /**
   * Star createMany
   */
  export type StarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stars.
     */
    data: StarCreateManyInput | StarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Star createManyAndReturn
   */
  export type StarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * The data used to create many Stars.
     */
    data: StarCreateManyInput | StarCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Star update
   */
  export type StarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarInclude<ExtArgs> | null
    /**
     * The data needed to update a Star.
     */
    data: XOR<StarUpdateInput, StarUncheckedUpdateInput>
    /**
     * Choose, which Star to update.
     */
    where: StarWhereUniqueInput
  }

  /**
   * Star updateMany
   */
  export type StarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stars.
     */
    data: XOR<StarUpdateManyMutationInput, StarUncheckedUpdateManyInput>
    /**
     * Filter which Stars to update
     */
    where?: StarWhereInput
    /**
     * Limit how many Stars to update.
     */
    limit?: number
  }

  /**
   * Star updateManyAndReturn
   */
  export type StarUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * The data used to update Stars.
     */
    data: XOR<StarUpdateManyMutationInput, StarUncheckedUpdateManyInput>
    /**
     * Filter which Stars to update
     */
    where?: StarWhereInput
    /**
     * Limit how many Stars to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Star upsert
   */
  export type StarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarInclude<ExtArgs> | null
    /**
     * The filter to search for the Star to update in case it exists.
     */
    where: StarWhereUniqueInput
    /**
     * In case the Star found by the `where` argument doesn't exist, create a new Star with this data.
     */
    create: XOR<StarCreateInput, StarUncheckedCreateInput>
    /**
     * In case the Star was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StarUpdateInput, StarUncheckedUpdateInput>
  }

  /**
   * Star delete
   */
  export type StarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarInclude<ExtArgs> | null
    /**
     * Filter which Star to delete.
     */
    where: StarWhereUniqueInput
  }

  /**
   * Star deleteMany
   */
  export type StarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stars to delete
     */
    where?: StarWhereInput
    /**
     * Limit how many Stars to delete.
     */
    limit?: number
  }

  /**
   * Star without action
   */
  export type StarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Star
     */
    select?: StarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Star
     */
    omit?: StarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StarInclude<ExtArgs> | null
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


  export const PoemScalarFieldEnum: {
    id: 'id',
    title: 'title',
    version: 'version',
    tags: 'tags',
    author: 'author',
    dynasty: 'dynasty',
    mode: 'mode',
    content: 'content'
  };

  export type PoemScalarFieldEnum = (typeof PoemScalarFieldEnum)[keyof typeof PoemScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StarScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    poemId: 'poemId'
  };

  export type StarScalarFieldEnum = (typeof StarScalarFieldEnum)[keyof typeof StarScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PoemWhereInput = {
    AND?: PoemWhereInput | PoemWhereInput[]
    OR?: PoemWhereInput[]
    NOT?: PoemWhereInput | PoemWhereInput[]
    id?: StringFilter<"Poem"> | string
    title?: StringFilter<"Poem"> | string
    version?: StringFilter<"Poem"> | string
    tags?: StringNullableListFilter<"Poem">
    author?: StringFilter<"Poem"> | string
    dynasty?: StringFilter<"Poem"> | string
    mode?: StringFilter<"Poem"> | string
    content?: StringFilter<"Poem"> | string
    starredBy?: StarListRelationFilter
  }

  export type PoemOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    version?: SortOrder
    tags?: SortOrder
    author?: SortOrder
    dynasty?: SortOrder
    mode?: SortOrder
    content?: SortOrder
    starredBy?: StarOrderByRelationAggregateInput
  }

  export type PoemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PoemWhereInput | PoemWhereInput[]
    OR?: PoemWhereInput[]
    NOT?: PoemWhereInput | PoemWhereInput[]
    title?: StringFilter<"Poem"> | string
    version?: StringFilter<"Poem"> | string
    tags?: StringNullableListFilter<"Poem">
    author?: StringFilter<"Poem"> | string
    dynasty?: StringFilter<"Poem"> | string
    mode?: StringFilter<"Poem"> | string
    content?: StringFilter<"Poem"> | string
    starredBy?: StarListRelationFilter
  }, "id">

  export type PoemOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    version?: SortOrder
    tags?: SortOrder
    author?: SortOrder
    dynasty?: SortOrder
    mode?: SortOrder
    content?: SortOrder
    _count?: PoemCountOrderByAggregateInput
    _max?: PoemMaxOrderByAggregateInput
    _min?: PoemMinOrderByAggregateInput
  }

  export type PoemScalarWhereWithAggregatesInput = {
    AND?: PoemScalarWhereWithAggregatesInput | PoemScalarWhereWithAggregatesInput[]
    OR?: PoemScalarWhereWithAggregatesInput[]
    NOT?: PoemScalarWhereWithAggregatesInput | PoemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Poem"> | string
    title?: StringWithAggregatesFilter<"Poem"> | string
    version?: StringWithAggregatesFilter<"Poem"> | string
    tags?: StringNullableListFilter<"Poem">
    author?: StringWithAggregatesFilter<"Poem"> | string
    dynasty?: StringWithAggregatesFilter<"Poem"> | string
    mode?: StringWithAggregatesFilter<"Poem"> | string
    content?: StringWithAggregatesFilter<"Poem"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    star?: StarListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    star?: StarOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    star?: StarListRelationFilter
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
  }

  export type StarWhereInput = {
    AND?: StarWhereInput | StarWhereInput[]
    OR?: StarWhereInput[]
    NOT?: StarWhereInput | StarWhereInput[]
    id?: IntFilter<"Star"> | number
    userId?: IntFilter<"Star"> | number
    poemId?: StringFilter<"Star"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    poem?: XOR<PoemScalarRelationFilter, PoemWhereInput>
  }

  export type StarOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    poemId?: SortOrder
    user?: UserOrderByWithRelationInput
    poem?: PoemOrderByWithRelationInput
  }

  export type StarWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_poemId?: StarUserIdPoemIdCompoundUniqueInput
    AND?: StarWhereInput | StarWhereInput[]
    OR?: StarWhereInput[]
    NOT?: StarWhereInput | StarWhereInput[]
    userId?: IntFilter<"Star"> | number
    poemId?: StringFilter<"Star"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    poem?: XOR<PoemScalarRelationFilter, PoemWhereInput>
  }, "id" | "userId_poemId">

  export type StarOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    poemId?: SortOrder
    _count?: StarCountOrderByAggregateInput
    _avg?: StarAvgOrderByAggregateInput
    _max?: StarMaxOrderByAggregateInput
    _min?: StarMinOrderByAggregateInput
    _sum?: StarSumOrderByAggregateInput
  }

  export type StarScalarWhereWithAggregatesInput = {
    AND?: StarScalarWhereWithAggregatesInput | StarScalarWhereWithAggregatesInput[]
    OR?: StarScalarWhereWithAggregatesInput[]
    NOT?: StarScalarWhereWithAggregatesInput | StarScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Star"> | number
    userId?: IntWithAggregatesFilter<"Star"> | number
    poemId?: StringWithAggregatesFilter<"Star"> | string
  }

  export type PoemCreateInput = {
    id?: string
    title: string
    version: string
    tags?: PoemCreatetagsInput | string[]
    author: string
    dynasty: string
    mode: string
    content: string
    starredBy?: StarCreateNestedManyWithoutPoemInput
  }

  export type PoemUncheckedCreateInput = {
    id?: string
    title: string
    version: string
    tags?: PoemCreatetagsInput | string[]
    author: string
    dynasty: string
    mode: string
    content: string
    starredBy?: StarUncheckedCreateNestedManyWithoutPoemInput
  }

  export type PoemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    tags?: PoemUpdatetagsInput | string[]
    author?: StringFieldUpdateOperationsInput | string
    dynasty?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    starredBy?: StarUpdateManyWithoutPoemNestedInput
  }

  export type PoemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    tags?: PoemUpdatetagsInput | string[]
    author?: StringFieldUpdateOperationsInput | string
    dynasty?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    starredBy?: StarUncheckedUpdateManyWithoutPoemNestedInput
  }

  export type PoemCreateManyInput = {
    id?: string
    title: string
    version: string
    tags?: PoemCreatetagsInput | string[]
    author: string
    dynasty: string
    mode: string
    content: string
  }

  export type PoemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    tags?: PoemUpdatetagsInput | string[]
    author?: StringFieldUpdateOperationsInput | string
    dynasty?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type PoemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    tags?: PoemUpdatetagsInput | string[]
    author?: StringFieldUpdateOperationsInput | string
    dynasty?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id: number
    star?: StarCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: number
    star?: StarUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    star?: StarUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    star?: StarUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: number
  }

  export type UserUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
  }

  export type StarCreateInput = {
    user: UserCreateNestedOneWithoutStarInput
    poem: PoemCreateNestedOneWithoutStarredByInput
  }

  export type StarUncheckedCreateInput = {
    id?: number
    userId: number
    poemId: string
  }

  export type StarUpdateInput = {
    user?: UserUpdateOneRequiredWithoutStarNestedInput
    poem?: PoemUpdateOneRequiredWithoutStarredByNestedInput
  }

  export type StarUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    poemId?: StringFieldUpdateOperationsInput | string
  }

  export type StarCreateManyInput = {
    id?: number
    userId: number
    poemId: string
  }

  export type StarUpdateManyMutationInput = {

  }

  export type StarUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    poemId?: StringFieldUpdateOperationsInput | string
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StarListRelationFilter = {
    every?: StarWhereInput
    some?: StarWhereInput
    none?: StarWhereInput
  }

  export type StarOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PoemCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    version?: SortOrder
    tags?: SortOrder
    author?: SortOrder
    dynasty?: SortOrder
    mode?: SortOrder
    content?: SortOrder
  }

  export type PoemMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    version?: SortOrder
    author?: SortOrder
    dynasty?: SortOrder
    mode?: SortOrder
    content?: SortOrder
  }

  export type PoemMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    version?: SortOrder
    author?: SortOrder
    dynasty?: SortOrder
    mode?: SortOrder
    content?: SortOrder
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PoemScalarRelationFilter = {
    is?: PoemWhereInput
    isNot?: PoemWhereInput
  }

  export type StarUserIdPoemIdCompoundUniqueInput = {
    userId: number
    poemId: string
  }

  export type StarCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    poemId?: SortOrder
  }

  export type StarAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type StarMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    poemId?: SortOrder
  }

  export type StarMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    poemId?: SortOrder
  }

  export type StarSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type PoemCreatetagsInput = {
    set: string[]
  }

  export type StarCreateNestedManyWithoutPoemInput = {
    create?: XOR<StarCreateWithoutPoemInput, StarUncheckedCreateWithoutPoemInput> | StarCreateWithoutPoemInput[] | StarUncheckedCreateWithoutPoemInput[]
    connectOrCreate?: StarCreateOrConnectWithoutPoemInput | StarCreateOrConnectWithoutPoemInput[]
    createMany?: StarCreateManyPoemInputEnvelope
    connect?: StarWhereUniqueInput | StarWhereUniqueInput[]
  }

  export type StarUncheckedCreateNestedManyWithoutPoemInput = {
    create?: XOR<StarCreateWithoutPoemInput, StarUncheckedCreateWithoutPoemInput> | StarCreateWithoutPoemInput[] | StarUncheckedCreateWithoutPoemInput[]
    connectOrCreate?: StarCreateOrConnectWithoutPoemInput | StarCreateOrConnectWithoutPoemInput[]
    createMany?: StarCreateManyPoemInputEnvelope
    connect?: StarWhereUniqueInput | StarWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type PoemUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type StarUpdateManyWithoutPoemNestedInput = {
    create?: XOR<StarCreateWithoutPoemInput, StarUncheckedCreateWithoutPoemInput> | StarCreateWithoutPoemInput[] | StarUncheckedCreateWithoutPoemInput[]
    connectOrCreate?: StarCreateOrConnectWithoutPoemInput | StarCreateOrConnectWithoutPoemInput[]
    upsert?: StarUpsertWithWhereUniqueWithoutPoemInput | StarUpsertWithWhereUniqueWithoutPoemInput[]
    createMany?: StarCreateManyPoemInputEnvelope
    set?: StarWhereUniqueInput | StarWhereUniqueInput[]
    disconnect?: StarWhereUniqueInput | StarWhereUniqueInput[]
    delete?: StarWhereUniqueInput | StarWhereUniqueInput[]
    connect?: StarWhereUniqueInput | StarWhereUniqueInput[]
    update?: StarUpdateWithWhereUniqueWithoutPoemInput | StarUpdateWithWhereUniqueWithoutPoemInput[]
    updateMany?: StarUpdateManyWithWhereWithoutPoemInput | StarUpdateManyWithWhereWithoutPoemInput[]
    deleteMany?: StarScalarWhereInput | StarScalarWhereInput[]
  }

  export type StarUncheckedUpdateManyWithoutPoemNestedInput = {
    create?: XOR<StarCreateWithoutPoemInput, StarUncheckedCreateWithoutPoemInput> | StarCreateWithoutPoemInput[] | StarUncheckedCreateWithoutPoemInput[]
    connectOrCreate?: StarCreateOrConnectWithoutPoemInput | StarCreateOrConnectWithoutPoemInput[]
    upsert?: StarUpsertWithWhereUniqueWithoutPoemInput | StarUpsertWithWhereUniqueWithoutPoemInput[]
    createMany?: StarCreateManyPoemInputEnvelope
    set?: StarWhereUniqueInput | StarWhereUniqueInput[]
    disconnect?: StarWhereUniqueInput | StarWhereUniqueInput[]
    delete?: StarWhereUniqueInput | StarWhereUniqueInput[]
    connect?: StarWhereUniqueInput | StarWhereUniqueInput[]
    update?: StarUpdateWithWhereUniqueWithoutPoemInput | StarUpdateWithWhereUniqueWithoutPoemInput[]
    updateMany?: StarUpdateManyWithWhereWithoutPoemInput | StarUpdateManyWithWhereWithoutPoemInput[]
    deleteMany?: StarScalarWhereInput | StarScalarWhereInput[]
  }

  export type StarCreateNestedManyWithoutUserInput = {
    create?: XOR<StarCreateWithoutUserInput, StarUncheckedCreateWithoutUserInput> | StarCreateWithoutUserInput[] | StarUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StarCreateOrConnectWithoutUserInput | StarCreateOrConnectWithoutUserInput[]
    createMany?: StarCreateManyUserInputEnvelope
    connect?: StarWhereUniqueInput | StarWhereUniqueInput[]
  }

  export type StarUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StarCreateWithoutUserInput, StarUncheckedCreateWithoutUserInput> | StarCreateWithoutUserInput[] | StarUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StarCreateOrConnectWithoutUserInput | StarCreateOrConnectWithoutUserInput[]
    createMany?: StarCreateManyUserInputEnvelope
    connect?: StarWhereUniqueInput | StarWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StarUpdateManyWithoutUserNestedInput = {
    create?: XOR<StarCreateWithoutUserInput, StarUncheckedCreateWithoutUserInput> | StarCreateWithoutUserInput[] | StarUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StarCreateOrConnectWithoutUserInput | StarCreateOrConnectWithoutUserInput[]
    upsert?: StarUpsertWithWhereUniqueWithoutUserInput | StarUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StarCreateManyUserInputEnvelope
    set?: StarWhereUniqueInput | StarWhereUniqueInput[]
    disconnect?: StarWhereUniqueInput | StarWhereUniqueInput[]
    delete?: StarWhereUniqueInput | StarWhereUniqueInput[]
    connect?: StarWhereUniqueInput | StarWhereUniqueInput[]
    update?: StarUpdateWithWhereUniqueWithoutUserInput | StarUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StarUpdateManyWithWhereWithoutUserInput | StarUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StarScalarWhereInput | StarScalarWhereInput[]
  }

  export type StarUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StarCreateWithoutUserInput, StarUncheckedCreateWithoutUserInput> | StarCreateWithoutUserInput[] | StarUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StarCreateOrConnectWithoutUserInput | StarCreateOrConnectWithoutUserInput[]
    upsert?: StarUpsertWithWhereUniqueWithoutUserInput | StarUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StarCreateManyUserInputEnvelope
    set?: StarWhereUniqueInput | StarWhereUniqueInput[]
    disconnect?: StarWhereUniqueInput | StarWhereUniqueInput[]
    delete?: StarWhereUniqueInput | StarWhereUniqueInput[]
    connect?: StarWhereUniqueInput | StarWhereUniqueInput[]
    update?: StarUpdateWithWhereUniqueWithoutUserInput | StarUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StarUpdateManyWithWhereWithoutUserInput | StarUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StarScalarWhereInput | StarScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutStarInput = {
    create?: XOR<UserCreateWithoutStarInput, UserUncheckedCreateWithoutStarInput>
    connectOrCreate?: UserCreateOrConnectWithoutStarInput
    connect?: UserWhereUniqueInput
  }

  export type PoemCreateNestedOneWithoutStarredByInput = {
    create?: XOR<PoemCreateWithoutStarredByInput, PoemUncheckedCreateWithoutStarredByInput>
    connectOrCreate?: PoemCreateOrConnectWithoutStarredByInput
    connect?: PoemWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutStarNestedInput = {
    create?: XOR<UserCreateWithoutStarInput, UserUncheckedCreateWithoutStarInput>
    connectOrCreate?: UserCreateOrConnectWithoutStarInput
    upsert?: UserUpsertWithoutStarInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStarInput, UserUpdateWithoutStarInput>, UserUncheckedUpdateWithoutStarInput>
  }

  export type PoemUpdateOneRequiredWithoutStarredByNestedInput = {
    create?: XOR<PoemCreateWithoutStarredByInput, PoemUncheckedCreateWithoutStarredByInput>
    connectOrCreate?: PoemCreateOrConnectWithoutStarredByInput
    upsert?: PoemUpsertWithoutStarredByInput
    connect?: PoemWhereUniqueInput
    update?: XOR<XOR<PoemUpdateToOneWithWhereWithoutStarredByInput, PoemUpdateWithoutStarredByInput>, PoemUncheckedUpdateWithoutStarredByInput>
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StarCreateWithoutPoemInput = {
    user: UserCreateNestedOneWithoutStarInput
  }

  export type StarUncheckedCreateWithoutPoemInput = {
    id?: number
    userId: number
  }

  export type StarCreateOrConnectWithoutPoemInput = {
    where: StarWhereUniqueInput
    create: XOR<StarCreateWithoutPoemInput, StarUncheckedCreateWithoutPoemInput>
  }

  export type StarCreateManyPoemInputEnvelope = {
    data: StarCreateManyPoemInput | StarCreateManyPoemInput[]
    skipDuplicates?: boolean
  }

  export type StarUpsertWithWhereUniqueWithoutPoemInput = {
    where: StarWhereUniqueInput
    update: XOR<StarUpdateWithoutPoemInput, StarUncheckedUpdateWithoutPoemInput>
    create: XOR<StarCreateWithoutPoemInput, StarUncheckedCreateWithoutPoemInput>
  }

  export type StarUpdateWithWhereUniqueWithoutPoemInput = {
    where: StarWhereUniqueInput
    data: XOR<StarUpdateWithoutPoemInput, StarUncheckedUpdateWithoutPoemInput>
  }

  export type StarUpdateManyWithWhereWithoutPoemInput = {
    where: StarScalarWhereInput
    data: XOR<StarUpdateManyMutationInput, StarUncheckedUpdateManyWithoutPoemInput>
  }

  export type StarScalarWhereInput = {
    AND?: StarScalarWhereInput | StarScalarWhereInput[]
    OR?: StarScalarWhereInput[]
    NOT?: StarScalarWhereInput | StarScalarWhereInput[]
    id?: IntFilter<"Star"> | number
    userId?: IntFilter<"Star"> | number
    poemId?: StringFilter<"Star"> | string
  }

  export type StarCreateWithoutUserInput = {
    poem: PoemCreateNestedOneWithoutStarredByInput
  }

  export type StarUncheckedCreateWithoutUserInput = {
    id?: number
    poemId: string
  }

  export type StarCreateOrConnectWithoutUserInput = {
    where: StarWhereUniqueInput
    create: XOR<StarCreateWithoutUserInput, StarUncheckedCreateWithoutUserInput>
  }

  export type StarCreateManyUserInputEnvelope = {
    data: StarCreateManyUserInput | StarCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StarUpsertWithWhereUniqueWithoutUserInput = {
    where: StarWhereUniqueInput
    update: XOR<StarUpdateWithoutUserInput, StarUncheckedUpdateWithoutUserInput>
    create: XOR<StarCreateWithoutUserInput, StarUncheckedCreateWithoutUserInput>
  }

  export type StarUpdateWithWhereUniqueWithoutUserInput = {
    where: StarWhereUniqueInput
    data: XOR<StarUpdateWithoutUserInput, StarUncheckedUpdateWithoutUserInput>
  }

  export type StarUpdateManyWithWhereWithoutUserInput = {
    where: StarScalarWhereInput
    data: XOR<StarUpdateManyMutationInput, StarUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCreateWithoutStarInput = {
    id: number
  }

  export type UserUncheckedCreateWithoutStarInput = {
    id: number
  }

  export type UserCreateOrConnectWithoutStarInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStarInput, UserUncheckedCreateWithoutStarInput>
  }

  export type PoemCreateWithoutStarredByInput = {
    id?: string
    title: string
    version: string
    tags?: PoemCreatetagsInput | string[]
    author: string
    dynasty: string
    mode: string
    content: string
  }

  export type PoemUncheckedCreateWithoutStarredByInput = {
    id?: string
    title: string
    version: string
    tags?: PoemCreatetagsInput | string[]
    author: string
    dynasty: string
    mode: string
    content: string
  }

  export type PoemCreateOrConnectWithoutStarredByInput = {
    where: PoemWhereUniqueInput
    create: XOR<PoemCreateWithoutStarredByInput, PoemUncheckedCreateWithoutStarredByInput>
  }

  export type UserUpsertWithoutStarInput = {
    update: XOR<UserUpdateWithoutStarInput, UserUncheckedUpdateWithoutStarInput>
    create: XOR<UserCreateWithoutStarInput, UserUncheckedCreateWithoutStarInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStarInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStarInput, UserUncheckedUpdateWithoutStarInput>
  }

  export type UserUpdateWithoutStarInput = {
    id?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateWithoutStarInput = {
    id?: IntFieldUpdateOperationsInput | number
  }

  export type PoemUpsertWithoutStarredByInput = {
    update: XOR<PoemUpdateWithoutStarredByInput, PoemUncheckedUpdateWithoutStarredByInput>
    create: XOR<PoemCreateWithoutStarredByInput, PoemUncheckedCreateWithoutStarredByInput>
    where?: PoemWhereInput
  }

  export type PoemUpdateToOneWithWhereWithoutStarredByInput = {
    where?: PoemWhereInput
    data: XOR<PoemUpdateWithoutStarredByInput, PoemUncheckedUpdateWithoutStarredByInput>
  }

  export type PoemUpdateWithoutStarredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    tags?: PoemUpdatetagsInput | string[]
    author?: StringFieldUpdateOperationsInput | string
    dynasty?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type PoemUncheckedUpdateWithoutStarredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    tags?: PoemUpdatetagsInput | string[]
    author?: StringFieldUpdateOperationsInput | string
    dynasty?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type StarCreateManyPoemInput = {
    id?: number
    userId: number
  }

  export type StarUpdateWithoutPoemInput = {
    user?: UserUpdateOneRequiredWithoutStarNestedInput
  }

  export type StarUncheckedUpdateWithoutPoemInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type StarUncheckedUpdateManyWithoutPoemInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type StarCreateManyUserInput = {
    id?: number
    poemId: string
  }

  export type StarUpdateWithoutUserInput = {
    poem?: PoemUpdateOneRequiredWithoutStarredByNestedInput
  }

  export type StarUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    poemId?: StringFieldUpdateOperationsInput | string
  }

  export type StarUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    poemId?: StringFieldUpdateOperationsInput | string
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