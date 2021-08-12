Global={}
Toggle={}
Toggle.live=false
Toggle.okay=false
Toggle.passes=false
Toggle.secret=false
Toggle.earlyRun=false
Objects={}
Objects["Shells"]=[]
Objects["Computers"]=[]
Objects["Files"]=[]
Objects["Numbers"]=[]
Objects["Null"]=[]
Ip={}

Ip.LAN=false
Ip.LANconfirm=[]
thePorts=[]

ErrorCode="ATS"

Users=[]
Info=[]
Pass=[]
IP=[]
lanIpList=[]

metax=include_lib("/lib/metaxploit.so")
crypto=include_lib("/lib/crypto.so")

listOfSecrets = [Color(red)+"97 108 108 84 114 117 101", Color(red)+"61 6C 6C 54 72 75 65", Color(red)+"都是真的", Color(red)+"%126-%22637%32637%4217%52619%62617-%7267-" , Color(red)+"N / O / I / S / E", Color(red)+"Todo cierto", Color(red)+"Все правда", Color(red)+"Tutto vero"]

if active_user != "root" then exit(red+"***must run as root***")

if not metax then metax=include_lib(current_path+"/metaxploit.so")
if not crypto then crypto=include_lib(current_path+"/crypto.so")

if not metax then exit(red+"***missing METAXPLOIT library***")
if not crypto then exit(red+"***missing CRYPTO library***")
if metax.rshell_server == "error: service rhselld is not running" then Objects["Rshells"]= [] else Objects["Rshells"]= metax.rshell_server
//if program_path.split("/")[-1] != "allTrue" then get_shell.host_computer.File(program_path).move(program_path, "allTrue")

if not get_shell.host_computer.File("/root/AllTrue/.AllTrue.dict") then
	get_shell.host_computer.touch("/root/AllTrue", ".AllTrue.dict")
	Global.dict=get_shell.host_computer.File("/root/AllTrue/.AllTrue.dict")
	print(Color(blue)+"***file "+u+"/root/AllTrue/.AllTrue.dict"+u2+" created!***")
else
	Global.dict=get_shell.host_computer.File("/root/AllTrue/.AllTrue.dict")
end if

if not get_shell.host_computer.File("/root/AllTrue/.AllTrue.expl") then
	get_shell.host_computer.touch("/root/AllTrue", ".AllTrue.expl")
	Global.expl=get_shell.host_computer.File("/root/AllTrue/.AllTrue.expl")
	print(Color(blue)+"***file "+u+"/root/AllTrue/.AllTrue.expl"+u2+" created!***")
else
	Global.expl=get_shell.host_computer.File("/root/AllTrue/.AllTrue.expl")
end if

