# NestJS 배우기

## Flow (↓)

- main.ts
- module
- controller : url매핑, request 받기
- service : 함수 실행(DB CRUD)

## Keyword

- decorator
  - @Get()
  - @Post()
  - @Patch()
  - @Delete()
  - @Put()

  - @Param()
  - @Query()
  - @Body()
  - @Req()
  - @Res()


- pipe (middleware in express)

## Single-Responsibility-Principle

- 하나의 `module`, `class`, `function` 은 반드시 하나의 기능만 하도록 한다.

## Status Code

### 400 에러 발생 예시

```ts
  throw new NotFoundException(`내용..`); // 404 reponse
```

### 여러 service 간 사용 예시

```ts
  deleteOne(id: string) {
    this.getOne(id); // getOne이라는 service에서 Error가 throw되면 거기서 response 반환
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }
```

## Validator

```bash
yarn add class-validator class-transformer # class-transformer: request로 전달받는 것은 모두 string임, 그것을 변환 시켜서 받음
yarn add @nestjs/mapped-types # optional type 받을 때 
```

### main.ts

```ts
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(3000);
```

### DTO 생성 및 type으로 적용

```ts
export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsString({ each: true })
  readonly genres: string[];
}
```

```ts
export class UpdateMovieDto extends PartialType(CreateMovieDto) {} // update 시 사용
```

## Test

- Unit Test : 함수별로 테스팅, coverage 확인
- e2e Test

### keywords

- describe()
- it()

### Hooks

- `beforeEach()`
- `afterEach()`
- `afterAll()`
- `beforeAll()`