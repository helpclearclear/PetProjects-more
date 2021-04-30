Global={}
okay=false
Objects={}
Objects["Shells"]=[]
Objects["Computers"]=[]
Objects["Files"]=[]
Objects["Numbers"]=[]
Objects["Null"]=[]
Users=[]
Info=[]
Pass=[]
IP=[]

color1="<color=#FF00CD>"
color2="<color=#FF9225>"
color3="<color=#2581FF>"
error="<color=#878787>"
white="<color=white>"
end_color="</color>"
red="<color=red>"
b="<b>"
u="<u>"
b2="</b>"
u2="</u>"
center="<align=center>"
metax=include_lib("/lib/metaxploit.so")
crypto=include_lib("/lib/crypto.so")

if not metax then metax=include_lib(current_path+"/metaxploit.so")
if not crypto then crypto=include_lib(current_path+"/crypto.so")

if not metax then exit(red+"***missing METAXPLOIT library***")
if not crypto then exit(red+"***missing CRYPTO library***")

if active_user != "root" then exit(red+"***Must run as root***")

if not get_shell.host_computer.File("/root/.AllTrue.dict") then
	get_shell.host_computer.touch("/root", ".AllTrue.dict")
	Global.dict=get_shell.host_computer.File("/root/.AllTrue.dict")
	print(color3+"***file "+u+"/root/.AllTrue.dict"+u2+" created!***")
else
	Global.dict=get_shell.host_computer.File("/root/.AllTrue.dict")
end if

if not get_shell.host_computer.File("/root/.AllTrue.expl") then
	get_shell.host_computer.touch("/root", ".AllTrue.expl")
	Global.expl=get_shell.host_computer.File("/root/.AllTrue.expl")
	print(color3+"***file "+u+"/root/.AllTrue.expl"+u2+" created!***")
else
	Global.expl=get_shell.host_computer.File("/root/.AllTrue.expl")
end if



remove_repeats = function(file)
	if not file or file.get_content == "" then
	else
		lines = file.get_content.split("\n")
		lines_no_repeats = []
		for line in lines
			if line == "" then continue
			if lines_no_repeats.indexOf(line) == null then lines_no_repeats.push(line)
		end for
		file.set_content(lines_no_repeats.join("\n"))
	end if
end function

remove_repeats_lists = function(list)
	if list==[] then
	else
		lines_no_repeats = []
		for line in list
			if lines_no_repeats.indexOf(line) == null then lines_no_repeats.push(line)
		end for
		return lines_no_repeats
	end if
end function

