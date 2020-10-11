import click from './click.js';

export const positions = {
  Inputs: {
    ECapCap: [676, 20],
    ECapHalf: [706, 20],
    ECapQuarter: [735, 20],
    ECapCustom1: [765, 20],
    ECapCustom2: [795, 20],
    EIdleHalf: [866, 20],
    EIdleQuarter: [896, 20],
    EIdleCustom: [926, 20],
    MCapCap: [675, 42],
    MCapHalf: [706, 42],
    MCapQuarter: [735, 42],
    MCapCustom1: [765, 42],
    MCapCustom2: [795, 42],
    MIdleHalf: [866, 42],
    MIdleQuarter: [896, 42],
    MIdleCustom: [926, 42],
    R3CapCap: [675, 65],
    R3CapHalf: [706, 65],
    R3CapQuarter: [735, 65],
    R3CapCustom1: [765, 65],
    R3CapCustom2: [795, 65],
    R3IdleHalf: [866, 65],
    R3IdleQuarter: [896, 65],
    R3IdleCustom: [926, 65],
    InputCustom1: [357, 42],
    InputCustom2: [460, 42],
    InputCustom3: [357, 65],
    InputCustom4: [460, 65],
  },
  FightBoss: {
    Menu: [233, 50],
    Nuke: [626, 150],
    Stop: [626, 207],
    Fight: [626, 259],
  },
  MoneyPit: {
    Menu: [233, 76],
    FeedMe: [430, 166],
  },
  Adventure: {
    Menu: [233, 104],
    IdleMode: [370, 103],
    RegularAttack: [474, 103],
    StrongAttack: [578, 103],
    Parry: [683, 103],
    PiercingAttack: [787, 103],
    UltimateAttack: [893, 103],
    Block: [370, 139],
    DefensiveBuff: [474, 139],
    Heal: [578, 139],
    OffensiveBuff: [683, 139],
    Charge: [787, 139],
    UltimateBuff: [893, 139],
    Paralyze: [370, 175],
    HyperRegen: [474, 175],
    BEASTMode: [578, 175],
    MegaBuff: [683, 175],
    OhShit: [787, 175],
    EnterITOPOD: {
      Button: [372, 224],
      Optimal: [706, 208],
      MaxFloor: [706, 242],
      StartFloor: [625, 199],
      EndFloor: [625, 235],
      Enter: [629, 297],
      BluePill: [549, 352],
      Shifter: [549, 389],
      Close: [576, 450],
    },
    Perks: [451, 226],
    ZoneDropdownList: [835, 212],
    LeftArrow: [735, 210],
    RightArrow: [937, 210],
  },
  Augmentation: {
    Menu: [233, 159],
    // (The following values are when the Aug windows is scrolled completely up (top values visible) :
    ScissorPlus: [538, 263],
    ScissorsMinus: [573, 263],
    DangerPlus: [538, 289],
    DangerMinus: [573, 289],
    MilkPlus: [538, 327],
    MilkMinus: [573, 327],
    DrinkPlus: [538, 356],
    DrinkMinus: [573, 356],
    CannonPlus: [538, 392],
    CannonMinus: [573, 392],
    MissilePlus: [538, 420],
    MissileMinus: [573, 420],
    ShoulderPlus: [538, 457],
    ShoulderMinus: [573, 457],
    AmmoPlus: [538, 486],
    AmmoMinus: [573, 486],
    BusterPlus: [538, 523],
    BusterMinus: [573, 523],
    ChargePlus: [538, 551],
    ChargeMinus: [573, 551],
    // (The folllowing values are when the Augments window is scrolled completely down (bottom values visible) :
    ExoPlus: [538, 448],
    ExoMinus: [573, 448],
    ShieldPlus: [538, 476],
    ShieldMinus: [573, 476],
    SwordPlus: [538, 512],
    SwordMinus: [573, 512],
    QuadPlus: [538, 542],
    QuadMinus: [573, 542],
  },
  TimeMachine: {
    Menu: [233, 211],
    TMEPlus: [533, 235],
    TMEMinus: [567, 235],
    TMMPlus: [533, 331],
    TMMMinus: [567, 331],
  },
  BloodMagic: {
    Menu: [233, 238],
    CapAll: [824, 110],
    TackPlus: [494, 225],
    TackMinus: [532, 225],
    TackCap: [567, 225],
    CutsPlus: [494, 261],
    CutsMinus: [532, 261],
    CutsCap: [567, 261],
    HickeyPlus: [494, 296],
    HickeyMinus: [532, 296],
    HickeyCap: [567, 296],
    BarbPlus: [494, 333],
    BarbMinus: [532, 333],
    BarbCap: [567, 333],
    BankPlus: [494, 366],
    BankMinus: [532, 366],
    BankCap: [567, 366],
    DecapPlus: [494, 400],
    DecapMinus: [532, 400],
    DecapCap: [567, 400],
    ChipperPlus: [494, 435],
    ChipperMinus: [532, 435],
    ChipperCap: [567, 435],
    InsideOutPlus: [494, 472],
    InsideOutMinus: [532, 472],
    InsideOutCap: [567, 472],
    Spells: {
      Button: [395, 114],
      Number: [396, 217],
      NumberAutoSpell: [511, 217],
      IronPill: [735, 217],
      Spaghetti: [396, 310],
      SpaghettiAutoSpell: [511, 310],
      Gold: [735, 310],
      GoldAutoSpell: [848, 310],
      GuffA: [396, 432],
    },
  },
  Wandoos: {
    Menu: [233, 266],
    ePlus: [551, 250],
    eMinus: [587, 250],
    eCap: [625, 250],
    mPlus: [551, 348],
    mMinus: [587, 348],
    mCap: [625, 348],
    W98Check: [325, 418],
    MEHCheck: [325, 443],
    XLCheck: [325, 468],
  },
  NGU: {
    Menu: [233, 293],
    SwitchMode: [378, 110],
    CapAll: [628, 160],
  },
  Diggers: { Menu: [233, 346], CapSaved: [798, 113] },
  Questing: {
    Menu: [233, 401],
    CompleteQuest: [708, 161],
    SkipQuest: [858, 161],
    UseMajorCheck: [696, 205],
    UseButter: [825, 242],
    IdleToggle: [496, 559],
    GoToQuestZone: [360, 560],
  },
  Hacks: {
    Menu: [233, 427],
    Page2: [399, 183],
    HackPlus: [891, 420],
  },
  Wishes: {
    Menu: [233, 455],
    ClearWish: [858, 114],
    Eplus: [609, 221],
    Eminus: [638, 221],
    Mplus: [739, 221],
    Mminus: [768, 221],
    Rplus: [866, 221],
    Rminus: [897, 221],
    Page1: [338, 255],
    Page2: [404, 255],
  },
  Cards: {
    Menu: [233, 482],
  },
  Rebirth: {
    Menu: [88, 423],
    Rebirth: [542, 521],
    Yeah: [435, 318],
  },
};

