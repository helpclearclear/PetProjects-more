global = {}
porter = []
stilts = []
import = []
users2 = []
file_list = []
servers = []
result_list = []
R = null
P = null
person = null
action = null
BANK = []
MAIL = []
divit = []
quiet = false
kk = false
List = []
if params.len == 1 and (params[0] == "-q" or params[0] == "--quiet") then
	quiet = true
else
	quiet = false
end if
if not active_user == "root" then exit("<color=red>***Must run as root!***")
if program_path.split("/")[-1] != "msf7" then exit("<color=red>***File name must be '<color=white><b>msf7</b></color>'!***")
secure = true
num = null
old = false
none = false
record = true
gateway = get_shell.host_computer.network_gateway
lhost = gateway
rhost = "<color=red>none<color=orange> (DFLT)<color=white>"
lport = 1222+"<color=orange> (DFLT)<color=white>"
rport = 8080+"<color=orange> (DFLT)<color=white>"
metax = include_lib("/lib/metaxploit.so")
extension = null
method = null
okay = false
sin = false
not_found = false
pass = false
net = false
q = false
proof = false
type = null
memory = null
value = null
db5 = get_shell.connect_service("23.233.19.26", 22, "root", "Tang1")
l = [db5]
red = "<color=red>"
white = "<color=white>"
file_version = "1.0.0"
if quiet == false then
	imgA = white+"_"+red+"/\/\"+white+"______"+red+"/\/\"+white+"____"+red+"/\/\/\/\/\"+white+"__"+red+"/\/\/\/\/\/\"+white+"__"+red+"/\/\/\/\/\/\"+white+"_\n"+white+"_"+red+"/\/\/\"+white+"__"+red+"/\/\/\"+white+"__"+red+"/\/\"+white+"__________"+red+"/\/\"+white+"________________"+red+"/\/\"+white+"___\n"+white+"_"+red+"/\/\/\/\/\/\/\"+white+"____"+red+"/\/\/\/\"+white+"____"+red+"/\/\/\/\/\"+white+"________"+red+"/\/\"+white+"_____\n"+white+"_"+red+"/\/\"+white+"__"+red+"/\"+white+"__"+red+"/\/\"+white+"__________"+red+"/\/\"+white+"__"+red+"/\/\"+white+"____________"+red+"/\/\"+white+"_______\n"+white+"_"+red+"/\/\"+white+"______"+red+"/\/\"+white+"__"+red+"/\/\/\/\/\"+white+"____"+red+"/\/\"+white+"__________"+red+"/\/\"+white+"_________\n"+white+"___________________________________________"+red+"/\/\"+white+"_____"+file_version+"\n\n"+white+"Written by "+red+"<b>\_\_\_yes_/_/_/</b><color=#B4AFAD>#<b>"+white+"1353</b>\n"
	imgB = red+"                     ___  _______ \n"+red+"                   /'___\"+red+"/\_____ '\\n  "+red+"___ ___     ____"+white+"/"+red+"\ \"+white+"__/"+red+"\/____/'_/'\n"+white+"/"+red+"' __` __`\  /',__"+white+"\ "+red+"\ ,__\   /'_/' \n"+white+"/"+red+"\ \"+white+"/"+red+"\ \"+white+"/"+red+"\ \"+white+"/"+red+"\__, `"+white+"\ "+red+"\ \"+white+"_/ "+red+"/' /'   \n"+white+"\ "+red+"\_\ \_\ \_\"+white+"/"+red+"\____/"+white+"\ "+red+"\_\ /\_/   \n "+white+"\/_/\/_/\/_/\/___/  \/_/ "+red+"\//  v"+white+file_version+"\n\n"+white+"Written by "+red+"<b>\_\_\_yes_/_/_/</b><color=#B4AFAD>#<b>"+white+"1353</b>\n"
	print(imgB)
end if
num = 0
global.e_db = get_shell.host_computer.File("/home/.exploit_db")
dict = get_shell.host_computer.File("/home/.dictionary.txt")
Version = get_shell.host_computer.File("/home/.version")
mail = get_shell.host_computer.File("/root/MAIL.DB")
bank = get_shell.host_computer.File("/root/BANK.DB")
if not mail then
	get_shell.host_computer.touch("/root", "MAIL.DB")
	mail = get_shell.host_computer.File("/root/MAIL.DB")
end if
if not bank then
	get_shell.host_computer.touch("/root", "BANK.DB")
	bank = get_shell.host_computer.File("/root/BANK.DB")
end if
if not typeof(Version) == "file" then
	get_shell.host_computer.touch("/home", ".version")
	Version = get_shell.host_computer.File("/home/.version")
	Version.set_content(file_version)
	print("<color=purple>***VERSION FOUND***")
	print("<color=purple>***<color=#DB6CF3>Note: for the best colorful experience, make sure your</color>***<color=#DB6CF3> terminal text colour is not similar to one of the following:</color>\n<color=#B2B2B5>--<color=yellow>yellow\n<color=#B2B2B5>--<color=orange>orange\n<color=#B2B2B5>--<color=red>red\n<color=#B2B2B5>--<color=blue>blue\n<color=#B2B2B5>--<color=white>white")
else
	if Version.get_content.split(".").join("").to_int != file_version.split(".").join("").to_int then
		Version.set_content(file_version)
		wait(1)
		clear_screen
		print("<color=red>Welcome to <color=white><b><u>msf7</b></u></color> v<color=white>"+file_version+"</color>!")
		wait(1)
		//be sure to end text in ach index with a '.'
		changes = ["Change one.", "Change two.", "Change three.", "Change four."]
		print("<color=white><u><color=red>CHANGES</color></u><color=red>: ")
		for item in changes
			print("<color=red>--<color=white>"+item)
			wait(.5)
		end for
		a = user_input("<color=red>Press [<color=white>ENTER</color>] to continue: ")
		if a == "" then
			wait(1)
			clear_screen
			print("<color=yellow>                      :INITATING PROCESS:")
			wait(1)
			clear_screen
			print("<color=yellow>                     ::INITATING PROCESS::")
			wait(1)
			clear_screen
			print("<color=yellow>                    :::INITATING PROCESS:::")
			wait(1)
			clear_screen
			
		end if
		while a != ""
			a = user_input("<color=red>Press [<color=white>ENTER</color>] to continue: ")
		end while
	end if
end if

if not typeof(global.e_db) == "file" then
	get_shell.host_computer.touch("/home", ".exploit_db")
	global.e_db = get_shell.host_computer.File("/home/.exploit_db")
	print("<color=purple>***DB CALIBRATED***")
end if
if not typeof(dict) == "file" then
	get_shell.host_computer.touch("/home", ".dictionary.txt")
	dict = get_shell.host_computer.File("/home/.dictionary.txt")
	print("<color=purple>***DICTIONARY CALIBRATED***")
	print("<color=yellow>***/home/.dictionary.txt is empty!***")
end if
//check for repeats
remove_repeats = function(string)
	if not string or string.get_content == "" then
	else
		lines = string.get_content.split("\n")
		lines_no_repeats = []
		for line in lines
			if lines_no_repeats.indexOf(line) == null then lines_no_repeats.push(line)
		end for
		string.set_content(lines_no_repeats.join("\n"))
		//return lines_no_repeats.join("\n")
	end if
end function
Content = remove_repeats(global.e_db)
Content = remove_repeats(dict)

okay = false