execute = function(net)
	Lib=net.dump_lib
	print(red+IP[-1]+color2+": ")
	print(color3+"Searching for vulns. Target Library: "+color1+Lib.lib_name+" "+color2+Lib.version+"\n")
	Memories = metax.scan(Lib)
	
	for memory in Memories
		results = metax.scan_address(Lib, memory)
		List = []
		line = results.split(" ")
		for word in line
			new_word = word.values
			if word != "overflow." and word != "source..." and word != "user." and word.len > 2 then
				if new_word[-1] == "." then
					word = word.remove(".")
					word = word.remove("<b>")
					word = word.remove("</b>")
					List.push(word)
				end if
			end if
		end for
		
		for payload in List
			result = Lib.overflow(memory, payload, "1234")
			
			statement=typeof(result)+"/"+Lib.lib_name+"/"+memory+"/"+payload
			Global.expl.set_content(Global.expl.get_content+statement+"\n")
			check=remove_repeats(Global.expl)
			
			if typeof(result) == "null" then Objects["Null"].push([typeof(result), Lib.lib_name, memory, payload])
			if typeof(result) == "number" then Objects["Numbers"].push(result)
			if typeof(result) == "file" then 
				while result.path!="/"
					result=result.parent
				end while
				
				Objects["Files"].push(result)
			end if
			
			if typeof(result) == "computer" then
				Objects["Computers"].push([typeof(result), result])
				home = result.File("/home")
				root = result.File("/root")
				if not root.has_permission("r") or (not home or not home.has_permission("r")) then continue
				folders=home.get_folders
				for user in folders
					Users.push(user.name)
					bank=result.File("/home/"+user.name+"/Config/Bank.txt")
					mail=result.File("/home/"+user.name+"/Config/Mail.txt")
					config_lan=result.File("/home/"+user.name+"/Config/ConfigLan.conf")
					browser=result.File("/home/"+user.name+"/Config/Browser.txt")
					map=result.File("/home/"+user.name+"/Config/Map.conf")
					if Info.len != folders.len then Info.push([bank,mail,config_lan,browser,map,user.name])
					pass=result.File("/etc/passwd")
					if pass.has_permission("r") then 
						if pass.get_content=="" and Pass.len < 1 then 
							Pass.push(null) 
						else if pass.get_content!="" and Pass.len < 1 then 
							for line in pass.get_content.split("\n")
								if not line.split(":").hasIndex(1) then continue
								if line.split(":")[1] == "81dc9bdb52d04dc20036dbd8313ed055" then Pass.push(line.split(":")[0]+":"+"1234") else Pass.push(line) 
							end for
						end if
					end if
				end for
				Users=remove_repeats_lists(Users)
			end if
			
			if typeof(result) == "shell" then 
				Objects["Shells"].push([typeof(result), result])
				result2=result.host_computer
				home = result2.File("/home")
				root = result2.File("/root")
				if not root.has_permission("r") or (not home or not home.has_permission("r")) then continue
				folders=home.get_folders
				for user in folders
					Users.push(user.name)
					
					bank=result2.File("/home/"+user.name+"/Config/Bank.txt")
					mail=result2.File("/home/"+user.name+"/Config/Mail.txt")
					config_lan=result2.File("/home/"+user.name+"/Config/ConfigLan.conf")
					browser=result2.File("/home/"+user.name+"/Config/Browser.txt")
					map=result2.File("/home/"+user.name+"/Config/Map.conf")
					if Info.len != folders.len then Info.push([bank,mail,config_lan,browser,map,user.name])
					pass=result2.File("/etc/passwd")
					if pass.has_permission("r") then 
						if pass.get_content=="" and Pass.len < 1 then 
							Pass.push(null) 
						else if pass.get_content!="" and Pass.len < 1 then 
							for line in pass.get_content.split("\n")
								if not line.split(":").hasIndex(1) then continue
								if line.split(":")[1] == "81dc9bdb52d04dc20036dbd8313ed055" then Pass.push(line.split(":")[0]+":"+"1234") else Pass.push(line) 
							end for
						end if
					end if
				end for
				Users=remove_repeats_lists(Users)
			end if
		end for
	end for
	wait(1)
	clear_screen
	wait(1)
	print("<align=center>"+color2+"***"+b+"RECON COLLECTION CONFIRMED"+color2+b2+"***")
	print(Objects)
	print(Users)
	print(Pass)
	print(Info)
end function

command={}

command["clear"] = function(cmd)
	clear_screen
end function


command["file.read"] = function(cmd)
	if cmd.len == 1 then print(error+b+color1+"USAGE"+color3+":"+end_color+" [file.read][file(0)]")
	
	get_file = function(file, target)
		for f in file.get_files
			if f.path != file.path+"/"+target then
				continue
			else
				file = f
				break
			end if
		end for
		
		return file
	end function
	
	get_folder = function(file, target)
		
		for f in file.get_folders
			if file.path == "/" then thing = "/"+target else thing = file.path+"/"+target
			if f.path != thing then
				continue
			else
				if file.is_folder and typeof(file) == "null" then
					print(error+"could not find dir ("+white+thing+end_color+")...")
					return
				end if
				file = f
				break
			end if
		end for
		return file
	end function
	
	file = Objects["Files"][0]
	
	
	info = cmd[1].split("/")
	for i in info
		if i == info[0] then continue
		if i == info[-1] then
			file = get_file(file, i)
		else
			file = get_folder(file, i)
		end if
	end for
	
	if file.path == "/" and cmd[1] != "/" then 
		print(error+"could not find ("+white+cmd[1]+end_color+")...")
		return
	end if
	print(file.get_content)
end function

command["file.write"] = function(cmd)
	if cmd.len == 1 then print(error+b+color1+"USAGE"+color3+":"+end_color+" [file.write][file(0)]")
	get_file = function(file, target)
		for f in file.get_files
			if f.path != file.path+"/"+target then
				continue
			else
				file = f
				break
			end if
		end for
		
		return file
	end function
	
	get_folder = function(file, target)
		
		for f in file.get_folders
			if file.path == "/" then thing = "/"+target else thing = file.path+"/"+target
			if f.path != thing then
				continue
			else
				if file.is_folder and typeof(file) == "null" then
					print(error+"could not find dir ("+white+thing+end_color+")...")
					return
				end if
				file = f
				break
			end if
		end for
		return file
	end function
	
	file = Objects["Files"][0]
	
	
	info = cmd[1].split("/")
	for i in info
		if i == info[0] then continue
		if i == info[-1] then
			file = get_file(file, i)
		else
			file = get_folder(file, i)
		end if
	end for
	
	if file.path == "/" and cmd[1] != "/" then 
		print(error+"could not find ("+white+cmd[1]+end_color+")...")
		return
	end if
	
	file.set_content