banker=["Toggle.done=false","LanList=[]","n=function()","  a=floor((rnd * 255) + 1)","  return a","end function","banker=get_shell.host_computer.File(program_path.split(""/"")[:-1].join(""/"")+""/bankgrab.txt"")","if not banker then get_shell.host_computer.touch(program_path.split(""/"")[:-1].join(""/""), ""bankgrab.txt"")","Parent=program_path.split(""/"")[:-1].join(""/"")","metax=include_lib(Parent+""/metaxploit.so"")","banker=get_shell.host_computer.File(Parent+""/bankgrab.txt"")","while true","  ip=[n,n,n,n].join(""."")","  if not is_valid_ip(ip) then continue","  if not get_router(ip) then continue","  if get_router(ip).used_ports.len == 0 then continue","  ports=get_router(ip).used_ports","  remove_repeats(banker)","  for p in ports","    if p.is_closed then continue","    net=metax.net_use(ip, p.port_number)","    if not net then continue","    Lib=net.dump_lib","  	print(red+ip+Color(orange)+"": "")","  	print(Color(blue)+""Scanning Target: ""+b+Color(orange)+Lib.lib_name+"" ""+Color(orange)+Lib.version+""\n"")","    LAN=p.get_lan_ip","    LanList.push(LAN)","    if Toggle.done == true and LAN==LanList[-1] then","      Toggle.done=false","      continue","    end if","  	Memories = metax.scan(Lib)","  	for memory in Memories","    if Toggle.done == true then","      Toggle.done=false","      break","    end if","  		results = metax.scan_address(Lib, memory)","  		List = []","  		line = results.split("" "")","  		for word in line","  			new_word = word.values","  			if word != ""overflow."" and word != ""source..."" and word != ""user."" and word.len > 2 then","  				if new_word[-1] == ""."" then","  					word = word.remove(""."")","  					word = word.remove(""<b>"")","  					word = word.remove(""</b>"")","  					List.push(word)","  				end if","  			end if","  		end for","  		for payload in List","  			result = Lib.overflow(memory, payload, ""1234"")","        if typeof(result) == ""null"" then continue","        if typeof(result) == ""number"" then continue","        print(Color(red)+ip+"": \n"")","        if typeof(result) == ""file"" then","          res=result","          root= res","          home= res","          main= result","          Users=[]","          info=[]","          while main.path!=""/""","            main=main.parent","          end while","          while root.path!=""/""","            root=root.parent","          end while","          while home.path!=""/""","            home=home.parent","          end while","          for i in root.get_folders","          if i.path == ""/root"" then","            root = i","            break","          end if","          end for","          for i in home.get_folders","            if i.path == ""/home"" then","              home = i","              if home then Users=home.get_folders","              break","            end if","          end for","          print(typeof(result)+"": ""+"" priveledges from ""+Color(orange)+getUser(main, home, root)+""..."")","          if Users==[] then continue","          for user in Users","            file=fileNav(main, ""/home/""+user.name+""/Config/Bank.txt"")","            if not file or file == null then continue","            if not file.has_permission(""r"") then continue","            info.push(file)","          end for","          if info.len == [] then continue","          for file in info","            content=file.get_content.split(""\n"").join(""\n"")","            banker.set_content(banker.get_content+content+""\n"")","            Toggle.done=true","            print(Color(white)+""INFO GRABBED!"")","          end for","          break","        end if","        if typeof(result) == ""computer"" then","          res=result","          main=res","          home=main.File(""/home"")","          root=main.File(""/root"")","          Users=[]","          info=[]","          if home then Users=home.get_folders","          if Users == [] then continue","          print(typeof(result)+"": ""+"" priveledges from ""+Color(orange)+getUser(main)+""..."")","          for user in Users","            file=res.File(""/home/""+user.name+""/Config/Bank.txt"")","            if not file or file == null then continue","            if not file.has_permission(""r"") then continue","            info.push(file)","          end for","          if info == [] then continue","          for file in info","            content=file.get_content.split(""\n"").join(""\n"")","            banker.set_content(banker.get_content+content+""\n"")","            Toggle.done=true","            print(Color(white)+""INFO GRABBED!"")","          end for","          break","        end if","        if typeof(result) == ""shell"" then","          res=result","          main=res.host_computer","          home=main.File(""/home"")","          root=main.File(""/root"")","          Users=[]","          info=[]","          if home then Users=home.get_folders","          if Users == [] then continue","          print(typeof(result)+"": ""+"" priveledges from ""+Color(orange)+getUser(main)+""..."")","          for user in Users","            file=main.File(""/home/""+user.name+""/Config/Bank.txt"")","            if not file or file == null then continue","            if not file.has_permission(""r"") then continue","            info.push(file)","          end for","          if info == [] then continue","          for file in info","            content=file.get_content.split(""\n"").join(""\n"")","            banker.set_content(banker.get_content+content+""\n"")","            Toggle.done=true","            print(Color(white)+""INFO GRABBED!"")","          end for","          break","        end if","      end for","      end for","  end for","end while"]
banker2=["crypto=include_lib(""/home/guest/AllTrueBanking/crypto.so"")","file=get_shell.host_computer.File(""/home/guest/AllTrueBanking/bankgrab.txt"")","if not file then exit(""<color=red>***'/home/guest/AllTrueBanking/bankgrab.txt' does not exist***"")","newfile=get_shell.host_computer.File(""/home/guest/AllTrueBanking/bankres.txt"")","if not newfile then get_shell.host_computer.touch(/home/guest/AllTrueBanking, ""bankres.txt"")","newfile=get_shell.host_computer.File(""/home/guest/AllTrueBanking/bankres.txt"")","for line in file.get_content.split(""\n"")","    if line == """""" then continue","    if not line.split("":"").hasIndex(1) then continue","    hash=line.split("":"")[1]","    key=crypto.decipher(hash)","    content=newfile.get_content.split(""\n"")","    if content.indexOf(line.split("":"")[0]+"" : ""+key) == null then newfile.set_content(newfile.get_content+line.split("":"")[0]+"" : ""+key+""\n"") else continue","end for"]
compiler=["import_code(""/home/guest/AllTrueBanking/AllTrueMarkup.src"")","import_code(""/home/guest/AllTrueBanking/AllTrueSetup.src"")", "a=user_input(Color(orange)+b+""[""+Color(blue)+""grab""+End(""color"")+""] OR [""+Color(blue)+""dec""+End(""color"")+""]: ""+Color(blue))", "if a == ""grab"" or a == ""Grab"" or a == ""g"" or a == ""G"" then", "	import_code(""/home/guest/AllTrueBanking/recover.src"")", "end if", "if a == ""dec"" or a == ""Dec"" or a == ""d"" or a == ""D"" then", "	import_code(""/home/guest/AllTrueBanking/clean.src"")", "end if"]



remove_repeats = function(file)
	if not file or file.get_content == "" then
	else
		lines = file.get_content.split("\n")
		lines_no_repeats = []
		for line in lines
			if line == "" then continue
			if lines_no_repeats.indexOf(line) == null then lines_no_repeats.push(line)
		end for
		file.set_content(lines_no_repeats.join("\n")+"\n")
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


getUser=function(object, Home=false, Root=false)
	hFound=true
	rFound=true
	userFolders=false
	root=false
	if typeof(object) == "shell" then
		userFolders=object.host_computer.File("/home")
		root=object.host_computer.File("/root")
		if userFolders then userFolders=userFolders.get_folders else hFound=false
		if not root then rFound=false
	end if
	if typeof(object) == "computer" then
		userFolders=object.File("/home")
		root=object.File("/root")
		if userFolders then userFolders=userFolders.get_folders else hFound=false
		if not root then rFound=false
	end if

	if typeof(object) == "file" then
		if not Root then rFound=false
		if not Home then hFound=false

		if Root then
			if Root.path == "/" then
				rFound=false
				root=Root
			end if
			if Root.path != "/" then root=Root
		end if

		if Home then
			if Home.path == "/" then
				hFound=false
				userFolders=Home.get_folders
			end if
			if Home.path != "/" then userFolders=Home.get_folders
		end if

		if not Home then userFolders=Home
		if not Root then root=Root
		//print("HOME: "+typeof(Home)+" : "+Home)
		//print("ROOT: "+typeof(Root)+" : "+Root)
	end if
	list=[]
	if hFound == false then list.push("unknown")
	if hFound == true then
		for user in userFolders
			//print("USER: "+typeof(user)+" : "+user)
			if user.path.split(".").len > 1 then continue//excludes hidden folders
			if user.has_permission("w") and user.has_permission("r") then list.push(user.name)
		end for
	end if

	if rFound == false then list.push("unknown")
	if rFound == true then
		if root.has_permission("w") and root.has_permission("r") then list.push("root")
	end if

	//print("list.indexOf('root'): "+list.indexOf("root"))
	if list.indexOf("root") != null then
		return "root"
	end if
	for i in list
		if i == "root" then continue
		if i == "guest" then continue
		if i == "unknown" then continue
		return i
	end for
	if list.indexOf("guest") != null then
		return "guest"
	end if
	if list.indexOf("unknown") != null then
		return "unknown"
	end if
end function

get_file = function(file, target)
	for f in file.get_files
		if file.path == "/" then thing = "/"+target else thing = file.path+"/"+target
		if f.path != thing then
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
				//print(error+"could not find dir ("+white+thing+end_color+")...")
				//return
			end if
			file = f
			break
		end if
	end for

	return file
end function

fileNav=function(file, target, type=false)
	if not file or typeof(file) != "file" or file.path != "/" then return false
	if typeof(target) != "string" then return false
	if target == file.path then return file
	info = target.split("/")
	for i in info
		if i == info[0] then continue
		if i == info[-1] then
			if type == "dir" then file = get_folder(file, i)
			if type == false then file = get_file(file, i)
		else
			file = get_folder(file, i)
		end if
	end for

	if typeof(file) != "file" then return false
	if file.path != target then return false
	//if file.path == "/" then return null
	return file
end function

//NOTICE: we were working with the error that shows up foir:
//file.send /root/pass /etc


execute=function(net, p=false, x=false)
	Lib=net.dump_lib
	print(red+IP[-1]+Color(orange)+": ")
	if p == false then lanIP = "router" else lanIP = p.get_lan_ip
	if lanIpList.indexOf(lanIP) != null then lanIpList.push(lanIP)
	print(Color(blue)+"Scanning Target: "+b+Color(orange)+Lib.lib_name+" "+Color(orange)+Lib.version+" "+Color(orange)+lanIP+"\n")
	if Ip.LANconfirm.indexOf(lanIP) == null then Ip.LANconfirm.push(lanIP)


	for i in Objects["Rshells"]
		if not typeof(i) == "shell" then continue
		if i.host_computer.public_ip == IP[-1] then
			Objects["Shells"].push([typeof(i), i, lanIP, getUser(i)])
			Objects["Computers"].push([typeof(i.host_computer), i.host_computer, lanIP, getUser(i.host_computer)])
			home=i.host_computer.File("/home")
			root=i.host_computer.File("/root")
			Objects["Files"].push([typeof(i.host_computer.File("/")), i.host_computer.File("/"), lanIP, getUser(i.host_computer.File("/"), home, root)])
			break
		end if
	end for

	if (Objects["Rshells"]!= [] and p=="rshell") or (Objects["Rshells"]!= [] and x=="rshell") then
		for i in Objects["Rshells"]
			if not typeof(i) == "shell" then continue
			if i.host_computer.local_ip == lanIP then
				Objects["Shells"].push([typeof(i), i, lanIP, getUser(i)])
				Objects["Computers"].push([typeof(i.host_computer), i.host_computer, lanIP, getUser(i.host_computer)])
				home=i.host_computer.File("/home")
				root=i.host_computer.File("/root")
				Objects["Files"].push([typeof(i.host_computer.File("/")), i.host_computer.File("/"), lanIP, getUser(i.host_computer.File("/"), home, root)])
			end if
		end for
		print(Alert("RSHELL COLLECTION CONFIRMED"))
		return
	end if
	if (Objects["Rshells"]== [] and p=="rshell") or (Objects["Rshells"]== [] and x=="rshell") then
		print(Alert("RSHELL COLLECTION FAILED"))
		return
	end if

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
			if typeof(result) == "number" then Objects["Numbers"].push([typeof(result), result, lanIP])
			if typeof(result) == "file" then
				res=result
				root= res
				home= res
				main= result
				//print("MAIN: "+typeof(main)+" : "+main)
				while main.path!="/"
					main=main.parent
				end while
				//print("ROOT: "+typeof(root)+" : "+root)
				while root.path!="/"
					root=root.parent
				end while
				while home.path!="/"
					home=home.parent
				end while

				for i in root.get_folders
				if i.path == "/root" then
					root = i
					break
				end if
				end for

				for i in home.get_folders
					if i.path == "/home" then
						home = i
						Users=home.get_folders
						break
					end if
				end for
				Objects["Files"].push([typeof(main), main, lanIP, getUser(main, home, root)])//check files

				if not home or home.path != "/home" then continue
				folders=home.get_folders
				for user in folders
					if user.name == "guest" and Users.len != folders.len then
						Users.push(user.name+" : "+lanIP)
						continue
					end if
					if Users.len != folders.len then Users.push(user.name+" : "+lanIP)

					bank=[fileNav(main, "/home/"+user.name+"/Config/Bank.txt"), Color(blue)+user.name+"'s Bank: "]
					mail=[fileNav(main, "/home/"+user.name+"/Config/Mail.txt"), Color(blue)+user.name+"'s Mail: "]
					config_lan=[fileNav(main, "/home/"+user.name+"/Config/ConfigLan.conf"), Color(blue)+user.name+"'s ConfigLan: "]
					browser=[fileNav(main, "/home/"+user.name+"/Config/Browser.txt"), Color(blue)+user.name+"'s Browser Info: "]
					MAP=[fileNav(main, "/home/"+user.name+"/Config/Map.conf"), Color(blue)+user.name+"'s ServerNetwork(map.exe): "]
					g = [bank,mail,config_lan,browser,MAP,Color(blue)+lanIP]
					gg = []
					for item in g
						if typeof(item) == "list" and (item[0] == false or item[0] == null) then continue
						gg.push(item)
					end for

					if Info.len > 0 then
						if Info.len != folders.len-1 and gg != [] and gg!=Info[-1] then Info.push(gg)
					else
						if Info.len != folders.len-1 and gg != [] then Info.push(gg)
					end if
					pass=fileNav(main, "/etc/passwd")
					if not pass then continue
					if pass.has_permission("r") and Toggle.passes==false then
						for line in pass.get_content.split("\n")
							if Pass.len == pass.get_content.split("\n").len then continue
							if not line.split(":").hasIndex(1) then continue
							if line.split(":")[0] == "root" and line.split(":")[1] ==  "827ccb0eea8a706c4c34a16891f84e7b" then
								Pass.push([line.split(":")[0]+":"+"12345", lanIP])
								continue
							else if line.split(":")[1] == "81dc9bdb52d04dc20036dbd8313ed055" then
								Pass.push([line.split(":")[0]+":"+"1234", lanIP])
								continue
							else
								Pass.push([line, lanIP])
								continue
							end if
						end for
						Toggle.passes= true
					end if
				end for


			end if

			if typeof(result) == "computer" then
				Objects["Computers"].push([typeof(result), result, lanIP, getUser(result)])//check computers
				home = result.File("/home")
				root = result.File("/root")
				file = result.File("/")
				//change root passwd to 12345
				if getUser(result) == "root" then result.change_password(getUser(result), "12345")
				Objects["Files"].push([typeof(file), file, lanIP, getUser(file, home, root)])//check files
				if not home then continue
				folders=home.get_folders
				for user in folders
					if user.name == "guest" and Users.len != folders.len then
						Users.push(user.name+" : "+lanIP)
						continue
					end if
					if Users.len != folders.len then Users.push(user.name+" : "+lanIP)
					bank=[result.File("/home/"+user.name+"/Config/Bank.txt"), Color(blue)+user.name+"'s Bank: "]
					mail=[result.File("/home/"+user.name+"/Config/Mail.txt"), Color(blue)+user.name+"'s Mail: "]
					config_lan=[result.File("/home/"+user.name+"/Config/ConfigLan.conf"), Color(blue)+user.name+"'s ConfigLan: "]
					browser=[result.File("/home/"+user.name+"/Config/Browser.txt"), Color(blue)+user.name+"'s Browser Info: "]
					MAP=[result.File("/home/"+user.name+"/Config/Map.conf"), Color(blue)+user.name+"'s ServerNetwork(map.exe): "]
					g = [bank,mail,config_lan,browser,MAP,Color(blue)+lanIP]
					gg = []
					for item in g
						if typeof(item) == "list" and (item[0] == false or item[0] == null) then continue
						gg.push(item)
					end for

					if Info.len > 0 then
						if Info.len != folders.len-1 and gg != [] and gg!=Info[-1] then Info.push(gg)
					else
						if Info.len != folders.len-1 and gg != [] then Info.push(gg)
					end if
					pass=result.File("/etc/passwd")
					if not pass then continue
					if pass.has_permission("r") and Toggle.passes==false then
						for line in pass.get_content.split("\n")
							if Pass.len == pass.get_content.split("\n").len then continue
							if not line.split(":").hasIndex(1) then continue
							if line.split(":")[0] == "root" and line.split(":")[1] ==  "827ccb0eea8a706c4c34a16891f84e7b" then
								Pass.push([line.split(":")[0]+":"+"12345", lanIP])
								continue
							else if line.split(":")[1] == "81dc9bdb52d04dc20036dbd8313ed055" then
								Pass.push([line.split(":")[0]+":"+"1234", lanIP])
								continue
							else
								Pass.push([line, lanIP])
								continue
							end if
						end for
						Toggle.passes=true
					end if
				end for
				//Users=remove_repeats_lists(Users)
			end if

			if typeof(result) == "shell" then
				Objects["Shells"].push([typeof(result), result, lanIP, getUser(result)])//check shells
				result2=result.host_computer
				home = result2.File("/home")
				root = result2.File("/root")

				//change root passwd to 12345
				if getUser(result) == "root" then result2.change_password(getUser(result), "12345")
				pCheck = result2.File("/etc/passwd")
				if pCheck then pCheck.chmod("o+rwx")
				//get root file objects:
				file = result2.File("/")
				Objects["Files"].push([typeof(file), file, lanIP, getUser(file, home, root)])//check files
				Objects["Computers"].push([typeof(result.host_computer), result.host_computer, lanIP, getUser(result.host_computer)])//check computers
				if not home then continue
				folders=home.get_folders
				for user in folders
					if user.name == "guest" and Users.len != folders.len then
						Users.push(user.name+" : "+lanIP)
						continue
					end if
					if Users.len != folders.len then Users.push(user.name+" : "+lanIP)
					bank=[result2.File("/home/"+user.name+"/Config/Bank.txt"), Color(blue)+user.name+"'s Bank: "]
					mail=[result2.File("/home/"+user.name+"/Config/Mail.txt"), Color(blue)+user.name+"'s Mail: "]
					config_lan=[result2.File("/home/"+user.name+"/Config/ConfigLan.conf"), Color(blue)+user.name+"'s ConfigLan: "]
					browser=[result2.File("/home/"+user.name+"/Config/Browser.txt"), Color(blue)+user.name+"'s Browser Info: "]
					map=[result2.File("/home/"+user.name+"/Config/Map.conf"), Color(blue)+user.name+"'s ServerNetwork(map.exe): "]
					g = [bank,mail,config_lan,browser,map,Color(blue)+lanIP]
					gg = []
					for item in g
						if typeof(item) == "list" and (item[0] == false or item[0] == null) then continue
						gg.push(item)
					end for

					if Info.len > 0 then
						if Info.len != folders.len-1 and gg != [] and gg!=Info[-1] then Info.push(gg)
					else
						if Info.len != folders.len-1 and gg != [] then Info.push(gg)
					end if

					pass=result2.File("/etc/passwd")
					if not pass then continue
					if pass.has_permission("r") and Toggle.passes==false then
						for line in pass.get_content.split("\n")
							if Pass.len == pass.get_content.split("\n").len then continue
							if not line.split(":").hasIndex(1) then continue
							if line.split(":")[0] == "root" and line.split(":")[1] ==  "827ccb0eea8a706c4c34a16891f84e7b" then
								Pass.push([line.split(":")[0]+":"+"12345", lanIP])
								continue
							else if line.split(":")[1] == "81dc9bdb52d04dc20036dbd8313ed055" then
								Pass.push([line.split(":")[0]+":"+"1234", lanIP])
								continue
							else
								Pass.push([line, lanIP])
								continue
							end if
						end for
						Toggle.passes= true
					end if
				end for
			end if
		end for
	end for
	//LogOverwrite()
	wait(1)
	clear_screen
end function

LogOverwrite=function()
	if Objects["Computers"]==[] and Toggle.live==true then return
	if Toggle.live == false then return

	for i in Objects["Computers"]
		comp=i[1]
		if not comp then continue
		comp.touch("/","AT.txt")
		if not comp.File("/AT.txt") then continue
		log = comp.File("/AT.txt")
		log.move("/var","system.log")
	end for

end function

objectParser=function(list, lan=false)
	c=false
	if typeof(lan) == "string" and lan.split(".").len != 4 then return false
	if list == [] then return null
	object=false
	if not lan then
		for i in list
			if i.indexOf("root") == null then continue
			object=i[1]
			//print(i[3])
			return object
		end for
	else
		for i in list
			if i.indexOf("root") == null and i.indexOf(lan) == null then continue
			object=i[1]
			//print(i[3])
			return object
		end for
	end if

	if not lan then
		for i in list
			if i.indexOf("root") != null then continue
			if i.indexOf("guest") != null then continue
			if i.indexOf("unknown") != null then continue
			object=i[1]
			//print(i[3])
			return object
		end for
	else
		for i in list
			if i.indexOf("root") == null and i.indexOf(lan) == null then continue
			if i.indexOf("guest") == null and i.indexOf(lan) == null then continue
			if i.indexOf("unknown") == null and i.indexOf(lan) == null then continue
			object=i[1]
			//print(i[3])
			return object
		end for
	end if

	if not lan then
		for i in list
			if i.indexOf("guest") == null and i.indexOf("unknown") == null then continue
			object=i[1]
			return object
		end for
	else
		for i in list
			if (i.indexOf("guest") == null and i.indexOf("unknown") == null) and i.indexOf(lan) == null then continue
			object=i[1]
			//print(i[3])
			return object
		end for
	end if

end function

Sweep=function(cmd)
	result=[]
	plus=[]
	minus=[]
	check=false
	n=function()
		a=floor((rnd * 255) + 1)
		return a
	end function
	port = cmd[1].values
	lead=port[0]
	Port=port[1:].join("")//gets rid of leading "-" or "+"
	Port=Port.split(",")//allows for multiple ports split by comma
	if lead == "+" then plus=Port
	if lead == "-" then minus=Port

	while true
		ip=[n,n,n,n].join(".")
		if not is_valid_ip(ip) then continue
		if is_lan_ip(ip) then continue
		if get_router(ip) == null then continue
		ports=get_router(ip).used_ports
		if lead == "0" and ports==[] then
			result.push(ip)
			print("CHECKING!!!")
			continue
		end if
		for i in ports

			if minus.hasIndex(i.port_number+"") then
				check=true
				break
			end if
			if plus.hasIndex(i.port_number+"") then
				check=null
				break
			end if
		end for
		if check==true then
			check=false
			continue
		end if
		if check==null then
			check=false
			result.push(ip)
			continue
		end if

		if result.len < 10 then continue else break
	end while

	return result
end function
