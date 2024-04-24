import { test, expect, APIResponse } from '@playwright/test';

import {
  apiDeleteRequest,
  apiGetRequest,
  apiPostRequest,
} from 'helper/api.helper';
import { USERS_ENDPOINT } from 'config/base.config';

let apiResponse: APIResponse;

test.describe('API Get call requests', async () => {
  test('List Users', { tag: '@smoke' }, async () => {
    await test.step('List all users GET request', async () => {
      apiResponse = await apiGetRequest(USERS_ENDPOINT, { page: '2' });
    });

    await test.step('Should have API status as 200', async () => {
      expect(apiResponse.status()).toBe(200);
    });

    await test.step('should have page 2 details in API Response', async () => {
      expect(JSON.parse(await apiResponse.text()).page).toBe(2);
    });
  });

  const userIdList: number[] = [3, 5, 7];

  for (const userId of userIdList) {
    test(`Retrieve Single User with UserId-${userId}`, async () => {
      await test.step('retrieve single user', async () => {
        apiResponse = await apiGetRequest(`${USERS_ENDPOINT}/${userId}`);
      });

      await test.step('Should have API status as 200', async () => {
        expect(apiResponse.status()).toBe(200);
      });

      await test.step(`Should have user-id ${userId} in API Response`, async () => {
        expect.soft(JSON.parse(await apiResponse.text()).data.id).toBe(userId);
      });
    });
  }
});

test.describe('API Post/Delete Call Request', async () => {
  test('Create user via POST call', async () => {
    await test.step('send a POST request with body', async () => {
      const payload: object = {
        name: 'Kannan',
        job: 'QA',
      };

      apiResponse = await apiPostRequest(USERS_ENDPOINT, { payload });
    });

    await test.step('Should have API status as 201', async () => {
      expect(apiResponse.status()).toBe(201);
    });
  });

  test('Delete user via DELETE call', async () => {
    await test.step('send a DELETE request', async () => {
      apiResponse = await apiDeleteRequest(`${USERS_ENDPOINT}/2`);
    });

    await test.step('Should have API status as 204', async () => {
      expect(apiResponse.status()).toBe(204);
    });
  });
});
