"use client"
import styles from "./page.module.css";
import React from "react";

export default function Home() {
  return (
    <div className={styles.container}>
      <div id="imageViewer" style={{ background: "#00000090", zIndex: "2", width: "100%", height: "100%", position: "fixed", display: "none" }}></div>
      <div className={styles.containerContent} id="mainContainer">
        <Titlebar />
        <br />
        <AboutMe />
        <br />
        <Projects />
        <br />
        <FavoriteMusic />
        <br />
        <PlayedGames />
        <br />
        <UsedLanguages />
        <br />
        <br />
        <div style={{ width: "calc(100% - 40px)", padding: "20px", textAlign: "center" }}>
          <p>Vytvořil Honza Cieslar</p>
        </div>
      </div>
    </div>
  );
}

class Titlebar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      showNote: false,
      discord: {
        status: "Offline",
        color: "#ffffff30"
      }
    }
  }

  websocketHandler(message, ws) {
    const d = message.d
    const op = message.op

    if (op === 1) {
      ws.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: ["900801159424512020"] } }))

      // udrzujeme pripojeni s lanyard.rest tim, ze posilame heartbeat
      setInterval(() => {
        ws.send(JSON.stringify({ op: 3, d: { subscribe_to_ids: ["900801159424512020"] } }))
      }, 30000)
    } else {
      if (op === 0) {
        const discordStatuses = {
          dnd: "Nerušit",
          idle: "Nečinný",
          offline: "Offline",
          online: "Online"
        }

        const discordStatusColors = {
          dnd: "rgba(246, 59, 59, 0.2)",
          idle: "rgba(246, 181, 59, 0.2)",
          offline: "rgba(56, 56, 56, 0.2)",
          online: "rgba(65, 246, 59, 0.2)"
        }

        const discordTextColors = {
          dnd: "#fd9393",
          idle: "#fdd393",
          offline: "#5b5b5b",
          online: "#93fd98"
        }

        if (message.t === "PRESENCE_UPDATE") {
          const data = d
          this.setState({
            show: true,
            showNote: true,
            discord: {
              status: discordStatuses[data.discord_status],
              color: discordStatusColors[data.discord_status],
              textColor: discordTextColors[data.discord_status]
            }
          })
        } else {
          const data = d["900801159424512020"]
          this.setState({
            show: true,
            showNote: true,
            discord: {
              status: discordStatuses[data.discord_status],
              color: discordStatusColors[data.discord_status],
              textColor: discordTextColors[data.discord_status]
            }
          })
        }
      }
    }
  }

  componentDidMount() {
    const ws = new WebSocket("wss://api.lanyard.rest/socket")

    ws.onmessage = (message) => {
      this.websocketHandler(JSON.parse(message.data), ws)
    }
  }

  render() {
    return (
      <div className={styles.titlebar}>
        <div className={styles.titlebarFlex}>
          <img src="/img/logo.png" alt="moje logo" draggable={false} />
          <div className={styles.titlebarText}>
            <h1>Honza Cieslar {this.state.show ? <p class={styles.titlebarOnlineStatus} style={{ background: this.state.discord.color, color: this.state.discord.textColor }}>{this.state.discord.status}</p> : ""}</h1>
            <p>16 letý tvůrce frontendu, backendu a všeho, co ho napadne...</p>
            <br />
            <div className={styles.titlebarAttributes}>
              <Attribute href="mailto:jan.cie@sosjablunkov.cz" name="email" />
              <Attribute href="tel:775351287" name="telefon" />
              <Attribute href="https://github.com/honzawashere" name="github" />
              <Attribute href="https://www.instagram.com/honzawashere/" name="instagram" />
              <Attribute href="https://open.spotify.com/user/31wmikhwwytv6ar2v3lj34bglx5q" name="spotify" />
              <Attribute href="https://discord.com/users/900801159424512020" name="discord" />
              <Attribute href="https://steamcommunity.com/id/honzawashere/" name="steam" />
              <Attribute href="https://www.reddit.com/user/honzawashere/" name="reddit" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Attribute extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.attributeContainer}>
        <a
          href={this.props.href}
          className={styles.attributeLink}
        >
          {this.props.name}
        </a>
      </div>
    )
  }
}

