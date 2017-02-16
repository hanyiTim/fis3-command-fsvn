exports.name="fsvn";
exports.desc="svn 配置信息";
exports.options={
	'-h --help':"帮助信息",
	'-n <name>':'设置svn用户名',
	'-p <password>':'设置svn密码',
	'-s':'显示信息'
};

var setvar=function(key,value){
    var file=fis.project.getTempPath()+"/server/svnconfig.json";
    if(!fis.util.isFile(file)){
        fis.util.write(file,"");
    }
    var svnjson=fis.util.read(file);
    try {
        svnjson = JSON.parse(svnjson);
    }
    catch(e){
        svnjson={};
    }
    if(key=="show"){
        return svnjson;
    }

    svnjson[key]=value;
    fis.util.write(file,JSON.stringify(svnjson));
};
exports.run = function(argv, cli) {
  // 如果输入为 fis3 foo -h
  // 或者 fis3 foo --help
  // 则输出帮助信息。
  if (argv.h || argv.help) {
    return cli.help(exports.name, exports.options);
  }
  if(argv.n){
  	setvar("name",argv.n);
  	console.log("set name success");
  }
  if(argv.p){
  	setvar("password",argv.p);
  	console.log("set password success");
  }
  if(argv.s){
    var cc_obj=setvar("show");
  	if(cc_obj.name){
      console.log("svn name:",cc_obj.name);
    }else{
      console.log("svn name is not found");
    }
    if(cc_obj.password){
      console.log("svn password:",cc_obj.password);
    }
    else{
      console.log("svn password is not found");
    }
  }
};