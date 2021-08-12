BaseCmds=function(cmd)
	shell=false
	check=false
	lan=Ip.LAN
	if cmd.len >= 2 then params=cmd[1:].join(" ") else params=false
	if Toggle.live==true and (cmd[0] == "sudo" or cmd[0] == "ssh") then return false//just copy paste and run. I modified this lin e
	if Toggle.live == true then
		if Objects["Shells"] == [] then
			print(Color(error)+"no shell objects stored...")
			return
		end if

		shell=objectParser(Objects["Shells"], lan)
	end if


	if Toggle.live == false then shell = get_shell
	if shell == false then
		return false
	end if
	if not shell.host_computer.File("/bin/"+cmd[0]) then return false
	if params==false and cmd[0] == "ls" then
		shell.launch("/bin/"+cmd[0], "/")
		return
	end if
	if params!=false then shell.launch("/bin/"+cmd[0], params) else shell.launch("/bin/"+cmd[0])
	return
end function


command["clear"]=function(cmd)
	clear_screen
end function

command["wipe"]=function(cmd)
	print(Alert("RECON WIPED")+Align("center")+Color(error)+"Press [ENTER] to Continue...")
	a = user_input(char(0))
	if Toggle.live == true then LogOverwrite()
	if a == "back" or a == "Back" or a == "b" or a == "B" then return
	get_shell.launch(program_path)
end function
command["-w"]=command["wipe"]


command["exit"]=function(cmd)
	if Toggle.live == true then
		print(Alert("GOING DARK CONFIRMED")+Align("center")+Color(orange)+"disconnecting from "+Color(red)+IP[-1]+End("color")+" ...")
	end if
	Toggle.live=false
	print(Alert("PROCESS ENDED"))
	wait(.5)
	exit("")
end function
command["-e"]=command["exit"]

