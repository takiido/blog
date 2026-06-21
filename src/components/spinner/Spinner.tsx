import styles from "./Spinner.module.scss";

export default function Spinner() {
  return (
    <div className = {styles.spinner} >
      <svg width="56" height="56" viewBox="0 0 56 56">
  <circle
    cx="28"
    cy="28"
    r="26"
    fill="none"
    stroke="#c0fc04"
    strokeWidth="3"
    strokeDasharray="1 12.61"
  />
</svg>
    </div>
  )
}
