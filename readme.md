## config

| option   | default                  | description                                                                          | location  |
| -------- | ------------------------ | ------------------------------------------------------------------------------------ | --------- |
| exit     | 0                        | exit on error                                                                        | print     |
| moneypit | 0                        | throw money into moneypit                                                            | idle      |
| rmode    | 1                        | rebirth mode: 1 = tm, 2 = augs, 3 = wish, 4 = ngu)                                   | rebirth   |
| aug      | 3                        | aug for rebirth                                                                      | rebirth   |
| slowcd   | 0                        | 1 if attack is off cd before enemy spawns                                            | toweridle |
| ring     | 0                        | equip RoM for respawn and cd reduction (bottom right corner of first inventory page) | toweridle |
| quest    | 0                        | do quests instead of itopod                                                          | goToAdv   |
| heal     | 0                        | heal in safe zone                                                                    | snipe     |
| parry2x  | 0                        | wait for second parry                                                                | snipe     |
| prebuff  | 0                        | cast v immediately when searching for enemy                                          | snipe     |
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
