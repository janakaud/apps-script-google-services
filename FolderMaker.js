ID = "__sheet ID__";

function makeFolders() {
  sheet = SpreadsheetApp.openById(ID).getActiveSheet();
  rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  for (r in rows) {
    row = rows[r];
    dir = DriveApp.getRootFolder();
    for (c in row) {
      cell = row[c];
      if (!cell || cell == "") { // end of hierarchy
        break;
      }
      subdirs = dir.getFoldersByName(cell);
      dir = subdirs.hasNext() ? subdirs.next() : dir.createFolder(cell);
    }
  }
}


lst = [];
function listFolders() {
  travers(DriveApp.getRootFolder());
}
function travers(folder) {
  lst.push(folder.getName());
  var children = folder.getFolders();
  if (!children.hasNext()) {
    Logger.log(lst.join("/"));
  }
  while (children.hasNext()) {
    travers(children.next());
  }
  lst.pop();
}