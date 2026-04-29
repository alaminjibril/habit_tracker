import { describe, it, expect, beforeEach } from 'vitest';
import { signup, login, logout, getSession } from '@/lib/auth';

describe('auth utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('signs up a new user', () => {
    const result = signup('test@example.com', 'password');
    expect(result.success).toBe(true);
    expect(getSession()).toBeTruthy();
    expect(getSession()?.email).toBe('test@example.com');
  });

  it('fails to signup with existing email', () => {
    signup('test@example.com', 'password');
    const result = signup('test@example.com', 'newpassword');
    expect(result.success).toBe(false);
    expect(result.error).toBe('User already exists');
  });

  it('logs in an existing user', () => {
    signup('test@example.com', 'password');
    logout();
    expect(getSession()).toBeNull();
    
    const result = login('test@example.com', 'password');
    expect(result.success).toBe(true);
    expect(getSession()?.email).toBe('test@example.com');
  });

  it('fails to login with wrong credentials', () => {
    signup('test@example.com', 'password');
    const result = login('test@example.com', 'wrongpassword');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid email or password');
  });

  it('logs out', () => {
    signup('test@example.com', 'password');
    expect(getSession()).toBeTruthy();
    logout();
    expect(getSession()).toBeNull();
  });
});
