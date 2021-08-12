command={}
import_code("/root/AllTrue/AllTrueMarkup.src")
import_code("/root/AllTrue/AllTrueSetup.src")
import_code("/root/AllTrue/AllTrueBaseCmds.src")

if (params.hasIndex(0) and params[0] == "recon") and params.hasIndex(1) and (params[1].split(".").len == 4 or params[1].split(".").len == 3) then Toggle.earlyRun=true

command["secret"] = function(cmd)
	print(Head(b+"WHAT'S NOT TRUE?:"))
	print(Body(listOfSecrets, "custom"))
end function

command["N"]=function(cmd)
	if cmd != ["N", "/", "O", "/", "I", "/", "S", "/", "E"] then
		print(Color(error)+"("+Color(white)+cmd[0]+End("color")+"): command not found...")
		return
	end if
	l=[Color(error)+"---at a really loud concert---", Color(white)+"'That guy on bass...that's Todd.'", Color(white)+" 'I know!'", Color(white)+"'You know? Oh no...'"]
	print(Head(b+"THAT'S SOME LOUD MUSIC!: "))
	print(Body(l, "custom"))
end function

command["scott"]=function(cmd)
	if cmd[1] != "pilgrim" and cmd[1] != "Pilgrim" then
		print(Color(error)+"("+Color(white)+cmd[0]+End("color")+"): command not found...")
		return
	end if
	l=[Color(error)+"HINT: ", Color(white)+"   'seven "+Color(red)+b+"deadly"+b2+End("color")+" exes'"]
	print(Head(b+"YOU'RE SO CLOSE!: "))
	print(Body(l, "custom"))
end function
command["Scott"]=command["scott"]

command["xxxxxxx"]=function(cmd)
	if cmd != ["xxxxxxx"] and cmd != ["XXXXXXX"] then
		print(Color(error)+"("+Color(white)+cmd[0]+End("color")+"): command not found...")
		return
	end if
	l=["Mine: ", Color(white)+"x "+Color(error)+b+"= "+b2+Color(red)+"4", "", "Yours: ", Color(white)+"_ "+Color(error)+b+"_ "+Color(red)+"_"]
	Toggle.secret=true
	print(Head(b+"HOW MANY EXES DO YOU HAVE?: "))
	print(Body(l, "custom"))
end function
command["XXXXXXX"]=command["xxxxxxx"]

command["x"]=function(cmd)
	cmd=[cmd.join("")]

	if (cmd != ["x=0"] and Toggle.secret != true) and (cmd == ["x=0"] and Toggle.secret != true) and (cmd[0].values[:-1] != ["x", "="]) then
		print(Color(error)+"("+Color(white)+cmd[0].values[0]+End("color")+"): command not found...")
		Toggle.secret=false
		return
	end if
	if Toggle.secret != true then
		print(Color(error)+"("+Color(white)+cmd[0].values[0]+End("color")+"): command not found...")
		Toggle.secret=false
		return
	end if
	if typeof(cmd[0].values[2].to_int) != "number" or cmd[0].values.len > 3 then
		print(Color(error)+"("+Color(white)+cmd[0].values[0]+End("color")+"): command not found...")
		Toggle.secret=false
		return
	end if

	if cmd[0].values[:2] == ["x", "="] and (cmd[0].values[-1] != "0" and Toggle.secret == true) then
		l=[Color(white)+"This is what happens when you "+Color(red)+b+"lie"+b2+Color(error)+"...", ""]
		print(Head(b+"YOU LIED!: "))
		print(Body(l, "custom"))
		return
	end if
	l=[Color(error)+"'Right now you don't have any exes. Lemme give you some...'", "", Color(error)+"Yours: ", Color(white)+"x"+Color(error)+" ="+Color(red)+" 0 "+Color(error)+"+"+End("color")+" 20", "", Color(white)+"Scott's exes plus Your exes, equals?", ""]
	print(Head(b+"YOU GOT IT RIGHT!: "))
	print(Body(l, "custom"))
	Toggle.secret=false
end function

command["twenty-seven"]=function(cmd)
	l=[Color(white)+"https"+Color(error)+"://"+Color(red)+"www"+End("color")+"."+Color(red)+"youtube"+End("color")+"."+Color(red)+"com"+End("color")+"/"+Color(red)+"watch?v"+Color(error)+"="+Color(white)+"iik25wqIuFo", ""]
	print(Head(b+"CONGRATS: "))
	print(Body(l, "custom"))
