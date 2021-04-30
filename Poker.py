import random
from columnar import columnar
from colored import fg, bg, attr
PURPLE = '\033[1;35;48m'
RED = '\033[1;31;48m'
BLACK = '\033[1;30;48m'
UNDERLINE = '\033[4;37;48m'
END = '\033[1;37;0m'

A_spades = {"NAME":PURPLE+"A_spades", "VALUE":1, "SUIT":"s"}
A_hearts = {"NAME":RED+"A_hearts", "VALUE":1, "SUIT":"h"}
A_clubs = {"NAME":PURPLE+"A_clubs", "VALUE":1, "SUIT":"c"}
A_diamonds = {"NAME":RED+"A_diamonds", "VALUE":1, "SUIT":"d"}
two_spades = {"NAME":PURPLE+"2_spades", "VALUE":2, "SUIT":"s"}
two_hearts = {"NAME":RED+"2_hearts", "VALUE":2, "SUIT":"h"}
two_clubs = {"NAME":PURPLE+"2_clubs", "VALUE":2, "SUIT":"c"}
two_diamonds = {"NAME":RED+"2_diamonds", "VALUE":2, "SUIT":"d"}
three_spades = {"NAME":PURPLE+"3_spades", "VALUE":3, "SUIT":"s"}
three_hearts = {"NAME":RED+"3_hearts", "VALUE":3, "SUIT":"h"}
three_clubs = {"NAME":PURPLE+"3_clubs", "VALUE":3, "SUIT":"c"}
three_diamonds = {"NAME":RED+"3_diamonds", "VALUE":3, "SUIT":"d"}
four_spades = {"NAME":PURPLE+"4_spades", "VALUE":4, "SUIT":"s"}
four_hearts = {"NAME":RED+"4_hearts", "VALUE":4, "SUIT":"h"}
four_clubs = {"NAME":PURPLE+"4_clubs", "VALUE":4, "SUIT":"c"}
four_diamonds = {"NAME":RED+"4_diamonds", "VALUE":4, "SUIT":"d"}
five_spades = {"NAME":PURPLE+"5_spades", "VALUE":5, "SUIT":"s"}
five_hearts = {"NAME":RED+"5_hearts", "VALUE":5, "SUIT":"h"}
five_clubs = {"NAME":PURPLE+"5_clubs", "VALUE":5, "SUIT":"c"}
five_diamonds = {"NAME":RED+"5_diamonds", "VALUE":5, "SUIT":"d"}
six_spades = {"NAME":PURPLE+"6_spades", "VALUE":6, "SUIT":"s"}
six_hearts = {"NAME":RED+"6_hearts", "VALUE":6, "SUIT":"h"}
six_clubs = {"NAME":PURPLE+"6_clubs", "VALUE":6, "SUIT":"c"}
six_diamonds = {"NAME":RED+"6_diamonds", "VALUE":6, "SUIT":"d"}
seven_spades = {"NAME":PURPLE+"7_spades", "VALUE":7, "SUIT":"s"}
seven_hearts = {"NAME":RED+"7_hearts", "VALUE":7, "SUIT":"h"}
seven_clubs = {"NAME":PURPLE+"7_clubs", "VALUE":7, "SUIT":"c"}
seven_diamonds = {"NAME":RED+"7_diamonds", "VALUE":7, "SUIT":"d"}
eight_spades = {"NAME":PURPLE+"8_spades", "VALUE":8, "SUIT":"s"}
eight_hearts = {"NAME":RED+"8_hearts", "VALUE":8, "SUIT":"h"}
eight_clubs = {"NAME":PURPLE+"8_clubs", "VALUE":8, "SUIT":"c"}
eight_diamonds = {"NAME":RED+"8_diamonds", "VALUE":8, "SUIT":"d"}
nine_spades = {"NAME":PURPLE+"9_spades", "VALUE":9, "SUIT":"s"}
nine_hearts = {"NAME":RED+"9_hearts", "VALUE":9, "SUIT":"h"}
nine_clubs = {"NAME":PURPLE+"9_clubs", "VALUE":9, "SUIT":"c"}
nine_diamonds = {"NAME":RED+"9_diamonds", "VALUE":9, "SUIT":"d"}
ten_spades = {"NAME":PURPLE+"10_spades", "VALUE":10, "SUIT":"s"}
ten_hearts = {"NAME":RED+"10_hearts", "VALUE":10, "SUIT":"h"}
ten_clubs = {"NAME":PURPLE+"10_clubs", "VALUE":10, "SUIT":"c"}
ten_diamonds = {"NAME":RED+"10_diamonds", "VALUE":10, "SUIT":"d"}
J_spades = {"NAME":PURPLE+"J_spades", "VALUE":11, "SUIT":"s"}
J_hearts = {"NAME":RED+"J_hearts", "VALUE":11, "SUIT":"h"}
J_clubs = {"NAME":PURPLE+"J_clubs", "VALUE":11, "SUIT":"c"}
J_diamonds = {"NAME":RED+"J_diamonds", "VALUE":11, "SUIT":"d"}
Q_spades = {"NAME":PURPLE+"Q_spades", "VALUE":12, "SUIT":"s"}
Q_hearts = {"NAME":RED+"Q_hearts", "VALUE":12, "SUIT":"h"}
Q_clubs = {"NAME":PURPLE+"Q_clubs", "VALUE":12, "SUIT":"c"}
Q_diamonds = {"NAME":RED+"Q_diamonds", "VALUE":12, "SUIT":"d"}
K_spades = {"NAME":PURPLE+"K_spades", "VALUE":13, "SUIT":"s"}
K_hearts = {"NAME":RED+"K_hearts", "VALUE":13, "SUIT":"h"}
K_clubs = {"NAME":PURPLE+"K_clubs", "VALUE":13, "SUIT":"c"}
K_diamonds = {"NAME":RED+"K_diamonds", "VALUE":13, "SUIT":"d"}
deck = [A_spades,A_hearts,A_clubs,A_diamonds,two_spades,two_hearts,two_clubs,two_diamonds,three_spades,three_hearts,three_clubs,three_diamonds,four_spades,four_hearts,four_clubs,four_diamonds,five_spades,five_hearts,five_clubs,five_diamonds,six_spades,six_hearts,six_clubs,six_diamonds,seven_spades,seven_hearts,seven_clubs,seven_diamonds,eight_spades,eight_hearts,eight_clubs,eight_diamonds,nine_spades,nine_hearts,nine_clubs,nine_diamonds,ten_spades,ten_hearts,ten_clubs,ten_diamonds,J_spades,J_hearts,J_clubs,J_diamonds,Q_spades,Q_hearts,Q_clubs,Q_diamonds,K_spades,K_hearts,K_clubs,K_diamonds]
 
 
def deal(deck):
    
    rc = False
    okay = False
    global MyType 
    MyType = False
    global AIType
    AIType = False
    
    def River(list, list2):
        def c(list, list2):
            for i in range(1, 6):
                random.shuffle(list)
                random.shuffle(list)
                rc = list.pop(random.randrange(len(list)))
                list2.append(rc)
        c(list, list2)
    def MyHand(list, list2):
        def c(list, list2):
            for i in range(1, 3):
                random.shuffle(list)
                random.shuffle(list)
                random.shuffle(list)
                random.shuffle(list)
                rc = list.pop(random.randrange(len(list)))
                list2.append(rc)
        c(list, list2)
    def UrHand(list, list2):
        def c(list, list2):
            for i in range(1, 3):
                random.shuffle(list)
                random.shuffle(list)
                random.shuffle(list)
                random.shuffle(list)
                rc = list.pop(random.randrange(len(list)))
                list2.append(rc)
        c(list, list2)
    def index_in_list(a_list, index):
        print(index < len(a_list))
    def MyFlush(my_total_suit, MyType, GetType):
        okay = False
        last = []
        S = 0
        H = 0
        D = 0
        C = 0
        for suit in my_total_suit:
            if suit == "s":
                S=S+1
            if suit == "h":
                H=H+1
            if suit == "d":
                D=D+1
            if suit == "c":
                C=C+1
        last.append(S)
        last.append(H)
        last.append(D)
        last.append(C)
        for amount in last:
            if amount >= 5:
                okay = True
        if okay == True:
            okay = False
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Flush"
            MyType = ""+color+msg+reset
            Id = 6
            GetType["My"] = [MyType, Id]
            return GetType["My"]
        else:    
            return GetType["My"]
    #MyFlush(my_total_suit, MyType)
    def AIFlush(ai_total_suit, AIType, GetType):
        okay = False
        last = []
        S = 0
        H = 0
        D = 0
        C = 0
        for suit in ai_total_suit:
            if suit == "s":
                S=S+1
            if suit == "h":
                H=H+1
            if suit == "d":
                D=D+1
            if suit == "c":
                C=C+1
        last.append(S)
        last.append(H)
        last.append(D)
        last.append(C)
        for amount in last:
            if amount >= 5:
                okay = True
        if okay == True:
            okay = False
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Flush"
            AIType = ""+color+msg+reset
            Id = 6
            GetType["AI"] = [AIType, Id]
            return GetType["AI"]
        else:
            return GetType["AI"]
    #AIFlush(ai_total_suit, AIType)
    def MyTwoThreeFour(my_total_value, MyType, GetType):
        f = False
        list = []
        for index in my_total_value:
            f = my_total_value.count(index)
            list.append(f)
        if list == [1,1,1,1,1,1,1]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "HighCard"
            MyType = ""+color+msg+reset
            Id = 1
            GetType["My"] = [MyType, Id]
            return GetType["My"]
        two = 0
        three = 0
        four = 0
        for item in list:
            if item == 2:
                two=two+1
            if item == 3:
                three=three+1
            if item == 4:
                four=four+1
        list2 = [two,three,four]
        if list2 == [4, 0, 0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Two Pair"
            MyType = ""+color+msg+reset
            Id = 3
            GetType["My"] = [MyType, Id]
            return GetType["My"]
        if list2 == [0, 3, 0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Three Of A Kind"
            MyType = ""+color+msg+reset
            Id = 4
            GetType["My"] = [MyType, Id]
            return GetType["My"]
        if list2 == [4, 3, 0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Full House"
            MyType = ""+color+msg+reset
            Id = 7
            GetType["My"] = [MyType, Id]
            return GetType["My"]
        if list2 == [2, 3, 0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Full House"
            MyType = ""+color+msg+reset
            Id = 7
            GetType["My"] = [MyType, Id]
            return GetType["My"]
        if list2 == [2, 0, 0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Pair"
            MyType = ""+color+msg+reset
            Id = 2
            GetType["My"] = [MyType, Id]
            return GetType["My"]
        if list2 == [2, 0, 4]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Four Of A Kind"
            MyType = ""+color+msg+reset
            Id = 8
            GetType["My"] = [MyType, Id]
            return GetType["My"]
        if list2 == [0, 3, 4]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Four Of A Kind"
            MyType = ""+color+msg+reset
            Id = 8
            GetType["My"] = [MyType, Id]
            return GetType["My"]
        if list2 == [0, 6, 0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Three Of A Kind"
            MyType = ""+color+msg+reset
            Id = 4
            GetType["My"] = [MyType, Id]
            return GetType["My"]
        if list2 == [6,0,0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Two Pair"
            MyType = ""+color+msg+reset
            Id = 3
            GetType["My"] = [MyType, Id]
            return GetType["My"]
        
    def AITwoThreeFour(ai_total_value, AIType, GetType):
        f = False
        list = []
        for index in ai_total_value:
            f = ai_total_value.count(index)
            list.append(f)
        if list == [1,1,1,1,1,1,1]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "HighCard"
            AIType = ""+color+msg+reset
            Id = 1
            GetType["AI"] = [AIType, Id]
            return GetType["AI"]
        two = 0
        three = 0
        four = 0
        for item in list:
            if item == 2:
                two=two+1
            if item == 3:
                three=three+1
            if item == 4:
                four=four+1
        list2 = [two,three,four]
        if list2 == [4, 0, 0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Two Pair"
            AIType = ""+color+msg+reset
            Id = 3
            GetType["AI"] = [AIType, Id]
            return GetType["AI"]
        if list2 == [0, 3, 0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Three Of A Kind"
            AIType = ""+color+msg+reset
            Id = 4
            GetType["AI"] = [AIType, Id]
            return GetType["AI"]
        if list2 == [4, 3, 0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Full House"
            AIType = ""+color+msg+reset
            Id = 7
            GetType["AI"] = [AIType, Id]
            return GetType["AI"]
        if list2 == [2, 3, 0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Full House"
            AIType = ""+color+msg+reset
            Id = 7
            GetType["AI"] = [AIType, Id]
            return GetType["AI"]
        if list2 == [2, 0, 0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Pair"
            AIType = ""+color+msg+reset
            Id = 2
            GetType["AI"] = [AIType, Id]
            return GetType["AI"]
        if list2 == [2, 0, 4]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Four Of A Kind"
            AIType = ""+color+msg+reset
            Id = 8
            GetType["AI"] = [AIType, Id]
            return GetType["AI"]
        if list2 == [0, 3, 4]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Four Of A Kind"
            AIType = ""+color+msg+reset
            Id = 8
            GetType["AI"] = [AIType, Id]
            return GetType["AI"]
        if list2 == [0, 6, 0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Three Of A Kind"
            AIType = ""+color+msg+reset
            Id = 4
            GetType["AI"] = [AIType, Id]
            return GetType["AI"]
        if list2 == [6,0,0]:
            color = fg("dark_orange_3a") + attr("bold")
            reset = attr("reset")
            msg = "Two Pair"
            AIType = ""+color+msg+reset
            Id = 3
            GetType["AI"] = [AIType, Id]
            return GetType["AI"]
    
    Des = 0
    Sed = 0 
    ###################################################################################
    while True:
        GetType = {}
        GetType["My"] = [False, 0]
        GetType["AI"] = [False, 0]
        
        river = []
        my_hand = []
        ur_hand = []
        
        River(deck, river)
        MyHand(deck, my_hand)
        UrHand(deck, ur_hand)
        my_total_suit = []
        my_total_value = []
        ai_total_suit = []
        ai_total_value = []
        for item in river:
            my_total_suit.append(item["SUIT"])
            my_total_value.append(item["VALUE"])
            ai_total_suit.append(item["SUIT"])
            ai_total_value.append(item["VALUE"])
        for item in my_hand:
            my_total_suit.append(item["SUIT"])
            my_total_value.append(item["VALUE"])
        for item in ur_hand:
            ai_total_suit.append(item["SUIT"])
            ai_total_value.append(item["VALUE"])


        result1 = {}
        result2 = {}
        m = False
        a = False

        if MyTwoThreeFour(my_total_value, MyType, GetType)[0] != False:
            m = MyTwoThreeFour(my_total_value, MyType, GetType)
        if MyFlush(my_total_suit, MyType, GetType)[0] != False:
            m = MyFlush(my_total_suit, MyType, GetType)
        if AITwoThreeFour(ai_total_value, AIType, GetType)[0] != False:
            a = AITwoThreeFour(ai_total_value, AIType, GetType)
        if AIFlush(ai_total_suit, AIType, GetType)[0] != False:
            a = AIFlush(ai_total_suit, AIType, GetType)
            
        if m != False and a != False:#THIS HAS TO BE 'AND'. Will work out when all logic functions are created.
            MyType = m[0]
            AIType = a[0]
            result = {"My":MyType, "AI":AIType}
            if (result["My"][1] == 2 and result["AI"][1] == 3) or (result["My"][1] == 3 and result["AI"][1] == 2) and Sed < 2:
                Sed=Sed+1
                continue
            result2 = {"My":m[1], "AI":a[1]}
            l = []
            if result2["My"] == result2["AI"]:
                x = random.randint(1, 1001)
                if x > 50 and Des < 2:
                    Des=Des+1
                    continue
                else:
                    for i in river:
                        print(i["NAME"])
                    print()
                    if result != {}:       
                        print(BLACK+"My Hand: "+result["My"])
                        print(my_hand[0]["NAME"]+" "+my_hand[1]["NAME"]+"\n"+"                         "+BLACK+"AI hand: "+result["AI"])
                        print("                        "+ur_hand[0]["NAME"]+" "+ur_hand[1]["NAME"])
                        color = fg("yellow") + attr("bold")
                        reset = attr("reset")
                        msg = ""+color+"      TIE!"+reset
                        print(msg)
                        GetType["My"] = [False, 0]
                        GetType["AI"] = [False, 0]
                        break
                    
            if result2["My"] > result2["AI"]:
                for i in river:
                    print(i["NAME"])
                print()
                if result != {}:       
                    print(BLACK+"My Hand: "+result["My"])
                    print(my_hand[0]["NAME"]+" "+my_hand[1]["NAME"]+"\n"+"                         "+BLACK+"AI hand: "+result["AI"])
                    print("                        "+ur_hand[0]["NAME"]+" "+ur_hand[1]["NAME"])
                    color = fg("yellow") + attr("bold")
                    reset = attr("reset")
                    msg = ""+color+"      YOU WIN!"+reset
                    print(msg)
                    break
            if result2["My"] < result2["AI"]:
                for i in river:
                    print(i["NAME"])
                print()
                if result != {}:       
                    print(BLACK+"My Hand: "+result["My"])
                    print(my_hand[0]["NAME"]+" "+my_hand[1]["NAME"]+"\n"+"                         "+BLACK+"AI hand: "+result["AI"])
                    print("                        "+ur_hand[0]["NAME"]+" "+ur_hand[1]["NAME"])
                    color = fg("yellow") + attr("bold")
                    reset = attr("reset")
                    msg = ""+color+"      YOU LOSE!"+reset
                    print(msg)
                    break
        GetType["My"] = [False, 0]
        GetType["AI"] = [False, 0]
        my_total_suit = []
        my_total_value = []
        ai_total_suit = []
        ai_total_values = []
deal(deck)
