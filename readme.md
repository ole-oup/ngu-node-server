## config

| option   | default                  | description                                                                          | location  |
| -------- | ------------------------ | ------------------------------------------------------------------------------------ | --------- |
| ring     | 0                        | equip RoM for respawn and cd reduction (bottom right corner of first inventory page) | toweridle |
| quest    | 0                        | do quests instead of itopod                                                          | goToAdv   |
| fstop    | 0                        | stop on focus lost                                                                   | waitFor   |
| lazystop | 1                        | set lazy itopod shifter on stop                                                      | lazystop  |
| questdur | 8                        | quest duration in m                                                                  | quest     |
| aug      | 3                        | aug for rebirth                                                                      | rebirth   |
| spell    | 8                        | spell # (1-8)                                                                        | rebirth   |
| dist1    | 1                        | minutes until first distribution (tm)                                                | thirtyMin |
| dist2    | 4                        | minutes until second distribution (tm)                                               | thirtyMin |
| dist3    | 7                        | minutes until third distribution (augs)                                              | thirtyMin |
| dist4    | 20                       | minutes until fourth distribution (augs)                                             | thirtyMin |
| total    | 30                       | total minutes until rebirth                                                          | thirtyMin |
| zone     | 0                        | zones to go back                                                                     | snipe     |
| move     | 1                        | move to wait for: 0 = none, 1 = charge, 2 = megabuff                                 | snipe     |
| heal     | 0                        | heal in safe zone                                                                    | snipe     |
| idle     | 60                       | backup idle duration                                                                 | snipe     |
| atk      | ytewa                    | attack order                                                                         | snipe     |
| wishes   | ["11", "12", "13", "14"] | selected wishes                                                                      | rebirth   |
| hack     | "hack"                   | selected hack                                                                        | rebirth   |

## server status

| status | description |
| ------ | ----------- |
| 0      | Error       |
| 1      | Success     |
| 2      | Running     |

cd muss immer kleiner als respawn sein also cd immer >1s ohne cd reduction oder >0.85s mit

guff run: (thirtym)
neuen rb starten
loadout equippen, möglichst 1 min max res (ansonsten dist1 anpassen?)
autospell number boost!