metaxploit = include_lib("/lib/metaxploit.so")
crypto = include_lib("/lib/crypto.so")
if not crypto then exit("you don't have crypto.so in your /lib dir")
if not metaxploit then exit("you don't have metaxploit.so in your /lib dir")
HandleResult = function(result, method, payload)
	q = true
	for i in range(1, 2)
		result = Lib.overflow(memory, payload, "1234")//changes password to '1234'
		if typeof(result) == "null" then
			print("<color=white>[<color=red>"+payload+"</color>] <color=red>unknown")
		else
			if typeof(result) == "shell" then
				if typeof(result) == "shell" then
					if typeof(extension) != "null" then
						print("<color=purple>Note: your loaded files will be sent to the '/home/guest' dir.")
						for file in file_list
							get_shell.scp(file.path, "/home/guest", result)
							if file.path.split("/")[-1] == "MetaConnect" then file.delete
						end for
						connect = user_input("<color=green>Open Shell? (y/n): ")
						if connect == "y" then result.start_terminal
					end if
					
					if typeof(extension) == "null" then
						print("<color=yellow>Could not send loaded files...")
						connect = user_input("<color=green>Open Shell? (y/n): ")
						clear_screen
						computer = result.host_computer
						if connect == "y" then result.start_terminal
					end if
				end if
			end if
			
			if typeof(result) == "computer" then
				print("<color=white>[<color=red>"+payload+"</color>] <color=red>computer")
				statement = "computer/"+Lib.lib_name+"/"+memory+"/"+payload
				global.e_db.set_content(global.e_db.get_content+statement+"\n")
				Content = remove_repeats(global.e_db)
				manual = result.File("/usr/bin/Manual.exe")
				metaaa = result.File("/lib/metaxploit.so")
				if not manual and not metaaa then a = "a" else print("<color=orange>The target is likely a Player!")
				if okay == true then
					print("<color=white>"+R+" ==> "+P)
					continue
				end if
				passwd = result.File("/etc/passwd")
				if not passwd then
					print("<color=yellow>Password File Not Compromised!")
				end if
				if passwd then
					print("<color=orange>Password File Compromised!")
					if passwd.has_permission("r") then
						print("<color=orange>--decipher attempt succeeded!\n")
						lines = passwd.get_content.split("\n")
						root = lines[0]
						root = root.split(":")
						wait(.5)
						for line in lines
							line = line.split(":")
							pass = root[1]
							if pass == md5(line[1]) then 
								R = root[0]
								P = line[1]
								okay = true
								print("<color=white>"+R+" ==> "+P)
								continue
							end if
						end for
						if not opt.hasIndex(2) then
							for line in lines
								line = line.split(":")
								pass = root[1]
								if pass == md5(line[1]) then 
									R = root[0]
									P = line[1]
									okay = true
									print("<color=white>"+R+" ==> "+P)
									break
								end if
							end for
							if okay == true then continue
							password = crypto.decipher(root[1])
							print("<color=white>"+root[0]+" ==> "+password)
							R = root[0]
							P = password
							okay = true
							dict = get_shell.host_computer.File("/home/.dictionary.txt")
							dict.set_content(dict.get_content+password+"\n")
							print("<color=purple>***Sent to /home/.dictionary.txt***")
							Content = remove_repeats(dict)
						end if
					end if
					if not passwd.has_permission("r") then
						print("<color=yellow>--decipher attempt failed...")
					end if
				end if
				dict = get_shell.host_computer.File("/home/.dictionary.txt")
			end if
			
			if typeof(result) == "number" then
				print("<color=white>[<color=red>"+payload+"</color>] <color=red>number")
				okay = false
				sin = true
				statement = "number/"+Lib.lib_name+"/"+memory+"/"+payload
				global.e_db.set_content(global.e_db.get_content+statement+"\n")
				Content = remove_repeats(global.e_db)
			end if
			
			if typeof(result) == "file" then
				print("<color=white>[<color=red>"+payload+"</color>] <color=red>file")
				statement = "file/"+Lib.lib_name+"/"+memory+"/"+payload
				global.e_db.set_content(global.e_db.get_content+statement+"\n")
				Content = remove_repeats(global.e_db)
				files = result.get_files
				folders = result.get_folders
				for file in files
					if file.path.split("/")[1] == "bin" and files.len > 15 and files.len != 35 then 
						print("<color=red>PARENT: <color=white>/"+file.path.split("/")[1]+"</color> ***Too Long. Irregular Content***") 
					else if file.path.split("/")[1] == "bin" and files.len == 35 then 
						print("<color=red>PARENT: <color=white>/"+file.path.split("/")[1]+"</color> ***Too Long. Usual Content***")
						print("<color=orange>***Likely a server or npc!***")
					else if file.path.split("/")[1] == "bin" and files.len > 35 then
						print("<color=red>PARENT: <color=white>/"+file.path.split("/")[1]+"</color> ***Too Long. Very irregular Content***")
						print("<color=orange>***Likely a server or npc!***")
					else
						print("<color=red>PARENT: <color=white>/"+file.path.split("/")[1])
					end if
					break
				end for
				
				
				cap = []
				for file in files
					no = file.path.split("/")[1]
					if no == "bin" then continue
					perms = "perms"
					thing1 = "true"
					thing2 = "false"
					a = "<color=white>[<color=red>"+file.owner+" "+file.name+" "+perms+" "+thing1+"</color>]"
					b = "<color=white>[<color=red>"+file.owner+" "+file.name+" "+perms+" "+thing2+"</color>]"
					
					if file.has_permission("r") then
						cap.push(a)
					end if
					
					if not file.has_permission("r") then
						cap.push(b)
					end if
				end for
				cap = ""+cap.join("\n")
				print(format_columns(cap))
			end if
		end if
	end for
	print("<color=purple>[+] Exploit completed session was created.")
	print("<color=green>:::PROCESS ENDED:::")
end function


