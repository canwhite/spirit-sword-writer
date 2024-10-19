import React, { memo } from "react";
import useClueStore from "../store/clue.ts";

const Header: Recat.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="mt-[16px] border-l-4 border-cyan-600 pl-[15px]">
      <h1 className="text-[16px] font-bold">{title}</h1>
    </div>
  );
};

const Box: React.FC<{ boxArr: string[] }> = ({ boxArr }) => {
  return <div></div>;
};

const _Clue = () => {
  const store = useClueStore();

  return (
    <div className="p-[20px] h-screen overflow-y-auto">
      <h1 className="text-[20px] font-bold">小说大纲和其他</h1>

      <Header title={"写作大纲"}></Header>

      <div className="mt-[16px]">
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const inputValue = e.target.value;
            store.setOutline(inputValue);
          }}
          className="w-full h-[150px] p-[10px] border border-gray-300 rounded-md border-1 border-cyan-600"
          placeholder="请在这里输入大纲内容，如有需要可以在左侧搜索..."
          value={store.getOutline()}
        ></textarea>
      </div>

      <Header title={"升级方式"}></Header>
      <div className="mt-[16px]">TODO ,这里需要map</div>

      <Header title={"其他技能"}></Header>
      <div className="mt-[16px]">TODO ,这里需要map</div>

      <Header title={"小地图"}></Header>
      <div className="mt-[16px]">TODO ,这里需要map</div>

      <Header title={"主角"}></Header>
      <div className="mt-[16px]">TODO ,这里需要map</div>

      <Header title={"其他角色"}></Header>
      <div className="mt-[16px]">TODO ,这里需要map</div>

      <Header title={"补充内容"}></Header>
      <div className="mt-[16px]">TODO ,这里需要map</div>
    </div>
  );
};

export function Clue() {
  return <_Clue></_Clue>;
}
export default memo(Clue);