end function

command["file.copy"] = function(cmd)
	if Objects["Files"].len == 0 then 
		print(error+"no file objects stored...")
		return
	end if
	if Objects["Shells"].len == 0 then
		print(error+"no shell objects stored...")
		return
	end if
	
	if cmd.len == 1 or not cmd.len > 1 then print(error+b+color1+"USAGE"+color3+":"+end_color+" [file.copy][/path]")
	if cmd.len == 3 then dest = cmd[-1]
	if cmd.len == 2 then dest = current_path
	
	get_file = function(file, target)
		for f in file.get_files
			if f.path != file.path+"/"+target then
				continue
			else
				file = f
				break
			end if
		end for
		
		return file
	end function
	
	get_folder = function(file, target)
		
		for f in file.get_folders
			if file.path == "/" then thing = "/"+target else thing = file.path+"/"+target
			if f.path != thing then
				continue
			else
				if file.is_folder and typeof(file) == "null" then
					print(error+"could not find dir ("+white+thing+end_color+")...")
					return
				end if
				file = f
				break
			end if
		end for
		return file
	end function
	
	file = Objects["Files"][0]
	
	
	info = cmd[1].split("/")
	for i in info
		if i == info[0] then continue
		if i == info[-1] then
			file = get_file(file, i)
		else
			file = get_folder(file, i)
		end if
	end for
	
	if file.path == "/" and cmd[1] != "/" then 
		print(error+"could not find ("+white+cmd[1]+end_color+")...")
		return
	end if
	shell = Objects["Shells"][0][1]
	t = shell.scp(file.path, dest, get_shell)
	//do proper orig file with null dest
	if t == cmd[-1]+" not found" then 
		print(error+"could not find destination ("+white+dest+end_color+")...")
		wait(.5) 
		print(error+"switching destination to current path...")
		wait(.5)
		t = shell.scp(file.path, current_path, get_shell)
	end if
	
end function


command["report"] = function(cmd)
	print(red+IP[-1]+color2+": \n")
	print(center+color1+b+"Shells: ("+Objects["Shells"].len+")\n")
	a=-1
	line = center+color2+b+"&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
	print(line)
	for item in Objects["Shells"]
		a=a+1
		print(center+color2+b+a+") "+color3+item[1])
	end for
	print(line)
	print(center+color1+b+"Computers: ("+Objects["Computers"].len+")\n")
	print(line)
	a=-1
	for item in Objects["Computers"]
		a=a+1
		print(center+color2+b+a+") "+color3+item[1])
	end for
	print(line)
	print(center+color1+b+"Files: ("+Objects["Files"].len+")\n")
	print(line)
	a=-1
	for item in Objects["Files"]
		a=a+1
		print(center+b+red+a+" root"+color2+": "+color3+item.name+white+" | "+color2+"Perms: "+color3+item.permissions)
	end for
	print(line)
	print(center+color1+b+"Numbers: ("+Objects["Numbers"].len+")\n")
	print(line)
	a=-1
	for item in Objects["Numbers"]
		a=a+1
		print(center+b+color2+a+")"+color1+" ["+color3+item+color1+"]")
	end for
	print(line)
	print(center+color1+b+"Nulls: ("+Objects["Null"].len+")\n")
	print(line)
	a=-1
	for item in Objects["Null"]
		a=a+1
		print(center+b+color2+a+") "+color1+"["+color3+item[0]+color1+","+color3+item[1]+color1+","+color3+item[2]+color1+","+color3+item[-1]+color1+"]")
	end for
	print(center+color2+b+"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&") 
	print(center+color1+b+u+"INFO")
	a=-1
	c=-1
	for item in Info
		for i in Info
			c=c+1
			for item in i
				if typeof(item) == "null" then continue
				if typeof(item) == "string" then continue
				a=a+1
				print(center+color2+b+a+") "+color3+item.path.split("/")[2]+"-"+item.path.split("/")[-1]+color2+": \n"+center+b+color1+item.get_content.split("\n").join("\n"))
				print(line)
			end for
		end for
	end for
	print(center+color2+b+"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&") 
	print(center+color1+b+u+"PASS")
	
	for item in Pass
		print(line)
		print(center+color3+b+item)
		print(line)
	end for
	print(center+color2+b+"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&") 