end function
command["twenty seven"]=command["twenty-seven"]
command["twentyseven"]=command["twenty-seven"]


command["recon"] = function(cmd)

	port=null
	net=null
	//cmd is a list
	Ip.LANconfirm=[]
	IpLAN=false
	//usage:
	if not cmd.len > 1 then
		print(Color(blue)+"USAGE"+Color(blue)+":"+End("color")+" [recon][ip]{port}")
		return
	end if

	//Color(error) message

	if not is_valid_ip(cmd[1]) and nslookup(cmd[1]) == "Not found" then
		print(Color(error)+" invalid ip address or domain...")
		return
	end if

	if cmd[1].split(".").len == 4 then ip=cmd[1].to_int
	if cmd[1].split(".").len == 3 then ip=nslookup(cmd[1])
	//make it so that if cmd[2] isn't a valid port it throws an Color(error)
	if IP.len != 0 then get_shell.launch(program_path, cmd.join(" "))//keeps all data collection clean. pretty much artificial "wipe"
	IP.push(ip)
	if not get_shell.host_computer.is_network_active then
		print(Color(error)+"no internet access...")
		return
	end if

	router = get_router(ip)
	isLanIp = is_lan_ip(ip)
	//use this to collect the 'port' value
	if not isLanIp then
		ports = router.used_ports
	else
		ports = router.device_ports(ip)
	end if

	if cmd.hasIndex(2) and cmd[-1] == "-r" then
		net=metax.net_use(ip)
		if not net then return

		execute(net)

		clear_screen
		print(Alert("RECON COLLECTION CONFIRMED"))
		return
	end if

	if cmd.hasIndex(2) then
		slit=[]
		for p in ports
			if p.port_number == cmd[2].to_int and p.is_closed then
				print(Color(error)+"port is closed, connection failed...")
				return
			end if
			Net = "false"
			if p.port_number == cmd[2].to_int then
				port=cmd[2].to_int
				Net=metax.net_use(ip, port)
			end if

			if Net == "false" then
				continue
			end if

			if Net != "false" and not Net then
				print(Color(error)+Net+"...")
				return
			end if
			thePorts.push(p.port_number)
			execute(Net, p)
			clear_screen
			print(Alert("RECON COLLECTION CONFIRMED"))
			break
		end for

		if port==null then
			print(Color(error)+" invalid port...")
			return
		end if

		//check if the target has this port
	else if not cmd.hasIndex(2) then
		//show ports and ask for input
		slit=[]

		if ports.len == 0 then
			print(Color(error)+"no ports available, engaging router...")
			okay = true
			port=null
			net=metax.net_use(ip)
			execute(net)
			clear_screen
			print(Alert("RECON COLLECTION CONFIRMED"))
			return
		end if
		j = 0
		for p in ports
			if p.is_closed then
				if j != ports.len then
				else
					print(Color(error)+"no ports available, engaging router...")
					okay = true
					port=null
					net=metax.net_use(ip)
					thePorts.push(p.port_number)
					execute(net)
					clear_screen
					print(Alert("RECON COLLECTION CONFIRMED"))
					return
				end if
				j=j+1
			end if
			port = p.port_number

			net=metax.net_use(ip, port)
			if not net then continue

			if p.port_number == 25 then
				list = crypto.smtp_user_list(ip,port)
				for i in list
					if Users.len == [] then Users.push(i)
				end for
			end if
			thePorts.push(p.port_number)
			execute(net, p)
		end for
		clear_screen
		print(Alert("RECON COLLECTION CONFIRMED"))
	end if


end function

