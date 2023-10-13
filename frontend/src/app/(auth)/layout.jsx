import Link from "next/link";
import Image from "next/image";

import balangan from "@/static/balangan.png";

export default function Layout({ children }) {
  return (
    <>
      <header className="flex h-[5rem] w-full items-center justify-between bg-green-400 px-[2rem]">
        <Link href="/beranda">
          <span className="text-2xl font-bold">E-Arsip Mampari</span>
        </Link>
        <div className="hidden items-center gap-x-5 md:flex">
          <span className="text-xl font-bold">Admin</span>
          <div className="daisy-dropdown daisy-dropdown-end">
            <button className="h-[3.5rem] w-[3.5rem] rounded-full bg-white"></button>
            <ul className="daisy-menu daisy-dropdown-content rounded-box daisy-menu-md mt-4 w-40 bg-blue-200 shadow">
              <li>
                <Link href="/profil" className="hover:font-bold">
                  Profil
                </Link>
              </li>
              <li>
                <Link href="/keluar" className="hover:font-bold">
                  Keluar
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <aside className="hidden md:block">
        <ul className="daisy-menu">
          <li>
            <Link href="/beranda">Beranda</Link>
          </li>
          <li>
            <span className="daisy-menu-dropdown-toggle">Manajemen</span>
            <ul className="daisy-menu-dropdown">
              <li>
                <Link href="/pengguna">Pengguna</Link>
              </li>
              <li>
                <Link href="/akses">Hak Akses</Link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