class Projects extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.projects}>
        <h1>Projekty</h1>
        <br />
        <div className={styles.projectsScroll} style={{ display: "flex", flexDirection: "row", overflowX: "scroll", overflowY: "hidden" }}>
          <ProjectImage src="/img/project1.png" infoTextTitle="Přehrávač hudby" infoTextDescription="Jednoduše vytvořený přehrávač pomocí HTML, CSS a JS" />
          <ProjectImage src="/img/project2.png" infoTextTitle="Další přehrávač hudby" infoTextDescription="Jednoduše vytvořený přehrávač pomocí HTML, CSS a JS" />
          <ProjectImage src="/img/project3.png" infoTextTitle="Osobní stránka" infoTextDescription="Návrh stránky vytvořený v HTML a CSS" />
          <ProjectImage src="/img/project4.png" infoTextTitle="Moje hlavní stránka" infoTextDescription="Stránka, kterou v tuto chvíli používám" href="https://bohnice.wtf" />
          <ProjectImage src="/img/project5.png" infoTextTitle="download.bohnice.wtf" infoTextDescription="Stále ve vývoji, ale třeba z toho někdy bude něco dobrého..." />
        </div>
      </div>
    )
  }
}

class AboutMe extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.aboutMe}>
        <h1>O Mně</h1>
        <div style={{ padding: "10px 0" }}>
          <p>• Je mi 16 let</p>
          <p>• Baví mě programovat, hrát hry a poslouchat hudbu</p>
          <p>• Nejvíce používám JavaScript</p>
        </div>
      </div>
    )
  }
}

class ProjectImage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showDetailsText: false,
      component: {
        imageSrc: this.props.src,
        imageInfo: {
          title: this.props.infoTextTitle,
          description: this.props.infoTextDescription
        }
      }
    }
  }

  renderImageViewer = (e) => {
    const { createRoot } = require("react-dom/client")
    const root = createRoot(document.querySelector("#imageViewer"))
    root.render(<ImageViewer imageUrl={this.state.component.imageSrc} />)
  }

  render() {
    return (
      <div className={styles.imageContainer}>
        <div className={styles.imageContainerImage} onClick={this.renderImageViewer}>
          <img className={styles.imageContainerImageProperties} src={this.state.component.imageSrc} style={{ zIndex: "0", position: "relative" }}></img>
          <div className={styles.imageContainerImageData} style={{ zIndex: "1", position: "relative", top: "-100%", height: "100%", width: "100%" }}>
            <div style={{ position: "absolute", bottom: "4px", width: "100%", padding: "10px", background: "#00000080", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}>
              <h1 style={{ fontSize: "20px", fontWeight: "600" }}>{this.state.component.imageInfo.title}</h1>
              <p style={{ fontSize: "16px", fontWeight: "400" }}>{this.state.component.imageInfo.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class FavoriteMusic extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.favoriteMusic}>
        <h1>Oblíbená Hudba</h1>
        <div className={styles.artists}>
          <MusicArtist name="Crystal Castles" image="https://yt3.googleusercontent.com/ytc/AIdro_nrz-ustOZo-wl_HQ32RrZICUwh-lXbQHETsJekZbiaRA=s900-c-k-c0x00ffffff-no-rj" />
          <MusicArtist name="TV Girl" image="https://yt3.googleusercontent.com/ytc/AIdro_mVSqgbkM9NETVBNe6np-p8ZOZj5mYfDfOTJFXvXfEuvA=s900-c-k-c0x00ffffff-no-rj" />
          <MusicArtist name="Электрофорез" image="https://yt3.googleusercontent.com/ytc/AIdro_n_QBWYnwORGBvv4gVkgpdh12FsTXvzJ128Q9doujV2Rvo" />
          <MusicArtist name="Агата Кристи" image="https://yt3.googleusercontent.com/ytc/AIdro_kJMeUa5MX04JE04hPDDKkPm2zS1Ja-SqAe1UowaBgn9Ek" />
          <MusicArtist name="Буерак" image="https://lh3.googleusercontent.com/0EaYarNCxh4uWknxF90tP1502oP-sJo57EvKkFIqxPi5ewFP8b0jfo40PkS6nIYFpeLJe78aM-BTXY8 " />
          <MusicArtist name="CRIM3S" image="https://yt3.googleusercontent.com/ytc/AIdro_kwbX9HKNhH9YDiMypnUeivjjIkPKrKc2tPL_9Jc7Rd3w" />
          <MusicArtist name="Death Grips" image="https://yt3.googleusercontent.com/ytc/AIdro_kz_eOQU-F2w_lo3Y2GSxjJx69iCNHGY1dXda2ARByzXZw" />
          <MusicArtist name="IC3PEAK" image="https://yt3.googleusercontent.com/e0xdeZF7AP1R3ILidHa0TVbJoba5loEZqT_9iyGbYbGMbPImrecdnUsTt496wjTszzlDLUoLBQ" />
          <MusicArtist name="Jack Stauber" image="https://yt3.googleusercontent.com/ytc/AIdro_mS1HdSu2U6FNZstsgytF18YKAGDDGNPn304pWNvZquxYg" />
          <MusicArtist name="Кино" image="https://yt3.googleusercontent.com/ytc/AIdro_m7A-puWYGi4-6hzDCgLWIfCyIEg87vsrGOVjJDFuMvUg" />
          <MusicArtist name="Mild High Club" image="https://yt3.googleusercontent.com/TlTp1nlI_hUc2QgOcwgB2YH61pOQjRt3x-MPVaKTiJ6zElQ3o_R3Fq7LSdv-QQgpIkksVavW" />
          <MusicArtist name="Molchat Doma" image="https://yt3.googleusercontent.com/ytc/AIdro_nub_srMK3qSZNUmMQX3w5WE1ziqklO09oKDz0OVkbS2zM" />
          <MusicArtist name="Pathetic" image="https://yt3.googleusercontent.com/M60Qym3dF9U7updIWNCtME8WwkVsVrZNIhTcv1K-Nc1jFMh2tFmTnEHcVG2Tcwv4lphOf8PIuA" />
          <MusicArtist name="Puzzle" image="https://yt3.ggpht.com/QJuuwmD1BmfvCJyp_cWG2dIF2L0zzeiNwC2scnjBNOomEvqbfk2nVUROEluFFWZGCbMhH3hkrw" />
          <MusicArtist name="Roar" image="https://lh3.googleusercontent.com/a-/ALV-UjW_CE35jIiDSu9DWVdnIzTd082SqCVTYM_0G5n3gmLUrWLxYUY" />
        </div>
      </div>
    )
  }
}

