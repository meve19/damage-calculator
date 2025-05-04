import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const skillTypes = ['物理', '呪文', '息', '体技'];
  const [selectedType, setSelectedType] = useState('物理');

  const skills = {
    物理: [
      { name: 'テンプレなし', value: 1 ,power: 0 },
      { name: 'プリズムソード', value: 2 ,power: 0 },
      { name: '魔王の絶技', value: 3 ,power: 0},
    ],
    呪文: [
      { name: 'リーサルウェポン', value: 1,power: 0 },
      { name: 'カオススパーク', value: 2,power: 0 },
      { name: 'ウルフレア', value: 3,power: 0 },
      { name: '絶対凍土', value: 4,power: 0 },
      { name: 'メイルシュトロム', value: 5,power: 0 },
      { name: 'ギガジャティス', value: 6,power: 0 },
    ],
    息: [
      { name: 'シャインブラスト', value: -1,power: 0 },
      { name: 'ラグナヘイズ', value: 1, power: 1714 },
      { name: 'ダークポリューション', value: 2, power: 1219 },
      { name: 'ダークキトシン', value: 3 , power: 892 },
      { name: '燃え盛る聖熱', value: 4 ,power: 1203 },
      { name: 'ミスティックブレス', value: 5, power: 1307 },
      { name: '冥嵐球', value: 6, power: 1272 },
      { name: 'ニズゼフレア', value: 7, power: 1189 },
      { name: '招雷波', value: 8, power: 990 },
    ],
    体技: [
      { name: 'メテオランチャー', value: 1, power: 1181 },
      { name: 'ブラックホール', value: 2, power: 1143 },
      { name: 'ダークフェザー', value: 3, power: 1021 },
      { name: 'ふみならし', value: 4, power: 1106 },
      { name: 'ブオーンインパクト', value: 5, power: 1044 },
      { name: '邪悪な誘い', value: 6, power: 1326 },
      { name: 'イビルプレス', value: 7, power:  1105},
      { name: '終末の炎', value: 8, power: 1715 },
      { name: 'ステテコストリーム', value: 9, power: 1196 },
      { name: '裏切りの炎', value: 10, power: 1268 },
      { name: 'らぶぎゃるショット', value: 11, power: 1017 },
 //     { name: '夢幻の咆哮', value: 12, power: 0 },
      { name: 'シャークアタック', value: -1, power: 0 },
 //     { name: 'キャプテンサイクロン', value: 13, power: 0 },
 //     { name: 'バーニングアタック', value: 14, power: 0 },
 //     { name: 'パイレーツスクランブル', value: 15, power: 0 },
      { name: '必中イオ弾', value: 16, power: 1021 },
      { name: 'ロマンスナイプショット', value: 17, power: 1550 },
      { name: 'バーストショット弾', value: 18, power: 1044 },
      { name: '精気を刈り取る鎌', value: 19, power: 1257 },
    ],
  };

  const enemyResistances = {
    Galgeos1: {
      general: 30, // 物理/呪文/息/
      reduction1: 30,
      reduction2: 0,
      reduction3: 0,
      attribute: 0, // 属性耐性
    },
    Galgeos2: {
      general: 0, 
      reduction1: 30,
      reduction2: 0,
      reduction3: 0,
      attribute: 0, // 属性耐性
    },
    Eight1: {
      general: 0,
      reduction1: 30, //勇者軽減
      reduction2: 20, //フォース
      reduction3: 5,  //スキルパネル
      attribute: 0,
    },
    Eight2: {
      general: 0,
      reduction1: 30, //勇者軽減
      reduction2: 0, //フォースなし
      reduction3: 5,  //スキルパネル
      attribute: 0,
    },
    HamaSera1: {
      general:  35, //バーハ+才能開花ヒャドギラ
      reduction1: 50, //軽減50
      reduction2: 1,  //才能開花全ダメージ1%
      reduction3: 0,
      attribute: 5,//才能開花ヒャドギラ
    },
    HamaSera2: {
      general: 5, //才能開花ヒャドギラ
      reduction1: 50, //軽減50
      reduction2: 1,  //才能開花全ダメージ1%
      reduction3: 0,
      attribute: 5,//才能開花ヒャドギラ
    },
    HamaSera3: {
      general: 30, //バーハ
      reduction1: 50, //軽減50
      reduction2: 1,  //才能開花全ダメージ1%
      reduction3: 0,
      attribute: 0,
    },
    HamaSera4: {
      general: 0, 
      reduction1: 50, //軽減50
      reduction2: 1,  //才能開花全ダメージ1%
      reduction3: 0,
      attribute: 0,
    },
    // 必要に応じて追加
  };

  const sortedSkills = skills[selectedType].sort((a, b) => a.name.localeCompare(b.name));

  const [selectedSkill, setSelectedSkill] = useState(sortedSkills[0]?.value || 0);
  const [manualSkillPower, setManualSkillPower] = useState('');
  const [superEffective, setSuperEffective] = useState(0);

  const [skillLevel, setskillLevel] = useState(10);
  const [levelBonus, setLevelBonus] = useState(8);
  const [constellationBonus, setConstellationBonus] = useState(10);
  const [attributeRankBonus, setAttributeRankBonus] = useState(10);
  const [talentBloomBonus, setTalentBloomBonus] = useState(0);
  const [skillpanelBonus, setskillpanelBonus] = useState(0);
  const [leaderBonus, setLeaderBonus] = useState(0);
  const [equipmentBonus, setEquipmentBonus] = useState(0);

  const [buff1, setBuff1] = useState(0);
  const [buff2, setBuff2] = useState(0);
  const [buff3, setBuff3] = useState(0);

  const [damageReductionTogi, setDamageReductionTogi] = useState(30);
  const [attributeResistancejyaku, setAttrResJyaku] = useState(0);

  const [equalDamage, setEqualDamage] = useState(0);
  const [weakDamage, setWeakDamage] = useState(0);
  const [totalBoost, setTotalBoost] = useState(0);

  const [attackPower, setAttackPower] = useState(0);
  const [defensePower, setDefensePower] = useState(0);
  const [magicPower, setMagicPower] = useState(0);
  const [specialRate, setSpecialRate] = useState(0); 

  const [selectedEnemyType, setSelectedEnemyType] = useState("");
  const [resistances, setResistances] = useState({
    general: 0,
    reduction1: 0,
    reduction2: 0,
    reduction3: 0,
    attribute: 0,
  });


  useEffect(() => {
    const total = skillpanelBonus + levelBonus + constellationBonus + attributeRankBonus + talentBloomBonus + leaderBonus + equipmentBonus;
    setTotalBoost(total);
  }, [skillpanelBonus, levelBonus, constellationBonus, attributeRankBonus, talentBloomBonus, leaderBonus, equipmentBonus]);

  //プリズムソードの特技倍率を設定 
  useEffect(() => {
    const selectedSkillName = skills[selectedType].find(skill => skill.value === selectedSkill)?.name;
  
    if (selectedSkillName === 'プリズムソード' || selectedSkillName === 'シャインブラスト') {
      setBuff1(20);
      setskillpanelBonus(5);
    }else if(selectedSkillName === '魔王の絶技' || selectedSkillName === 'ラグナヘイズ' || selectedSkillName === 'カオススパーク'){
      setBuff1(15);
      setskillpanelBonus(0);
    }else {
      // その他のスキルなら初期値に戻す
      setBuff1(0);
      setskillpanelBonus(0);
    }
    if (selectedSkillName === 'プリズムソード' ){
      setSpecialRate(615);
    }else if(selectedSkillName === '魔王の絶技'){
      setSpecialRate(600);
    }
    else {
      // 以外なら初期値に戻す
      setSpecialRate(0);
    }
  }, [selectedSkill, selectedType]);

  const calculate = () => {
    const powerCalc = 1 + totalBoost / 100;
    const supEffCalc = 1 + superEffective / 100;
    const baseBoost = powerCalc;
    const buffMultiplier = (1 + buff1 / 100) * (1 + buff2 / 100) * (1 + buff3 / 100);
    const boost1Calc = baseBoost * buffMultiplier;
    const resistCalc = 1 - resistances.general / 100;
    const drTotal = (1 - resistances.reduction1 / 100) * (1 - resistances.reduction2 / 100) * (1 - resistances.reduction3 / 100) * (1 - damageReductionTogi / 100);;
    const attrResCalc = 1.5 - resistances.attribute / 100;

    // 物理スキルの場合の計算
    let eq = 0;
    const selectedSkillObj = skills[selectedType].find(skill => skill.value === selectedSkill);
    const selectedSkillName = selectedSkillObj?.name;
    const selectedSkillPower = manualSkillPower !== '' ? Number(manualSkillPower) : (selectedSkillObj?.power ?? 0);


    if (selectedType === '物理') {
      eq = Math.floor(((attackPower / 2 - defensePower / 4) * (specialRate / 100)) * resistCalc * boost1Calc * drTotal);
    } else if (selectedType === '息' && selectedSkillName === 'シャインブラスト') {
      const calculatedValue = 1.345 * attackPower + 19.196;
      eq = Math.floor(calculatedValue * resistCalc * boost1Calc * drTotal);
    } else if (selectedType === '呪文' && selectedSkillName === 'リーサルウェポン') {
      const calculatedValue =  (4.54 * magicPower - 375.91)/1.005;
      eq = Math.floor(calculatedValue * resistCalc * boost1Calc * drTotal);
    }else if (selectedType === '呪文' && selectedSkillName === 'カオススパーク') {
      const calculatedValue = 1.561 * magicPower + 20.38;
      eq = Math.floor(calculatedValue * resistCalc * boost1Calc * drTotal);
    }else if (selectedType === '呪文' && selectedSkillName === 'ウルフレア') {
       const calculatedValue = (2.637 * magicPower - 65.29)/1.005;
       eq = Math.floor(calculatedValue * resistCalc * boost1Calc * drTotal);
   }else if (selectedType === '呪文' && selectedSkillName === '絶対凍土') {
    const calculatedValue = (2.05 * magicPower - 18.5)/1.005;
    eq = Math.floor(calculatedValue * resistCalc * boost1Calc * drTotal);
    }else if (selectedType === '呪文' && selectedSkillName === 'メイルシュトロム') {
      const calculatedValue = ( -1.03E-6 * Math.pow(magicPower, 2) + 1.67 * magicPower - 2.61 )/1.005;
      eq = Math.floor(calculatedValue * resistCalc * boost1Calc * drTotal);
    }else if (selectedType === '呪文' && selectedSkillName === 'ギガジャティス') {
      const calculatedValue = (-0.00000711 * Math.pow(magicPower, 2) + 2.2410 * magicPower - 44.75)/1.005;
      eq = Math.floor(calculatedValue * resistCalc * boost1Calc * drTotal);
    }else if (selectedType === '体技' && selectedSkillName === 'シャークアタック') {
      const calculatedValue = ( -0.00000209 * Math.pow(attackPower,2) + 2.0459 * attackPower - 23.92)/1.005;
      eq = Math.floor(calculatedValue * resistCalc * boost1Calc * drTotal);
    }
    
    else {
      eq = Math.floor(selectedSkillPower * resistCalc * boost1Calc * drTotal);
    }

    eq = eq * ( 1+ skillLevel * 0.05) /1.5; //スキルレベルによる補正
    
    const wk = Math.floor(eq * supEffCalc * attrResCalc);

    setEqualDamage(eq);
    setWeakDamage(wk);
  };

  return (
    <div className="App">
      <h1>ダメージ計算機</h1>

      <div className="radio-group">
        種類:
        {skillTypes.map(type => (
          <label key={type}>
            <input
              type="radio"
              value={type}
              checked={selectedType === type}
              onChange={() => {
                setSelectedType(type);
                setSelectedSkill(skills[type][0]?.value || 0);
              }}
            />
            {type}
          </label>
        ))}
      </div>

      <div>
        <label>技:
          <select value={selectedSkill} onChange={(e) => setSelectedSkill(+e.target.value)}>
            {sortedSkills.map(skill => (
              <option key={skill.name} value={skill.value}>
                {skill.name} 
              </option>
            ))}
          </select>
        </label>
        {/* <label>または直接入力:
          <input type="number" value={selectedSkill} onChange={e => setSelectedSkill(+e.target.value)} />
        </label> */}
      </div>
      <div>
        <label>
          威力を直接入力（任意）: 
          <input type="number" value={manualSkillPower} onChange={e => setManualSkillPower(e.target.value)} />
        </label>
      </div>

      {(selectedType === '物理' || selectedType === '呪文' || (['息', '体技'].includes(selectedType) && selectedSkill < 0)) && (
  <div>
    {/* 物理タイプの場合：攻撃力 → 特技倍率 */}
    {selectedType === '物理' && (
      <>
        <div>
          <label>
            攻撃力: 
            <input type="number" value={attackPower} onChange={e => setAttackPower(+e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            特技倍率(%): 
            <input type="number" value={specialRate} onChange={e => setSpecialRate(+e.target.value)} />
          </label>
        </div>
      </>
    )}

    {/* 呪文タイプ：かしこさ */}
    {selectedType === '呪文' && (
      <div>
        <label>
          かしこさ(攻撃依存は攻撃力): 
          <input type="number" value={magicPower} onChange={e => setMagicPower(+e.target.value)} />
        </label>
      </div>
    )}

    {/* 息・体技 かつ selectedSkill < 0 の場合のみ攻撃力 */}
    {(selectedType === '息' || selectedType === '体技') && selectedSkill < 0 && (
      <div>
        <label>
          攻撃力: 
          <input type="number" value={attackPower} onChange={e => setAttackPower(+e.target.value)} />
        </label>
      </div>
    )}
  </div>
)}

      <div><label>特技レベル: <input type="number" value={skillLevel} onChange={e => setskillLevel(+e.target.value)} /></label></div>  

      <h2>威力アップ</h2>
      <div><label>レベル特性(%): <input type="number" value={levelBonus} onChange={e => setLevelBonus(+e.target.value)} /></label></div>
      <div><label>凸特性(%): <input type="number" value={constellationBonus} onChange={e => setConstellationBonus(+e.target.value)} /></label></div>
      <div><label>属性ランク(%): <input type="number" value={attributeRankBonus} onChange={e => setAttributeRankBonus(+e.target.value)} /></label></div>
      <div><label>才能開花(%): <input type="number" value={talentBloomBonus} onChange={e => setTalentBloomBonus(+e.target.value)} /></label></div>
      <div><label>スキルパネル(%): <input type="number" value={skillpanelBonus} onChange={e => setskillpanelBonus(+e.target.value)} /></label></div>
      <div><label>リーダ特性(%): <input type="number" value={leaderBonus} onChange={e => setLeaderBonus(+e.target.value)} /></label></div>
      <div><label>装備(%): <input type="number" value={equipmentBonus} onChange={e => setEquipmentBonus(+e.target.value)} /></label></div>
      <div><label>威力アップ合計(%): {totalBoost}</label></div>
      
      <h2 className="tooltip" data-tooltip="フォース: 20, テンション: 20-100, 息体技バフ: 15-45, ダメージアップ: 10-30, マアテリアルブレイク: 20-60">
      バフ
      </h2>

      <div><label>バフ1(%): <input type="number" value={buff1} onChange={e => setBuff1(+e.target.value)} /></label></div>
      <div><label>バフ2(%): <input type="number" value={buff2} onChange={e => setBuff2(+e.target.value)} /></label></div>
      <div><label>バフ3(%): <input type="number" value={buff3} onChange={e => setBuff3(+e.target.value)} /></label></div>
      <div>
        <label className="tooltip" data-tooltip="才能開花のばつぐんはここ">
         ばつぐん(%): 
        <input 
          type="number" 
          value={superEffective} 
          onChange={e => setSuperEffective(+e.target.value)} 
        />
        </label>
      </div>

      <h2>敵情報</h2>
      <label>敵情報テンプレ(任意):
        <select
          value={selectedEnemyType}
          onChange={(e) => {
            const selected = e.target.value;
            setSelectedEnemyType(selected);
            setResistances(enemyResistances[selected] || {
              general: 0,
              reduction1: 0,
              reduction2: 0,
              reduction3: 0,
              attribute: 0,
            });
          }}
        >
          <option value="">設定なし</option>
          <option value="Galgeos1">ガルゲオス物理呪文息</option>
          <option value="Galgeos2">ガルゲオス体技</option>
          <option value="Eight1">勇者エイト(属性ダメージ)</option>
          <option value="Eight2">勇者エイト(無属性ダメージまたはフォースなし)</option>
          <option value="HamaSera1">完凸浜セラ息ギラヒャド</option>
          <option value="HamaSera2">未完凸浜セラまたは息以外ギラヒャド</option>
          <option value="HamaSera3">完凸浜セラ息ギラヒャド以外</option>
          <option value="HamaSera4">未完凸浜セラまたは息以外ギラヒャド以外</option>
          {/* 他の敵も追加可 */}
        </select>
      </label>



      {selectedType === '物理' && <div><label>守備力: <input type="number" value={defensePower} onChange={e => setDefensePower(+e.target.value)} /></label></div>}
      <div>
        <label className="tooltip" data-tooltip="装備による軽減や、バーハの30、才能開花での属性物理耐性等(5)の値等の合計値 ">
          物理/呪文/息/体技耐性(%): 
          <input 
            type="number" 
            value={resistances.general} 
            onChange={e => setResistances({ ...resistances, general: +e.target.value })}
          />
        </label>
      </div>
      <div>
        <label className="tooltip" data-tooltip="才能開花の1%、スキルパネル、かばう:20、みがわり:40、勇者特性:30などを軽減2,3と分けて1項目ずついれる">
          ダメージ軽減(%): 
          <input 
            type="number" 
            value={resistances.reduction1}
            onChange={(e) => setResistances({ ...resistances, reduction1: Number(e.target.value) })}
          />
        </label>
      </div>
      <div><label>ダメージ軽減2(%): 
        <input 
          type="number"
          value={resistances.reduction2}
          onChange={(e) => setResistances({ ...resistances, reduction2: Number(e.target.value) })}
        />
      </label></div>
        <div><label>ダメージ軽減3(%): 
        <input 
        type="number"
        value={resistances.reduction3}
        onChange={(e) => setResistances({ ...resistances, reduction3: Number(e.target.value) })}
        />
      </label></div>

      <div><label>闘技場軽減(%): <input type="number" value={damageReductionTogi} onChange={e => setDamageReductionTogi(+e.target.value)} /></label></div>

      <div>
        <label className="tooltip" data-tooltip="装備による属性耐性や才能開花での属性耐性(予測値で5)をいれる">
          属性耐性(%): 
          <input 
            type="number" 
            value={resistances.attribute}
            onChange={(e) => setResistances({ ...resistances, attribute: Number(e.target.value) })}
          />
        </label>
      </div>

      <button onClick={calculate}>計算</button>

      <div style={{ marginTop: '1rem' }}>
        <p>等倍ダメージ: {equalDamage}</p>
        <p>弱点ダメージ: {weakDamage}</p>
      </div>
    </div>
  );
}
