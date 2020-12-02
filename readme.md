## config

| option   | default                  | description                                                                          | location  |
| -------- | ------------------------ | ------------------------------------------------------------------------------------ | --------- |
| fstop    | 0                        | stop on focus lost                                                                   | waitFor   |
| lazystop | 0                        | set lazy itopod shifter on stop                                                      | lazystop  |
| moneypit | 0                        | throw money into moneypit                                                            | idle      |
| aug      | 3                        | aug for rebirth                                                                      | rebirth   |
| spell    | 8                        | spell # (1-8)                                                                        | rebirth   |
| ring     | 0                        | equip RoM for respawn and cd reduction (bottom right corner of first inventory page) | toweridle |
| quest    | 0                        | do quests instead of itopod                                                          | goToAdv   |
| dist1    | 1                        | minutes until first distribution (tm)                                                | thirtyMin |
| dist2    | 4                        | minutes until second distribution (tm)                                               | thirtyMin |
| dist3    | 7                        | minutes until third distribution (augs)                                              | thirtyMin |
| dist4    | 20                       | minutes until fourth distribution (augs)                                             | thirtyMin |
| total    | 30                       | total minutes until rebirth                                                          | thirtyMin |
| heal     | 0                        | heal in safe zone                                                                    | snipe     |
| charge2x | 0                        | wait for second charge                                                               | snipe     |
| zone     | 0                        | zones to go back                                                                     | snipe     |
| move     | 1                        | move to wait for: 0 = none, 1 = charge, 2 = megabuff                                 | snipe     |
| atk      | ytewa                    | attack order                                                                         | snipe     |
| questdur | 8                        | quest duration in m                                                                  | quest     |
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