command["file"]=function(cmd)
	self.init=function()
		if Objects["Files"]==[] and cmd.len == 2 and Toggle.live == true then
			print(Color(error)+" no file objects stored...")
			return false
		end if
		spacer="      -"
		lister=[Color(error)+spacer+"[file."+Color(white)+"read"+End("color")+"][/remote/file]", Color(error)+spacer+"[file."+Color(white)+"copy"+End("color")+"][/remote/file][OPT:/local/dir]", Color(error)+spacer+"[file."+Color(white)+"send"+End("color")+"][/local/file][/remote/dir]", Color(error)+spacer+"[file."+Color(white)+"remove"+End("color")+"][/remote/file]"]
		if cmd[0].split(".").len <= 1 or cmd[0].split(".").len > 2 then
			print(Color(error)+" USAGE: \n"+lister.join("\n"))
			return false
		end if
	end function
	if @self.init() == false then return

	second = cmd[0].split(".")[1]
	lan=Ip.LAN

	self["read"]=function()
		alt=false
		//comp=false

		first=cmd[0].split(".")[0]
		if cmd.len < 2 or (cmd.len > 2 and Toggle.live == true) then
			print(Color(error)+" USAGE: [file.read][/remote/file]")
			return
		end if
		if cmd.len >= 2 and Toggle.live == false then
			print(Color(error)+" must [GoLive] to use this command...")
			return
		end if


		params=cmd[1].values
		params.remove(0)
		params=params.join("")

		if Objects["Files"] == [] then
			print(Color(error)+" no file objects stored")
			return
		end if
		comp=fileNav(objectParser(Objects["Files"]), cmd[1])

		fileFunc = function()
			return comp
		end function

		if not fileFunc then
			print(Color(error)+" ("+Color(white)+cmd[1]+End("color")+"): file not found...")
			break
		end if

		if fileFunc.is_folder then
			print(Color(error)+" ("+Color(white)+fileFunc.path+End("color")+"): is a folder...")
			return
		end if
		if fileFunc.is_binary then
			print(Color(error)+" ("+Color(white)+fileFunc.path+End("color")+"): is a binary file...")
			return
		end if
		if not fileFunc.has_permission("r") then
			print(Color(error)+" permission denied...")
			return
		end if

		if @fileFunc.has_permission("r") then
			print(fileFunc.get_content)
			break
		end if

	end function
	self["rd"]=self["read"]

	self["copy"]=function()

		order=[]

		first=cmd[0].split(".")[0]
		if cmd.len < 2 then
			print(Color(error)+" USAGE: [file.copy][/remote/file][/local/dir]")
			return
		end if
		if cmd.len >= 2 and Toggle.live == false then
			print(Color(error)+" must [GoLive] to use this command...")
			return
		end if

		target=cmd[1]
		print("")

		shell=objectParser(Objects["Shells"])
		//shell=Objects["Shells"][0][1]
		file=fileNav(objectParser(Objects["Files"]), target)
		print(typeof(file))
		if not file then
			print(Color(error)+" ("+Color(white)+target+End("color")+"): file not found...")
			return
		end if
		if not cmd.hasIndex(2) then dest="/root" else dest=cmd[2]
		if not get_shell.host_computer.File(dest) then
			print(Color(error)+" ("+Color(white)+dest+End("color")+"): dir not found...")
			return
		end if
		if not get_shell.host_computer.File(dest).has_permission("w") then
			print(Color(error)+" ("+Color(white)+dest+End("color")+"): insufficient perms. choose a different local dir...")
			return
		end if

		shell.scp(target, cmd[2], get_shell)

	end function
	self["cp"]=self["copy"]

	self["send"]=function()

		order=[]

		first=cmd[0].split(".")[0]
		if cmd.len < 3 or cmd.len > 3 then
			print(Color(error)+" USAGE: [file.send][/local/file][/remote/dir]")
			return
		end if
		if cmd.len == 3 and Toggle.live == false then
			print(Color(error)+" must [GoLive] to use this command...")
			return
		end if

		local=cmd[1]
		remote=cmd[2]
		print("")

		shell=objectParser(Objects["Shells"])
		file=fileNav(objectParser(Objects["Files"]), remote, "dir")//adding the type dir spit's out a file with a folder's path

		if not file then
			print(Color(error)+" ("+Color(white)+remote+End("color")+"): dir not found...")
			return
		end if
		if not get_shell.host_computer.File(local) then
			print(Color(error)+" ("+Color(white)+local+End("color")+"): file not found...")
			return
		end if
		if not get_shell.host_computer.File(local).has_permission("w") then
			print(Color(error)+" ("+Color(white)+local+End("color")+"): insufficient perms. choose a different local dir...")
			return
		end if

		get_shell.scp(local, remote, shell)
	end function
	self["sd"]=self["send"]

	self["remove"]=function()
		if cmd.len < 2 or cmd.len > 3 then
			print(Color(error)+" USAGE: [file.remove][/remote/file][OPT:-dir]")
			return
		end if
		if cmd.len == 2 and Toggle.live == false then
			print(Color(error)+" must [GoLive] to use this command...")
			return
		end if
		dir = false
		if cmd.hasIndex(2) and cmd[2] != "-dir" then
			print(Color(error)+" USAGE: [file.remove][/remote/file][OPT:-dir]")
			return
		end if
		if cmd.hasIndex(2) then dir = cmd[2]

		remote=cmd[1]
		T={}
		if dir == false then T.file = fileNav(objectParser(Objects["Files"]), remote)
		if dir == "-dir" then T.file = fileNav(objectParser(Objects["Files"]), remote, "dir")

		if not T.file then
			print(Color(error)+"("+Color(white)+remote+End("color")+"): file not found")
			return
		end if
		if not T.file.has_permission("w") then
			print(Color(error)+" permission denied...")
			//return
		end if

		T.file.delete
	end function
	self["rm"]=self["remove"]


	if self.hasIndex(second) then
		self[second]()
	else
		print(Color(error)+"("+Color(white)+cmd[0]+End("color")+"): command not found...")
		return
	end if

end function

command["logs"]=function(cmd)
	second=cmd[0].split(".")[1]

	self["remove"]=function()
		if Toggle.live == true then
			LogOverwrite()
			print(Color(error)+" successfully corrupted target logs...")
		else
			print(Color(error)+"must [GoLive] to use this command...")
		end if
	end function
	self["rm"]=self["remove"]


	if self.hasIndex(second) then
		self[second]()
	else
		print(Color(error)+"("+Color(white)+cmd[0]+End("color")+"): command not found...")
		return
	end if
end function


