import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  // 技の選択肢と対応する素の攻撃力
  const skills = [
    { name: 'メテオランチャー', value: 1181 },
    { name: 'ブラックホール', value: 1143 },
    { name: 'ラグナヘイズ', value: 1714 },
    { name: 'ダークボリューション', value: 0 },
    { name: 'ダークキトシン', value: 0 },
    { name: '燃え盛る聖熱', value: 1203 },
    { name: 'ミスティックブレス', value: 1307 },
    { name: 'ダークフェザー', value: 0 },
    { name: 'ふみならし', value: 0 },
    { name: 'ブオーンインパクト', value: 0 },
    { name: '冥嵐球', value: 1272 },
    { name: '邪悪な誘い', value: 0 },
    { name: 'ニズゼフレア', value: 0 },
    { name: 'イビルプレス', value: 0 },
    { name: '終末の炎', value: 0 },
    { name: 'ステテコストリーム', value: 1196 },
    { name: '招雷波', value: 0 },
    { name: '裏切りの炎', value: 0 },
    { name: 'らぶぎゃるショット', value: 0 },
    { name: '夢幻の咆哮', value: 0 },
    { name: 'メテオストライク', value: 0 },
    { name: 'キャプテンサイクロン', value: 0 },
    { name: 'バーニングアタック', value: 0 },
    { name: 'パイレーツスクランブル', value: 0 },
    { name: '必中イオ弾', value: 0 },
    { name: 'ロマンスナイプショット', value: 0 },
    { name: 'バーストショット弾', value: 0 },
    { name: '精気を刈り取る鎌', value: 0 }
  ];

  // ソート（名前順）
  const sortedSkills = skills.sort((a, b) => a.name.localeCompare(b.name));

  // 各パラメータの state
  const [selectedSkill, setSelectedSkill] = useState(skills[0].value); // 技選択
  const [kiso, setKiso] = useState(0);  // 素の攻撃力
  const [superEffective, setSuperEffective] = useState(0);  // ばつぐん(%)

  // バフ系

  const [levelBonus, setLevelBonus] = useState(8);   // レベル特性(%)
  const [constellationBonus, setConstellationBonus] = useState(10); // 凸特性(%)
  const [attributeRankBonus, setAttributeRankBonus] = useState(10); // 属性ランク(%)
  const [talentBloomBonus, setTalentBloomBonus] = useState(0); // 才能開花(%)
  const [damageBoost, setDamageBoost] = useState(0); // スキルパネル(%)
  const [leaderBonus, setLeaderBonus] = useState(0); // リーダ特性(%)
  const [equipmentBonus, setEquipmentBonus] = useState(0); // 装備(%)

  // バフ1, バフ2, バフ3
  const [buff1, setBuff1] = useState(0); // バフ1(%)
  const [buff2, setBuff2] = useState(0); // バフ2(%)
  const [buff3, setBuff3] = useState(0); // バフ3(%)

  // 敵情報系
  const [breathResistance, setBreathResistance] = useState(0); // 息/体技耐性(%)
  const [damageReduction, setDamageReduction] = useState(0);   // ダメージ軽減(%)
  const [damageReduction2, setDamageReduction2] = useState(0); // ダメージ軽減2(%)
  const [damageReduction3, setDamageReduction3] = useState(30); // 闘技場軽減(%)
  const [attributeResistancejyaku, setAttrResJyaku] = useState(0); // 属性耐性(%)

  // 計算結果
  const [equalDamage, setEqualDamage] = useState(0);
  const [weakDamage, setWeakDamage] = useState(0);
  const [totalBoost, setTotalBoost] = useState(0);  // 合計バフ

  // 合計バフの計算
  useEffect(() => {
    const total = damageBoost + levelBonus + constellationBonus + attributeRankBonus + talentBloomBonus + leaderBonus + equipmentBonus;
    setTotalBoost(total);
  }, [damageBoost, levelBonus, constellationBonus, attributeRankBonus, talentBloomBonus, leaderBonus, equipmentBonus]);

  const calculate = () => {
    // 各種倍率に変換
    const powerCalc = 1 + (damageBoost + levelBonus + constellationBonus + attributeRankBonus + talentBloomBonus + leaderBonus + equipmentBonus) / 100;
    const supEffCalc = 1 + superEffective / 100;

    const baseBoost  = 1 + totalBoost / 100;
    const buffMultiplier = (1 + buff1 / 100) * (1 + buff2 / 100) * (1 + buff3 / 100);
    const boost1Calc = baseBoost * buffMultiplier;

    const resistCalc = 1 - breathResistance / 100;
    const dr1Calc = 1 - damageReduction / 100;
    const dr2Calc = 1 - damageReduction2 / 100;
    const dr3Calc = 1 - damageReduction3 / 100;
    const attrResCalc = 1.5 - attributeResistancejyaku / 100;

    // 軽減合計
    const drTotal = dr1Calc * dr2Calc * dr3Calc;

    // 等倍ダメージ
    const eq = Math.floor(
      selectedSkill
      * resistCalc
      * boost1Calc
      * drTotal
    );

    // 弱点ダメージ
    const wk = Math.floor(
      eq
      * supEffCalc
      * attrResCalc
    );

    setEqualDamage(eq);
    setWeakDamage(wk);
  };

  return (
    <div className="App">
      <h1>息体技ダメージ計算機</h1>

      {/* 技選択の入力 */}
      <div>
        <label>技の威力 (スキル + 10): 
          <select onChange={(e) => setSelectedSkill(+e.target.value)}>
            {sortedSkills.map(skill => (
              <option key={skill.name} value={skill.value}>
                {skill.name} {skill.value > 0 && `(${skill.value})`}
              </option>
            ))}
          </select>
        </label>
        <label>または直接入力: 
          <input type="number" value={selectedSkill} onChange={(e) => setSelectedSkill(+e.target.value)} />
        </label>
      </div>

      <div><label>素の威力: {selectedSkill}</label></div>

      <h2>威力アップ</h2>
      <div><label>レベル特性(%):(レベル140は8) <input type="number" value={levelBonus} onChange={e => setLevelBonus(+e.target.value)} /></label></div>
      <div><label>凸特性(%):(3凸で5 完凸で10) <input type="number" value={constellationBonus} onChange={e => setConstellationBonus(+e.target.value)} /></label></div>
      <div><label>属性ランク(%):lv8で6 lv9で10 <input type="number" value={attributeRankBonus} onChange={e => setAttributeRankBonus(+e.target.value)} /></label></div>
      <div><label>才能開花(%): (ばつぐんは別)<input type="number" value={talentBloomBonus} onChange={e => setTalentBloomBonus(+e.target.value)} /></label></div>
      <div><label>スキルパネル(%):(強化で5 拡張で15) <input type="number" value={damageBoost} onChange={e => setDamageBoost(+e.target.value)} /></label></div>
      <div><label>リーダ特性(%): <input type="number" value={leaderBonus} onChange={e => setLeaderBonus(+e.target.value)} /></label></div>
      <div><label>装備(%):(ばつぐんは別) <input type="number" value={equipmentBonus} onChange={e => setEquipmentBonus(+e.target.value)} /></label></div>

      {/* 合計バフの表示 */}
      <div><label>威力アップ合計(%): {totalBoost}</label></div>


      <h2>バフ
      <span style={{ fontSize: 'small' }}>
      <br /> フォース: 20 <br />
        テンション: 20-100 <br />
        息体技バフ: 15-45 <br />
        ダメージアップ: 10-30 <br />
        マアテリアルブレイク: 20-60 <br />
      </span>
      </h2>

      <div><label>バフ1(%): <input type="number" value={buff1} onChange={e => setBuff1(+e.target.value)} /></label></div>
      <div><label>バフ2(%): <input type="number" value={buff2} onChange={e => setBuff2(+e.target.value)} /></label></div>
      <div><label>バフ3(%): <input type="number" value={buff3} onChange={e => setBuff3(+e.target.value)} /></label></div>

      <div><label>ばつぐん(%): <input type="number" value={superEffective} onChange={e => setSuperEffective(+e.target.value)} /></label></div>

      <h2>敵情報</h2>
      <div><label>息/体技耐性(%): <input type="number" value={breathResistance} onChange={e => setBreathResistance(+e.target.value)} /></label></div>
      <div><label>ダメージ軽減(%): <input type="number" value={damageReduction} onChange={e => setDamageReduction(+e.target.value)} /></label></div>
      <div><label>ダメージ軽減2(%): <input type="number" value={damageReduction2} onChange={e => setDamageReduction2(+e.target.value)} /></label></div>
      <div><label>闘技場軽減(%): <input type="number" value={damageReduction3} onChange={e => setDamageReduction3(+e.target.value)} /></label></div>
      <div><label>属性耐性(%): <input type="number" value={attributeResistancejyaku} onChange={e => setAttrResJyaku(+e.target.value)} /></label></div>

      <button onClick={calculate}>計算</button>

      {/* 結果表示 */}
      <div style={{ marginTop: '1rem' }}>
        <p>等倍ダメージ: {equalDamage.toFixed(2)}</p>
        <p>弱点ダメージ: {weakDamage.toFixed(2)}</p>
      </div>
    </div>
  );
}
