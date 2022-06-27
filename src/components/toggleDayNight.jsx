import React, { useContext, useEffect } from "react";
import css from "./module/toggleDayNight.module.css";
import Context from "../store/settings-context";
import { useStateIfMounted } from "use-state-if-mounted";
const ToggleDayNight = (props) => {
  const ctx = useContext(Context);

  const [CheckedSwitch, setCheckedSwtich] = useStateIfMounted(false);

  useEffect(() => {
    if (ctx.themeMode === "nightLight") {
      document.getElementById("pageStyle").href = "/nightLight.css";
      setCheckedSwtich(true);
    } else {
      document.getElementById("pageStyle").href = "/dayLight.css";
      setCheckedSwtich(false);
    }
  }, [ctx.themeMode]);

  const labelText = !CheckedSwitch ? "Dim Lights" : "Turn lights on";

  return (
    <div
      style={{
        position: "absolute",
        right: "0",
        padding: "20px",
        display: "inline-block",
        marginTop: "20px",
        ...props.styles,
      }}
    >
      <span className={css.labelText}>{labelText}</span>
      <label className={css.switch}>
        <input
          onChange={ctx.ToggleThemeMode}
          type="checkbox"
          checked={CheckedSwitch}
          readOnly
        />
        <span className={css.slider} />
      </label>
    </div>
  );
};

export default ToggleDayNight;
