import 'jasmine';
import { AppError } from '../index';

describe('app_error', () => {
  it('is AppError()', () => {
    const err = new AppError();
    expect(err).toBeDefined();
    expect(err.name).toEqual('AppError');
    expect(err.message).toEqual('');
    expect(err.stack).toBeDefined();
    expect(err.stack.length).toBeGreaterThan(0);
  });

  it('is AppError(msg)', () => {
    const err = new AppError('msg');
    expect(err).toBeDefined();
    expect(err.name).toEqual('AppError');
    expect(err.message).toEqual('msg');
    expect(err.stack).toBeDefined();
    expect(err.stack.length).toBeGreaterThan(0);
  });

  it('is AppError(msg, params)', () => {
    const err = new AppError('msg %s', '2');
    expect(err).toBeDefined();
    expect(err.name).toEqual('AppError');
    expect(err.message).toEqual('msg 2');
    expect(err.stack).toBeDefined();
    expect(err.stack.length).toBeGreaterThan(0);
  });

  it('is AppError(err, msg)', () => {
    const err = new AppError(new Error('err'), 'msg');
    expect(err).toBeDefined();
    expect(err.name).toEqual('AppError');
    expect(err.message).toEqual('msg (caused by: err)');
    expect(err.stack).toBeDefined();
    expect(err.stack.length).toBeGreaterThan(0);
    expect(err.stack).toContain('caused by:');
  });

  it('is AppError(err, msg, params)', () => {
    const err = new AppError(new Error('err'), 'msg %s', '2');
    expect(err).toBeDefined();
    expect(err.name).toEqual('AppError');
    expect(err.message).toEqual('msg 2 (caused by: err)');
    expect(err.stack).toBeDefined();
    expect(err.stack.length).toBeGreaterThan(0);
    expect(err.stack).toContain('caused by:');
  });

  it('object parameters on AppError(err, msg, params)', () => {
    const err = new AppError({ test: 'test' } as any, 'msg %s', '2');
    expect(err).toBeDefined();
    expect(err.name).toEqual('AppError');
    expect(err.message).toEqual('msg 2 (caused by: Error: {"test":"test"})');
    expect(err.stack).toBeDefined();
    expect(err.stack.length).toBeGreaterThan(0);
    expect(err.stack).toContain('caused by:');
  });

  it('boolean parameters on AppError(err, msg, params)', () => {
    const err = new AppError(true as any, 'msg %s');
    expect(err).toBeDefined();
    expect(err.name).toEqual('AppError');
    expect(err.message).toEqual('msg %s (caused by: Error: true)');
    expect(err.stack).toBeDefined();
    expect(err.stack.length).toBeGreaterThan(0);
    expect(err.stack).toContain('caused by:');
  });

});
