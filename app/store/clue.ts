import { createPersistStore } from "@/app/utils/store";
import { StoreKey } from "../constant";

type ClueState = {
  completeness: number;
  outline: string;
  updateMethods: string[];
  areas: string[];
  otherSkills: string[];
  keyPersons: string[];
  otherPersons: string[];
  supplements: string;
};

export const DEFAULT_CLUE_STATE = {
  completeness: 0,
  outline: "",
  updateMethods: [],
  areas: [],
  otherSkills: [],
  keyPersons: [],
  otherPersons: [],
  supplements: "",
} as ClueState;

const useClueStore = createPersistStore(
  { ...DEFAULT_CLUE_STATE },
  (set, get) => ({
    getCompleteness() {
      return get().completeness;
    },

    setCompleteness(completeness: number) {
      set((state) => ({ ...state, completeness }));
    },

    //得到outline
    getOutline() {
      return get().outline;
    },
    //设置outline
    setOutline(outline: string) {
      set((state) => ({ ...state, outline }));
    },

    //得到updateMethods
    getUpdateMethods() {
      return get().updateMethods;
    },
    //设置updateMethods
    setUpdateMethods(updateMethods: string[]) {
      set((state) => ({ ...state, updateMethods }));
    },

    //得到areas
    getAreas() {
      return get().areas;
    },
    //设置areas
    setAreas(areas: string[]) {
      set((state) => ({ ...state, areas }));
    },

    //得到otherSkills
    getOtherSkills() {
      return get().otherSkills;
    },
    //设置otherSkills
    setOtherSkills(otherSkills: string[]) {
      set((state) => ({ ...state, otherSkills }));
    },

    //得到keyPersons
    getKeyPersons() {
      return get().keyPersons;
    },
    //设置keyPersons
    setKeyPersons(keyPersons: string[]) {
      set((state) => ({ ...state, keyPersons }));
    },

    //得到otherPersons
    getOtherPersons() {
      return get().otherPersons;
    },
    //设置otherPersons
    setOtherPersons(otherPersons: string[]) {
      set((state) => ({ ...state, otherPersons }));
    },

    getSupplements() {
      return get().supplements;
    },
    setSupplememts(supplements: string) {
      set((state) => ({ ...state, supplements }));
    },
  }),
  {
    name: StoreKey.Clue,
    version: 1,

    migrate(state, version) {
      /* 
            const newState = JSON.parse(JSON.stringify(state)) as MaskState;
      
            // migrate mask id to nanoid
            if (version < 3) {
              Object.values(newState.masks).forEach((m) => (m.id = nanoid()));
            }
      
            if (version < 3.1) {
              const updatedMasks: Record<string, Mask> = {};
              Object.values(newState.masks).forEach((m) => {
                updatedMasks[m.id] = m;
              });
              newState.masks = updatedMasks;
            }
      
            return newState as any;

            */
      return state as any;
    },

    onRehydrateStorage(state) {
      //TODO,做一些初始化操作
    },
  },
);
export default useClueStore;