command["dec"]=function(cmd)
	self.init=function()
		if cmd[0].split(".").len <= 1 or cmd[0].split(".").len > 2 then
			print(Color(error)+" USAGE: [dec.hash][hash][-dict|-crypto]")
			return false
		end if
	end function
	if not self.init() then return

	second=cmd[0].split(".")[1]
	self["hash"]=function()
		if cmd.len > 3 or cmd.len < 2 then
			print(Color(error)+" USAGE: [dec.hash][hash][-dict|-crypto]")
			return
		end if
		if cmd[1].split(":").len != 2 then
			print(Color(error)+" invalid hash...")
			return
		end if
		user=cmd[1].split(":")[0]
		hash=cmd[1].split(":")[1]

		if cmd.hasIndex(2) and (cmd[2] == "-dict" or cmd[2] == "-d") then
			for i in Global.dict.get_content.split("\n")
				if typeof(i.split("=")) != "list" then continue
				if i.split("=")[0] == hash then
					print(" password found! "+user+" => "+i.split("=")[1])
					return
				else
					continue
				end if
			end for
			print(Color(error)+" hash "+Color(white)+hash[0]+hash[1]+hash[2]+hash[3]+End("color")+"... not found in '/.AllTrue.dict'")
			return
		end if

		if not cmd.hasIndex(2) or (cmd.hasIndex(2) and cmd[2] == "-crypto" or cmd[2] == "-c") then
			print("")//helps with keeping prompt in sight
			key=crypto.decipher(hash)
			if typeof(key) != "string" then
				print(Color(error)+" invalid hash...")
				return
			end if
			line=hash+"="+key
			if Global.dict.get_content.split("\n").indexOf(line) == null then Global.dict.set_content(Global.dict.get_content+line+"\n")
			print("password found! "+user+" => "+key)
			return
		end if
	end function

	if self.hasIndex(second) then
		self[second]()
	else
		print(Color(error)+"("+Color(white)+cmd[0]+End("color")+"): command not found...")
		return
	end if
end function


