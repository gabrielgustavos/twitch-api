import { useState, useEffect } from "react";
const ID = "9u2qrh6amguihiogyunbovde0c3kh6";
const SECRET = "gkhpheuno423r51flzr6ia5t38k5tg";
let auth = `https://id.twitch.tv/oauth2/token?client_id=${ID}&client_secret=${SECRET}&grant_type=client_credentials`;

function App() {
  const [token, setToken] = useState("");

  const [topGames, setTopGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(auth, {
        method: "POST",
      });
      const data = await result.json();
      setToken(data.access_token);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://api.twitch.tv/helix/games/top?first=14`,
        {
          headers: {
            "Client-ID": ID,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await result.json();

      let dataArray = data.data;
      let finalArray = dataArray.map((game) => {
        let newURL = game.box_art_url
          .replace("{width}", "300")
          .replace("{height}", "300");
        game.box_art_url = newURL;
        return game;
      });
      setTopGames(finalArray);
    };
    fetchData();
  }, [token]);

  return (
    <div className="flex justify-center align-center flex-col">
      <h1 className="text-4xl text-center text-white">Most Popular Games</h1>
      <div className="flex flex-wrap justify-center">
        {topGames.map((game, index) => (
          <div key={index} className="m-4 border-solid border-2">
            <img src={game.box_art_url} alt="" className="w-full h-full" />
            <h2 className="my-5 mx-5 text-lg mt-2 text-center text-white">
              {game.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
