import * as vscode from 'vscode';

export class ContentReader {
  url:string;
  fs = vscode.workspace.fs;

  IgnoreList = ['.git','.vscode'];
  //The folders that would not be shown in the `Directory Hierarchy`

  constructor(url:string){
    this.url=url;
  }
  async fileDirectoryCheck(){
    console.log("Doing file directory check");
    const fileDirectory = await this.fs.readDirectory(vscode.Uri.parse(this.url));
    //console.log(fileDirectory);
    //console.log("end");
    var DirectoryHierarchy:string = "";
    var fileDeep = 0;
    for(var file of fileDirectory){
      var fileName = file[0];
      var fileType = file[1];
      DirectoryHierarchy = await this.buildDirectory(fileName,fileType,fileDeep,this.url,DirectoryHierarchy);
    }
    return DirectoryHierarchy;
  }
  async environmentCheck(content:string){
    //console.log("Doing environment check");
    
    const DirectoryHierarchy= await this.fileDirectoryCheck();
    //console.log(DirectoryHierarchy);

    const referenceLibrary = await this.getReferenceLibrary();
    //console.log(referenceLibrary);

    content = await this.upgradeReadme(DirectoryHierarchy,referenceLibrary,content);

    return content;
  }
  async buildDirectory(fileName:string,fileType:vscode.FileType,fileDeep:number,url:string,DirectoryHierarchy:string) {
    //console.log(fileName,fileType,fileDeep,url);
    if(fileType==vscode.FileType.File){
      //console.log(`${fileName} is a file`);
      DirectoryHierarchy+= await this.drawLine(fileName,fileDeep);
    }
    else if(fileType==vscode.FileType.Directory){
      //console.log(`${fileName} is a directory`);
      if(this.isInIgnoreList(fileName)){
        //console.log(`${fileName} is a directory in the ignore list`);
        return DirectoryHierarchy;
      }
      var currentUrl = url+'/'+fileName;
      //console.log("currenct url = "+currentUrl);
      var currentDirectory = await this.fs.readDirectory(vscode.Uri.parse(currentUrl));
      //console.log(currentDirectory);
      DirectoryHierarchy+= await this.drawLine(fileName,fileDeep);
      for(var file of currentDirectory){
        var fileName = file[0];
        var fileType = file[1];
        DirectoryHierarchy = await this.buildDirectory(fileName,fileType,fileDeep+1,currentUrl,DirectoryHierarchy);
      }
    }
    else {
      console.log("Symbolic link or unknown file would not be loaded ");
    }
    return DirectoryHierarchy;
  }
  async drawLine(fileName:string,fileDeep:number){
    var start:string = "|";
    var space = "    ".repeat(fileDeep);
    if (space =="")var line = "—— ";
    else var line = "|—— ";

    return start+space+line+fileName+'\n';
  }
  isInIgnoreList(fileName:string){
    for(var name of this.IgnoreList){
      if(fileName==name)return true;
    }
    return false;
  }
  async getReferenceLibrary(){
    var referenceList = [];
    var ReferenceLibrary:string="";
    return ReferenceLibrary;
  }
  async upgradeReadme(DirectoryHierarchy:string,referenceLibrary:string,content:string){

    var indexD = content.indexOf("## Directory Hierarchy\n```");
	if (indexD != -1){
		//console.log(content.substring(indexD));
		var re = /## Directory Hierarchy\n```([\s\S]*)```\n## Code Details/;
		var preDirectoryHierarchy = content.match(re);
		if(preDirectoryHierarchy!=null){
			//console.log(preDirectoryHierarchy);
			content = content.replace(preDirectoryHierarchy[0],"## Directory Hierarchy\n```\n"+DirectoryHierarchy+"```\n## Code Details");
		}
		console.log('over');
	}


    return content;
  }
}
