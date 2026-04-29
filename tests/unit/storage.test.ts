import { describe, it, expect, beforeEach } from 'vitest';
import { getItem, setItem, removeItem, clearStorage } from '@/lib/storage';

describe('storage utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('sets and gets an item', () => {
    const data = { foo: 'bar' };
    setItem('test-key', data);
    expect(getItem('test-key')).toEqual(data);
  });

  it('returns null for non-existent key', () => {
    expect(getItem('non-existent')).toBe(null);
  });

  it('removes an item', () => {
    setItem('test-key', 'value');
    removeItem('test-key');
    expect(getItem('test-key')).toBe(null);
  });

  it('clears storage', () => {
    setItem('key1', 'val1');
    setItem('key2', 'val2');
    clearStorage();
    expect(getItem('key1')).toBe(null);
    expect(getItem('key2')).toBe(null);
  });

  it('returns null for invalid JSON', () => {
    localStorage.setItem('invalid', 'not-json');
    expect(getItem('invalid')).toBe(null);
  });
});
