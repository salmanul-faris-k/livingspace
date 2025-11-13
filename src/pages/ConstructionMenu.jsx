import React from "react";
import { FaCalculator, FaHammer, FaHome, FaBuilding, FaRuler } from "react-icons/fa";
import { GiConcreteBag, GiSteelClaws, GiBrickWall, GiWindowBars } from "react-icons/gi";
import { MdConstruction, MdEngineering } from "react-icons/md";

function DevelopmentMenu() {
  const menuItems = [
    {
      id: "footings",
      title: "Sloped Footings",
      desc: "Steel and concrete estimation for isolated footings.",
      icon: <FaCalculator className="text-emerald-400 text-2xl" />,
    },
    {
      id: "beam",
      title: "Beams",
      desc: "Reinforcement and concrete quantities for beams.",
      icon: <FaHammer className="text-blue-400 text-2xl" />,
    },
    {
      id: "column",
      title: "Columns",
      desc: "Calculate steel & concrete for RCC columns.",
      icon: <FaBuilding className="text-indigo-400 text-2xl" />,
    },
    {
      id: "slab",
      title: "Slabs",
      desc: "Material estimation for slab construction.",
      icon: <FaHome className="text-pink-400 text-2xl" />,
    },
    {
      id: "plastering",
      title: "Plastering",
      desc: "Surface area & mortar calculation for walls.",
      icon: <GiConcreteBag className="text-orange-400 text-2xl" />,
    },
    {
      id: "blockwall",
      title: "Block Wall",
      desc: "Concrete block & mortar estimation for walls.",
      icon: <GiBrickWall className="text-yellow-400 text-2xl" />,
    },
    {
      id: "steel",
      title: "Steel Calculation",
      desc: "Rebar lengths & weights based on design inputs.",
      icon: <GiSteelClaws className="text-red-400 text-2xl" />,
    },
    {
      id: "sunshade",
      title: "Sunshades",
      desc: "Material estimation for sunshade slabs.",
      icon: <GiWindowBars className="text-teal-400 text-2xl" />,
    },
    {
      id: "tools",
      title: "Tools & Utilities",
      desc: "Extra construction calculators & helpers.",
      icon: <MdEngineering className="text-violet-400 text-2xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-emerald-400">
        Construction Calculators
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-2xl p-6 flex items-start gap-4 shadow-lg hover:shadow-emerald-500/40 
                       hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-700">
              {item.icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DevelopmentMenu;