nmap = function()
	x = 0
	
	while true
		global.opt = user_input("<color=white><u>msf7></u> ")
		if okay == true then
			okay = false
		end if
		opt = global.opt.split(" ")
		
		if opt == [""] and opt.len == 1 then
			continue
		end if
		
		if opt[0] == "wordlist" and opt.len == 1 then
			print("<color=blue>--------------------------------------------------------------"+"\n"+"<color=green>*<color=blue>[<color=white>wordlist<color=blue>] <color=blue>[<color=white>string<color=blue>/<color=white>/path/to/file<color=blue>] : <color=white>add to your wordlist<color=blue>/<color=white>dictionary for dictionary attacks. You can specify a file to put the contents in the dictionary.")
			continue
		end if
		
		if opt[0] == "wordlist" and opt.len == 2 then
			if opt.hasIndex(1) and opt[1] == "count" then
				dict = get_shell.host_computer.File("/home/.dictionary.txt")
				//dict.set_content(dict.get_content+opt[1]+"\n")
				Content = remove_repeats(dict)
				lines = dict.get_content.split("\n")
				f = 0
				for line in lines
					if line == "" then continue
					f=f+1
				end for
				print("<color=white>Your wordlist currently has <color=red>"+f+"</color> passwords.")
				continue
			end if
			
			if opt.hasIndex(1) and opt[1].split("/").len == 1 then
				dict = get_shell.host_computer.File("/home/.dictionary.txt")
				dict.set_content(dict.get_content+opt[1]+"\n")
				continue
			end if
			
			if opt.hasIndex(1) and opt[1].split("/").len > 1   then
				dict = get_shell.host_computer.File("/home/.dictionary.txt")
				file = get_shell.host_computer.File(opt[1])
				if not file then
					print("<color=yellow>("+opt[1]+"): file does not exist...")
					continue
				end if
				if file.get_content == "" then
					print("<color=yellow>("+opt[1]+"): file is empty...")
					continue
				end if
				if file.is_binary or file.is_folder then
					print("<color=yellow>("+opt[1]+"): is not a text file...")
					continue
				end if
				dict.set_content(dict.get_content+file.get_content+"\n")
				continue
			end if
			continue
		end if
		
		if opt[0] == "search" and opt.len == 1 then
			print("------------------------------------------"+"\n"+"*<color=blue>[<color=white>search<color=blue>] <color=blue>[<color=white>payload<color=blue>] : <color=white>looks through the database for a module using a payload as a keyword.")
			Content = remove_repeats(global.e_db)
			continue
		end if
		
		if opt[0] == "search" and opt.len == 2 and opt[1] == "*" then
			//search all
			Content = remove_repeats(global.e_db)
			types = ["shell", "computer", "file", "number"]
			lines = global.e_db.get_content.split("\n")
			if global.e_db.get_content == "" then continue
			for type in types
				print("<color=blue>______________________________________________________________")
				print("<color=white><u><color=red>"+type.upper+"</color></u>: ")
				for line in lines
					new_lines = line.split("/")
					if new_lines[0] == "" then continue
					if new_lines[0] != type then continue
					print("<color=white>[<color=red>"+new_lines[0]+"<color=blue>/</color>"+new_lines[1]+"<color=blue>/</color>"+new_lines[2]+"<color=blue>/</color>"+new_lines[-1]+"<color=white>]")
				end for
				print("<color=blue>‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n")
			end for
			continue
		end if
		
		if opt[0] == "search" and opt.len == 3 and (opt[1] == "-val" or opt[1] == "--value") and opt[1] != "*" and opt[2] != "libssh.so" and opt[2] != "libhttp.so" and opt[2] != "libsmtp.so" and opt[2] != "libftp.so" and opt[2] != "librshell.so" and opt[2] != "libsql.so" and opt[2] != "libchat.so" and opt[2] != "libcam.so" then
			Content = remove_repeats(global.e_db)
			lines = global.e_db.get_content.split("\n")
			print("<color=blue>______________________________________________________________")
			print("<color=white><u><color=red>"+"others"+"</color></u>:\n")
			for line in lines
				new_lines = line.split("/")
				if new_lines[0] == "" then continue
				if opt[2] != new_lines[-1] then
					print("<color=white>[<color=red>"+new_lines[0]+"<color=blue>/</color>"+new_lines[1]+"<color=blue>/</color>"+new_lines[2]+"<color=blue>/</color>"+new_lines[-1]+"<color=white>]")
				end if
			end for
			g = 0
			h = 0
			for line in lines
				if opt[2] == new_lines[-1] then
					g = g + 1
					print(g)
				end if
			end for
			print("<color=blue>--------------------------------------------------------------")
			print("<color=white><u><color=red>"+opt[2]+"</color></u>:\n")
			for line in lines
				new_lines = line.split("/")
				if new_lines[0] == "" then continue
				if opt[2] == new_lines[-1] then
					print("<color=white>[<color=red>"+new_lines[0]+"<color=blue>/</color>"+new_lines[1]+"<color=blue>/</color>"+new_lines[2]+"<color=blue>/<color=red><u><b><color=white>"+new_lines[-1]+"</color></b></u><color=white>]")
					h = h + 1
					if g == h then
						okay = true
						break
					end if
				end if
			end for
			print("<color=blue>‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾")
			if okay == true then
				okay = false
				break
			end if
			continue
		end if
		
		if opt[0] == "search" and opt.len == 3 and (opt[1] == "-lib" or opt[1] == "--library") and opt[2] != "*" and (opt[2] == "libssh.so" or opt[2] == "libhttp.so" or opt[2] == "libsmtp.so" or opt[2] == "libftp.so" or opt[2] == "librshell.so" or opt[2] == "libsql.so" or opt[2] == "libchat.so" or opt[2] == "libcam.so") then
			Content = remove_repeats(global.e_db)
			lines = global.e_db.get_content.split("\n")
			print("<color=blue>______________________________________________________________")
			print("<color=white><u><color=red>"+"others"+"</color></u>:\n")
			for line in lines
				new_lines = line.split("/")
				if new_lines[0] == "" then continue
				if opt[2] != new_lines[1] then
					print("<color=white>[<color=red>"+new_lines[0]+"<color=blue>/</color>"+new_lines[1]+"<color=blue>/</color>"+new_lines[2]+"<color=blue>/</color>"+new_lines[-1]+"<color=white>]")
				end if
			end for
			g = 0
			h = 0
			for line in lines
				if opt[2] == new_lines[0] then
					g = g + 1
					print(g)
				end if
			end for
			print("<color=blue>--------------------------------------------------------------")
			print("<color=white><u><color=red>"+opt[2]+"</color></u>:\n")
			for line in lines
				new_lines = line.split("/")
				if new_lines[0] == "" then continue
				if opt[2] == new_lines[1] then
					print("<color=white>[<color=red>"+new_lines[0]+"<color=blue>/<color=red><u><b><color=white>"+new_lines[1]+"</color></b></u><color=blue>/<color=red>"+new_lines[2]+"<color=blue>/</color>"+new_lines[-1]+"<color=white>]")
					h = h + 1
					if g == h then
						okay = true
						break
					end if
				end if
			end for
			print("<color=blue>‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾")
			if okay == true then
				okay = false
				break
			end if
			continue
		end if
		
		if opt[0] == "search" and opt.len == 3 and (opt[1] == "-mem" or opt[1] == "--memory") then
			Content = remove_repeats(global.e_db)
			lines = global.e_db.get_content.split("\n")
			if not opt.hasIndex(2) and opt[2].len != 10 then
				print("<color=yellow>("+opt[2]+"): Invalid memory address...")
				continue
			end if
			if typeof(opt[2]) == "string" and opt[2].values[1] == "x" and opt[2].len == 10 then
				for line in lines
					if line == "" then continue
					if line.split("/")[2] == opt[2] then okay = true
				end for
				if okay != true then
					print("<color=yellow>("+opt[2]+"): Memory address not found...")
					continue
				end if
			end if
			
			print("<color=blue>______________________________________________________________")
			print("<color=white><u><color=red>"+"others"+"</color></u>:\n")
			if okay == true then
				for line in lines
					if line == "" then continue
					new_lines = line.split("/")
					if opt[2] != new_lines[2] then
						print("<color=white>[<color=red>"+new_lines[0]+"<color=blue>/</color>"+new_lines[1]+"<color=blue>/</color>"+new_lines[2]+"<color=blue>/</color>"+new_lines[-1]+"<color=white>]")
					end if
				end for
				print("<color=blue>--------------------------------------------------------------")
				print("<color=white><u><color=red>"+opt[2]+"</color></u>:\n")
				for line in lines
					if line == "" then continue
					new_lines = line.split("/")
					if opt[2] == new_lines[2] then
						print("<color=white>[<color=red>"+new_lines[0]+"<color=blue>/</color>"+new_lines[1]+"<color=blue>/<color=red><u><color=white><b>"+new_lines[2]+"</b></color></u><color=blue>/</color>"+new_lines[-1]+"<color=white>]")
					end if
				end for
			end if
			print("<color=blue>‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾")
			continue
		end if
		
		if opt[0] == "search" and opt.len == 3 and (opt[1] == "-obj" or opt[1] == "--object") and (opt[2] == "shell" or opt[2] == "computer" or opt[2] == "file" or opt[2] == "number") then
			lines = global.e_db.get_content.split("\n")
			print("<color=blue>______________________________________________________________")
			print("<color=white><u><color=red>"+"others"+"</color></u>:\n")
			for line in lines
				if line == "" then continue
				new_lines = line.split("/")
				object = line.split("/")[0]
				if object != opt[2] then 
					print("<color=white>[<color=red>"+new_lines[0]+"<color=blue>/</color>"+new_lines[1]+"<color=blue>/</color>"+new_lines[2]+"<color=blue>/</color>"+new_lines[-1]+"<color=white>]")
				end if
			end for
			print("<color=blue>--------------------------------------------------------------")
			print("<color=white><u><color=red><b>"+opt[2]+"</b></color></u>:\n")
			for line in lines
				if line == "" then continue
				new_lines = line.split("/")
				object = line.split("/")[0]
				if object == opt[2] then 
					print("<color=white>[<color=red><u><color=white><b>"+new_lines[0]+"</b></color></u><color=blue>/</color>"+new_lines[1]+"<color=blue>/</color>"+new_lines[2]+"<color=blue>/</color>"+new_lines[-1]+"<color=white>]")
				end if
			end for
			print("<color=blue>‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾")
			continue
		end if
		
		
		if opt == ["exit"] and opt.len == 1 then
			proof = true
			exit()
		end if
		
		if opt == ["clear"] and opt.len == 1 then
			proof = true
			clear_screen
			continue
		end if
		
		if opt[0] == "grab" and opt.len == 10 then
			thingy = null
			user_list = []
			mail = get_shell.host_computer.File("/root/MAIL.DB")
			bank = get_shell.host_computer.File("/root/BANK.DB")
			gg = 0
			n = function()
				rc = floor((rnd * 255) + 1)
				return rc
			end function
			LIST = []
			parse = function(result)
				found = 0
				List = []
				line = result.split(" ")
				line.reverse
				for word in line
					if found == 1 then
						word = word.remove(".")
						word = word.remove("<b>")
						word = word.remove("</b>")
						List.push(word)
						found = 0
					end if
					if found == 0 then
						if word == "Buffer" then
							found = 1
						end if
					end if
				end for
				
				return List
			end function
			if opt.hasIndex(1) and opt[1] == "mail" then
				thingy = "Mail.txt"
				while true
					if gg == 10 then break
					ip = [n,n,n,n].join(".")
					net = metax.net_use(ip)
					if not is_valid_ip(ip) or not net or is_lan_ip(ip) then continue
					ports = get_router(ip).used_ports
					for port in ports
						net = metax.net_use(ip,port.port_number)
						if not net then continue
						Lib = net.dump_lib
						Memories = metax.scan(Lib)
						for memory in Memories
							results = metax.scan_address(Lib, memory)
							for payload in parse(results)
								result = Lib.overflow(memory, payload, "1234")
								
								if typeof(result) == "shell" then
									computer = result.host_computer
									home = computer.File("/home")
									users = home.get_folders
									for user in users
										user_list.push(user.name)
									end for
									
									if thingy == "Mail.txt" then
										for user in user_list
											file = computer.File("/home/"+user+"/Config/Mail.txt")
											if not file then continue
											if file.get_content == "" then continue
											if not file.has_permission("r") then continue
											print("<color=red>"+user+": ")
											print(file.get_content)
											mail.set_content(mail.get_content+file.get_content+"\n")
											continue
										end for
									end if
								end if
								
								if typeof(result) == "computer" then
									computer = result
									home = computer.File("/home")
									users = home.get_folders
									for user in users
										user_list.push(user.name)
									end for
									
									if thingy == "Mail.txt" then
										for user in user_list
											file = computer.File("/home/"+user+"/Config/Mail.txt")
											if not file then continue
											if file.get_content == "" then continue
											if not file.has_permission("r") then continue
											print("<color=red>"+user+": ")
											print(file.get_content)
											mail.set_content(mail.get_content+file.get_content+"\n")
											continue
										end for
									end if
								end if
							end for
						end for
					end for
					gg = gg + 1
				end while
				continue
			end if
			
			if opt.hasIndex(1) and opt[1] == "bank" then
				thingy = "Bank.txt"
				while true
					if gg == 10 then break
					ip = [n,n,n,n].join(".")
					net = metax.net_use(ip)
					if not is_valid_ip(ip) or not net or is_lan_ip(ip) then continue
					ports = get_router(ip).used_ports
					for port in ports
						net = metax.net_use(ip,port.port_number)
						if not net then continue
						Lib = net.dump_lib
						Memories = metax.scan(Lib)
						for memory in Memories
							results = metax.scan_address(Lib, memory)
							for payload in parse(results)
								result = Lib.overflow(memory, payload, "1234")
								
								if typeof(result) == "shell" then
									computer = result.host_computer
									home = computer.File("/home")
									users = home.get_folders
									for user in users
										user_list.push(user.name)
									end for
									
									if thingy == "Bank.txt" then
										for user in user_list
											file = computer.File("/home/"+user+"/Config/Bank.txt")
											if not file then continue
											if file.get_content == "" then continue
											if not file.has_permission("r") then continue
											print("<color=red>"+user+": ")
											print(file.get_content)
											bank.set_content(bank.get_content+file.get_content+"\n")
											continue
										end for
									end if
								end if
								
								if typeof(result) == "computer" then
									computer = result
									home = computer.File("/home")
									users = home.get_folders
									for user in users
										user_list.push(user.name)
									end for
									
									if thingy == "Bank.txt" then
										for user in user_list
											file = computer.File("/home/"+user+"/Config/Bank.txt")
											if not file then continue
											if file.get_content == "" then continue
											if not file.has_permission("r") then continue
											print("<color=red>"+user+": ")
											print(file.get_content)
											bank.set_content(bank.get_content+file.get_content+"\n")
											continue
										end for
									end if
								end if
							end for
						end for
					end for
					gg = gg + 1
				end while
				continue
			end if
			
			continue
		end if
		
		if opt[0] == "sweep" and opt.len == 2 and opt[1].val != 0 then //if the input is a string w/ alpahbet then returns num 0
			k = 0
			while true
				n = function()
					number = floor((rnd * 255) + 1)
					return number
				end function
				
				ip = [n,n,n,n].join(".")
				if not is_valid_ip(ip) then continue
				if is_lan_ip(ip) then continue
				router = get_router(ip)
				if not router then continue
				ports = router.used_ports
				if not ports then continue
				for port in ports
					if port.port_number != opt[1].val then continue
					if(port.is_closed and not is_lan_ip(ip)) then continue
					//print(port.get_lan_ip + " " + port.port_number)
					net = metaxploit.net_use(ip,port.port_number)
					if not net then
						continue
					end if
					if net then
						string = "<color=red>"+ip + "  <color=white>true"
						print(format_columns(string))
						k = k + 1
						if k == 10 then
							okay = true
						end if
						break
					end if
					old = true
				end for
				if okay == true and k == 10 then
					break
				end if
			end while
			if okay == true then
				okay = false
				continue
			end if
		end if
		
		if opt[0] == "sweep" and opt.len == 2 and opt[1] == "0" then //if the input is a string w/ alpahbet then returns num 0
			k = 0
			while true
				n = function()
					number = floor((rnd * 255) + 1)
					return number
				end function
				
				ip = [n,n,n,n].join(".")
				if not is_valid_ip(ip) then continue
				if is_lan_ip(ip) then continue
				
				//print(port.get_lan_ip + " " + port.port_number)
				net = metaxploit.net_use(ip)
				if not net then continue
				if net then
					string = "<color=red>"+ip + "  <color=white>true"
					print(format_columns(string))
					k = k + 1
					if k == 10 then
						okay = true
						break
					end if
				end if
			end while
			if okay == true then
				okay = false
				continue
			end if
		end if
		
		
		if opt == ["sweep"] and opt.len == 1 then
			k = 0
			while true
				n = function()
					number = floor((rnd * 255) + 1)
					return number
				end function
				
				ip = [n,n,n,n].join(".")
				if not is_valid_ip(ip) then continue
				if is_lan_ip(ip) then continue
				router = get_router(ip)
				if not router then continue
				ports = router.used_ports
				if not ports then continue
				for port in ports
					if(port.is_closed and not is_lan_ip(ip)) then continue
					//print(port.get_lan_ip + " " + port.port_number)
					net = metaxploit.net_use(ip,port.port_number)
					if not net then
						continue
					end if
					if net then
						string = "<color=red>"+ip + "  <color=white>true"
						print(format_columns(string))
						//print("<color=red>"+ip + "  <color=white>true")
						k = k + 1
						if k == 10 then
							okay = true
						end if
						break
					end if
					old = true
				end for
				if okay == true and k == 10 then
					break
				end if
			end while
			if okay == true then
				okay = false
				continue
			end if
		end if
		
		if opt == ["help"] and opt.len == 1 then
			proof = true
			print("<color=blue>--------------------------------------------------------------"+"\n"+"<color=green>*<color=blue>[<color=white>search<color=blue>] <color=blue>[<color=white>-v<color=blue>/<color=white>--val<color=blue>/<color=white>-l<color=blue>/<color=white>--lib<color=blue>] [<color=white>value<color=blue>/<color=white>lib<color=blue>] : <color=white>looks through the database for a module using the inputed value<color=blue>/<color=white>lib as a keyword.\n   <color=blue>--<color=white>use <color=blue>[<color=white>search<color=blue>] [<color=white>*<color=blue>] <color=white>to list all possible modules.")
			print("<color=blue>--------------------------------------------------------------"+"\n"+"<color=green>*<color=blue>[<color=white>nmap<color=blue>] [<color=white>ip<color=blue>/<color=white>domain<color=blue>] : <color=white>to scan targets for vulnerabilities.")
			print("<color=blue>--------------------------------------------------------------"+"\n"+"<color=green>*<color=blue>[<color=white>wordlist<color=blue>] <color=blue>[<color=white>string<color=blue>/<color=white>/path/to/file<color=blue>] : <color=white>add to your wordlist<color=blue>/<color=white>dictionary for dictionary attacks. You can specify a file to put the contents in the dictionary.")
			print("<color=blue>--------------------------------------------------------------"+"\n"+"<color=green>*<color=blue>[<color=white>grab<color=blue>] <color=blue>[<color=white>bank<color=blue>/<color=white>mail<color=blue>] : <color=white>randomly grab bank info and mail info. (This is still in developement).")
			print("<color=blue>--------------------------------------------------------------"+"\n"+"<color=green>*<color=blue>[<color=white>use<color=blue>] [<color=white>module<color=blue>] : <color=white>comand used to select your exploit.\n")
			print("<color=blue>--------------------------------------------------------------"+"\n"+"<color=green>*<color=blue>[<color=white>sweep<color=blue>] : <color=white>lists 10 random valid ip address.\n   <color=blue>--<color=white>use <color=blue>[<color=white>sweep<color=blue>] [<color=white>port_number<color=blue>] <color=white>to look for specific ports.")
			print("<color=blue>--------------------------------------------------------------"+"\n"+"<color=green>*<color=blue>[<color=white>clear<color=blue>] : <color=white>clear screen.")
			print("<color=blue>--------------------------------------------------------------"+"\n"+"<color=green>*<color=blue>[<color=white>router_spy<color=blue>] [<color=white>ip<color=blue>] : <color=white>to scan routers for vulnerabilities..")
			//print("------------------------------------------"+"\n"+"<color=blue>[<color=white>unset<color=blue>] : <color=white>this is how you return the remote and local hosts ip's and ports to null.")
			//print("------------------------------------------"+"\n"+"<color=blue>[<color=white>clearm<color=blue>] : <color=white>this clears the module, setting it to null.")
			print("<color=blue>--------------------------------------------------------------"+"\n"+"<color=green>*<color=blue>[<color=white>exit<color=blue>] :<color=white> use this to exit <u><b>msf7</b></u>.")
			//print("------------------------------------------"+"\n"+"<color=blue>[<color=white>connect<color=blue>] [<color=white>user@pass<color=blue>] [<color=white>ip<color=blue>]: <color=white>use this to connect to your server for a reverse shell. Also can use this if you've collected all info on target. ")
			//print("------------------------------------------"+"\n"+"<color=blue>[<color=white>grep<color=blue>] [<color=white>lib_name<color=blue>] [<color=white>payload<color=blue>] : <color=white>more specific search method for finding payloads in specific libs.")
			//print("------------------------------------------"+"\n"+"<color=blue>[<color=white>save<color=blue>] [<color=white>module<color=blue>] : <color=white>lets you save your module for when you come back. Must run this before you exit msf.")
			//print("------------------------------------------"+"\n"+"<color=blue>[<color=white>history]<color=blue> : <color=white>command history. This resets after 50 inputs.")
			print("<color=blue>--------------------------------------------------------------"+"\n"+"<color=green>*<color=blue>[<color=white>read<color=blue>] [<color=white>path/to/enc/file <color=blue>/<color=white> hash<color=blue>] : <color=white>Decipher a file of hashes or decipher a single hash.")
			print("<color=blue>--------------------------------------------------------------"+"\n"+"<color=green>*<color=blue>[<color=white>whois<color=blue>] [<color=white>ip<color=blue>] : <color=white>get information on the target.")
			print("<color=blue>--------------------------------------------------------------"+"\n"+"<color=green>*<color=blue>{<color=red>On Startup<color=blue>}[<color=white>-q<color=blue>] [<color=white>--quiet<color=blue>] : <color=white>When starting <u><b>msf7</b></u>, use this tag to cancel the ascii art.")
			print("<color=blue>--------------------------------------------------------------")
			continue
		end if
		
		if opt == ["admin:Damascus"] and opt.len == 1 then
			proof = true
			l = [db5]
			a = 0
			for x in l
				a = a + 1
				print("db5 : "+x)
			end for
			print("[back]")
			while true
				msg = user_input("which database?: ")
				if msg == "db5" then
					db5.start_terminal
				end if
				
				if msg == "back" then
					break
				end if
				if msg != "db5" or msg != "back" then
					print("<color=yellow>"+msg+": command not found.")
					continue
				end if
			end while
			if okay == true then
				continue
			end if
		end if
		
		
		if opt[0] == "nmap" and opt.len == 1 then
			print("------------------------------------------"+"\n"+"*<color=blue>[<color=white>nmap<color=blue>] [<color=white>ip<color=blue>] : <color=white>Scan target for vulnerabilities.")
			continue
		end if
		
		if opt[0] == "use" and opt.len == 1 then
			print("------------------------------------------"+"\n"+"*<color=blue>[<color=white>use<color=blue>] [<color=white>module<color=blue>] : <color=white>comand used to select your exploit.")
			print("<color=white>--CUSTOM MODULES: \n<color=white>Dictionary Hack : <color=blue>[<color=white>exploit/wordlist_10000/ssh_vuln<color=blue>]")
			continue
		end if
		
		if opt[0] == "whois" and opt.len == 1 then
			print("<color=blue>[<color=white>whois<color=blue>] [<color=white>ip<color=blue>] : <color=white>get information on the target.")
			continue
		end if
		
		if opt[0] == "whois" and opt.len == 2 and typeof(opt[1]) == "string" and opt[1].len > 6 and opt[1].len < 16 then
			if not is_valid_ip(opt[1]) then
				print("<color=yellow>"+opt[1]+": is not a valid address.")
				continue
			end if
			print(whois(opt[1]))
			continue
		end if
		
		if opt[0] == "read" and opt.len == 1 then
			print("<color=blue>[<color=white>read<color=blue>] [<color=white>[path/to/enc/file] / [hash]<color=blue>] : <color=white>Decipher a file of hashes or decipher a single hash.")
			continue
		end if
		
		if opt[0] == "read" and opt.len == 2 and typeof(opt[1]) == "string" then
			hash = false
			dir = false
			turnoff = false
			exiting = false
			x = 0
			crypto = include_lib("/lib/crypto.so")
			f = opt[1].values
			for item in f
				if item == "/" then
					dir = true
					break
				end if
				if item == ":" then hash = true
			end for
			if hash == true then
				opt[1] = opt[1].split(":")
				wait(.5)
				password = crypto.decipher(opt[1][1])
				print("<color=white>"+opt[1][0]+" ==> "+password)
			end if
			if dir == true then
				file = get_shell.host_computer.File(opt[1])
				lines = file.get_content.split("\n")
				for line in lines
					if x == 10 and turnoff == false then
						x = 0
						while true
							d = user_input("<color=orange>This is the 'check' function. [continue] X [exit] X [turnoff: turn of check function.]\n"+"<color=red>-->: ")
							if d == "continue" then
								break
							end if
							if d == "turnoff" then
								turnoff = true
								break
							end if
							if d == "exit" then
								exiting = true
								break
							end if
							if d != "continue" or d != "exit" or d != "turnoff" then
								print("<color=yellow>"+d+": command not found...")
								continue
							end if
						end while
						if exiting == true then
							break
						end if
					end if
					line = line.split(":")
					wait(.5)
					password = crypto.decipher(line[1])
					print("<color=white>"+line[0]+" ==> "+password)
					dict = get_shell.host_computer.File("/home/.dictionary.txt")
					dict.set_content(dict.get_content+password+"\n")
					Content = remove_repeats(dict)
					x = x + 1
				end for
				if exiting == true then
					exiting = false
					continue
				end if
			end if
			turnoff = false
			dir = false
			hash = false
			continue
		end if
		
		if opt[0] == "use" and opt.len == 2 and typeof(opt[1]) == "string" then
			
			
			lines = global.e_db.get_content.split("\n")
			//print("lines: "+typeof(lines))
			for line in lines
				if line == opt[1] or opt[1] == "exploit/meterpreter/reverse_shell" or opt[1] == "exploit/wordlist_10000/ssh_vuln" then
					print("\n")
					//print(typeof(opt[1]))
					v = opt[1]
					b = opt[1]
					while b.values.len > 3 and b != "exploit/wordlist_10000/ssh_vuln"
						global.g = b.split("/")[-1].values
						global.g.remove(-1)
						global.a = global.g.join("")
						b = global.a
					end while
					opt[1] = opt[1].split("/")[:-1]
					opt[1].push(b.split("/")[-1])
					opt[1] = opt[1].join("/")
					while true
						global.opt2 = user_input("<color=white><u><color=red>msf7<color=white>></u> <color=white><u><(<color=red>"+opt[1]+"...<color=white>)></u> ")
						pass = true
						opt2 = global.opt2.split(" ")
						//print(opt2)
						
						if opt2 == [""] and opt2.len == 1 then
							continue
						end if
						
						if opt2 == ["exit"] and opt2.len == 1 then
							exit()
						end if
						
						if opt2 == ["clear"] and opt.len == 1 then
							clear_screen
							continue
						end if
						
						if opt2 == ["back"] and opt2.len == 1 then
							//breaking out of while loop
							file_list = []
							break
						end if
						
						if opt2 == ["options"] and opt2.len == 1 then
							if file_list.len == 0 then extension = null else extension = "<color=red>|<color=white>EXTENTION  <color=green>LOADED"
							print("<color=red> __________________________________________")
							print("<color=red>|<color=white>               METASPLOIT 7<color=red>               |")
							print("<color=red> ------------------------------------------")
							if typeof(lhost) != "null" and lhost != gateway then print("<color=red>|<color=white>LHOST   <color=green>"+lhost)
							if lhost == gateway then print("<color=red>|<color=white>LHOST   "+lhost+"<color=orange> (DFLT)")
							if lport != lport == 1222+"<color=orange> (DFLT)<color=white>" then print("<color=red>|<color=white>LPORT   <color=green>"+lport)
							if lport == 1222+"<color=orange> (DFLT)<color=white>" then print("<color=red>|<color=white>LPORT<color=green>   "+lport)
							print("<color=red>|")
							if rhost != "<color=red>none<color=orange> (DFLT)<color=white>" then print("<color=red>|<color=white>RHOST   <color=green>"+rhost)
							if rhost == "<color=red>none<color=orange> (DFLT)<color=white>" then print("<color=red>|<color=white>RHOST   "+rhost)
							//if rport then print("hgdfjskljdfhgjdksl")
							if rport != 8080+"<color=orange> (DFLT)<color=white>" then print("<color=red>|<color=white>RPORT   <color=green>"+rport)
							if rport == 8080+"<color=orange> (DFLT)<color=white>" then print("<color=red>|<color=white>RPORT   <color=green>"+rport+"")
							print("<color=red>|")
							if method == "m" then print("<color=red>|<color=white>METHOD  <color=orange>Machine Hack")
							if method == "r" then print("<color=red>|<color=white>METHOD  <color=orange>Router Hack")
							if method == "d" then print("<color=red>|<color=white>METHOD  <color=orange>Dictionary Hack")
							if typeof(method) == "null" then print("<color=red>|<color=white>METHOD  <color=red>none <color=orange>(DFLT)")
							if typeof(extension) != "null" then print(extension)
							if typeof(extension) == "null" then print("<color=red>|<color=white>EXTENTION  <color=red>none <color=orange>(DFLT)")
							print("<color=red> ------------------------------------------")
							//                 ------------------------------------------
							continue
						end if
						
						if opt2 == ["help"] or opt2 == ["-h"] and opt2.len == 1 then
							print("<color=blue>[<color=white>method<color=blue>] : <color=white>shows the available hacking methods. Methods are required since they determine the net session.")
							print("<color=blue>[<color=white>options<color=blue>] : <color=white>shows you the available settings.")
							print("<color=blue>[<color=white>set<color=blue>] [<color=white>option<color=blue>] [<color=white>input<color=blue>] : <color=white>allows to set an option.")
							print("<color=blue>[<color=white>exploit<color=blue>] : <color=white>runs the exploit.")
							//print("<color=blue>[<color=white>connect<color=blue>] [<color=white>user@pass<color=blue>] [<color=white>ip<color=blue>]: <color=white>allows you to set up server for reverse shell connection.")
							print("<color=blue>[<color=white>load<color=blue>] [<color=white>extension<color=blue>] : <color=white>allows you to select an extension to upload to the target.")
							print("<color=blue>[<color=white>show<color=blue>] : <color=white>shows loaded extensions.")
							print("<color=blue>[<color=white>whois<color=blue>] [<color=white>ip<color=blue>] : <color=white>get information on the target.")
							print("<color=blue>[<color=white>clear<color=blue>] : <color=white>clear screen.")
							print("<color=blue>[<color=white>unload<color=blue>] <color=blue>[<color=white>extension<color=blue>] : <color=white>unload extensions.")
							continue
						end if
						
						if opt2[0] == "clear" and opt2.len == 1 then
							clear_screen
							continue
						end if
						
						if opt2[0] == "whois" and opt2.len == 1 then
							print("<color=blue>[<color=white>whois<color=blue>] [<color=white>ip<color=blue>] : <color=white>get information on the target.")
							continue
						end if
						
						if opt2[0] == "whois" and opt2.len == 2 and typeof(opt2[1]) == "string" and opt2[1].len > 6 and opt2[1].len < 16 then
							if not is_valid_ip(opt2[1]) then
								print("<color=yellow>"+opt2[1]+": is not a valid address.")
								continue
							end if
							print(whois(opt2[1]))
							continue
						end if
						
						if opt2[0] == "rshell" and opt2.len == 1 then
							print("[rshell] [plant/connect] : plant rshell malware on a target and remotely run it, or connect to an available rshell.")
							continue
						end if
						
						if opt2[0] == "rshell" and opt2.len == 2 and opt2.hasIndex(opt2[1]) then
							
							if opt2[1] == "plant" then
								get_shell.host_computer.touch("/root", ".file.txt")
								get_shell.host_computer.touch("/root", "MetaConnect.src")
								f = get_shell.host_computer.File("/root/.file.txt")
								m = get_shell.host_computer.File("/root/MetaConnect.src")
								META = get_shell.host_computer.File("/lib/metaxploit.so")
								if lhost == gateway then
									print("<color=yellow>("+lhost+"): Invalid LHOST...")
									continue
								end if
								f.set_content("metax = include_lib(current_path+"+"""/metaxploit.so"""+")\nmetax.rshell_client("""+lhost+""", "+1222+")")
								m.set_content(f.get_content)
								get_shell.build("/root/MetaConnect.src", "/root")
								file = get_shell.host_computer.File("/root/MetaConnect")
								a = user_input("<color=red>***Any files you previously loaded will be replaced***\n<color=white>continue? <color=red>(<color=white>y<color=red>/<color=white>n<color=red>): ")
								if a != "y" then
									print("<color=white>:::PORCESS ENDED:::")
									continue
								end if
								print("<color=purple>Note: make sure that the ssh port '22' is open on your listening ip address.")
								file_list = []
								file_list.push(META)
								file_list.push(file)
								continue
							end if
							
							if opt2[1] == "connect" then
								META = get_shell.host_computer.File("/lib/metaxploit.so")
								if lhost != gateway then
									pass = user_input("<color=red>Password: ", 1)
									server = get_shell.connect_service(lhost, 22, "root", pass)
									while not server
										print("<color=yellow>Connect Failed...")
										pass = user_input("<color=red>Back <color=white>| <color=red>Password<color=white>: ", 1)
										server = get_shell.connect_service(lhost, 22, "root", pass)
										if pass == "back" or pass == "Back" then
											okay = true
											break
										end if
									end while
									if okay == true then
										okay = false
										continue
									end if
									server.host_computer.touch("/root", ".file.txt")
									server.host_computer.touch("/root", "script.src")
									i = server.host_computer.File("/root/.file.txt")
									n = server.host_computer.File("/root/script.src")
									i.set_content("list = []\nmetax = include_lib("+"""/lib/metaxploit.so"""+")\n shells = metax.rshell_server\nprint("+"""<color=red>SHELLS: """+")\nfor shell in shells\nprint("+"""<color=red>--------------------------------------------------------------\n <color=white>Public IP: <color=red>"""+" +shell.host_computer.public_ip+"+"""\n <color=white>Local IP: <color=red>"""+"+shell.host_computer.local_ip)\nend for\n a = user_input("+"""<color=red>--------------------------------------------------------------\n <color=white>Choose Public IP: """+")\nfor shell in shells\nif a == shell.host_computer.public_ip then\nshell.start_terminal\nend if\nend for")
									n.set_content(i.get_content)
									server.build("/root/script.src", "/root")
									server.launch("/root/script")
									//server.launch(current_path+"/rshell_interface")
									continue
								else
									print("<color=yellow>("+lhost+"): Invalid LHOST...")
									continue
								end if
								continue
							end if
						end if
						
						if opt2[0] == "show" and opt2.len == 1 then
							if file_list.len == 0 then
								print("<color=yellow>No Loaded Files...")
								continue
							end if
							print("<color=white>LOADED: ")
							for item in file_list
								print("<color=red>"+item.path.split("/")[-1])
							end for
							continue
						end if
						
						if opt2 == ["method"] and opt2.len == 1 then
							method2 = user_input("<color=white>Router Hack <color=red>{<color=white>r<color=red>} \n<color=white>Machine Hack <color=red>{<color=white>m<color=red>}\n<color=white>Dictionary Hack <color=red>{<color=white>d<color=red>}\n<color=red> -->: ")
							if method2 == "r" then
								method = "r"
								net = metaxploit.net_use(rhost)
								continue
							end if
							
							if method2 == "m" then
								method = "m"
								net = metaxploit.net_use(rhost,rport.val)
								continue
							end if
							
							if method2 == "d" then
								method = "d"
								global.dicto = dict.get_content.split("\n")
								continue
							end if
							
							if method2 != "m" or method2 != "r" or method2 != "d" then
								print("<color=yellow>"+method2+": invalid method.")
								continue
							end if
							continue
						end if
						
						
						if opt2 == ["load"] and opt2.len == 1 then
							print("<color=blue>[<color=white>load<color=blue>] <color=blue>[<color=white>extension<color=blue>] : <color=white>load command used to load extensions.")
							continue
						end if
						
						if opt2[0] == "load" and opt2.len == 2 and typeof(opt2[1].split("/")) == "list" then
							file = get_shell.host_computer.File(opt2[1])
							if not file then
								print("<color=yellow>("+opt2[1]+"): File does not exist...")
								continue
							end if
							file_list.push(file)
							continue
						end if
						
						if opt2 == ["unload"] and opt2.len == 1 then
							print("<color=blue>[<color=white>unload<color=blue>] <color=blue>[<color=white>extension<color=blue>] : <color=white>load command used to unload extensions.\n <color=blue>--<color=white> use <color=blue>[<color=white>unload<color=blue>] [<color=white>*<color=blue>]<color=white> to remove all files.")
							continue
						end if
						
						if opt2[0] == "unload" and opt2.len == 2 and opt2[1] == "*" then
							file_list = []
							continue
						end if
						
						if opt2[0] == "unload" and opt2.len == 2 and typeof(opt2[1].split("/")) == "list" then
							file = get_shell.host_computer.File(opt2[1])
							if not file then
								print("<color=yellow>("+opt2[1]+"): File does not exist...")
								continue
							end if
							for item in file_list
								if item.path.split("/")[-1] == opt2[1].split("/")[-1] then
									okay = true
								end if
								if okay == true then
									okay = false
									index = file_list.indexOf(item)
									file_list.remove(index)
								end if
							end for
							continue
						end if
						
						if opt2 == ["exploit"] or opt2 == ["run"] and opt2.len == 1 then
							//net = metaxploit.net_use(rhost,rport)
							ports = get_router(rhost).used_ports
							for p in ports
								if p.port_number == 22 then okay = true
							end for
							
							if okay != true and file_list.len > 0 and file_list[-1].path.split("/")[-1] == "MetaConnect" then
								print("<color=yellow>("+rhost+"): Does not have port 22...")
								continue
							else
								okay = false
							end if
							
							if method == "d" and opt[1] == "exploit/wordlist_10000/ssh_vuln" then
								dict = get_shell.host_computer.File("/home/.dictionary.txt")
								x = 0
								y = 0
								if not is_valid_ip(rhost) then
									print("<color=yellow>rhost is invalid...")
									continue
								end if
								for Dict in dict.get_content.split("\n")
									if Dict == "" then continue
									x=x+1
									y=y+1
									victim = get_shell.connect_service(rhost, 22, "root", Dict)
									if x == 500 then
										x = 0
										clear_screen
										print("<color=orange>"+y+" Attempts.")
										print("<color=orange>Will resume in 3 sec.")
										wait(3)
									end if
									if not victim then continue
									print("<color=orange>Password: "+Dict)
									con = user_input("<color=green>Open Shell? (y/n): ")
									if file_list.len != 0 then
										for file in file_list
											get_shell.scp(file.path, "/home/guest", victim)
										end for
									end if
									if con == "y" then
										victim.start_terminal
									end if
									okay = true
									break
								end for
								if okay == true then
									okay = false
									continue
								end if
								continue
							else if method == "d" and opt[1] != "exploit/wordlist_10000/ssh_vuln" then
								print("<color=yellow>Dictionary attack module must be calibrated. '<color=blue>[<color=white>use<color=blue>] [<color=white>exploit/wordlist_10000/ssh_vuln<color=blue>]<color=yellow>'")
								continue
							else if method != "d" and opt[1] == "exploit/wordlist_10000/ssh_vuln" then
								print("<color=yellow>Dictionary file must be calibrated. '<color=blue>[<color=white>method<color=blue>]<color=yellow>'.")
								continue
							end if
							
							if not net then
								if net == false or typeof(net) == "null"  then
									print("<color=yellow>Select '<color=blue>[<color=white>method<color=blue>]<color=yellow>' first.")
								end if
								print("<color=yellow>Connection Failed...")
								
								
								continue
							end if
							value = null
							if v and v.split("/").len == 4 then
								list = v.split("/")
								memory = list[2]
								value = list[3]
							end if
							router = get_router(rhost).local_ip
							if not memory or not value then
								print("<color=red>[-] No Vuln Specified")
								print("<color=purple>[+] Exploit completed, but no session was created.")
							end if
							print("<color=orange>[*] Vuln Found:\n<color=green> " + memory + " : <color=green>" + value)
							wait(1)
							print("<color=purple>[*] Starting Buffer Overflow")
							wait(1)
							print("<color=purple>[*] Inititating Lib-Dump")
							wait(1)
							Lib = net.dump_lib
							print("<color=orange>[*] Target Library: " + Lib.lib_name + " " + Lib.version)
							wait(1)
							print("<color=purple>[*] NOTE: password modifications set to '1234' ")
							wait(2)
							print()
							
							if method == "r" then
								global.result = Lib.overflow(memory, value, router)
								method = null
							else
								global.result = Lib.overflow(memory, value, "1234")
							end if//changes password to '1234'
							print("------------------------------------------")
							if global.result then HandleResult(global.result, method, value)
							
							
							continue
						end if
						
						
						if opt2[0] == "set" and opt2.len == 1 then
							print("<color=blue>[<color=white>set<color=blue>] [<color=white>option<color=blue>]: <color=white>allows to set an option.")
							continue
						end if
						
						if opt2[0] == "set" and opt2.len == 3 and (opt2[1] == "lhost" or opt2[1] == "LHOST") and typeof(opt2[2]) == "string" then
							lhost = opt2[2]
							continue
						end if
						if opt2[0] == "set" and opt2.len == 3 and (opt2[1] == "rhost" or opt2[1] == "RHOST") and typeof(opt2[2]) == "string" then
							rhost = opt2[2]
							continue
						end if
						if opt2[0] == "set" and opt2.len == 3 and (opt2[1] == "lport" or opt2[1] == "LPORT") and typeof(opt2[2]) == "string" then
							lport = opt2[2]
							continue
						end if
						if opt2[0] == "set" and opt2.len == 3 and (opt2[1] == "rport" or opt2[1] == "RPORT") and typeof(opt2[2]) == "string" then
							rport = opt2[2]
							continue
						end if
						
						
						
						print("<color=yellow>"+opt2[0]+": command not found.")
						
					end while
					if okay == false then
						continue
					end if
					if okay == true then
						//breaking out of a for loop
						break
					end if
				end if//-
			end for
			if okay == true then
				//breaking out of a for loop
				break
			end if
			continue
		end if
		
		
		if opt[0] == "nmap" and opt.len >= 2 and typeof(opt[1]) == "string" then
			proof = true
			ip = null
			d = 0
			if not get_shell.host_computer.is_network_active then
				print("nmap: can't connect. No internet access.")
				continue
			end if
			pieces = opt[1].values
			if not is_valid_ip(opt[1]) and pieces[0] != "w" then
				print("nmap: invalid ip address")
				continue
			end if
			
			if pieces[0] == "w" then
				ip = nslookup(opt[1])
			else
				ip = opt[1]
			end if
			isLanIp = is_lan_ip( ip)
			if isLanIp then
				router = get_router
			else
				router = get_router( ip )
			end if
			
			if router == null then
				print("nmap: ip address not found")
				continue
			end if
			ports = null
			
			if not isLanIp then
				ports = router.used_ports
			else
				ports = router.device_ports(ip)
			end if
			
			if ports == null then
				print("nmap: ip address not found")
				continue
			end if
			if typeof(ports) == "string" then
				print(ports)
				continue
			end if
			
			print("\n<color=white>Starting nmap v1.1 at " + current_date)
			if opt[1].split(".").len == 4 then print("<color=white>Interesting ports on <color=red>" + opt[1] + "\n") else print("<color=white>Interesting ports on <color=red>" + nslookup(opt[1]) + "\n")
			//if opt[1].val != 0 then print("Interesting ports on " + opt[1] + "\n")
			if ports.len == 0 then
				print("<color=yellow>No available ports. use '<color=blue>[<color=white>router_spy<color=blue>]<color=yellow>' instead")
				continue
			end if
			slit = []
			white = "<color=white>"
			red = "<color=red>"
			for port in ports
				service_info = router.port_info(port).split(" ")
				if service_info == "unknown" then
					print("<color=yellow>No available ports. use '<color=blue>[<color=white>router_spy<color=blue>]<color=yellow>' instead")
					continue
				end if
				
				lan_ips = port.get_lan_ip
				port_status = "open"
				
				if(port.is_closed and not isLanIp) then
					port_status = "closed"
				end if
				display = white+"| "+red+port.port_number+white+" "+port_status+" "+red+service_info[0]+" "+service_info[1]+" "+lan_ips+white+" |"
				slit.push(display)
			end for
			
			slit = ""+slit.join("\n")
			print(format_columns(slit))
			proof = true
			router = get_router(ip)
			ports = router.used_ports
			
			for port in ports
				if port.port_number == 3306 and port.is_closed or port.port_number == 3307 and port.is_closed then continue
				porter.push(port.port_number)
			end for
			for p in porter
				
				if q == true and port.len != d then
					q = false
					okay = false
					R = null
					P = null
					stilts = []
					cap = []
					msg = user_input("<color=orange>Scan next lib? (y/n): ")
					if msg == "y" then
						print("<color=green>:::RESUMING:::")
					end if
					
					if msg == "n" then
						print("<color=green>:::PROCESS ENDED:::")
						//breaking out of for statement
						//okay = true
						break
					end if
					
				end if
				TargetPort = p
				net = metax.net_use(ip,TargetPort)
				if not net then
					print("<color=yellow>Connection Failed...")
					net = null
					okay = false
					q = false
					R = null
					P = null
					cap = []
					stilst = []
					List = []
					continue
				end if
				Lib = net.dump_lib
				print("\n<color=orange>Searching for vulns. Target Library: " + Lib.lib_name + " " + Lib.version+"\n")
				Memories = metax.scan(Lib)
				for memory in Memories
					results = metax.scan_address(Lib, memory)
					List = []
					line = results.split(" ")
					//line.reverse
					for word in line
						new_word = word.values
						if word != "overflow." and word != "source..." and word != "user." and word.len > 2 then
							if new_word[-1] == "." then
								//print("word: "+word)
								word = word.remove(".")
								word = word.remove("<b>")
								word = word.remove("</b>")
								List.push(word)
							end if
						end if
					end for
					
					for payload in List
						
						q = true
						result = Lib.overflow(memory, payload, "1234")//changes password to '1234'
						if typeof(result) == "null" then
							print("<color=white>[<color=red>"+payload+"</color>] <color=red>unknown")
						else
							if typeof(result) == "shell" then
								print("<color=white>[<color=red>"+payload+"</color>] <color=red>computer")
								statement = "computer/"+Lib.lib_name+"/"+memory+"/"+payload
								global.e_db.set_content(global.e_db.get_content+statement+"\n")
								Content = remove_repeats(global.e_db)
								manual = result.host_computer.File("/usr/bin/Manual.exe")
								metaaa = result.host_computer.File("/lib/metaxploit.so")
								if not manual and not metaaa then a = "a" else print("<color=orange>The target is likely a Player!")
								if okay == true then
									print("<color=white>"+R+" ==> "+P)
									continue
								end if
								passwd = result.host_computer.File("/etc/passwd")
								if not passwd then
									print("<color=yellow>Password File Not Compromised!")
								end if
								if passwd then
									print("<color=orange>Password File Compromised!")
									if passwd.has_permission("r") then
										print("<color=orange>--decipher attempt succeeded!\n")
										lines = passwd.get_content.split("\n")
										root = lines[0]
										root = root.split(":")
										wait(.5)
										for line in lines
											pass = root[1]
											if pass == md5(line) then 
												R = root[0]
												P = line
												okay = true
												print("<color=white>"+R+" ==> "+P)
												continue
											end if
										end for
										if not opt.hasIndex(2) then
											for line in lines
												pass = root[1]
												if pass == md5(line) then 
													R = root[0]
													P = line
													okay = true
													print("<color=white>"+R+" ==> "+P)
													break
												end if
											end for
											if okay == true then continue
											password = crypto.decipher(root[1])
											print("<color=white>"+root[0]+" ==> "+password)
											R = root[0]
											P = password
											okay = true
											dict = get_shell.host_computer.File("/home/.dictionary.txt")
											dict.set_content(dict.get_content+password+"\n")
											print("<color=purple>***Sent to /home/.dictionary.txt***")
											Content = remove_repeats(dict)
										end if
									end if
									if not passwd.has_permission("r") then
										print("<color=yellow>--decipher attempt failed...")
									end if
								end if
								dict = get_shell.host_computer.File("/home/.dictionary.txt")
							end if
							
							if typeof(result) == "computer" then
								print("<color=white>[<color=red>"+payload+"</color>] <color=red>computer")
								statement = "computer/"+Lib.lib_name+"/"+memory+"/"+payload
								global.e_db.set_content(global.e_db.get_content+statement+"\n")
								Content = remove_repeats(global.e_db)
								manual = result.File("/usr/bin/Manual.exe")
								metaaa = result.File("/lib/metaxploit.so")
								if not manual and not metaaa then a = "a" else print("<color=orange>The target is likely a Player!")
								if okay == true then
									print("<color=white>"+R+" ==> "+P)
									continue
								end if
								passwd = result.File("/etc/passwd")
								if not passwd then
									print("<color=yellow>Password File Not Compromised!")
								end if
								if passwd then
									print("<color=orange>Password File Compromised!")
									if passwd.has_permission("r") then
										print("<color=orange>--decipher attempt succeeded!\n")
										lines = passwd.get_content.split("\n")
										root = lines[0]
										root = root.split(":")
										wait(.5)
										for line in lines
											line = line.split(":")
											pass = root[1]
											if pass == md5(line[1]) then 
												R = root[0]
												P = line[1]
												okay = true
												print("<color=white>"+R+" ==> "+P)
												continue
											end if
										end for
										if not opt.hasIndex(2) then
											for line in lines
												line = line.split(":")
												pass = root[1]
												if pass == md5(line[1]) then 
													R = root[0]
													P = line[1]
													okay = true
													print("<color=white>"+R+" ==> "+P)
													break
												end if
											end for
											if okay == true then continue
											password = crypto.decipher(root[1])
											print("<color=white>"+root[0]+" ==> "+password)
											R = root[0]
											P = password
											okay = true
											dict = get_shell.host_computer.File("/home/.dictionary.txt")
											dict.set_content(dict.get_content+password+"\n")
											print("<color=purple>***Sent to /home/.dictionary.txt***")
											Content = remove_repeats(dict)
										end if
									end if
									if not passwd.has_permission("r") then
										print("<color=yellow>--decipher attempt failed...")
									end if
								end if
								dict = get_shell.host_computer.File("/home/.dictionary.txt")
							end if
							
							if typeof(result) == "number" then
								print("<color=white>[<color=red>"+payload+"</color>] <color=red>number")
								okay = false
								sin = true
								statement = "number/"+Lib.lib_name+"/"+memory+"/"+payload
								global.e_db.set_content(global.e_db.get_content+statement+"\n")
								Content = remove_repeats(global.e_db)
							end if
							
							if typeof(result) == "file" then
								print("<color=white>[<color=red>"+payload+"</color>] <color=red>file")
								statement = "file/"+Lib.lib_name+"/"+memory+"/"+payload
								global.e_db.set_content(global.e_db.get_content+statement+"\n")
								Content = remove_repeats(global.e_db)
								files = result.get_files
								folders = result.get_folders
								for file in files
									if file.path.split("/")[1] == "bin" and files.len > 15 and files.len != 35 then 
										print("<color=red>PARENT: <color=white>/"+file.path.split("/")[1]+"</color> ***Too Long. Irregular Content***") 
									else if file.path.split("/")[1] == "bin" and files.len == 35 then 
										print("<color=red>PARENT: <color=white>/"+file.path.split("/")[1]+"</color> ***Too Long. Usual Content***")
										print("<color=orange>***Likely a server or npc!***")
									else if file.path.split("/")[1] == "bin" and files.len > 35 then
										print("<color=red>PARENT: <color=white>/"+file.path.split("/")[1]+"</color> ***Too Long. Very irregular Content***")
										print("<color=orange>***Likely a server or npc!***")
									else
										print("<color=red>PARENT: <color=white>/"+file.path.split("/")[1])
									end if
									break
								end for
								
								
								cap = []
								for file in files
									no = file.path.split("/")[1]
									if no == "bin" then continue
									perms = "perms"
									thing1 = "true"
									thing2 = "false"
									a = "<color=white>[<color=red>"+file.owner+" "+file.name+" "+perms+" "+thing1+"</color>]"
									b = "<color=white>[<color=red>"+file.owner+" "+file.name+" "+perms+" "+thing2+"</color>]"
									
									if file.has_permission("r") then
										cap.push(a)
									end if
									
									if not file.has_permission("r") then
										cap.push(b)
									end if
								end for
								cap = ""+cap.join("\n")
								print(format_columns(cap))
							end if
						end if
					end for
					d = d + 1
				end for
			end for
			List = []
			q = false
			okay = false
			continue
		end if
		
		if opt[0] == "router_spy" and opt.len == 1 then
			print("<color=blue>[<color=white>router_spy<color=blue>] [<color=white>ip<color=blue>] : <color=white>nmap for routers.")
			continue
		end if
		
		if opt[0] == "router_spy" and opt.len == 2 and typeof(opt[1]) == "string" then
			ip = null
			if not get_shell.host_computer.is_network_active then
				print("router_spy: can't connect. No internet access.")
				continue
			end if
			pieces = opt[1].values
			if not is_valid_ip(opt[1]) and pieces[0] != "w" then
				print("router_spy: invalid ip address")
				continue
			end if
			
			if pieces[0] == "w" then
				ip = nslookup(opt[1])
			else
				ip = opt[1]
			end if
			
			metaxploit = include_lib("/lib/metaxploit.so")
			if not metaxploit then exit("<color=red>***you don't have metaxploit.so in your /lib dir***")
			
			//integrate parse into msf
			parse = function(result)
				found = 0
				line = result.split(" ")
				line.reverse
				for word in line
					if found == 1 then
						word = word.remove(".")
						word = word.remove("<b>")
						word = word.remove("</b>")
						List.push(word)
						found = 0
					end if
					if found == 0 then
						if word == "Buffer" then
							found = 1
						end if
					end if
				end for
				
				return List
			end function
			router = get_router(ip).local_ip
			net = metaxploit.net_use(ip)
			if not net then
				print("connection failed")
				continue
			end if
			Lib = net.dump_lib
			print("<color=orange>Target Library: " + Lib.lib_name + " " + Lib.version)
			print("<color=purple>NOTE: password modifications set to '1234' ")
			Memories = metaxploit.scan(Lib)
			for memory in Memories
				print("<color=yellow>SCANNING MEMORY: " + memory)
				results = metaxploit.scan_address(Lib, memory)
				for payload in parse(results)
					q = true
					result = Lib.overflow(memory, payload, "1234")//changes password to '1234'
					if typeof(result) == "null" then
						print("<color=white>[<color=red>"+payload+"</color>] <color=red>unknown")
					else
						if typeof(result) == "shell" then
							print("<color=white>[<color=red>"+payload+"</color>] <color=red>computer")
							statement = "computer/"+Lib.lib_name+"/"+memory+"/"+payload
							global.e_db.set_content(global.e_db.get_content+statement+"\n")
							Content = remove_repeats(global.e_db)
							manual = result.host_computer.File("/usr/bin/Manual.exe")
							metaaa = result.host_computer.File("/lib/metaxploit.so")
							if not manual and not metaaa then a = "a" else print("<color=orange>The target is likely a Player!")
							if okay == true then
								print("<color=white>"+R+" ==> "+P)
								continue
							end if
							passwd = result.host_computer.File("/etc/passwd")
							if not passwd then
								print("<color=yellow>Password File Not Compromised!")
							end if
							if passwd then
								print("<color=orange>Password File Compromised!")
								if passwd.has_permission("r") then
									print("<color=orange>--decipher attempt succeeded!\n")
									lines = passwd.get_content.split("\n")
									root = lines[0]
									root = root.split(":")
									wait(.5)
									for line in lines
										pass = root[1]
										if pass == md5(line) then 
											R = root[0]
											P = line
											okay = true
											print("<color=white>"+R+" ==> "+P)
											continue
										end if
									end for
									if not opt.hasIndex(2) then
										for line in lines
											pass = root[1]
											if pass == md5(line) then 
												R = root[0]
												P = line
												okay = true
												print("<color=white>"+R+" ==> "+P)
												break
											end if
										end for
										if okay == true then continue
										password = crypto.decipher(root[1])
										print("<color=white>"+root[0]+" ==> "+password)
										R = root[0]
										P = password
										okay = true
										dict = get_shell.host_computer.File("/home/.dictionary.txt")
										dict.set_content(dict.get_content+password+"\n")
										print("<color=purple>***Sent to /home/.dictionary.txt***")
										Content = remove_repeats(dict)
									end if
								end if
								if not passwd.has_permission("r") then
									print("<color=yellow>--decipher attempt failed...")
								end if
							end if
							dict = get_shell.host_computer.File("/home/.dictionary.txt")
						end if
						
						if typeof(result) == "computer" then
							print("<color=white>[<color=red>"+payload+"</color>] <color=red>computer")
							statement = "computer/"+Lib.lib_name+"/"+memory+"/"+payload
							global.e_db.set_content(global.e_db.get_content+statement+"\n")
							Content = remove_repeats(global.e_db)
							manual = result.File("/usr/bin/Manual.exe")
							metaaa = result.File("/lib/metaxploit.so")
							if not manual and not metaaa then a = "a" else print("<color=orange>The target is likely a Player!")
							if okay == true then
								print("<color=white>"+R+" ==> "+P)
								continue
							end if
							passwd = result.File("/etc/passwd")
							if not passwd then
								print("<color=yellow>Password File Not Compromised!")
							end if
							if passwd then
								print("<color=orange>Password File Compromised!")
								if passwd.has_permission("r") then
									print("<color=orange>--decipher attempt succeeded!\n")
									lines = passwd.get_content.split("\n")
									root = lines[0]
									root = root.split(":")
									wait(.5)
									for line in lines
										line = line.split(":")
										pass = root[1]
										if pass == md5(line[1]) then 
											R = root[0]
											P = line[1]
											okay = true
											print("<color=white>"+R+" ==> "+P)
											continue
										end if
									end for
									if not opt.hasIndex(2) then
										for line in lines
											line = line.split(":")
											pass = root[1]
											if pass == md5(line[1]) then 
												R = root[0]
												P = line[1]
												okay = true
												print("<color=white>"+R+" ==> "+P)
												break
											end if
										end for
										if okay == true then continue
										password = crypto.decipher(root[1])
										print("<color=white>"+root[0]+" ==> "+password)
										R = root[0]
										P = password
										okay = true
										dict = get_shell.host_computer.File("/home/.dictionary.txt")
										dict.set_content(dict.get_content+password+"\n")
										print("<color=purple>***Sent to /home/.dictionary.txt***")
										Content = remove_repeats(dict)
									end if
								end if
								if not passwd.has_permission("r") then
									print("<color=yellow>--decipher attempt failed...")
								end if
							end if
							dict = get_shell.host_computer.File("/home/.dictionary.txt")
						end if
						
						if typeof(result) == "number" then
							print("<color=white>[<color=red>"+payload+"</color>] <color=red>number")
							okay = false
							sin = true
							statement = "number/"+Lib.lib_name+"/"+memory+"/"+payload
							global.e_db.set_content(global.e_db.get_content+statement+"\n")
							Content = remove_repeats(global.e_db)
						end if
						
						if typeof(result) == "file" then
							print("<color=white>[<color=red>"+payload+"</color>] <color=red>file")
							statement = "file/"+Lib.lib_name+"/"+memory+"/"+payload
							global.e_db.set_content(global.e_db.get_content+statement+"\n")
							Content = remove_repeats(global.e_db)
							files = result.get_files
							folders = result.get_folders
							for file in files
								if file.path.split("/")[1] == "bin" and files.len > 15 and files.len != 35 then 
									print("<color=red>PARENT: <color=white>/"+file.path.split("/")[1]+"</color> ***Too Long. Irregular Content***") 
								else if file.path.split("/")[1] == "bin" and files.len == 35 then 
									print("<color=red>PARENT: <color=white>/"+file.path.split("/")[1]+"</color> ***Too Long. Usual Content***")
									print("<color=orange>***Likely a server or npc!***")
								else if file.path.split("/")[1] == "bin" and files.len > 35 then
									print("<color=red>PARENT: <color=white>/"+file.path.split("/")[1]+"</color> ***Too Long. Very irregular Content***")
									print("<color=orange>***Likely a server or npc!***")
								else
									print("<color=red>PARENT: <color=white>/"+file.path.split("/")[1])
								end if
								break
							end for
							
							
							cap = []
							for file in files
								no = file.path.split("/")[1]
								if no == "bin" then continue
								perms = "perms"
								thing1 = "true"
								thing2 = "false"
								a = "<color=white>[<color=red>"+file.owner+" "+file.name+" "+perms+" "+thing1+"</color>]"
								b = "<color=white>[<color=red>"+file.owner+" "+file.name+" "+perms+" "+thing2+"</color>]"
								
								if file.has_permission("r") then
									cap.push(a)
								end if
								
								if not file.has_permission("r") then
									cap.push(b)
								end if
							end for
							cap = ""+cap.join("\n")
							print(format_columns(cap))
						end if
					end if
				end for
			end for
			List = []
			continue
		end if
		
		
		print("<color=yellow>"+opt[0]+": command not found.")
		continue
		
		
		
		
	end while
end function

nmap()
//make it so that number is more efficient
//beef up sweep
//simplify decipher process with wordlist
//Sweep but specify ports strictly
//Sweep but specify any ports to blacklist
//Fix bug in msf7 that prints ‘connection failed’ and ‘Port not found’ multiple times upon re-use
//Specify what unsecure values are and what modules are. Make a terminology glossary to do this. Call it ‘’more help”
