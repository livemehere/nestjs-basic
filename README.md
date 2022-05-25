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

## Single-Responsibility-Principle

- 하나의 `module`, `class`, `function` 은 반드시 하나의 기능만 하도록 한다.

## Status Code

### 400 에러 발생 예시

```ts
  throw new NotFoundException(`내용..`); // 404 reponse
```

### 여러 service 사용 예시

```ts
  deleteOne(id: string) {
    this.getOne(id); // getOne이라는 service에서 Error가 throw되면 거기서 response 반환
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }
```