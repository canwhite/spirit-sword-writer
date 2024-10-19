import React, { memo, useEffect } from "react";
import useClueStore from "../store/clue";
import useEvent from "../hooks/useEvent";

enum RowType {
  OUTLINE,
  UPDATE,
  SKILL,
  AREA,
  PERSON,
  OTHERS,
  SUPPLEMENT,
}

const Header: React.FC<{ title: string; type: RowType }> = ({
  title,
  type,
}) => {
  const store = useClueStore();
  //需要计算完成率
  const OUTLINE = store.getOutline();
  const updateMethods = store.getUpdateMethods();
  const otherSkills = store.getOtherSkills();
  const areas = store.getAreas();
  const keyPersons = store.getKeyPersons();
  const otherPersons = store.getOtherPersons();
  // const supplement = store.getSupplements();
  const totalItems = [
    OUTLINE,
    updateMethods,
    otherSkills,
    areas,
    keyPersons,
    otherPersons,
  ].filter((item) => item && item.length > 0).length;

  useEffect(() => {
    const totalPossibleItems = 6; // 每个部分至少有一个项目
    const completeness = (totalItems / totalPossibleItems) * 100;
    store.setCompleteness(completeness);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems]);

  //提炼出一个方法，用来添加更新方式
  const updateWithTypeAndInputValue = useEvent((t, inputValue) => {
    //如果是升级方式
    if (!inputValue) {
      return;
    }
    if (t === RowType.UPDATE) {
      store.setUpdateMethods([...store.getUpdateMethods(), inputValue]);
    }
    //如果是专业技能
    if (t === RowType.SKILL) {
      store.setOtherSkills([...store.getOtherSkills(), inputValue]);
    }
    //如果是小地图
    if (t === RowType.AREA) {
      store.setAreas([...store.getAreas(), inputValue]);
    }
    //显示主角，
    if (t === RowType.PERSON) {
      store.setKeyPersons([...store.getKeyPersons(), inputValue]);
    }
    //显示其他角色
    if (t === RowType.OTHERS) {
      store.setOtherPersons([...store.getOtherPersons(), inputValue]);
    }
  });

  const placeHolder =
    type === RowType.UPDATE
      ? "请输入升级方式"
      : type === RowType.SKILL
      ? "请输入其他技能 "
      : type === RowType.AREA
      ? "请输入小地图"
      : type === RowType.PERSON
      ? "请输入主角"
      : type === RowType.OTHERS
      ? "请输入其他人员"
      : type === RowType.SUPPLEMENT
      ? "请输入补充说明"
      : "";

  return (
    <div className="width-full mt-[20px] border-l-4 border-cyan-600 pl-[15px] flex flex-row items-center">
      <h1 className="text-[16px] font-bold">{title}</h1>
      {/* 如果是更新方式 */}
      {(type === RowType.UPDATE ||
        type === RowType.SKILL ||
        type === RowType.AREA ||
        type === RowType.PERSON ||
        type === RowType.OTHERS) && (
        <div className="flex items-center">
          <input
            type="text"
            className="ml-[15px] w-[220px] p-[10px] border border-gray-300 rounded-md border-1 border-cyan-600"
            placeholder={placeHolder}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                const inputValue = (e.target as HTMLInputElement).value;
                updateWithTypeAndInputValue(type, inputValue);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <button
            className="ml-[10px] py-[4px] w-[35px] bg-cyan-600 text-white rounded-md"
            onClick={() => {
              const inputElement = document.querySelector(
                "input[type='text']",
              ) as HTMLInputElement;
              const inputValue = inputElement.value;
              updateWithTypeAndInputValue(type, inputValue);
              inputElement.value = "";
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

const RowBox: React.FC<{ type: RowType }> = ({ type }) => {
  const store = useClueStore();
  let boxArr =
    type === RowType.UPDATE
      ? store.getUpdateMethods()
      : type === RowType.SKILL
      ? store.getOtherSkills()
      : type === RowType.AREA
      ? store.getAreas()
      : type === RowType.PERSON
      ? store.getKeyPersons()
      : type === RowType.OTHERS
      ? store.getOtherPersons()
      : ([] as string[]);

  const deleteMethod = useEvent((index: number) => {
    const updatedMethods = [...boxArr];
    updatedMethods.splice(index, 1);

    if (type === RowType.UPDATE) {
      store.setUpdateMethods(updatedMethods);
    }
    if (type === RowType.SKILL) {
      store.setOtherSkills(updatedMethods);
    }
    if (type === RowType.AREA) {
      store.setAreas(updatedMethods);
    }
    if (type === RowType.PERSON) {
      store.setKeyPersons(updatedMethods);
    }
    if (type === RowType.OTHERS) {
      store.setOtherPersons(updatedMethods);
    }
  });

  return (
    <div className="mt-[16px]">
      <div className="flex flex-col">
        {boxArr.map((method, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-[10px] border-b border-gray-300"
          >
            <span>{method}</span>
            <button
              className="ml-[10px] py-[4px] px-[8px] bg-red-600 text-white rounded-md"
              onClick={() => {
                deleteMethod(index);
              }}
            >
              删除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const _Clue = () => {
  const store = useClueStore();

  return (
    <div className="p-[20px] h-screen overflow-y-auto">
      <h1 className="text-[20px] font-bold">小说大纲和其他</h1>

      <Header title={"* 写作大纲"} type={RowType.OUTLINE}></Header>

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

      <Header title={"* 升级方式"} type={RowType.UPDATE}></Header>
      <RowBox type={RowType.UPDATE}></RowBox>

      <Header title={"* 其他技能"} type={RowType.SKILL}></Header>
      <RowBox type={RowType.SKILL}></RowBox>

      <Header title={"* 小地图"} type={RowType.AREA}></Header>
      <RowBox type={RowType.AREA}></RowBox>

      <Header title={"* 主角"} type={RowType.PERSON}></Header>
      <RowBox type={RowType.PERSON}></RowBox>

      <Header title={"* 其他角色"} type={RowType.OTHERS}></Header>
      <RowBox type={RowType.OTHERS}></RowBox>

      <Header title={"补充内容"} type={RowType.SUPPLEMENT}></Header>
      <div className="mt-[16px]">
        <div className="mt-[16px]">
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const inputValue = e.target.value;
              store.setSupplememts(inputValue);
            }}
            className="w-full h-[150px] p-[10px] border border-gray-300 rounded-md border-1 border-cyan-600"
            placeholder="请在这里输入补充内容，非必输"
            value={store.getSupplements()}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
export function Clue() {
  return <_Clue></_Clue>;
}

export default memo(Clue);
