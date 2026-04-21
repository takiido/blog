import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="container">
      <div className={styles.home}>

        <p className={styles.home_text}>
          my name is alex.
          <br />
          i began as a frontend developer working mainly with react.
          <br />
          then i expanded into full-stack development with fastapi and spring.
          <br />
          in my free time i like to work with c++ and recently i discovered rust.
        </p>
      </div>
      <hr className={styles.hr} />
      <ul className={styles.lovehate}>
        <li>i love:</li>
        <li>i hate:</li>
        <ul>
          <li>open source</li>
          <li>gtk</li>
          <li>linux ricing</li>
          <li>lists</li>
          <li>pretty girls</li>
        </ul>
        <ul>
          <li>qt</li>
          <li>2fa</li>
          <li>subscriptions</li>
          <li>microsoft</li>
        </ul>
      </ul>
    </main>
  );
}
