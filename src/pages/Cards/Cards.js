import React, {useEffect, useState} from "react";
import useContext from "../../utils/Context";
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import CardDetailView from "./CardDetailView";

const Cards = () => {
  const [cards, setCards] = useState({cardList: [], loaded: true});
  const [userCoins, setUserCoins] = useState(0);
  const [updateState, setUpdateState] = useState(false);

  const refreshUpdateState = () => {
    setUpdateState(!updateState);
  }

  const navigate = useNavigate();
  const context = useContext();

  const getCards = () => {
    setCards({ ...cards, loaded: false });
    
    fetch(endpoints.CARDS, {
      headers: {
        Authorization: `Token ${context.token || localStorage.getItem("fictionary_token")}`
      },
    }).then((res) => {
      if(res.status === 401){
        context.logout();
        navigate("/signin?redirected=true");
      }
      res.json().then((res) => {
        setCards({
          cardList: res.cards,
          loaded: true
        });
      });
    });
  }

  const getUserCoins = () => {
    
    fetch(endpoints.GET_USER_COINS, {
      headers: {
        Authorization: `Token ${context.token || localStorage.getItem("fictionary_token")}`
      },
    }).then((res) => {
      if(res.status === 401){
        context.logout();
        navigate("/signin?redirected=true");
      }
      res.json().then((res) => {
        console.log(res);
        setUserCoins(res.coins);
      });
    });
  }

  useEffect(() => {
    getCards();
    getUserCoins();
  }, [context.token, updateState]);
  let cardItems;
  if(cards.cardList.size !== 0)
  {
    console.log('If statement entered');
    console.log(cards.cardList);
    cardItems = cards.cardList.map((card, index) => 
      <CardDetailView card = {card} refreshUpdateState={refreshUpdateState}/>
    );
    console.log(cardItems)
  }
  else{
    cardItems = <></>;
  }
  
  return(
    <div>
      {userCoins}
      {cardItems}
    </div>
  )
}

export default Cards;