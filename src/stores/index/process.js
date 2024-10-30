import { cloneDeep } from "lodash";
import { list, groupNameToIdMap, idToGroupNameMap } from "./list.js";

export const cardHandler = (cardsData) => {
  const result = {};
  const roleData = getRoleData();
  classifyCards(roleData, cardsData);

  Object.entries(roleData).forEach(([key, value]) => {
    const newKey = key+value.role.pos
    result[newKey] = value;
  })
  return result;
};

const getRoleData = () => {
  const result = {};
  list.forEach((role) => {
    result[role.name] = {
      role: {
        ...role,
        groupName: idToGroupNameMap[role.group],
      },
      defaultCards: getDefaultCards(role),
      cards: [],
    };
  });

  return result;
};

const getDefaultCards = (role) => {
  const result = [];
  const identity = role.identity;

  if (
    identity === "演練" ||
    identity === "火焰" ||
    identity === "自媒體" ||
    identity === "目標"
  )
    result.push(getLeaderCard(role));

  return result;
};

const getLeaderCard = ({ identity, name, group }) => {
  return {
    fromGroup: "",
    from: `${identity}大隊長`,
    toGroup: idToGroupNameMap[group],
    to: name,
    content: `極致的${identity}隊長 ${name}\n很高興你這一期為戰隊挺身而出，在戰隊中積極的參與，帶領大家一起前進，期待未來的你，在不同場合能繼續發揮你的領導力，帶領大家一起前進。`,
  };
};

const classifyCards = (roleData, cardsData) => {
  const cloneData = cloneDeep(cardsData);
  cloneData.shift();
  cloneData.forEach((card) => {
    const data = {
      fromGroup: card[1],
      from: card[2],
      toGroup: card[3],
      to: card[4],
      content: card[5],
    };
    const target = roleData[data.to];
    if (target) target.cards.push(data);
  });

};
