import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [place, setPlace] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAddText = (item) => {
    const newSearch = `${search} ${item}`;
    setSearch(newSearch);
    console.log(newSearch);
    console.log(search);
  };

  const fetchPlace = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${search}`
      );
      setPlace(result.data.data);
    } catch (error) {
      console.log("Error...");
    }
  };

  useEffect(() => {
    fetchPlace();
  });

  return (
    <div className="App">
      <div className="logo">เที่ยวไหนดี</div>
      <div className="search-box">
        <div>
          <div>ค้นหาที่เที่ยว</div>
          <div>
            <input
              type="text"
              onChange={handleSearch}
              value={search}
              placeholder="หาที่เที่ยวแล้วไปกัน..."
              className="input-box"
            />
          </div>
        </div>
      </div>
      <div className="display">
        {place.map((item, index) => (
          <div className="component" key={index}>
            <div className="main-pic-container">
              <img src={item.photos[0]} alt="pic" className="main-pic" />
            </div>
            <div className="des-container">
              <div className="topic">{item.title}</div>
              <div className="description">
                {item.description.slice(0, 100)} ...
              </div>
              <a href={item.url}>
                <div className="readmore">อ่านต่อ</div>
              </a>
              <div className="tag-container">
                <div>หมวด</div>
                <div>
                  {" "}
                  {item.tags.map((item, index) => (
                    <button
                      className="tag"
                      onClick={() => handleAddText(`${item}`)}
                      key={index}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="other-pic-container">
                {item.photos.slice(1, 4).map((photo, index) => (
                  <div key={index}>
                    <img src={photo} className="other-pic" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
