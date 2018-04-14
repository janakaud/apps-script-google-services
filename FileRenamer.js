FOLDER_ID = "__folder ID__";

function stampFiles() {
  files = DriveApp.getFolderById(FOLDER_ID).getFiles();
  while(files.hasNext()) {
    file = files.next();
    name = file.getName();
    time = parseInt((file.getDateCreated().getTime()/1000) % 86400);
    if(name.match(new RegExp(time + "-[^A-Z\\s]")))
      continue;
    file.setName(time + "-" + name.toLowerCase().replace(/\s/g, "_"));
  }
}