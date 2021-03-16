import authHeader from '../authHeader';

describe('authHeader', () => {
  test('should return null without token', () => {
    const mockState = {
      auth: {
        token: null,
      },
    };
    const header = authHeader(mockState);
    expect(header).toEqual(null);
  });

  test('should return correct header with token', () => {
    const mockState = {
      auth: {
        token: 'mockToken',
      },
    };
    const header = authHeader(mockState);
    expect(header).toEqual({ authorization: 'Token mockToken' });
  });
});