export const button = (data, pos, rightclick) => {
  let p = { x: pos[0], y: pos[1] };
  return click(data.crd, p.x, p.y, rightclick === 'rc' ? true : false);
};

/*
SpendEXP				88	452
SaveGame				46	482
LoadGame				121	482
Settings				29	543
Info				103	541
Shop				233	556
Basic Training				233	23
Money Pit				233	76
	Feed Me			430	166
	Daily Spin			821	240
		Spin Me		529	561
		No BS		724	561

Inventory				233	130
	Item List			692	85
	Daycare			692	129
	Guff			692	175
	Loadouts			648	256
	L1			329	257
	L2			360	257
	L3			389	257
	L4			419	257
	L5			450	257
	L6			480	257
	L7			510	257
	L8			540	257
	L9			570	257
	L10			590	257

Adv. Training				233	184
	ToughnessPlus			891	227
	ToughnessMinus			926	227
	PowerPlus			891	267
	PowerMinus			926	267
	DmgRedPlus			891	307
	DmgRedMinus			926	307
	WandoosEPlus			891	347
	WandoosEMinus			926	347
	WandoosMPlus			891	388
	WandoosMMinus			926	388

NGU				233	293
	SwitchMode			378	110
	CapModInput			430	136
	CapAll			628	160
	NormalCheck			780	122
	EvilCheck			780	143
	SadCheck			780	164
	Energy:				
		AugCap		590	240
		WandoosCap		590	275
		RespawnCap		590	310
		GoldCap		590	345
		AdvACap		590	380
		PowACap		590	415
		DCCap		590	450
		MagicCap		590	485
		PPCap		590	520
	Magic:				
		YggCap		590	240
		EXPCap		590	275
		PowBCap		590	310
		NumberCap		590	345
		TMCap		590	380
		EnergyCap		590	415
		AdvBCap		590	450
Ygg				233	319
	Page1			344	113
		FoG_Eat		351	176
		FoG_Upgrade		410	176
		FoG_UsePoop		455	176
		FoG_EatCheck		330	202
		FoG_HarvestChesk		415	202
		FoPA_Eat		560	176
		FoPA_Upgrade		620	176
		FoPA_UsePoop		667	176
		FoPA_EatCheck		541	202
		FoPA_HarvestChesk		626	202
		FoA_Eat		772	176
		FoA_Upgrade		831	176
		FoA_UsePoop		877	176
		FoA_EatCheck		753	202
		FoA_HarvestChesk		837	202
		FoK_Eat		351	273
		FoK_Upgrade		410	273
		FoK_UsePoop		455	273
		FoK_EatCheck		330	298
		FoK_HarvestChesk		415	298
		POM_Eat		560	273
		POM_Upgrade		620	273
		POM_UsePoop		667	273
		POM_EatCheck		541	298
		POM_HarvestChesk		626	298
		FoL_Eat		772	273
		FoL_Upgrade		831	273
		FoL_UsePoop		877	273
		FoL_EatCheck		753	298
		FoL_HarvestChesk		837	298
		FoPB_Eat		351	367
		FoPB_Upgrade		410	367
		FoPB_UsePoop		455	367
		FoPB_EatCheck		330	393
		FoPB_HarvestChesk		415	393
		FoAP_Eat		560	367
		FoAP_Upgrade		620	367
		FoAP_UsePoop		667	367
		FoAP_EatCheck		541	393
		FoAP_HarvestChesk		626	393
		FoN_Eat		772	367
		FoN_Upgrade		831	367
		FoN_UsePoop		877	367
		FoN_EatCheck		753	393
		FoN_HarvestChesk		837	393
	Page2			406	113
		FoR_Eat		351	176
		FoR_Upgrade		410	176
		FoR_UsePoop		455	176
		FoR_EatCheck		330	202
		FoR_HarvestChesk		415	202
		GuffA_Eat		560	176
		GuffA_Upgrade		620	176
		GuffA_UsePoop		667	176
		GuffA_EatCheck		541	202
		GuffA_HarvestChesk		626	202
		FoPd_Eat		772	176
		FoPd_Upgrade		831	176
		FoPd_UsePoop		877	176
		FoPd_EatCheck		753	202
		FoPd_HarvestChesk		837	202
		Melon_Eat		351	273
		Melon_Upgrade		410	273
		Melon_UsePoop		455	273
		Melon_EatCheck		330	298
		Melon_HarvestChesk		415	298
		GuffB_Eat		560	273
		GuffB_Upgrade		620	273
		GuffB_UsePoop		667	273
		GuffB_EatCheck		541	298
		GuffB_HarvestChesk		626	298
		Quirk_Eat		772	273
		Quirk_Upgrade		831	273
		Quirk_UsePoop		877	273
		Quirk_EatCheck		753	298
		Quirk_HarvestChesk		837	298
		AMayo_Eat		351	367
		AMayo_Upgrade		410	367
		AMayo_UsePoop		455	367
		AMayo_EatCheck		330	393
		AMayo_HarvestChesk		415	393
		SMayo_Eat		560	367
		SMayo_Upgrade		620	367
		SMayo_UsePoop		667	367
		SMayo_EatCheck		541	393
		SMayo_HarvestChesk		626	393
		MMayo_Eat		772	367
		MMayo_Upgrade		831	367
		MMayo_UsePoop		877	367
		MMayo_EatCheck		753	393
		MMayo_HarvestChesk		837	393
	Page3			471	113
		ALMayo_Eat		351	176
		ALMayo_Upgrade		410	176
		ALMayo_UsePoop		455	176
		ALMayo_EatCheck		330	202
		ALMayo_HarvestChesk		415	202
		CDMayo_Eat		560	176
		CDMayo_Upgrade		620	176
		CDMayo_UsePoop		667	176
		CDMayo_EatCheck		541	202
		CDMayo_HarvestChesk		626	202
		PMayo_Eat		772	176
		PMayo_Upgrade		831	176
		PMayo_UsePoop		877	176
		PMayo_EatCheck		753	202
		PMayo_HarvestChesk		837	202
	HarvestAllMax			817	446
	HarvestAll			817	489
	PoopMaxCheck			712	530
Diggers				233	346
	SaveToList			798	83
	ClearAllActive			906	98
	CapSaved			798	113
	Page1			341	110
		DCCap		548	185
		DCCheck		340	236
		WandoosCap		865	185
		WandoosCheck		656	236
		StatCap		548	376
		StatCheck		340	427
		AdvCap		865	376
		AdvCheck		656	427
	Page2			405	110
		ENGUCap		548	185
		ENGUCheck		340	236
		MNGUCap		865	185
		MNGUCheck		656	236
		EBeardCap		548	376
		EBeardCheck		340	427
		MBeardCap		865	376
		MBeardCheck		656	427
	Page3			468	110
		PPCap		548	185
		PPCheck		340	236
		DaycareCap		865	185
		DaycareCheck		656	236
		BloodCap		548	376
		BloodCheck		340	427
		EXPCap		865	376
		EXPCheck		656	427
Beards				233	375
	BeardActiveCheck			315	232
	ClearAllBeards			453	232
	FuBeard			313	318
	RevBeard			313	343
	LadyBeard			313	366
	NeckBeard			338	318
	CageBeard			338	343
	BEARd			338	366
	GoldBeard			326	392
Hacks				233	427
	Page1			345	183
		ADPlus		566	234
		ADMinus		600	234
		AdvPlus		891	234
		AdvMinus		926	234
		TMPlus		566	328
		TMMinus		600	328
		DCPlus		891	328
		DCMinus		926	328
		AugPlus		566	420
		AugMinus		600	420
		ENGUPlus		891	420
		ENGUMinus		926	420
		MNGUPlus		566	513
		MNGUMinus		600	513
		BloodPlus		891	513
		BloodMinus		926	513
	Page2			399	183
		QPPlus		566	234
		QPMinus		600	234
		DaycarePlus		891	234
		DaycareMinus		926	234
		EXPPlus		566	328
		EXPMinus		600	328
		NumberPlus		891	328
		NumberMinus		926	328
		PPPlus		566	420
		PPMInus		600	420
		HackPlus		891	420
		HackMinus		926	420
		WishPlus		566	513
		WishMinus		600	513
*/
