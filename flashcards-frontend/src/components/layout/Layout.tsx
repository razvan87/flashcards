import type { ReactNode } from "react";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Layout.module.css";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}