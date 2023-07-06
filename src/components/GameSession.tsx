import React from "react";

type Props = {};

const gameDataStructure = {
  user: "",
  gameScore: new Map(),
};

// const gameDataStructure2 = {
//   user: 123,
//   levels: [
//     {
//       level_id: 1,
//       locations: [
//         {
//           location_id: 1,
//           score: 3000,
//         },
//       ],
//     },
//   ],
// };

// key=>value

gameDataStructure.gameScore.set(1, new Map());
gameDataStructure.gameScore.set(2, new Map());

gameDataStructure.gameScore.get(1).set(1, 300);
gameDataStructure.gameScore.get(1).set(2, 500);

// czy gral w dany level 1
gameDataStructure.gameScore.has(1);

// czy ma wynik do lokalizacji level 1 lokalizacja 1
gameDataStructure.gameScore.get(1).has(1);

// chcemy podać wynik dla level'u 1
const scoresForLevelFirst = Array.from(
  gameDataStructure.gameScore.get(1).values()
);

// scoresForLevelFirst.reduce((acc: number, value: number) => {
//   acc += value;
//   return acc;
// }, 0);

const gameSessionData = [
  // ile zdobył punktów w danej grze
  // {
  //   user.id {
  //      level.name = Europa
  //      sum of distance in each location 1. 5km 2. 30 = 35km
  //    },
  //      level.id = Polska
  //      sum of distance in each location = 100km
  //    }
  //  }
  // szczegółowe info w którą gre grał i ile miał pkt per lokacja
  // {
  //  user.id {
  //   location.id {
  //    level.id
  //    distance or markedLatLng
  //  },
  //  {
  //    level.id
  //    distance or markedLatLng
  //  },
  //   location.id {
  //    level.id
  //    distance or markedLatLng
  //  },
  //  {
  //    level.id
  //    distance or markedLatLng
  //  }}}}
  // {
  //   user.id {
  //   location.id {
  //      level.id
  //      distance or markedLatLng
  //    }, {
  //      level.id
  //      distance or markedLatLng
  //    }
  //  }
  //  }
];

export const GameSession = (props: Props) => {
  return (
    <div>
      <h1>Game Session</h1>
    </div>
  );
};
