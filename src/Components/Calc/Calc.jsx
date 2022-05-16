import { useState } from "react";
import styles from "./Calc.module.css";

const Calc = () => {
  const [val, setVal] = useState("");

  const handleClickBtn = (e) => {
    if (val === "Error") {
      if (e.target.innerText === "()") {
        setVal("(");
        return;
      }
      setVal(e.target.innerText);
      return;
    }

    if (e.target.innerText === "()" && val.includes("(")) {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ")"];
      let flag = false;
      arr.forEach((char) => {
        if (val.endsWith(char)) {
          setVal((p) => p + ")");
          flag = true;
        }
      });
      if (flag) return;
    }
    if (e.target.innerText === "()") {
      setVal((p) => p + "(");
      return;
    }

    setVal((p) => p + e.target.innerText);
  };

  const handleCE = () => {
    if (val === "Error") {
      return;
    }
    const newVal = val.slice(0, -1);
    setVal(newVal);
  };

  const handleResult = () => {
    let copyVal = val;
    while (copyVal.includes("÷") || copyVal.includes("×")) {
      copyVal = copyVal.replace("÷", "/");
      copyVal = copyVal.replace("×", "*");
    }

    try {
      eval(copyVal);
    } catch (e) {
      setVal("Error");
      return;
    }

    const result = eval(copyVal).toString();
    setVal(result);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputBox}>
        <textarea
          value={val}
          name=""
          id=""
          cols="16"
          rows="2"
          maxLength="40"
          readOnly
        ></textarea>
      </div>
      <div className={styles.buttonsBox}>
        <div onClick={() => setVal("")} className={styles.greySkin}>
          AC
        </div>
        <div onClick={handleCE} className={styles.greySkin}>
          CE
        </div>
        <div onClick={handleClickBtn} className={styles.greySkin}>
          ()
        </div>
        <div onClick={handleClickBtn} className={styles.greySkin}>
          ÷
        </div>
        <div onClick={handleClickBtn}>7</div>
        <div onClick={handleClickBtn}>8</div>
        <div onClick={handleClickBtn}>9</div>
        <div onClick={handleClickBtn} className={styles.greySkin}>
          ×
        </div>
        <div onClick={handleClickBtn}>4</div>
        <div onClick={handleClickBtn}>5</div>
        <div onClick={handleClickBtn}>6</div>
        <div onClick={handleClickBtn} className={styles.greySkin}>
          -
        </div>
        <div onClick={handleClickBtn}>1</div>
        <div onClick={handleClickBtn}>2</div>
        <div onClick={handleClickBtn}>3</div>
        <div onClick={handleClickBtn} className={styles.greySkin}>
          +
        </div>
        <div onClick={handleClickBtn}>.</div>
        <div onClick={handleClickBtn}>0</div>
        <div onClick={handleResult} className={styles.redSkin}>
          =
        </div>
      </div>
    </div>
  );
};

export default Calc;
