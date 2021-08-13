export default {
  handle(err, vm, info) {
    Logger.error("Global ErrorHandler:", err, info);
  }
};
