import { toastr } from "react-redux-toastr";

let options = {
  timeOut: 5000,
  showCloseButton: true,
  progressBar: false,
  transitionIn: "fadeIn",
  transitionOut: "fadeOut",
};

export const displayToast = (title, msg, type, callbackClear) => {
  const toastrInstance =
    type === "info"
      ? toastr.info
      : type === "warning"
      ? toastr.warning
      : type === "danger"
      ? toastr.error
      : toastr.success;
  if (callbackClear) options.onShowComplete = callbackClear;
  toastrInstance(title, msg, options);
};