command["report"]=function(cmd)
	l=["Shells", "Computers", "Files", "Null", "Numbers"]
	list = []

	if IP != [] then print(b+Color(red)+IP[-1]+Color(orange)+": \n")
	for i in l
		string = Color(orange)+i+" ("+Color(red)+Objects[i].len+End("color")+")"
		print(Head(string))
		if i == "Null" or i == "Numbers" then continue
		if Objects[i] == [] then continue
		index=0
		for item in Objects[i]
			if item[3] == "root" then ending1=Color(red)+item[3]
			if item[3] != "root" and item[3] != "guest" and item[3] != "unknown" then ending1=Color("#32FF00")+item[3]
			if item[3] == "guest" then ending1=Color(error)+item[3]
			if item[3] == "unknown" then ending1=Color(error)+item[3]

			str= Color(blue)+index+Color(orange)+") "+End("color")+item[0]+Color(orange)+" : "+End("color")+item[2]+Color(orange)+" : "+End("color")+ending1
			list.push(str)
			index=index+1
		end for
		print(Body(list))
		list=[]
		wait(.5)
	end for
	print()
	print(Head(Color(orange)+"Info: ("+Color(red)+Info.len+End("color")+")"))
	list=[]
	for i in Info
		for item in i
			if typeof(item) == "string" then
				str=Color(orange)+"  -"+End("color")+End("color")+item
				list.push(str)
				continue
			end if

			if typeof(item) == "list" and item[0].has_permission("r") then ending = Color("#32FF00")+item[0] else ending = Color(red)+item[0]
			str=Color(blue)+i.indexOf(item)+Color(orange)+") "+End("color")+item[1]+Color(orange)+" : "+End("color")+ending
			list.push(str)
		end for
	end for
	if Info != [] then print(Body(list))
	print(Head(Color(orange)+"Users: ("+Color(red)+Users.len+End("color")+")"))
	list=[]
	for i in Users
		str = Color(blue)+Users.indexOf(i)+Color(orange)+") "+End("color")+i
		list.push(str)
	end for
	if Users != [] then print(Body(list))
	print(Head(Color(orange)+"Pass: ("+Color(red)+Pass.len+End("color")+")"))
	list=[]
	for i in Pass
		Name=i[0].split(":")[0]
		Key=i[0].split(":")[1]
		str = Color(blue)+Pass.indexOf(i)+Color(orange)+") "+End("color")+Name+Color(orange)+":"+End("color")+Key
		list.push(str)
		str=Color(orange)+"  -"+Color(blue)+i[1]
		list.push(str)
	end for
	if Pass != [] then print(Body(list))
end function



command["GoLive"]=function(cmd)
	if cmd.len < 2 then
		print(Color(error)+" USAGE: [GoLive][Lan IP]")
		return
	end if
	if cmd[1].split(".").len != 4 or not is_lan_ip(cmd[1]) then
		print(Color(error)+" invalid lan Ip...")
		return
	end if
	if IP == [] then
		print(Color(error)+" must choose a target: [recon][ip/domain][OPT:port/-r] ...")
		return
	end if
	if Toggle.live == true then
		print(Color(error)+" connection failed, already connected to a target...")
		return
	end if
	//Ip.LAN=true
	if Ip.LANconfirm.indexOf(cmd[1]) != null then Ip.LAN=cmd[1]
	if Ip.LAN==false then
		print(Color(error)+" invalid lan ip...")
		return
	end if
	Toggle.live=true
	//LogOverwrite()
	print(Alert("GOING LIVE CONFIRMED")+Align("center")+Color(orange)+"connecting to "+Color(red)+IP[-1].replace(".", Color(blue)+"."+End("color"))+End("color")+" ...")
end function
command["live"]=command["GoLive"]

command["GoDark"]=function(cmd)
	if Toggle.live != true then
		print(Color(error)+"disconnect failed, not connected to a target...")
		return
	end if
	if Toggle.live == true then Toggle.live = false
	LogOverwrite()
	print(Alert("GOING DARK CONFIRMED")+Align("center")+Color(orange)+"disconnecting from "+Color(red)+IP[-1].replace(".", Color(blue)+"."+End("color"))+End("color")+" ...")
end function
command["dark"]=command["GoDark"]
command["-dc"]=command["GoDark"]