end function

command["wipe"] = function(cmd)
	script = get_shell.launch(program_path)
end function

command["decipher"] = function(cmd)
	if cmd.hasIndex(1) and cmd[1].split(":").len == 2 then
		string = cmd[1]
		p = crypto.decipher(string.split(":")[1])
		wait(2)
		clear_screen
		wait(.5)
		print(center+b+color2+"User: "+color3+string.split(":")[0]+"\n"+center+b+color2+"Key: "+color3+p)
	end if
	
	if cmd.hasIndex(1) and cmd[1].split(":").len == 1 then 
		list=[]
		check = false
		for string in Pass
			user = string.split(":")[0]
			if cmd[1] == user then 
				if string.split(":")[1] == "1234" then key = "1234" else key = crypto.decipher(string.split(":")[1])
				wait(2)
				clear_screen
				wait(.5)
				print(center+b+color2+"User: "+color3+user+"\n"+center+b+color2+"Key: "+color3+key)
				check = true
			end if
		end for
		if check == false then 
			print(error+"password for user ("+white+cmd[1]+end_color+") not found...")
			return
		end if
		
	end if
	
	if not cmd.hasIndex(1) then
		list = []
		if Pass.len == 0 then 
			print(error+"no passwords stored...")
			return
		end if
		
		for string in Pass
			user=string.split(":")[0]
			if string.split(":")[1] == "1234" then key = "1234" else key = crypto.decipher(string.split(":")[1])
			list.push([user, key])
		end for
		wait(2)
		clear_screen
		wait(.5)
		for key in list
			print(center+color2+"################")
			print(center+b+color2+"User: "+color3+key[0]+"\n"+center+b+color2+"Key: "+color3+key[1])
		end for
		print(center+color2+"################")
	end if
	
end function


command["recon"] = function(cmd)
	port=null
	net=null
	//cmd is a list
	
	//usage:
	if not cmd.len > 1 then 
		print(color1+"USAGE"+color3+":"+end_color+" [recon][ip]{port}")
		return
	end if
	
	//error message
	
	if not is_valid_ip(cmd[1]) and nslookup(cmd[1]) == "Not found" then
		print(error+"invalid ip address or domain...")
		return
	end if
	
	if cmd[1].split(".").len == 4 then ip=cmd[1].to_int
	if cmd[1].split(".").len == 3 then ip=nslookup(cmd[1])
	//make it so that if cmd[2] isn't a valid port it throws an error
	IP.push(ip)
	if not get_shell.host_computer.is_network_active then
		print(error+"no internet access...")
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
	
	if cmd.hasIndex(2) then
		slit=[]
		for p in ports
			if p.port_number == cmd[2].to_int then 
				port=cmd[2].to_int
				okay = true
				break
			end if
		end for
		
		if port==null then
			print(error+"invalid port...")
			return
		end if
		
		//check if the target has this port
	else if not cmd.hasIndex(2) then
		//show ports and ask for input
		slit=[]
		
		if ports.len == 0 then 
			print(error+"no ports avaiable, engaging router...")
			okay = true
			port=null
			net=metax.net_use(ip)
			execute(net)
		end if
		
		for p in ports
			if p.is_closed then continue
			port = p.port_number
			net=metax.net_use(ip, port)
			if not net then 
				print(error+"connection failed...")
				continue
			end if
			execute(net)
			//end of for p in ports
		end for
	end if
	
	
end function

command["shell.connect"] = function(cmd)
	a=-1
	if Objects["Shells"].len == 0 then
		print(error+"no shell objects stored...")
		return
	end if
	
	for item in Objects["Shells"]
		a=a+1
		print(center+b+color2+a+") "+color3+item[1])
	end for
	a=user_input(color2+"index: "+color3)
	while not Objects["Shells"].hasIndex(a)
		a=user_input(color2+"index: "+color3)
		print("")
	end while
	wait(.5)
	clear_screen
	print(center+color3+b+"connecting to"+red+IP+end_color+"...")
	print("")
	Objects["Shells"][a.to_int].start_terminal
end function


while true
	cmd=user_input("\n"+color1+"<"+u+color2+b+"TERMINAL"+end_color+u2+color1+b2+">"+color2+b+"$ "+color3).split(" ")
	if command.hasIndex(cmd[0]) then
		command[cmd[0]](cmd)
	end if
	if not command.hasIndex(cmd[0]) then
		print(error+"("+white+cmd[0]+end_color+"): command not found...")
	end if	
end while
//add function to manipulate objects
//fine tune recon
//add to file.write
