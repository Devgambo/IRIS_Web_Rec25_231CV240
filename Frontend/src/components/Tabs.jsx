import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ChipTabs = ({ selected, setSelected, tabs, className}) => {

  return (
    <div className={cn(
      `relative top-15 bg-white/10 rounded-2xl px-4 py-5 m-10 flex items-center justify-around flex-wrap gap-8`,
      className
    )}>
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          key={tab}
        />
      ))}
    </div>
  );
};

const Chip = ({
  text,
  selected,
  setSelected,
}) => {
  return (
    <button
      onClick={() => {
        setSelected(text)

      }}
      className={`${
        selected
          ? "text-white"
          : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
      } text-sm transition-colors px-5 py-2.5 rounded-md relative`}
    >
      <span className="relative text-[16px] z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;