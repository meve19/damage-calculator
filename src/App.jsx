import { useState } from 'react';
import './App.css';

export default function App() {
  // 各パラメータの state
  const [kiso, setKiso]                             = useState(0);    // 素の攻撃力
  const [power, setPower]                           = useState(0);    // 威力(%)
  const [superEffective, setSuperEffective]         = useState(0);    // ばつぐん(%)
  const [damageBoost, setDamageBoost]               = useState(0);    // 威力アップ系バフ(%)
  const [damageBoost2, setDamageBoost2]             = useState(0);    // 威力アップ系バフ2(%)
  const [breathResistance, setBreathResistance]     = useState(0);    // 息耐性(%)
  const [damageReduction, setDamageReduction]       = useState(0);    // ダメージ軽減(%)
  const [damageReduction2, setDamageReduction2]     = useState(0);    // ダメージ軽減2(%)
  const [damageReduction3, setDamageReduction3]     = useState(0);    // 闘技場軽減(%)
  const [attributeResistancejyaku, setAttrResJyaku] = useState(0);    // 属性耐性(%)

  // 計算結果を保持する state
  const [equalDamage, setEqualDamage]               = useState(0);
  const [weakDamage, setWeakDamage]                 = useState(0);

  const calculate = () => {
    console.log("⚡ calculate fired!");
    console.log({ kiso, power, superEffective, damageBoost, damageBoost2, breathResistance, damageReduction, damageReduction2, damageReduction3, attributeResistancejyaku });

    // 各種倍率に変換
    const powerCalc    = 1 + power                 / 100;
    const supEffCalc   = 1 + superEffective        / 100;
    const boost1Calc   = 1 + damageBoost           / 100;
    const boost2Calc   = 1 + damageBoost2          / 100;
    const resistCalc   = 1 - breathResistance      / 100;
    const dr1Calc      = 1 - damageReduction       / 100;
    const dr2Calc      = 1 - damageReduction2      / 100;
    const dr3Calc      = 1 - damageReduction3      / 100;
    const attrResCalc  = 1.5 - attributeResistancejyaku / 100;

    console.log({ powerCalc, supEffCalc, boost1Calc, boost2Calc, resistCalc, dr1Calc, dr2Calc, dr3Calc, attrResCalc });

    // 軽減合計
    const drTotal = dr1Calc * dr2Calc * dr3Calc;
    console.log("damageReductionTotal:", drTotal);

    // 等倍ダメージ
    const eq = Math.floor(
      kiso
      * powerCalc
      * resistCalc
      * boost1Calc
      * boost2Calc
      * drTotal
    );
    // 弱点ダメージ
    const wk = Math.floor(
      eq
      * supEffCalc
      * attrResCalc
    );

    console.log("equalDamage:", eq, "weakDamage:", wk);

    setEqualDamage(eq);
    setWeakDamage(wk);
  };

  return (
    <div className="App">
      <h1>息体技ダメージ計算機</h1>

      {/* 入力フォーム群 */}
      <div><label>素: <input type="number" value={kiso}               onChange={e => setKiso(+e.target.value)}               /></label></div>
      <div><label>威力(%): <input type="number" value={power}          onChange={e => setPower(+e.target.value)}              /></label></div>
      <div><label>ばつぐん(%): <input type="number" value={superEffective} onChange={e => setSuperEffective(+e.target.value)} /></label></div>
      <div><label>威力アップ系バフ(%): <input type="number" value={damageBoost}  onChange={e => setDamageBoost(+e.target.value)}   /></label></div>
      <div><label>威力アップ系バフ2(%): <input type="number" value={damageBoost2} onChange={e => setDamageBoost2(+e.target.value)}  /></label></div>
      <div><label>息耐性(%): <input type="number" value={breathResistance} onChange={e => setBreathResistance(+e.target.value)} /></label></div>
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
