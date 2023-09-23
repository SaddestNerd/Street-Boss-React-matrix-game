import "./MainMenu.scss";
import { React, useState, useEffect, useRef } from "react";
import { allayIdle, enemyIdle, backgroundMenu, logo, backgroundGame, selectSound, menuSound, enemyWalking, allayWalking, startGif, goSound, cloudSpoken, cloudEnemy, thinking, attack, deff, pass, win, lose, enemyWinStr, enemyDmg, enemyWin, allayWinStr, allayWin, allayDmg, help1, help3, help2, help4 } from "../../../madia";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion"

const discriptionOpen = {
  closed: { top: "100%" },
  open: { top: "5%" },
};

const OpenGame = {
  closed: { top: "100%" },
  open: { top: "0%" },
};

const TableAnimation = {
  closed: { top: "900px" },
  open: { top: "0" },
}

const MoveEnemy = {
  closed: { right: "-10%" },
  open: { right: "20%" },
}


const MoveAllay = {
  closed: { left: "-10%" },
  open: { left: "20%" },
}

const BtnAnimation = {
  closed: { y: "300px" },
  open: { y: "0" },
}

const LogsAnimation = {
  closed: { y: "-200px" },
  open: { y: "1020px" },
}





const handleStep = (myTern, randomNum) => {

};

