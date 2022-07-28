-- Made by Xemt on Github
-- This is an attempt, and hasn't been tested yet
players = game:GetService("Players")
players.PlayerAdded:Connect(function(playa)
 playa.Chatted:Connect(function(msg)
   local lower = string.lower(msg)
   local prefix = "/"
   local args = string.split(lower, " ")
   if args[0] == prefix.."dthscrpt" then
   
   end
 end)
end)