command["sudo"]=function(cmd)
	lan=Ip.LAN

	if cmd.len > 2 or cmd.len < 2 then
		print(Color(error)+" USAGE: [sudo][-s|-u]")
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
	if cmd.hasIndex(1) and cmd[1] == "-s" then
		print(Color(error)+Size(11)+"['back']")
		pass=user_input("Password: ",1)
		if pass=="back" or pass=="BACK" or pass=="Back" then return


		shell=objectParser(Objects["Shells"], lan)//grabs relevant shell object
		newShell=shell("root", pass)
		print(newShell)
		print(typeof(newShell))
		return
		if typeof(newShell)=="shell" then
			Objects["Shells"].push([typeof(newShell), newShell, newShell.host_computer.local_ip, getUser(newShell)])
			Objects["Computers"].push([typeof(newShell.host_computer), newShell.host_computer, newShell.host_computer.local_ip, getUser(newShell.host_computer)])
			file=newShell.host_computer.File("/")
			FILE=file
			root=FILE
			home=FILE
			for i in root.get_folders
				if i.path == "/root" then
					root=i
					break
				end if
			end for
			for i in home.get_folders
				if i.path == "/home" then
					home=i
					break
				end if
			end for
			//add same for home var
			Objects["Files"].push([typeof(file), file, newShell.host_computer.local_ip, getUser(FILE, home, root)])
		end if
		if typeof(newShell)!="shell" then
			print(Color(error)+" sudo: incorrect password")
			return
		end if
	end if

	if cmd.hasIndex(1) and cmd[1] == "-u" then
		print(Color(error)+Size(11)+"['back']")
		user=user_input("User: ")
		if user=="back" or user=="BACK" or user=="Back" then return
		pass=user_input("Password: ",1)
		if pass=="back" or pass=="BACK" or pass=="Back" then return


		shell=objectParser(Objects["Shells"], lan)
		newShell=shell(user, pass)
		if typeof(newShell)=="shell" then
			Objects["Shells"].push([typeof(newShell), newShell, newShell.host_computer.local_ip, getUser(newShell)])
			Objects["Computers"].push([typeof(newShell.host_computer), newShell.host_computer, newShell.host_computer.local_ip, getUser(newShell.host_computer)])
			file=newShell.host_computer.File("/")
			FILE=file
			root=FILE
			home=FILE
			for i in root.get_folders
				if i.path == "/root" then
					root=i
					break
				end if
			end for
			for i in home.get_folders
				if i.path == "/home" then
					home=i
					break
				end if
			end for
			//add same for home var
			Objects["Files"].push([typeof(file), file, newShell.host_computer.local_ip, getUser(FILE, home, root)])
		end if
		if typeof(newShell)!="shell" then
			print(Color(error)+" sudo: incorrect username or password")
			return
		end if
	end if

end function

