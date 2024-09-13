import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-pink-500 p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>
      <div>
        <p className="text-white">melissamaedsouza20@gmail.com</p>
      </div>
    </nav>
  );
};

export default Nav;
