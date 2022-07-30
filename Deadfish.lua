-- Made by Xemt on Github
-- Made to work in Roblox Studio Scripts
-- This is from what I remember (Can't access computer at the moment)
i = 0
acc = 0
players = game:GetService("Players")
players.PlayerAdded:Connect(function(playa)
 playa.Chatted:Connect(function(msg)
   local lower = string.lower(msg)
   local prefix = "/"
   local args = string.split(lower, " ")
   if args[0] == prefix.."deadfish" then
    while i ~= #args[1] do
     i = i + 1
     achar = string.sub(args[1], i, i)
     if achar == "i" then
      acc = acc + 1
     end
     if achar == "d" then
      acc = acc - 1
     end
     if achar == "s" then
      acc = acc * acc
     end
     if achar == "o" then
      Chat:Chat(playa.character, "Output: "..acc, Enum.ChatColor.White)
     end
    end
   end
  end)
end)
