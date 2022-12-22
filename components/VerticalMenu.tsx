import {
  BsBroadcast,
  BsCart,
  BsEnvelope,
  BsMegaphone,
  BsPeople,
} from "react-icons/bs";

export default function VerticalMenu() {
  return (
    <div className=" bg-bg-verticalMenu pt-4 w-full sm:w-1/5 flex flex-grow-0">
      <ul className="pt-0 sm:pt-4 flex flex-1 flex-row sm:flex-col">
        <li>
          <a
            href="#"
            className="flex items-center pl-4 py-3 text-base font-semibold border-l-4 border-bg-verticalMenu text-cyan-700 transition ease-in-out delay-150 hover:bg-bg-hoverVertical hover:border-cyan-700 hover:border-l-4"
          >
            <BsBroadcast className="mr-4 text-2xl" />
            News Feed
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center pl-4 py-3 text-base font-semibold border-l-4 border-bg-verticalMenu text-cyan-700 transition ease-in-out delay-150 hover:bg-bg-hoverVertical hover:border-cyan-700 hover:border-l-4"
          >
            <BsPeople className="mr-4 text-2xl" />
            Friends
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center pl-4 py-3 text-base font-semibold border-l-4 border-bg-verticalMenu text-cyan-700 transition ease-in-out delay-150 hover:bg-bg-hoverVertical hover:border-cyan-700 hover:border-l-4"
          >
            <BsEnvelope className="mr-4 text-2xl" />
            Messages
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center pl-4 py-3 text-base font-semibold border-l-4 border-bg-verticalMenu text-cyan-700 transition ease-in-out delay-150 hover:bg-bg-hoverVertical hover:border-cyan-700 hover:border-l-4"
          >
            <BsCart className="mr-4 text-2xl" />
            Marketplace
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center pl-4 py-3 text-base font-semibold border-l-4 border-bg-verticalMenu text-cyan-700 transition ease-in-out delay-150 hover:bg-bg-hoverVertical hover:border-cyan-700 hover:border-l-4"
          >
            <BsMegaphone className="mr-4 text-2xl" />
            Events
          </a>
        </li>
      </ul>
    </div>
  );
}