class MusicArtist extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      artist: {
        name: this.props.name,
        image: this.props.image
      }
    }
  }

  renderImageViewer = (e) => {
    const { createRoot } = require("react-dom/client")
    const root = createRoot(document.querySelector("#imageViewer"))
    root.render(<ImageViewer imageUrl={this.state.artist.image} artist={true} />)
  }

  render() {
    return (
      <div className={styles.musicArtist} onClick={this.renderImageViewer}>
        <img src={this.state.artist.image} alt={this.state.artist.name} width="150" height="150" />
        <h1>{this.state.artist.name}</h1>
      </div>
    )
  }
}

class UsedLanguages extends React.Component {
  constructor(props) {
    super(props)
  }

  // puvodne to mely byt jen jazyky, ale zmena planu. je tu vsecko, co pouzivam.
  render() {
    return (
      <div className={styles.usedLanguages}>
        <h1>Co Používám</h1>
        <div className={styles.jazyky}>
          <Jazyk name="React" image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/1200px-React_Logo_SVG.svg.png" />
          <Jazyk name="Node.js" image="https://static-00.iconduck.com/assets.00/node-js-icon-227x256-913nazt0.png" />
          <Jazyk name="Typescript" image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png" />
          <Jazyk name="Python" image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png" />
          <Jazyk name="VSC" image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1024px-Visual_Studio_Code_1.35_icon.svg.png" />
        </div>
      </div>
    )
  }
}