command["help"]=function(cmd)
	Item={}
	names=["Auxiliary", "Attack", "Object Handling", "Base Cmds"]
	item["Auxiliary"]=[[Color(error)+" USAGE: ["+Color(white)+"recon"+End("color")+"][IP|DOMAIN][OPT:port]"+End("color"), Color(error)+"-"+Color(white)+"scans targets for vulns and collects objects"+End("color")+"."+End("color"), ["none"]], [Color(error)+" USAGE: ["+Color(white)+"recon"+End("color")+"][IP|DOMAIN][OPT:port]"+End("color"), Color(error)+"-"+Color(white)+"lists formatted content containing objects and further info"+End("color")+"."+End("color"), ["none"]], [Color(error)+" USAGE: ["+Color(white)+"rshells"+End("color")+"]"+End("color"), Color(error)+"-"+Color(white)+"shows all active reverse shells"+End("color")+"."+End("color"), ["none"]]]
	item["Attack"]=[[Color(error)+" USAGE: [target."+Color(white)+"inject"+End("color")+"][Lan IP][-rshell|-trojan][OPT:-run]"+End("color"), Color(error)+"-"+Color(white)+"injects target with a malicious rshell or trojan script."+End("color")+"."+End("color"), ["target.inj"]],  [Color(error)+" USAGE: [target."+Color(white)+"purge"+End("color")+"][Lan IP]"+End("color"), Color(error)+"-"+Color(white)+"deletes all writable folders from the target's pc. be careful"+End("color")+"!"+End("color"), ["target.pu"]],  [Color(error)+" USAGE: [target."+Color(white)+"lock"+End("color")+"][Lan IP]"+End("color"), Color(error)+"-"+Color(white)+"deletes '/boot' from target's pc. locks them out while you still have access"+End("color")+"."+End("color"), ["target.lo"]]]
	item["Object Handling"]=[[Color(error)+" USAGE: [file."+Color(white)+"read"+End("color")+"][/remote/file]"+End("color"), Color(error)+"-"+Color(white)+"reads content of specified remote file"+End("color")+"."+End("color"), ["file.rd"]],  [Color(error)+" USAGE: [file."+Color(white)+"copy"+End("color")+"][/remote/file][OPT:/local/dir]"+End("color"), Color(error)+"-"+Color(white)+"copies specified remote file from target"+End("color")+"."+End("color"), ["file.cp"]],  [Color(error)+" USAGE: [file."+Color(white)+"send"+End("color")+"][/local/file][/remote/dir]"+End("color"), Color(error)+"-"+Color(white)+"sends a specified local file to target"+End("color")+"."+End("color"), ["file.sd"]],  [Color(error)+" USAGE: [file."+Color(white)+"remove"+End("color")+"][/remote/file]"+End("color"), Color(error)+"-"+Color(white)+"deletes a specified remote file from target"+End("color")+"."+End("color"), ["file.rm"]],  [Color(error)+" USAGE: [shell."+Color(white)+"start"+End("color")+"][Lan IP]"+End("color"), Color(error)+"-"+Color(white)+"description"+End("color")+"."+End("color"), ["shell.go"]],  [Color(error)+" USAGE: ["+Color(white)+"cmds"+End("color")+"][OPTION]"+End("color"), Color(error)+"-"+Color(white)+"description"+End("color")+"."+End("color"), ["none"]],  [Color(error)+" USAGE: ["+Color(white)+"cmds"+End("color")+"][OPTION]"+End("color"), Color(error)+"-"+Color(white)+"description"+End("color")+"."+End("color"), ["none"]],  [Color(error)+" USAGE: ["+Color(white)+"cmds"+End("color")+"][OPTION]"+End("color"), Color(error)+"-"+Color(white)+"description"+End("color")+"."+End("color"), ["none"]],  [Color(error)+" USAGE: ["+Color(white)+"cmds"+End("color")+"][OPTION]"+End("color"), Color(error)+"-"+Color(white)+"description"+End("color")+"."+End("color"), ["none"]],  [Color(error)+" USAGE: ["+Color(white)+"cmds"+End("color")+"][OPTION]"+End("color"), Color(error)+"-"+Color(white)+"description"+End("color")+"."+End("color"), ["none"]]]
	item["Base Cmds"]=[[Color(error)+" EXAMPLE: ["+Color(white)+"ls"+End("color")+"][OPT:-la][params]"+End("color"), Color(error)+"-"+Color(white)+"basically, you can run any script inside of your '/bin' dir through this script."+End("color")+"."+End("color"), ["none"]],  [Color(error)+" USAGE: ["+Color(white)+"run"+End("color")+"][/path/to/script]"+End("color"), Color(error)+"-"+Color(white)+"run any script that's outside of the '/bin' dir"+End("color")+"."+End("color"), ["-r"]],  [Color(error)+" USAGE: ["+Color(white)+"sweep"+End("color")+"][OPT:+port|-port]"+End("color"), Color(error)+"-"+Color(white)+"provides ten random Public IP's. include or exclude ports with '+port' or '-port'"+End("color")+"."+End("color"), ["none"]],  [Color(error)+" USAGE: ["+Color(white)+"GoLive"+End("color")+"]"+End("color"), Color(error)+"-"+Color(white)+"after collecting ["+Color(white)+"recon"+End("color")+"], must run to use Attack commands"+End("color")+"."+End("color"), ["live"]],  [Color(error)+" USAGE: ["+Color(white)+"GoDark"+End("color")+"]"+End("color"), Color(error)+"-"+Color(white)+"must run to use '/bin' and ["+Color(white)+"run"+End("color")+"] commands"+End("color")+"."+End("color"), ["dark", "-dc"]], [Color(error)+" USAGE: ["+Color(white)+"wipe"+End("color")+"]"+End("color"), Color(error)+"-"+Color(white)+"wipes objects data from ["+Color(white)+"report"+End("color")+"]. if "+Color(white)+"GoLive"+End("color")+" is active, then this command will clear victim's logs, ["+Color(white)+"GoDark"+End("color")+"], and then wipe object data."+End("color")+"."+End("color"), ["none"]], [Color(error)+" USAGE: ["+Color(white)+"clear"+End("color")+"]"+End("color"), Color(error)+"-"+Color(white)+"clear text from terminal"+End("color")+"."+End("color"), ["none"]], [Color(error)+" USAGE: ["+Color(white)+"exit"+End("color")+"]"+End("color"), Color(error)+"-"+Color(white)+"description"+End("color")+"."+End("color"), ["none"]], [Color(error)+" USAGE: ["+Color(white)+"cmds"+End("color")+"][OPTION]"+End("color"), Color(error)+"-"+Color(white)+"description"+End("color")+"."+End("color"), ["none"]]]
