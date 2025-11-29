import dayjs from "dayjs";
import { navIcons, navLinks } from "#constants";
import React, { useState } from "react";
import useStore from "#store/window";

function Navbar() {
  const { openWindow } = useStore();
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Vikas Portfolio</p>
        <ul>
          {navLinks.map(({ id, name ,type}) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {
            navIcons.map(({ id, img }) => (
              <li key={id}>
                <img src={img} alt={`icon-${id}`} className="icon-hover" />
              </li>
            ))
          }
        </ul>
        <time datetime="">{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
}

export default Navbar;
