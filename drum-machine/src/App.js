import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  return (
    <div className="App">
      <DrumMachine />
    </div>
  );
}


const clickedStyle = {
  backgroundColor: "#3e8e41",
  boxShadow: "0 5px #666",
  transform: "translateY(4px)"
};

const normalStyle = {
  backgroundColor: "#034732",
  boxShadow: "0 9px #999",
};

const disdabledStyle = {
  backgroundColor: "#c7c7c7",
  boxShadow: "0 9px #999",
  color: "black",
  fontWeight: 400
};

const Display = (props) => {
  return (
    <div className="display">{props.msg}</div>
  )
}

const Tecla = (props) => {

  const [padStyle, setpadStyle] = useState(normalStyle);

  useEffect(() => {
    disablePad();
  },
    [props.power]);

  useEffect(() => {

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }

  });

  function handleKeyPress(e) {
    if (e.key.toUpperCase() === props.KeyID) {
      playSound();
    }
  }

  function activatePad() {
    setpadStyle(clickedStyle);
  }

  function disablePad() {
    if (props.power == false) {
      setTimeout(() => setpadStyle(disdabledStyle), 100);
    }
    else {
      setpadStyle(normalStyle);
    }
  }

  function playSound() {
    if (props.power) {
      const sound = document.getElementById(props.KeyID);
      sound.currentTime = 0;
      sound.play();
      activatePad();
      props.onSoundPressed(props.sound.name);
      setTimeout(() => disablePad(), 100);
    };
  };



  return (
    <div className="drum-pad" id={'btn_' + props.KeyID} onClick={playSound} style={padStyle}>
      {props.KeyID.toUpperCase()}
      <audio className="clip" id={props.KeyID} src={props.sound.audio}></audio>
    </div>
  );
}

const OnOffSwitch = function (props) {
  const [onOff, setOnOff] = useState(true);

  function handleClick(e) {
    setOnOff(e.target.checked);
    props.onPowerChange(e.target.checked);
  }

  return (
    <>
      <div className="contenedor-switch">
        {props.switchName}
        <label className="switch">
          <input type="checkbox" checked={onOff} onChange={(onOff) => { handleClick(onOff) }} />
          <span className="slider"></span>
        </label>
      </div>
    </>);

}


const DrumMachine = () => {

  const [display, setDisplay] = useState("Drum Machine!");
  const [power, setPower] = useState(true);

  function handleChange(msg) {
    setDisplay(msg);
  }

  function handlePower(value) {
    setPower(value);
  }

  return (

    <section id="drum-machine" className="contenedor-page">
      <div id="display" className="contenedor-drum">
        <div className="contenedor-botones">
          <Tecla onSoundPressed={(msg) => handleChange(msg)} sound={AudioBank.blockCondensor} KeyID="Q" power={power} />
          <Tecla  onSoundPressed={(msg) => handleChange(msg)} sound={AudioBank.closedHH} KeyID="W" power={power} />
          <Tecla  onSoundPressed={(msg) => handleChange(msg)} sound={AudioBank.openHH} KeyID="E" power={power} />
          <Tecla  onSoundPressed={(msg) => handleChange(msg)} sound={AudioBank.kick} KeyID="A" power={power} />
          <Tecla  onSoundPressed={(msg) => handleChange(msg)} sound={AudioBank.snare} KeyID="S" power={power} />
          <Tecla onSoundPressed={(msg) => handleChange(msg)} sound={AudioBank.closedHH2} KeyID="D" power={power} />
          <Tecla onSoundPressed={(msg) => handleChange(msg)} sound={AudioBank.punchyKick} KeyID="Z" power={power} />
          <Tecla  onSoundPressed={(msg) => handleChange(msg)} sound={AudioBank.kickAndSnare} KeyID="X" power={power} />
          <Tecla onSoundPressed={(msg) => handleChange(msg)} sound={AudioBank.hardSnare} KeyID="C" power={power} />
        </div>
        <div className="contenedor-vys">
          <OnOffSwitch switchName="POWER" checked={power} onChange={() => setPower()} onPowerChange={(value) => handlePower(value)} />
          <div className="contenedor-display">
            <Display msg={display} />
          </div>
        </div>
      </div>
    </section>
  )
}


const AudioBank = {
  blockCondensor: {
    name: "Block Condensor", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Alesis%20FX/22[kb]alesis-d4fx-20.wav.mp3"
  },

  closedHH: {
    name: "Closed HH", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/808%20Extended/25[kb]808-hh05.wav.mp3"
  },

  openHH: {
    name: "Open HH", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Kawai%20R50/102[kb]CRASH.wav.mp3" 
  },

  kick: {
    name: "Kick", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/606%20Basic/56[kb]606-kick1.wav.mp3"
  },

  snare: {
    name: "Snare", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Kawai%20R50/22[kb]SD3_ACOU.wav.mp3"
  },

  closedHH2: {
    name: "Closed HH 2", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/11[kb]80s-HHCLOSE1.wav.mp3"
  },

  punchyKick: {
    name: "Punchy Kick", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/808%20Extended/108[kb]808-bd03.wav.mp3"
  },

  kickAndSnare: {
    name: "Kick & Snare", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/12[kb]80s-Bdrum1.wav.mp3"
  },

  hardSnare: {
    name: "Hard Snare", audio: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/19[kb]80s-SNARE1.wav.mp3"
  }

};

export default App;

