-- Made by Xemt on Github
-- This is an attempt, and hasn't been tested yet
a = 0 -- First DS Var
b = 0 -- Second DS Var
c = 0 -- Third DS Var
i = 0
players = game:GetService("Players")
players.PlayerAdded:Connect(function(playa)
 playa.Chatted:Connect(function(msg)
   local lower = string.lower(msg)
   local prefix = "/"
   local args = string.split(lower, " ")
   if args[0] == prefix.."dscript" then
    if args[1] == "output" then
     i = 1
     while i ~= #args do
      i = i + 1
      Chat:Chat(playa.character, args[i], Enum.ChatColor.White)
     end
    end
    if args[1] == "outvar" then
     if args[2] == "a" then
      Chat:Chat(playa.character, a, Enum.ChatColor.White)
     end
     if args[2] == "b" then
      Chat:Chat(playa.character, b, Enum.ChatColor.White)
     end
     if args[2] == "c" then
      Chat:Chat(playa.character, c, Enum.ChatColor.White)
     end
    end
    if args[1] == "set" then
     
    end
    if args[1] == "math" then
    
    end
    if args[1] == "switch" then
    
    end
   end
 end)
end)
