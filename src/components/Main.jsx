import React from "react";

const Main = () => {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    imageUrl: ""
  });
  const [allMemes, setAllMemes] = React.useState([])
  React.useEffect(()=>{
    fetch('https://api.imgflip.com/get_memes')
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
  },[])

  function handleChange(e){
    const {value, name} = e.currentTarget;
    console.log(name)
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value,
    }))
  }

  const getMemeImage = ()=>{
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const newMemeUrl = allMemes[randomNumber].url;
    console.log("URL: ", newMemeUrl);
    setMeme(prev => ({
      ...prev,
      imageUrl: newMemeUrl
    }))
  }
  

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input type="text" placeholder="One does not simply" name="topText" onChange={handleChange} value={meme.topText} />
        </label>
        <label>
          Bottom Text
          <input type="text" placeholder="Walk into Mordor" name="bottomText" onChange={handleChange} value={meme.bottomText} />
        </label>
        <button onClick={getMemeImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
};

export default Main;
