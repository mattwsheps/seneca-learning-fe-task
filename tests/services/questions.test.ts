import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchQuestion } from '../../src/services/questions';

global.fetch = vi.fn();

describe('fetchQuestion', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches question data successfully', async () => {
    const mockData = { questionText: 'Test Question' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchQuestion();
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('/questionData.json');
  });

  it('throws an error when fetch fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchQuestion()).rejects.toThrow('Failed to fetch question data: 404 Not Found');
  });

  it('throws an error when an exception occurs', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(fetchQuestion()).rejects.toThrow('Network error');
  });
});