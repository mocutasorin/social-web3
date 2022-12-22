import News from "./widgets/News";

const Sidebar = () => {
  return (
    <aside className="gap-4 flex flex-col w-1/3 pt-1">
      <News />
    </aside>
  );
};

export default Sidebar;
