import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const skillTypes = ['物理', '呪文', '息', '体技'];
  const [selectedType, setSelectedType] = useState('物理');

  const skills = {
    物理: [
      { name: 'プリズムソード', value: 1 ,power: 0 },
      { name: '魔王の絶技', value: 2 ,power: 0},
    ],
    呪文: [
      { name: 'リーサルウェポン', value: 1,power: 0 },
    ],
    息: [
      { name: 'シャインブラスト', value: -1,power: 0 },
      { name: 'ラグナヘイズ', value: 1, power: 1714 },
      { name: 'ダークボリューション', value: 2, power: 0 },
      { name: 'ダークキトシン', value: 3 , power: 0 },
      { name: '燃え盛る聖熱', value: 4 ,power: 1203 },
      { name: 'ミスティックブレス', value: 5, power: 1307 },
      { name: '冥嵐球', value: 6, power: 1272 },
      { name: 'ニズゼフレア', value: 7, power: 0 },
      { name: '招雷波', value: 8, power: 0 },
    ],
    体技: [
      { name: 'メテオランチャー', value: 1, power: 1181 },
      { name: 'ブラックホール', value: 2, power: 1143 },
      { name: 'ダークフェザー', value: 3, power: 0 },
      { name: 'ふみならし', value: 4, power: 0 },
      { name: 'ブオーンインパクト', value: 5, power: 0 },
      { name: '邪悪な誘い', value: 6, power: 0 },
      { name: 'イビルプレス', value: 7, power: 0 },
      { name: '終末の炎', value: 8, power: 0 },
      { name: 'ステテコストリーム', value: 9, power: 1196 },
      { name: '裏切りの炎', value: 10, power: 0 },
      { name: 'らぶぎゃるショット', value: 11, power: 0 },
      { name: '夢幻の咆哮', value: 12, power: 0 },
      { name: 'メテオストライク', value: -1, power: 0 },
      { name: 'キャプテンサイクロン', value: 13, power: 0 },
      { name: 'バーニングアタック', value: 14, power: 0 },
      { name: 'パイレーツスクランブル', value: 15, power: 0 },
      { name: '必中イオ弾', value: 16, power: 1021 },
      { name: 'ロマンスナイプショット', value: 17, power: 1550 },
      { name: 'バーストショット弾', value: 18, power: 1044 },
      { name: '精気を刈り取る鎌', value: 19, power: 1257 },
    ],
  };

  const sortedSkills = skills[selectedType].sort((a, b) => a.name.localeCompare(b.name));

  const [selectedSkill, setSelectedSkill] = useState(sortedSkills[0]?.value || 0);
  const [kiso, setKiso] = useState(0);
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

  const [breathResistance, setBreathResistance] = useState(0);
  const [damageReduction, setDamageReduction] = useState(0);
  const [damageReduction2, setDamageReduction2] = useState(0);
  const [damageReduction3, setDamageReduction3] = useState(30);
  const [attributeResistancejyaku, setAttrResJyaku] = useState(0);

  const [equalDamage, setEqualDamage] = useState(0);
  const [weakDamage, setWeakDamage] = useState(0);
  const [totalBoost, setTotalBoost] = useState(0);

  const [attackPower, setAttackPower] = useState(0);
  const [defensePower, setDefensePower] = useState(0);
  const [magicPower, setMagicPower] = useState(0);
  const [specialRate, setSpecialRate] = useState(0); 

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
    }else if(selectedSkillName === '魔王の絶技'){
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
    const resistCalc = 1 - breathResistance / 100;
    const drTotal = (1 - damageReduction / 100) * (1 - damageReduction2 / 100) * (1 - damageReduction3 / 100);
    const attrResCalc = 1.5 - attributeResistancejyaku / 100;

    // 物理スキルの場合の計算
    let eq = 0;
    const selectedSkillObj = skills[selectedType].find(skill => skill.value === selectedSkill);
    const selectedSkillName = selectedSkillObj?.name;
    const selectedSkillPower = selectedSkillObj?.power ?? 0;

    if (selectedType === '物理') {
      eq = Math.floor(((attackPower / 2 - defensePower / 4) * (specialRate / 100)) * resistCalc * boost1Calc * drTotal);
    } else if (selectedType === '息' && selectedSkillName === 'シャインブラスト') {
      const calculatedValue = 1.345 * attackPower + 19.196;
      eq = Math.floor(calculatedValue * resistCalc * boost1Calc * drTotal);
    } else {
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
                {skill.name} {skill.value > 0 && `(${skill.power})`}
              </option>
            ))}
          </select>
        </label>
        {/* <label>または直接入力:
          <input type="number" value={selectedSkill} onChange={e => setSelectedSkill(+e.target.value)} />
        </label> */}
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
          かしこさ: 
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
      <div><label>ばつぐん(%): <input type="number" value={superEffective} onChange={e => setSuperEffective(+e.target.value)} /></label></div>

      <h2>敵情報</h2>
      {selectedType === '物理' && <div><label>守備力: <input type="number" value={defensePower} onChange={e => setDefensePower(+e.target.value)} /></label></div>}
      <div><label>物理/呪文/息/体技耐性(%): <input type="number" value={breathResistance} onChange={e => setBreathResistance(+e.target.value)} /></label></div>
      <div><label>ダメージ軽減(%): <input type="number" value={damageReduction} onChange={e => setDamageReduction(+e.target.value)} /></label></div>
      <div><label>ダメージ軽減2(%): <input type="number" value={damageReduction2} onChange={e => setDamageReduction2(+e.target.value)} /></label></div>
      <div><label>闘技場軽減(%): <input type="number" value={damageReduction3} onChange={e => setDamageReduction3(+e.target.value)} /></label></div>
      <div><label>属性耐性(%): <input type="number" value={attributeResistancejyaku} onChange={e => setAttrResJyaku(+e.target.value)} /></label></div>

      <button onClick={calculate}>計算</button>

      <div style={{ marginTop: '1rem' }}>
        <p>等倍ダメージ: {equalDamage.toFixed(2)}</p>
        <p>弱点ダメージ: {weakDamage.toFixed(2)}</p>
      </div>
    </div>
  );
}
