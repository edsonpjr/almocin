//backend/tests/controllers/stats.steps.ts
import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import StatsService from '../../src/services/stats.service';

const feature = loadFeature('tests/features/stats.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let statsService: StatsService;
  let response: supertest.Response;

  beforeAll(() => {
    statsService = di.getService(StatsService);
  });

  test('requisitar todas as estatísticas', ({ given, when, then, and }) => {
    given('há um objeto em "/stats":', (docString) => {
      const stats = JSON.parse(docString);
      jest.spyOn(statsService, 'getStats').mockResolvedValue(stats);
    });

    when('o usuário faz uma requisição "GET" para o endpoint "/stats" com o filtro "all"', async () => {
      response = await request.get('/api/stats/all');
    });

    then('o status code da requisição deve ser "200"', () => {
      expect(response.status).toBe(200);
    });

    and('a resposta deve conter as seguintes informações:', (table) => {
      const expectedResponse = {
        totalUsers: Number(table.rowsHash().totalUsers),
        totalItems: Number(table.rowsHash().totalItems),
        totalRevenue: Number(table.rowsHash().totalRevenue),
        currentMonthRevenue: Number(table.rowsHash().currentMonthRevenue),
        totalOrders: Number(table.rowsHash().totalOrders),
        monthOrders: Number(table.rowsHash().monthOrders),
        averageTicket: Number(table.rowsHash().averageTicket),
        currentMonthAverageTicket: Number(table.rowsHash().currentMonthAverageTicket),
      };
      expect(response.body.data).toEqual(expectedResponse);
    });
  });

  test('requisitar as estatísticas de arrecadação', ({ given, when, then, and }) => {
    given('há um objeto em "/stats":', (docString) => {
      const stats = JSON.parse(docString);
      jest.spyOn(statsService, 'getStats').mockResolvedValue(stats);
    });

    when('o usuário faz uma requisição "GET" para o endpoint "/stats" com o filtro "money"', async () => {
      response = await request.get('/api/stats/money');
    });

    then('o status code da requisição deve ser "200"', () => {
      expect(response.status).toBe(200);
    });

    and('a resposta deve conter as seguintes informações:', (table) => {
      const expectedResponse = {
        totalRevenue: Number(table.rowsHash().totalRevenue),
        currentMonthRevenue: Number(table.rowsHash().currentMonthRevenue),
        averageTicket: Number(table.rowsHash().averageTicket),
        currentMonthAverageTicket: Number(table.rowsHash().currentMonthAverageTicket),
      };
      expect(response.body.data).toEqual(expectedResponse);
    });
  });

  test('requisitar as estatísticas mensais', ({ given, when, then, and }) => {
    given('há um objeto em "/stats":', (docString) => {
      const stats = JSON.parse(docString);
      jest.spyOn(statsService, 'getStats').mockResolvedValue(stats);
    });

    when('o usuário faz uma requisição "GET" para o endpoint "/stats" com o filtro "month"', async () => {
      response = await request.get('/api/stats/month');
    });

    then('o status code da requisição deve ser "200"', () => {
      expect(response.status).toBe(200);
    });

    and('a resposta deve conter as seguintes informações:', (table) => {
      const expectedResponse = {
        currentMonthRevenue: Number(table.rowsHash().currentMonthRevenue),
        monthOrders: Number(table.rowsHash().monthOrders),
        currentMonthAverageTicket: Number(table.rowsHash().currentMonthAverageTicket),
      };
      expect(response.body.data).toEqual(expectedResponse);
    });
  });
});