command["target"]=function(cmd)
	self.init=function()
		spacer="      -"
		lister=[Color(error)+spacer+"[target."+Color(white)+"inject"+End("color")+"][Lan IP][-rshell|-trojan][OPT:-run]", Color(error)+spacer+"[target."+Color(white)+"purge"+End("color")+"][Lan IP]"]
		if cmd[0].split(".").len <= 1 or cmd[0].split(".").len > 2 then
			print(Color(error)+" USAGE: \n"+lister.join("\n"))
			return false
		end if
 	end function
	if not self.init() then return

	second=cmd[0].split(".")[1]
	lan=Ip.LAN

	self["purge"]=function()

		if cmd.len >= 1 and Toggle.live == false then
			print(Color(error)+" must [GoLive] to use this command...")
			return
		end if
		if cmd.len != 1 then
			print(Color(error)+" USAGE: [target.purge]")
			return
		end if

		//make this command delete everything
		file=objectParser(Objects["Files"], lan)

		if not file.has_permission("w") then
			print(Color(error)+" permission denied...")
			return
		end if
		for i in file.get_folders
			i.delete
		end for
		for i in file.get_files
			i.delete
		end for

		if not file.get_folders.len <= 3 then
			print(Color(error)+" folder purge failed...")
			print(Color(error)+" remaining folders: "+Color(white)+file.get_folders.len-3)
		else
			print(Color(error)+" folder purge successful...")
		end if

		if file.get_files.len != 0 then
			print(Color(error)+" file purge failed...")
			print(Color(error)+" remaining files: "+Color(white)+file.get_files.len)
		else
			print(Color(error)+" file purge successful...")
		end if
		return
	end function
	self["pu"]=self["purge"]

	self["lock"]=function()
		if cmd.len >= 1 and Toggle.live == false then
			print(Color(error)+" must [GoLive] to use this command...")
			return
		end if
		if cmd.len != 1 then
			print(Color(error)+" USAGE: [target.lock]")
			return
		end if


		remote=["/"]
		delfolders=["/home", "/boot", "/bin/cd"]
		print(Color(white)+"LOCKING: \n")
		all=fileNav(objectParser(Objects["Files"], lan), "/", "dir")
		all.chmod("u+wrx", 1)
		all.chmod("g+wrx", 1)
		all.chmod("o+wrx", 1)
		//first make everything moddable so u can go back through and lock shit up
		for name in remote
			file=fileNav(objectParser(Objects["Files"], lan), name, "dir")
			if not file then
				print(Color(error)+" ('"+Color(white)+name+End("color")+"'): file deleted...")
				continue
			else
				if not file.has_permission("w") then
					print(Color(error)+" ('"+Color(white)+name+End("color")+"'): permission denied ('w')...")
					continue
				end if
				a=file.chmod("u-wrx", 1)
				if a=="" then a=Color(white)+"success..." else a=Color(error)+"failed..."
				print(Color(error)+"'"+name+"' u-wrx: "+a)
				b=file.chmod("g-wrx", 1)
				if b=="" then b=Color(white)+"success..." else b=Color(error)+"failed..."
				print(Color(error)+"'"+name+"' g-wrx: "+b)
				c=file.chmod("o-wrx", 1)
				if c=="" then c=Color(white)+"success..." else c=Color(error)+"failed..."
				print(Color(error)+"'"+name+"' o-wrx: "+c)
			end if
		end for
		print("\n"+Color(white)+"DELETING: \n")
		for name in delfolders
			if name == delfolders[-1] then file=fileNav(objectParser(Objects["Files"], lan), name) else file=fileNav(objectParser(Objects["Files"], lan), name, "dir")
			if not file then
				print(Color(error)+"delete '"+name+"': file already deleted...")
				continue
			else
				fd=file.delete
				if fd=="" then fd=Color(white)+"success..." else fd=Color(error)+"failed..."
				print(Color(error)+"delete '"+name+"': "+fd)
			end if
		end for
		LogOverwrite()
		print(Color(error)+"corrupt 'system.log': "+Color(white)+"success...")
		//make this command delete boot so target can't login
	end function
	self["lo"]=self["lock"]

	notif=[]
	self["inject"]=function()

		if cmd.len > 1 and Toggle.live == false then
			print(Color(error)+" must [GoLive] to use this command...")
			return
		end if
		if cmd.len == 1 or not cmd.hasIndex(1) then
			print(Color(error)+" USAGE: [target.inject][-rshell|-trojan][OPT:-run]")
			return
		end if
		ports=get_router(get_shell.host_computer.public_ip).used_ports
		p=false
		for i in ports
			if i.port_number == 1222 then p=true
		end for

		type=cmd[1]
		if cmd.hasIndex(2) then last=cmd[2] else last = false

		if p == false and (type == "-rshell" or type=="-r") then
			print(Color(error)+" port '1222' not found on your machine...")
			return
		end if

		comp=objectParser(Objects["Computers"], lan)
		shell=objectParser(Objects["Shells"], lan)
		if shell == false then
			print(Color(error)+" no shell objects matching "+Color(white)+lan+End("color")+"...")
			return
		end if
		if shell == null then
			print(Color(error)+" no shell objects stored...")
			return
		end if
		if comp == false then
			print(Color(error)+" no computer objects matching "+Color(white)+lan+End("color")+"...")
			return
		end if
		if comp == null then
			print(Color(error)+" no computer objects stored...")
			return
		end if

		dir=false
		if dir == false and comp.File("/home/guest").has_permission("w") then
			dir=comp.File("/home/guest")
		end if
		if dir==false and comp.File("/").has_permission("w")  then
			dir=comp.File("/")
		end if
		if dir==false then
			print(Color(error)+" permission denied...")
			return
		end if
		//if type == "t" then return// chagne this to not equal in the future for proper error handling
		if type == "-rshell" and type == "-r" then
			print(Color(error)+" USAGE: [target.inject][Lan IP][-rshell|-trojan][OPT:-run]")
			return
		end if

		c = comp.touch(dir.path, ".AT"+type[1]+".src")
		if typeof(c) == "string" then
			print(Color(error)+" failed to create src file...")
			return
		end if
		srcFile=comp.File(dir.path+"/"+".AT"+type[1]+".src")

		//notif.push(Color(error)+" src file created...\n")
		//ended here...
		meta=comp.File(dir.path+"/metaxploit.so")
		if not meta then
			notif.push(Color(error)+"'metaxploit.so' not found...")
			get_shell.scp("/lib/metaxploit.so", dir.path, shell)
			meta=comp.File(dir.path+"/metaxploit.so")
			notif.push(Color(error)+"'metaxploit.so' sent...")
		end if
		if meta then notif.push(Color(error)+"'metaxploit.so' found...\n")
		if srcFile.path==dir.path+"/"+".ATr.src" then code = ["metax = include_lib("""+dir.path+"/.meta"")", "ip = """+get_shell.host_computer.public_ip+""" ", "metax.rshell_client(ip, 1222, ""crypto.so"")"]
		//if srcFile.path==dir.path+"/"+".ATt" then code = [""]
		//--instead put the trojan inside ur /root/AllTrue folder and make one of the params a password that only this script will know
		//--then send the trojan to target
		srcFile.set_content(srcFile.get_content+code.join("\n"))
		print(Color(error)+" src file written...\n")
		error_catch = shell.build(srcFile.path, dir.path)
		if error_catch then exit("Error: " + error_catch)
		binary=comp.File(dir.path+"/.AT"+cmd[1][1])


		meta.rename(".meta")
		notif.push(Color(error)+"'metaxploit.so' was hidden...\n")
		srcFile.delete
		notif.push(Color(error)+" src file was hidden...\n")
		if last == "-run" then
			a = shell.launch(binary.path)
			if a == false or a == 0 then
				binary.delete
				notif.push(Color(error)+" binary file was hidden...\n")
				notif.push(Color(error)+" failed to run '"+Color(white)+binary.path+End("color")+"'...\n")
				//LogOverwrite()
				//notif.push(Color(error)+" successfully corrupted target logs...")
				for i in notif
					wait(.2)
					print(i)
				end for
				return
			else
				binary.delete
				notif.push(Color(error)+" successfully ran '"+Color(white)+binary.path+End("color")+"'...\n")
				notif.push(Color(error)+" binary file was hidden...\n")
				//LogOverwrite()
				//notif.push(Color(error)+" successfully corrupted target logs...")
				for i in notif
					wait(.2)
					print(i)
				end for
				print("\n")
				print(Alert("COLLECTING RSHELLS"))
				ports=get_router(IP[-1]).used_ports
				if thePorts == [] then
					net = metax.net_use(IP[-1])
					execute(net, "rshell")
					return
				end if
				for i in ports
					if thePorts.indexOf(i.port_number) == null then continue
					net=metax.net_use(IP[-1], i.port_number)
					if not net then continue
					execute(net, i, "rshell")
				end for
				return
			end if
		end if

	end function
	self["inj"]=self["inject"]

	self["banking"]=function()
		if cmd.len >= 1 and Toggle.live == false then
			print(Color(error)+" must [GoLive] to use this command...")
			return
		end if
		if cmd.len > 1 then
			print(Color(error)+" USAGE: [target.bank]")
			return
		end if

		lan=Ip.LAN
		if Objects["Shells"]==[] then
			print(Color(error)+" no shell objects stored...")
			return
		end if
		shell=objectParser(Objects["Shells"], lan)
		target=shell.host_computer.File("/home/guest")
		if not target or (target and not target.has_permission("w")) then
			print(Color(error)+" permission denied...")
			return
		end if

		names=["AllTrueBanking", "recover.src", "clean.src", "bankres.txt", "bankgrab.txt", "banker.src"]

		for i in names
			if i == names[0] then
				get_shell.host_computer.create_folder("/root", names[0])
				continue
			end if
			get_shell.host_computer.touch("/root/"+names[0], i)
		end for


		recover=get_shell.host_computer.File("/root/AllTrueBanking/recover.src")
		clean=get_shell.host_computer.File("/root/AllTrueBanking/clean.src")
		compile=get_shell.host_computer.File("/root/AllTrueBanking/banker.src")

		recover.set_content(banker.join("\n"))
		clean.set_content(banker2.join("\n"))
		compile.set_content(compiler.join("\n"))

		x=get_shell.build("/root/AllTrueBanking/banker.src", "/root/AllTrueBanking")
		if x != "" then exit(x)
		//copy ATM and ATS to AllTrueBanking folder
		ATlist=["AllTrueSetup.src", "AllTrueMarkup.src"]
		for i in ATlist
			if not get_shell.host_computer.File("/root/AllTrueBanking/"+i) then
				get_shell.host_computer.File("/root/AllTrue/"+i).copy("/root/AllTrueBanking", i)
			end if
		end for
		//copy crypto.so and metax.so to AllTrueBanking
		libs=["crypto.so", "metaxploit.so"]
		for i in libs
			if not get_shell.host_computer.File("/root/AllTrueBanking/"+i) then
				get_shell.host_computer.File("/lib/"+i).copy("/root/AllTrueBanking", i)
			end if
		end for

		file=get_shell.host_computer.File("/root/AllTrueBanking")
		z=get_shell.scp(file.path, target.path, shell)
		if typeof(z) == "string" then
			print(Color(error)+" "+z)
			return
		end if
	end function
	self["bank"]=self["banking"]

	if self.hasIndex(second) then
		self[second]()
	else
		print(Color(error)+"("+Color(white)+cmd[0]+End("color")+"): command not found...")
		return
	end if
end function

command["run"]= function(cmd)
	lan=Ip.LAN
	params=false
	if not cmd.hasIndex(1) then
		print(Color(error)+" USAGE: [run][OPT:/local/file][OPT:/remote/file]")
		return
	end if
	target = cmd[1]
	if cmd.hasIndex(2) then
		params=cmd[2]
	end if
	if Objects["Shells"] == [] and Toggle.live == true then
		print(Color(error)+" no shell objects stored...")
		return
	end if
	if Objects["Files"] == [] and Toggle.live == true then
		print(Color(error)+" no file objects stored...")
		return
	end if
	if Toggle.live == true then shell=objectParser(Objects["Shells"], lan) else shell=get_shell
	if Toggle.live == true then file=fileNav(objectParser(Objects["Files"], lan), target) else file=get_shell.host_computer.File(target)

	if not file then
		print(Color(error)+" '"+Color(white)+target+End("color")+"' not found...")
		return
	end if
	if not file.has_permission("x") then
		print(Color(error)+" permission denied...")
		return
	end if
	if not file.is_binary then
		print(Color(error)+" file must be binary...")
		return
	end if
	if file.is_folder then
		//return
	end if
	if params != false then shell.launch(target, params) else shell.launch(target)


end function

command["-r"]=command["run"]
command["-R"]=command["run"]

command["shell"]=function(cmd)
	self.init=function()
		spacer="      -"
		lister=[Color(error)+spacer+"[shell."+Color(white)+"start"+End("color")+"][Lan IP]"]
		if cmd[0].split(".").len <= 1 or cmd[0].split(".").len > 2 then
			print(Color(error)+" USAGE: \n"+lister.join("\n"))
			return false
		end if
	end function
	if not self.init() then return

	second=cmd[0].split(".")[1]
	lan=Ip.LAN

	self["start"]=function()
		if cmd.len > 1 or cmd.len < 1 then
			print(Color(error)+" USAGE: [shell.start]")
			return
		end if
		if Toggle.live == false then
			print(Color(error)+" must [GoLive] to use this command...")
			return
		end if
		if Objects["Shells"]==[] then
			print(Color(error)+" no shell objects stored...")
			return
		end if

		shell=objectParser(Objects["Shells"], lan)//grabs relevant shell object
		if shell then
			print(Alert("TERMINAL PROCESS CONFIRMED")+Color(orange)+Align("center")+"connecting to "+Color(red)+IP[-1].replace(".", Color(blue)+"."+End("color"))+End("color")+"...")
			shell.start_terminal
		end if

		print(Color(error)+" connection failed...")
	end function
	self["go"]=self["start"]

	if self.hasIndex(second) then
		self[second]()
	else
		print(Color(error)+"("+Color(white)+cmd[0]+End("color")+"): command not found...")
		return
	end if
end function

command["comp"]=function(cmd)
	self.init=function()
		spacer="      -"
		lister=[Color(error)+spacer+"[comp."+Color(white)+"touch"+End("color")+"][/path/to/new/file][-dir]"]
		if cmd[0].split(".").len <= 1 or cmd[0].split(".").len > 2 then
			print(Color(error)+" USAGE: \n"+lister.join("\n"))
			return false
		end if
	end function
	if not self.init() then return

	second=cmd[0].split(".")[1]
	lan=Ip.LAN

	self["touch"]=function()
		if cmd.len < 2 or cmd.len > 3 then
			print(Color(error)+" USAGE: [comp.touch][/path/to/new/file][OPT:-dir]")
			return
		end if
		if cmd.len == 2 and Toggle.live == false then
			print(Color(error)+" must [GoLive] to use this command...")
			return
		end if
		dir = false
		if cmd.hasIndex(2) and cmd[2] != "-dir" then
			print(Color(error)+" USAGE: [comp.touch][/path/to/new/file][OPT:-dir]")
			return
		end if
		if cmd.hasIndex(2) then dir = cmd[2]

		remote=cmd[1]
		comp=objectParser(Objects["Computers"], lan)

		if remote.split("/")[:-1].join("/") == "" then b="/" else b=remote.split("/")[:-1].join("/")
		parent=comp.File(b)

		if not parent.has_permission("w") then
			print(Color(error)+" permission denied...")
			return
		end if

		if dir == false then
			a=comp.touch(parent.path, remote.split("/")[-1])
			print(remote.split("/")[-1])
			if a != true then
				print(Color(error)+" "+a)
				return
			end if
		end if
		if dir == "-dir" then
			a=comp.create_folder(parent.path, remote.split("/")[-1])
			print(remote.split("/")[-1])
			if a != true then
				print(Color(error)+" "+a)
				return
			end if
		end if

	end function

	if self.hasIndex(second) then
		self[second]()
	else
		print(Color(error)+"("+Color(white)+cmd[0]+End("color")+"): command not found...")
		return
	end if
end function


command["rshells"]=function(cmd)

	head=[]
	body=[]
	l=[]
	index=0
	if Objects["Rshells"] == [] then
		print(Color(error)+" no rshell objects stored...")
		return
	end if
	if typeof(Objects["Rshells"]) == "string" and Objects["Rshells"] == "error: rshell portforward is not configured correctly" then
		print(Color(error)+" "+Objects["Rshells"]+"...")
		return
	end if
	for shell in Objects["Rshells"]
		if not shell then continue
		//if not index then continue
		print(shell)
		print(typeof(shell.host_computer))
		home=shell.host_computer.File("/home")
		root=shell.host_computer.File("/root")
		l.push([[Color(orange)+b+"Shell ("+Color(red)+index+End("color")+")"], [Color(blue)+"User: "+Color(orange)+getUser(shell, home, root), Color(blue)+"Public IP: "+Color(orange)+shell.host_computer.public_ip, Color(blue)+"Local IP: "+Color(orange)+shell.host_computer.local_ip]])
		index=index+1
	end for
	for i in l
		head = i[0][0]
		body = i[1]
		body.push("")
		print(Head(head))
		print(Body(body))
		wait(.5)
	end for
	print(Color(error)+Size(11)+"  '[back]'")
	while true
		a=user_input(Color(blue)+"<"+u+b+Color(orange)+"SHELL"+End("color")+b2+u2+">"+Color(orange)+b+"$ "+End("color"))
		if a == "back" or a == "BACK" or a == "Back" or a == "b" or a == "B" or a == "" then break
		if typeof(a.to_int) == "string" or Objects["Rshells"].hasIndex(a.to_int) == false then continue

		shell=Objects["Rshells"][a.to_int]
		print(Alert("TERMINAL PROCESS CONFIRMED")+Color(orange)+Align("center")+"connecting to "+Color(red)+shell.host_computer.public_ip.replace(".", Color(blue)+"."+End("color"))+End("color")+"...\n")
		shell.start_terminal
	end while
end function

command["show"]=function(cmd)
  print(Color(error)+" coming soon...")
  return
	print(Ip.LANconfirm)
	print(Ip.LAN)
end function

command["sweep"]=function(cmd)
  print(Color(error)+" coming soon...")
  return
	if cmd.len < 2 or cmd.len > 2 or (cmd[1][0] != "-" and cmd[1][0] != "+" and cmd[1][0] != "0") then
		print(Color(error)+" USAGE: [sweep][OPT: -PORT|+PORT|0]")
		return
	end if
	ips=Sweep(cmd)
	print(ips.join("\n"))
end function
