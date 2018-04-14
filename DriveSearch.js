function list() {
  x = DriveApp.searchFiles("mimeType = 'application/vnd.google-apps.script'");
  while(x.hasNext()) {
    y = x.next();
    Logger.log(y.getName() + ' ' + y.getId());
  }
}
