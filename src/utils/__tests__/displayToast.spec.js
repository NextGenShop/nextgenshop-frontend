import { toastr } from 'react-redux-toastr';
import { displayToast } from '../displayToast';

jest.mock('react-redux-toastr', () => {
  return {
    toastr: {
      info: jest.fn(),
      warning: jest.fn(),
      error: jest.fn(),
      success: jest.fn(),
    },
  };
});

describe('displayToast', () => {
  const title = 'mockTitle';
  const msg = 'mockMsg';
  let options;
  beforeEach(() => {
    options = {
      timeOut: 5000,
      showCloseButton: true,
      progressBar: false,
      transitionIn: 'fadeIn',
      transitionOut: 'fadeOut',
    };
  });
  test('should call correct toastr instance for type: info', () => {
    displayToast(title, msg, 'info');
    expect(toastr.info).toBeCalled();
  });
  test('should call correct toastr instance for type: warning', () => {
    displayToast(title, msg, 'warning');
    expect(toastr.warning).toBeCalled();
  });
  test('should call correct toastr instance for type: danger', () => {
    displayToast(title, msg, 'danger');
    expect(toastr.error).toBeCalled();
  });
  test('should call correct toastr instance for type: success', () => {
    displayToast(title, msg, 'success');
    expect(toastr.success).toBeCalled();
  });
  test('should call success toastr instance for unknown type', () => {
    displayToast(title, msg, 'invalidType');
    expect(toastr.success).toBeCalled();
  });
  test('should call toastr instance with correct arguments', () => {
    displayToast(title, msg, 'info');
    expect(toastr.info).toBeCalledWith(title, msg, options);
  });
  test('should call toastr instance with correct arguments with onShowComplete', () => {
    const mockCallbackClear = jest.fn();
    const expectedOptions = { ...options, onShowComplete: mockCallbackClear };
    displayToast(title, msg, 'info', mockCallbackClear);
    expect(toastr.info).toBeCalledWith(title, msg, expectedOptions);
  });
});