end function


while true
	if Toggle.live==true then prompt="\n"+Color(blue)+"<"+u+Color(orange)+b+"TERMINAL"+End("color")+Color(blue)+"-"+Color(red)+IP[-1]+End("color")+u2+b2+">"+Color(orange)+b+"$ "+Color(blue) else prompt="\n"+Color(blue)+"<"+u+Color(orange)+b+"TERMINAL"+End("color")+u2+Color(blue)+b2+">"+Color(orange)+b+"$ "+Color(blue)
	if Toggle.secret==true then prompt="\n"+Color(blue)+"<"+u+Color(red)+b+"XXXXXXX"+End("color")+u2+b2+">"+Color(orange)+b+"$ "+Color(blue)
	if Toggle.secret==false and Toggle.live== false then prompt="\n"+Color(blue)+"<"+u+Color(orange)+b+"TERMINAL"+End("color")+u2+Color(blue)+b2+">"+Color(orange)+b+"$ "+Color(blue)
	if Toggle.earlyRun == true then
		print(prompt+params.join(" ")+"\n")
		command["recon"](params)
		Toggle.earlyRun=false
		continue
	end if
	cmd=user_input(prompt).split(" ")


	if cmd == [""] then continue
	if cmd[0].split(".").len == 2 then
		if command.hasIndex(cmd[0].split(".")[0]) then
			command[cmd[0].split(".")[0]](cmd)
			continue
		end if
	end if
	if BaseCmds(cmd) != false then continue
	if not command.hasIndex(cmd[0]) then
		print(Color(error)+"("+Color(white)+cmd[0]+End("color")+"): command not found...")
		continue
	end if
	command[cmd[0]](cmd)
	//LogOverwrite()
end while

//after fixing sudo (√), fix "report" command. the problem is the processing time it's taking up. prolly has sumn to do with coloring username
//-RESOLVED: shortened processing time by replacing two for loops inside of the Body() function. also put  wait(.5) line in the "report" command

//incorperate local ips in in sudo
//-RESOLVED:
//--incorperated lan IP's into Users, Pass, and Info through execute()
//--incorperated lan IP's into the live sudo command. both tags "-u" and "-s" are working properly

//edit execute function to grab info, users, and pass from typeof(file) section
//-RESOLVED:
//--copy and pasted code from 'typeof(computer) == "computer"'  section and replaced file objects with legit files using the fileNav(file, target) function

//incorperate /root/.Alltrue.dict in "dec.hash" command
//-RESOLVED:
//--I successfully incorperated /root/.Alltrue.dict into the "dec" command
//--I started off by moving the .dict and .expl files into the /root/AllTrue dir.

//in execute make it so that if the object belongs to a "root" then change the pass to 12345 so theres no similarity beteen root and user
//-RESOLVED:
//I completed this task
//BUG: an absurd amount of passwords will be added to the Pass list.
//-RESOLVED:

// target.inject rshell and trojan feature. add a '-run' tag to specify if the file injected should be ran in one go
//-RESOLVED:

//add a target.purge feature
//-RESOLVED: goes through folders and files in then '/' dir and deletes anything it has perms to.
//BUG: make sure to change all perms for '/' dir to +wrx so u can properly delete everything in one go.
  
//add a target.lock feature
//-RESOLVED: this locks victim's pc by changing perms for everything making pc unusable from any other user except root.
//also deletes '/home', '/boot', and '/bin/cd' command, this makes it more of a headache for victim.
  
//make a target.purge that deletes everything
//make a target.lock that deletes /boot to lock user out from their pc
//-RESOLVED:

//incorperate Lan Ip options into Objects Handling commands (file.,target., etc)
//TIP: incorperating a lan ip system into GoLive command might make this easier
//-RESOLVED:

//make a command called shell.start that connects to target
//-RESOLVED:

//make a command called rshells that lists and connect u to your active rshells
//-RESOLVED:

//add a comp.touch command
//-RESOLVED:

//create a script that updates crypto and meta
//make it so that recon wipes all info if you run it multiple times w/o wiping.
//add a change password feature
//incorperate expl file into execute function and recon command
//--make sure to add null objects and number objects to the AllTrue.expl file.
//--make sure to add lib and lib version info to the AllTrue.expl file

//check how everything works on router hack
