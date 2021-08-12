pink="<color=#FF00CD>"
orange="<color=#FF9225>"
blue="<color=#2581FF>"
error="<color=#878787>"
white="<color=white>"
red="<color=red>"
b="<b>"
u="<u>"
b2="</b>"
u2="</u>"
ErrorCode="ATM"

Color=function(val)
	if typeof(val) != "string" then return red+"CUSTOM ERROR "+ErrorCode+": Color(val): parameter (val):'"+val+"' is not a valid param...\n"
	list=val.values
	if val.values[0] == "<" then
		val = slice(list, list.indexOf("=")+1, list.indexOf(">")).join("")
	end if
	return "<color="+val+">"
end function

Align=function(val="left")
	l=["center", "left", "right"]
	res=false
	for i in l
		if val == i then
			res=val
			break
		end if
	end for
	if res != false then return "<align="+res+">" else return red+"CUSTOM ERROR "+ErrorCode+": Align(val): parameter (val):'"+val+"' is not a valid param...\n"
end function

Size=function(val)
	if typeof(val) != "number" then return red+"CUSTOM ERROR "+ErrorCode+": Size(val): parameter (val):'"+val+"' is not a valid param...\n"
	if val > 19 then val = 19
	return "<size="+val+">"
end function

Mark=function(val)
	if typeof(val) != "string" then return red+"CUSTOM ERROR "+ErrorCode+": Color(val): parameter (val):'"+val+"' is not a valid param...\n"
	list=val.values
	if val.values[0] == "<" then
		val = slice(list, list.indexOf("=")+1, list.indexOf(">")).join("")
	end if
	return "<mark="+val+">"
end function

Alert=function(val)
	str=Align("center")+b+Color(orange)+"***"+val+"***\n"+Align("center")+"\n"
	return str
end function

End=function(val)
	l=["color", "align", "size", "mark"]
	res=false
	for i in l
		if val == i then
			res=val
			break
		end if
	end for

	if res != false then return "</"+val+">" else return red+"CUSTOM ERROR "+ErrorCode+": End(val): parameter (val):'"+val+"' is not a valid param...\n"
end function


Head=function(str)
	if typeof(str) != "string" then return red+"CUSTOM ERROR "+ErrorCode+": Head(str): parameter (str):'"+val+"' is not a valid param...\n"
	roof="‾" //https://www.compart.com/en/unicode/U+203E
	butt = b+Color(blue)+"\"+Size(19)+Color(orange)+char(9633)+End("size")+End("color")+roof+"| "+End("color")+b2
	return butt+str
end function

Body=function(list, indie=false)
	roof="‾" //https://www.compart.com/en/unicode/U+203E
	wall=b+Color(blue)+"|"+End("color")+b2
	result=[]
	num=0
	space=" "
	length=[]
	//create a parser
	for i in list
		check=false
		l = i.values
		for i in l
			if i == "<" then check=true
			if i == ">" then
				check=false
				continue
			end if
			if check == false then length.push(i)
		end for
		if num <= length.len then num=length.len
		length=[]
	end for
	//find longest item in list


	if indie != "custom" then exp = num+1 else exp=35
	top=[b+Color(blue)+space+"\_ "+roof*exp]
	if list != [] then result.push(top)
	list[0]="\n"+space*3+wall+space+list[0]
	list=top+list
	result=list.join("\n"+space*3+wall+space)
	//for i in list
		//str = space*3+wall+space+i
		//result.push(str)
	//end for

	return result
end function