const MainMenu = () => {

  const [gameData, gameSetData] = useState([[[3, 3], [2, 0], [0, 3]], [[0, 3], [1, 1], [1, 0]], [[3, 0], [0, 1], [0, 0]]]);

  const [gameData1, gameSetData1] = useState([
    [
      { "player1": 3, "player2": 3 },
      { "player1": 0, "player2": 1 },
      { "player1": 2, "player2": 1 }
    ],
    [
      { "player1": 3, "player2": 0 },
      { "player1": 2, "player2": 2 },
      { "player1": 0, "player2": 3 }
    ],
    [
      { "player1": 1, "player2": 1 },
      { "player1": 0, "player2": 3 },
      { "player1": 1, "player2": 1 }
    ]
  ]);

  function replaceNegativeWithPositive(matrix) {
    const result = [];
  
    // Проходим по каждой строке матрицы
    for (let i = 0; i < matrix.length; i++) {
      const row = [];
  
      // Проходим по каждому элементу в строке
      for (let j = 0; j < matrix[i].length; j++) {
        // Заменяем отрицательные значения на положительные, и наоборот
        if (matrix[i][j] < 0) {
          row.push(-matrix[i][j]);
        } else {
          row.push(-matrix[i][j]);
        }
      }
  
      result.push(row);
    }
  
    return result;
  }

  function transformGameData(gameData) {
    const transformedData = gameData.map((row) =>
      row.map(([player1, player2]) => ({ player1, player2 }))
    );

    return transformedData;
  }


  const minMaxPlayer1 = (survivalMatrixOfTwoPlayers) => {
    let resultArray = survivalMatrixOfTwoPlayers?.map(game => {
      return game?.map(match => {
        return match.player1 - match.player2;
      });
    });

    let resultArray1 = replaceNegativeWithPositive(resultArray);

    let arrayMin = [];
    for (let i = 0; i < resultArray.length; i++) {
      let min = {
        row: i,
        col: 0,
        player1: resultArray[i][0],
      };
      for (let j = 0; j < resultArray[i].length; j++) {
        if (resultArray[i][j] < min.player1) {
          min = {
            row: i,
            col: j,
            player1: resultArray[i][j],
          };
        }
      }
      arrayMin.push(min);
    }
    let minMax = arrayMin[0];
    for (let i = 0; i < arrayMin.length; i++) {
      if (minMax.player1 > arrayMin[i].player1) {
        minMax = arrayMin[i];
      }
    }
  const optimal = findOptimalStrategy(resultArray1)[0];
  const optimal1 = findOptimalStrategy(resultArray)[1];
    console.log(resultArray)
    console.log(findOptimalStrategy(resultArray)[1])
    return { minMax, arrayMin, optimal, optimal1 };
  };


  function findOptimalStrategy(matrix) {
    const rows = matrix.length;
    const columns = matrix[0].length;
  
    // Функция для нахождения максимального значения в массиве
    function max(arr) {
      return Math.max(...arr);
    }
  
    // Функция для нахождения минимального значения в массиве
    function min(arr) {
      return Math.min(...arr);
    }
  
    // Функция для определения оптимальной стратегии первого игрока
    function findOptimalStrategyPlayer1(matrix) {
      const values = [];
  
      // Проходим по каждой строке матрицы
      for (let i = 0; i < rows; i++) {
        values.push(min(matrix[i]));
      }
  
      // Находим максимальное значение из минимальных значений строк
      const maxMinValue = max(values);
  
      // Возвращаем индекс строки с максимальным минимальным значением
      return values.indexOf(maxMinValue);
    }
  
    // Функция для определения оптимальной стратегии второго игрока
    function findOptimalStrategyPlayer2(matrix, row) {
      const values = matrix[row];
  
      // Находим минимальное значение из выбранной строки
      const minValue = min(values);
  
      // Возвращаем индекс столбца с минимальным значением
      return values.indexOf(minValue);
    }
  
    // Находим оптимальную стратегию первого игрока
    const optimalRow = findOptimalStrategyPlayer1(matrix);
  
    // Находим оптимальную стратегию второго игрока
    const optimalColumn = findOptimalStrategyPlayer2(matrix, optimalRow);
  
    return [optimalRow, optimalColumn];
  }



  const [tableData, setTableData] = useState([
    ["", "Atack", "Deff", "Pass"],
    ["Atack", ...gameData[0]],
    ["Deff", ...gameData[1]],
    ["Pass", ...gameData[2]]
  ]);
  const [isOpenDescription, setIsOpenDescription] = useState(false);

  const [isOpenGame, setIsOpenGame] = useState(false);
  const [isOpenGame2, setIsOpenGame2] = useState(false);
  const [isOpenGame3, setIsOpenGame3] = useState(false);

  const [minMaxPlayer1Value, setMinMaxPlayer1Value] = useState(null);


  const [myDot, setMyDot] = useState("0");
  const [enemyDot, setEnemyDot] = useState("0");

  const [allayLives, setAllayLives] = useState(10);
  const [enemyLives, setEnemyLives] = useState(10);
  const [VisibleAllay, setVisibleAllay] = useState("Idle");
  const [VisibleEnemy, setVisibleEnemy] = useState("Idle");

  const [allayChoose, setAllayChoose] = useState("1");
  const [enemyChoose, setEnemyChoose] = useState("2");
  const [visibleCloud, setVisibleCloud] = useState(false);

  const [logs, setLogs] = useState([]);

  const [winLose, setWinLose] = useState("isGame");



  const handleChangeTable = (rowIndex, colIndex, value) => {
    const newData = [...gameData];
    newData[rowIndex][colIndex] = value;
    gameSetData(newData);
  };

  const getMinMax = () => {
    if (minMaxPlayer1Value) {
      setMinMaxPlayer1Value(null);
    } else {
      setMinMaxPlayer1Value(minMaxPlayer1(gameData1));
    }
  };

  const handleClick = (myTern) => () => {

    if (winLose === "isGame") {
      const randomNum = Math.floor(Math.random() * 3);

      setVisibleCloud(true);
      setAllayChoose(myTern)
      setEnemyChoose(4);
      attackBtnRef.current.disabled = true;
      deffBtnRef.current.disabled = true;
      passBtnRef.current.disabled = true;

      setTimeout(() => {
        setEnemyChoose(randomNum);
        if (gameData[myTern][randomNum][0] < gameData[myTern][randomNum][1]) {
          setVisibleAllay("WinRound")
          setVisibleEnemy("Dmg")
        }
        if (gameData[myTern][randomNum][1] < gameData[myTern][randomNum][0]) {
          setVisibleEnemy("WinRound")
          setVisibleAllay("Dmg")
        }
      }, 3500)

      setTimeout(() => {
        setVisibleEnemy("Idle")
        setVisibleAllay("Idle")
        setEnemyChoose(5);
        setAllayChoose(4)
        setVisibleCloud(false);
        attackBtnRef.current.disabled = false;
        deffBtnRef.current.disabled = false;
        passBtnRef.current.disabled = false;
        handleStep(myTern, randomNum);
        setMyDot(myTern);
        setEnemyDot(randomNum);
        setAllayLives(allayLives - gameData[myTern][randomNum][0])
        setEnemyLives(enemyLives - gameData[myTern][randomNum][1])

        const newArray = [...logs, `First player lost ${gameData[myTern][randomNum][0]}! mobsters, Second player lost ${gameData[myTern][randomNum][1]}!`];
        setLogs(newArray);

        if (allayLives - gameData[myTern][randomNum][0] < 1) {
          setWinLose("lose")
          attackBtnRef.current.disabled = true;
          deffBtnRef.current.disabled = true;
          passBtnRef.current.disabled = true;
          setIsOpenGame2(false);
          setVisibleEnemy("Win");
          setVisibleAllay("Dmg");
          const newArray = [...logs, `Second player Win!!!`];
          setLogs(newArray);
        }
        if (enemyLives - gameData[myTern][randomNum][1] < 1) {
          setWinLose("win")
          attackBtnRef.current.disabled = true;
          deffBtnRef.current.disabled = true;
          passBtnRef.current.disabled = true;
          setIsOpenGame2(false);
          setVisibleAllay("Win");
          setVisibleEnemy("Dmg");
          const newArray = [...logs, `First player Win!!!`];
          setLogs(newArray);

        }
      }, 5000)

    }
  };

  const handleRestart = () => {
    setMyDot("0");
    setEnemyDot("0");
    setLogs([]);
    setAllayLives(10);
    setEnemyLives(10);
    setVisibleAllay("Idle");
    setVisibleEnemy("Idle");
    setAllayChoose("1");
    setEnemyChoose("2");
    setVisibleCloud(false);
    setWinLose("isGame");
    setIsOpenGame2(true);
    attackBtnRef.current.disabled = false;
    deffBtnRef.current.disabled = false;
    passBtnRef.current.disabled = false;

    console.log("sasha - dog patron")
  };

  const attackBtnRef = useRef(null);
  const deffBtnRef = useRef(null);
  const passBtnRef = useRef(null);

  const audioRef = useRef(null);
  const musicRef = useRef(null);
  const goSoundRef = useRef(null);

  const gifRef = useRef(null);
  const mainMenu = useRef(null);

  const handleAudioClick = () => {
    audioRef.current.play();
    musicRef.current.play();
    var vid = document.getElementById("mySound");
    vid.volume = 0.05;
  };

  const handleWalking = () => {


    const transformedData = transformGameData(gameData);
    gameSetData1(transformedData);
    setTableData([
      ["", "Atack", "Deff", "Pass"],
      ["Atack", ...gameData[0]],
      ["Deff", ...gameData[1]],
      ["Pass", ...gameData[2]]]);

    musicRef.current.pause();
    goSoundRef.current.play();
    audioRef.current.play();
    var vid = document.getElementById("goSound");
    vid.volume = 0.05;
    setVisibleAllay("Walking")
    setVisibleEnemy("Walking");
    setTimeout(() => {
      setVisibleEnemy("Idle");
      setVisibleAllay("Idle");
    }, 3000); // 3 секунды

    setTimeout(() => {
      gifRef.current.style.display = "none";
      mainMenu.current.style.display = "none";
    }, 4000); // 3 секунды
    setTimeout(() => {
      gifRef.current.style.display = "none";
      mainMenu.current.style.display = "none";
    }, 6000); // 3 секунды
  };

  const handleAnimation = () => {
    setTimeout(() => {
      setIsOpenGame2(true);
    }, 5500); // 3 секунды
  };

  return (
    <section className="Game">
      <audio ref={audioRef}>
        <source src={selectSound} type="audio/mpeg" />
      </audio>
      <audio id="mySound" ref={musicRef}>
        <source src={menuSound} type="audio/mpeg" />
      </audio>
      <audio id="goSound" ref={goSoundRef}>
        <source src={goSound} type="audio/mpeg" />
      </audio>
      <section className="MainMenu" ref={mainMenu}>
        <div className="background">
          <img src={backgroundMenu} alt="" />
        </div>
        <div className="logo">
          <img src={logo} alt="" />
          <p>MATRIX GAME</p>
        </div>
        <div className="menu">
          <div>
            <button onClick={() => setIsOpenDescription((isOpenDescription) => true, handleAudioClick(), handleAnimation())}>PLAY</button>
          </div>
          <div>
            <button onClick={handleAudioClick}>SETTINGS</button>
          </div>
          <div>
            <button onClick={handleAudioClick}>CREDITS</button>
          </div>

        </div>

        <motion.div className="description"
          animate={isOpenDescription ? "open" : "closed"}
          variants={discriptionOpen}
          transition={{ type: "spring", bounce: 0.25 }}>
          <button className="description-close" onClick={() => setIsOpenDescription(false)}>x</button>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="description-wrapper">
                <p className="description-logo">Prologue</p>
                <p className="text">A small prehistory about the death of the head of the mafia family began several years ago. At that time, he was one of the most powerful and influential people in the underground world. He skillfully managed his organization and controlled many businesses that were associated with illegal activities such as drug trafficking, weapons trafficking and prostitution.</p>
                <p className="text">However, the head of the family began to make mistakes and some of his subordinates became dissatisfied with his leadership. They started asking questions and demanding more freedom to make decisions. But the head of the family was confident in his power and did not accept any changes.</p>
                <p className="text">As a result, some of his subordinates began to conspire and plan a rebellion against the head of the family. They wanted their share of power and wealth, and they weren't going to stop until they got what they wanted.</p>
                <p className="text">Once, the head of the family was killed as a result of a prepared assassination attempt. After his death, the family split into two separate groups, each of which wanted to inherit the head of the family's former influence and continue to control his businesses. However, since each group had its own interests and ambitions, they could not agree on how to divide the inheritance of the head of the family. Their disputes led to the start of a war between two separate mafia factions that fought each other for control of territories and businesses that used to be the possessions of the head of the family. As a result of this war, many people suffered, and the peaceful coexistence of two families was no longer possible.</p>
              </div>

            </SwiperSlide>
            <SwiperSlide>
              <div className="description-wrapper">

                <p className="description-logo">How to play</p>
                <p className="text">A small prehistory about the death of the head of the mafia family began several years ago. At that time, he was one of the most powerful and influential people in the underground world. He skillfully managed his organization and controlled many businesses that were associated with illegal activities such as drug trafficking, weapons trafficking and prostitution.</p>
                <table>
                  <tr>
                    <th></th>
                    <th>Attack</th>
                    <th>Defense</th>
                    <th>Push</th>
                  </tr>
                  <tr>
                    <th>Attack</th>
                    <td>1, 0</td>
                    <td>1, 0</td>
                    <td>1, 0</td>
                  </tr>
                  <tr>
                    <th>Defense</th>
                    <td>1, 0</td>
                    <td>1, 0</td>
                    <td>1, 0</td>
                  </tr>
                  <tr>
                    <th>Push</th>
                    <td>1, 0</td>
                    <td>1, 0</td>
                    <td>1, 0</td>
                  </tr>
                </table>
                <div className="buttons">
                  <button className="atackBtn">Atack</button>
                  <button className="deffBtn">Deff</button>
                  <button className="passBtn">Pass</button>
                </div>
                <div className="sprites">
                  <img className="allay" src={allayIdle} alt="" />
                  <img className="enemy" src={enemyIdle} alt="" />

                </div>
              </div>

            </SwiperSlide>
            <SwiperSlide>
              <div className="description-wrapper">

                <p className="description-logo">How to play: Attack</p>
                <img className="description-img" src={help1} alt="" />
              </div>

            </SwiperSlide>
            <SwiperSlide>
              <div className="description-wrapper">

                <p className="description-logo">How to play: Deff</p>
                <img className="description-img" src={help2} alt="" />
              </div>

            </SwiperSlide>
            <SwiperSlide>
              <div className="description-wrapper">

                <p className="description-logo">How to play: Pass</p>
                <img className="description-img" src={help3} alt="" />
              </div>

            </SwiperSlide>
            <SwiperSlide>
              <div className="description-wrapper">

                <p className="description-logo">How to play: Best Option</p>
                <img className="description-img" src={help4} alt="" />
              </div>

            </SwiperSlide>
            <SwiperSlide>
              <div className="description-wrapper">
                <p className="description-logo">Change matrix if u want</p>
                <table>
                  <tbody>
                    {gameData?.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row?.map((cell, colIndex) => (
                          <td key={colIndex}>
                            <div className="flex">
                              <input
                                className="input-ababka"
                                type="number"
                                value={cell[0]}
                                onChange={(e) =>
                                  handleChangeTable(rowIndex, colIndex, [
                                    parseInt(e.target.value),
                                    cell[1],
                                  ])
                                }
                              />
                              <input
                                className="input-ababka"
                                type="number"
                                value={cell[1]}
                                onChange={(e) =>
                                  handleChangeTable(rowIndex, colIndex, [
                                    cell[0],
                                    parseInt(e.target.value),
                                  ])
                                }
                              />
                            </div>

                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="buttons">
                  <button className="atackBtn" onClick={() => setIsOpenGame((isOpenGame) => true, handleWalking())}>Start Game</button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

        </motion.div>
      </section>
      <motion.section className="MainGame" animate={isOpenGame ? "open" : "closed"}
        variants={OpenGame}
        transition={{ type: "spring", bounce: 0.25 }}>
        <div className="background">
          <img src={backgroundGame} alt="" />
        </div>
        <div className="startGif" ref={gifRef}>
          <img src={startGif} alt="" />
        </div>
        <div className="winlose-wrapper">
          {winLose === "lose" &&
            <>
              <img src={lose} alt="" />
              <button className="restartBtn" onClick={handleRestart}>Restart</button>
            </>

          }
          {winLose === "win" &&
            <>
              <img src={win} alt="" />
              <button className="restartBtn" onClick={handleRestart}>Restart</button>
            </>
          }
        </div>
        <div className="menuButtons">
          <button className="restartGame">Restart</button>
          <button className="exitGame" >Exit</button>
          <button className="restartGame" onClick={getMinMax}>Best Option</button>
          <button className="restartGame" onClick={() => { setIsOpenGame3(!isOpenGame3) }}>Fight Logs</button>
        </div>

        <motion.div className="logs-table"
          animate={isOpenGame3 ? "open" : "closed"}
          variants={LogsAnimation}
          transition={{ type: "spring", bounce: 0.2, duration: 2 }}>
          <div className="logs-label">GAME LOGS</div>
          {logs.map((row, index) => (
            <p>{row}</p>
          ))}

        </motion.div>
        <motion.table
          animate={isOpenGame2 ? "open" : "closed"}
          variants={TableAnimation}
          transition={{ type: "spring", bounce: 0.2, duration: 2 }}>
          <thead>
            <tr>
              {tableData[0]?.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.slice(1)?.map((row, index) => (
              <tr key={index}>
                {row?.map((cell, indexJ) => {
                  let cellStyles = { background: undefined };
                  if (minMaxPlayer1Value) {
                    const isMinMaxPlayer1 =
                      index === minMaxPlayer1Value.optimal
                        // || indexJ === minMaxPlayer1Value.optimal1 + 1
                    if (isMinMaxPlayer1) {
                      cellStyles.background = "#fff";
                    }
                  }
                  return (
                    <td key={indexJ} className={(index === myDot && indexJ === enemyDot + 1 ? "yellowTD" : "") || (index === myDot && indexJ > 0 ? "greenTD" : "") || (indexJ === enemyDot + 1 ? "redTD" : "")} style={cellStyles?.background ? cellStyles : undefined}>
                      <input className="input-ababka" type="text" value={Array.isArray(cell) ? cell.join(", ") : cell} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </motion.table>
        <div className="buttons bottom">
          <motion.button onClick={handleClick(0)} className="atackBtn" ref={attackBtnRef}
            animate={isOpenGame ? "open" : "closed"}
            variants={BtnAnimation}
            transition={{ type: "spring", bounce: 1, duration: 2.5 }}>Atack</motion.button>
          <motion.button onClick={handleClick(1)} className="deffBtn" ref={deffBtnRef}
            animate={isOpenGame ? "open" : "closed"}
            variants={BtnAnimation}
            transition={{ type: "spring", bounce: 1, duration: 3 }}>Deff</motion.button>
          <motion.button onClick={handleClick(2)} className="passBtn" ref={passBtnRef}
            animate={isOpenGame ? "open" : "closed"}
            variants={BtnAnimation}
            transition={{ type: "spring", bounce: 1, duration: 3.5 }}>Pass</motion.button>
        </div>
        <div className="sprites-game">
          <motion.div className="allay"
            animate={isOpenGame ? "open" : "closed"}
            variants={MoveAllay}
            transition={{ duration: 3.5 }}>

            <div className="img-wrapper">
              {visibleCloud &&
                <img className="img-wrapper-cloud" src={cloudSpoken} alt="" />
              }
              {allayChoose === 0 &&
                <img className="img-wrapper-thinking" src={attack} alt="" />
              }
              {allayChoose === 1 &&
                <img className="img-wrapper-thinking" src={deff} alt="" />
              }
              {allayChoose === 2 &&
                <img className="img-wrapper-thinking" src={pass} alt="" />
              }
              {VisibleAllay === "Win" &&
                <img src={allayWinStr} alt="" />
              }
              {VisibleAllay === "WinRound" &&
                <img src={allayWin} alt="" />
              }
              {VisibleAllay === "Dmg" &&
                <img src={allayDmg} alt="" />
              }
              {VisibleAllay === "Walking" &&
                <img src={allayWalking} alt="" />
              }
              {VisibleAllay === "Idle" &&
                <img src={allayIdle} alt="" />
              }
            </div>
            <div className="lifeCount">Mobsters: {allayLives}</div>
          </motion.div>
          <motion.div className="enemy"
            animate={isOpenGame ? "open" : "closed"}
            variants={MoveEnemy}
            transition={{ duration: 3.5 }}>
            <div className="img-wrapper">
              {visibleCloud &&
                <img className="img-wrapper-cloud" src={cloudEnemy} alt="" />
              }
              {enemyChoose === 0 &&
                <img className="img-wrapper-thinking" src={attack} alt="" />
              }
              {enemyChoose === 1 &&
                <img className="img-wrapper-thinking" src={deff} alt="" />
              }
              {enemyChoose === 2 &&
                <img className="img-wrapper-thinking" src={pass} alt="" />
              }
              {enemyChoose === 4 &&
                <img className="img-wrapper-thinking" src={thinking} alt="" />
              }
              {VisibleEnemy === "Win" &&
                <img src={enemyWinStr} alt="" />
              }
              {VisibleEnemy === "WinRound" &&
                <img src={enemyWin} alt="" />
              }
              {VisibleEnemy === "Dmg" &&
                <img src={enemyDmg} alt="" />
              }
              {VisibleEnemy === "Walking" &&
                <img src={enemyWalking} alt="" />
              }
              {VisibleEnemy === "Idle" &&
                <img src={enemyIdle} alt="" />
              }
              {/* {VisibleEnemy === "Idle" &&
                <img src={enemyIdle} alt="" />
              } */}

            </div>
            <div className="lifeCount">Mobsters: {enemyLives}</div>
          </motion.div>

        </div>
      </motion.section>
    </section>


  )
}

export default MainMenu;