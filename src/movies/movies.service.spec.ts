import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import exp from 'constants';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', function () {
    it('should be an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return an Movie', () => {
      service.createOne({
        title: 'text Movie',
        genres: ['test'],
        year: 2002,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1); // optional
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found'); // optional
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.createOne({
        title: 'text Movie',
        genres: ['test'],
        year: 2002,
      });

      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterMovies = service.getAll();

      expect(afterMovies.length).toBeLessThan(beforeDelete.length);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreated = service.getAll().length;
      service.createOne({
        title: 'text Movie',
        genres: ['test'],
        year: 2002,
      });
      const afterCreated = service.getAll().length;

      expect(afterCreated).toBeGreaterThan(beforeCreated);
    });
  });

  describe('update', () => {
    it('should update a moive', () => {
      service.createOne({
        title: 'text Movie',
        genres: ['test'],
        year: 2002,
      });
      service.update(1, { title: 'update test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('update test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