class PlayedGames extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.playedGames}>
        <h1>Oblíbené Hry</h1>
        <div className={styles.hry}>
          <Hra name="GTA Vice City" image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7dfaa9c3-48ad-47b0-8b1c-1fd103d9e81a/d6ze13h-4da1d85e-8365-4b6b-a7bb-800c917895bb.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdkZmFhOWMzLTQ4YWQtNDdiMC04YjFjLTFmZDEwM2Q5ZTgxYVwvZDZ6ZTEzaC00ZGExZDg1ZS04MzY1LTRiNmItYTdiYi04MDBjOTE3ODk1YmIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wub9YNYw6N6Dl2LZc7zFrrMcdObmdbqoEr0ggpddd4s" />
          <Hra name="GTA San Andreas" image="https://freepngimg.com/download/gta/28717-2-gta-san-andreas-hd.png" />
          <Hra name="GTA V" image="./img/grand-theft-auto-v-grand-theft-auto-san-andreas-gta-5-online-gunrunning-playstation-4-mod-gta-thumbnail-removebg-preview.png" />
          <Hra name="Mafia" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrY3RbJlUGjFo1z8SOFqs1XLBIv3cQvRE33w&s" />
          <Hra name="Mafia II" image="./img/png-clipart-mafia-2-logo-shooter-logo-art-thumbnail-removebg-preview.png" />
          <Hra name="Minecraft" image="./img/minecraft-hd-icon-mac-pc-minecraft-icon-512-png-icon-removebg-preview.png" />
          <Hra name="Crysis" image="./img/3944-256x256x8.png" />
          <Hra name="Dead Island Riptide" image="./img/images-removebg-preview.png" />
          <Hra name="Counter Strike 2" image="https://i.redd.it/which-official-cs2-logo-do-you-like-better-1-or-2-v0-meakmjcylyqa1.jpg?width=358&format=pjpg&auto=webp&s=7999d040dcab80a7521b44f1d81dd840a7ef7135" />
        </div>
      </div>
    )
  }
}

class Jazyk extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      jazyk: {
        image: this.props.image,
        name: this.props.name
      }
    }
  }

  render() {
    return (
      <div className={styles.jazyk}>
        <img src={this.state.jazyk.image} width="100" height="100" />
        <h1 style={{ fontSize: "16px", textAlign: "center", fontWeight: "400" }}>{this.state.jazyk.name}</h1>
      </div>
    )
  }
}


class Hra extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hra: {
        image: this.props.image,
        name: this.props.name
      }
    }
  }

  render() {
    return (
      <div className={styles.hra}>
        <img src={this.state.hra.image} width="100" height="100" />
        <h1 style={{ fontSize: "16px", textAlign: "center", fontWeight: "400" }}>{this.state.hra.name}</h1>
      </div>
    )
  }
}

class ImageViewer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageUrl: this.props.imageUrl
    }
  }

  componentDidMount() {
    document.querySelector("#imageViewer").style.display = "block"
    document.querySelector("#mainContainer").style.display = "none"
  }

  close() {
    document.querySelector("#imageViewer").style.display = "none"
    document.querySelector("#mainContainer").style.display = "block"
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ width: "30px", height: "30px", position: "absolute", top: "20px", right: "20px" }} className={styles.closeButton}>
          <svg onClick={() => this.close()} xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none">
              <path d="M1205 4023 c-107 -56 -153 -176 -110 -281 11 -25 193 -215 588 -609 l572 -573 -572 -572 c-395 -395 -577 -585 -588 -610 -72 -175 108 -355 283 -283 25 11 215 193 610 588 l572 572 573 -572 c394 -395 584 -577 609 -588 76 -31 184 -10 238 46 56 59 76 162 45 237 -11 25 -193 215 -588 610 l-572 572 572 573 c395 394 577 584 588 609 30 74 11 178 -44 235 -57 59 -161 80 -239 48 -25 -11 -215 -193 -609 -588 l-573 -572 -572 572 c-395 395 -585 577 -610 588 -48 19 -134 19 -173 -2z" />
            </g>
          </svg>
        </div>
        <img src={this.state.imageUrl} style={{ width: this.props.artist ? "20%" : "1280px", height: this.props.artist ? "" : "720px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", objectFit: "cover", borderRadius: "8px", zIndex: "2", filter: "blur(40px)" }} />
        <img src={this.state.imageUrl} style={{ width: this.props.artist ? "20%" : "1280px", height: this.props.artist ? "" : "720px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", objectFit: "cover", borderRadius: "8px", zIndex: "3" }} />
      </div>
    )
  }
}