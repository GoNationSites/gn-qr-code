import React, { useState } from 'react'
import { SketchPicker } from 'react-color'
import squareBody from '../images/squarebody.png'
import circleBody from '../images/circlebody.png'
import circleZebraBody from '../images/circlezebrabody.png'
import circularBody from '../images/circularbody.png'
import dotBody from '../images/dotbody.png'
import japneseBody from '../images/japnesebody.png'
import frame0 from '../images/frame0.png'
import frame1 from '../images/frame1.png'
import frame2 from '../images/frame2.png'
import frame12 from '../images/frame12.png'
import frame13 from '../images/frame13.png'
import frame14 from '../images/frame14.png'
import ball0 from '../images/ball0.png'
import ball1 from '../images/ball1.png'
import ball2 from '../images/ball2.png'
import ball14 from '../images/ball14.png'
import ball16 from '../images/ball16.png'
import ball18 from '../images/ball18.png'
import axios from 'axios'

function QRForm() {

    const [url, setUrl] = useState('www.gonation.com')

    const [bodyColor, setBodyColor] = useState("#ee5e30")

    const [colorPickerOpen, setColorPickerOpen] = useState(false)

    const [bgColorPickerOpen, setBgColorPickerOpen] = useState(false)

    const [bgColor, setBgColor] = useState("#ffffff")

    const [body, setBody] = useState("square")

    const [eyeFrame, setEyeFrame] = useState("frame0")

    const [eyeBall, setEyeBall] = useState("ball0")

    const [logo, setLogo] = useState("https://www.gonation.com/images/gonation-nav-icon.png")

    const [qrCode, setQrCode] = useState(null)

    let updateUrl = (e) => {
        setUrl(e.target.value)
    }

    let handleBodyChange = (bodyType) => {
        setBody(bodyType)
    }

    let handleEyeFrameChange = (eyeFrameSelection) => {
        setEyeFrame(eyeFrameSelection)
    }

    let handleEyeBallChange = (eyeBallSelection) => {
        setEyeBall(eyeBallSelection)
    }

    let handleBodyColorChange = (color) => {
        setBodyColor(color.hex)
    }

    let handleBgColorChange = (color) => {
        setBgColor(color.hex)
    }

    let fetchQR = async () => {

        await axios({
            method: 'GET',
            url: `https://qrcode-monkey.p.rapidapi.com/qr/custom`,
            headers: {
              'content-type': 'application/octet-stream',
              'x-rapidapi-host': 'qrcode-monkey.p.rapidapi.com',
              'x-rapidapi-key': '79d5828a42msh886a6c5649e2c19p18eafdjsn6a22cad3ad0f',
              useQueryString: true,
            },
            params: {
              size: '600',
              file: 'svg',
              "config":{
                "body":`${body}`,
                "eye": `${eyeFrame}`,
                "eyeBall": `${eyeBall}`,
                "bodyColor": `${bodyColor}`,
                "bgColor": `${bgColor}`,
                "logo": `${logo}`
                },
              data: `http%3A%2F%${url}`,
            },
          })
            .then(response => {
              console.log(response)
              const qrcode = response.data
              setQrCode(qrcode)
            })
            .catch(error => {
              console.log(error)
            })
    }

    // console.log('body color: ', bodyColor)

    return(
        <div>
            <h1 className="form-title is-size-2">QR Code Generator</h1>

            <form>
                
                <div className="form-section columns">

                    {/* URL INPUT */}
                    <div className="column">
                        <label>
                            <h1>Enter Menu URL:</h1>
                            <input type="text" value={url} onChange={updateUrl} />
                        </label>
                    </div>


                    {/* <div className="field">
                    <label className="label">Which URL do you want your QR code to go to?</label>
                        <div className="control">
                            <div className="select">
                            <select>
                                <option>Menu on my website</option>
                                <option>Menu on my GoNation page</option>
                            </select>
                            </div>
                        </div>
                    </div> */}


                    {/* BODY COLOR PICKER */}
                    <div className="column">
                        <h1>Body Color: <span style={{"backgroundColor": `${bodyColor}`}}>&nbsp;&nbsp;&nbsp;&nbsp;</span></h1>

                        { colorPickerOpen ? 
                            <div className="color-picker">
                                <SketchPicker
                                    color={ bodyColor }
                                    onChangeComplete={ handleBodyColorChange }
                                />
                                <button className="button color-button" onClick={() => setColorPickerOpen(false)}>Select Color</button>
                            </div>
                        :
                            <button className="button color-button" onClick={() => setColorPickerOpen(true)}>Update Body Color</button>
                        }
                    </div>

                    {/* BACKGROUND COLOR PICKER */}
                    <div className="column">
                        <h1>Background Color: <span style={{"backgroundColor": `${bgColor}`}}>&nbsp;&nbsp;&nbsp;&nbsp;</span></h1>

                        { bgColorPickerOpen ? 
                            <div className="color-picker">
                                <SketchPicker
                                    color={ bgColor }
                                    onChangeComplete={ handleBgColorChange }
                                />
                                <button className="button color-button" onClick={() => setBgColorPickerOpen(false)}>Select Background Color</button>
                            </div>
                        :
                            <button className="button color-button" onClick={() => setBgColorPickerOpen(true)}>Update Background Color</button>
                        }
                    </div>

                    <div className="column is-two-fifths"></div>

                </div>


                {/* BODY SELECTION */}
                <div className="form-section">
                    <label>
                        <h1>Body:</h1>

                        <div className="columns">

                            <div className="column">
                                <p>Square:</p>
                                <img src={squareBody} alt=""/>
                                <input
                                    name="square"
                                    type="checkbox"
                                    checked={body === "square" ? true : false}
                                    onChange={() => handleBodyChange("square")} 
                                    value={body}
                                />
                            </div>

                            <div className="column">
                                <p>Circle:</p>
                                <img src={circleBody} alt=""/>
                                <input
                                    name="circle"
                                    type="checkbox"
                                    checked={ body === "circle" ? true : false }
                                    onChange={() => handleBodyChange("circle")} 
                                    value={body}
                                />
                            </div>

                            <div className="column">
                                <p>Japnese:</p>
                                <img src={japneseBody} alt=""/>
                                <input
                                    name="japnese"
                                    type="checkbox"
                                    checked={ body === "japnese" ? true : false }
                                    onChange={() => handleBodyChange("japnese")} 
                                    value={body}
                                />
                            </div>

                            <div className="column">
                                <p>Circular:</p>
                                <img src={circularBody} alt=""/>
                                <input
                                    name="circular"
                                    type="checkbox"
                                    checked={ body === "circular" ? true : false }
                                    onChange={() => handleBodyChange("circular")} 
                                    value={body}
                                />
                            </div>

                            <div className="column">
                                <p>Dot:</p>
                                <img src={dotBody} alt=""/>
                                <input
                                    name="dot"
                                    type="checkbox"
                                    checked={ body === "dot" ? true : false }
                                    onChange={() => handleBodyChange("dot")} 
                                    value={body}
                                />
                            </div>

                            <div className="column">
                                <p>Circle-Zebra:</p>
                                <img src={circleZebraBody} alt=""/>
                                <input
                                    name="circle-zebra"
                                    type="checkbox"
                                    checked={ body === "circle-zebra" ? true : false }
                                    onChange={() => handleBodyChange("circle-zebra")} 
                                    value={body}
                                />
                            </div>
                        </div>
                    </label>
                </div>

                {/* EYE FRAME SELECTION */}
                <div className="form-section">
                    <label>
                        <h1>Eye Frame:</h1>

                        <div className="columns">

                            <div className="column">
                                <p>Option 1:</p>
                                <img src={frame0} alt=""/>
                                <input
                                    name="frame0"
                                    type="checkbox"
                                    checked={eyeFrame === "frame0" ? true : false}
                                    onChange={() => handleEyeFrameChange("frame0")} 
                                    value={eyeFrame}
                                />
                            </div>

                            <div className="column">
                                <p>Option 2:</p>
                                <img src={frame1} alt=""/>
                                <input
                                    name="frame1"
                                    type="checkbox"
                                    checked={ eyeFrame === "frame1" ? true : false }
                                    onChange={() => handleEyeFrameChange("frame1")} 
                                    value={eyeFrame}
                                />
                            </div>

                            <div className="column">
                                <p>Option 3:</p>
                                <img src={frame2} alt=""/>
                                <input
                                    name="frame2"
                                    type="checkbox"
                                    checked={ eyeFrame === "frame2" ? true : false }
                                    onChange={() => handleEyeFrameChange("frame2")} 
                                    value={eyeFrame}
                                />
                            </div>

                            <div className="column">
                                <p>Option 4:</p>
                                <img src={frame12} alt=""/>
                                <input
                                    name="frame12"
                                    type="checkbox"
                                    checked={ eyeFrame === "frame12" ? true : false }
                                    onChange={() => handleEyeFrameChange("frame12")} 
                                    value={eyeFrame}
                                />
                            </div>

                            <div className="column">
                                <p>Option 5:</p>
                                <img src={frame13} alt=""/>
                                <input
                                    name="frame13"
                                    type="checkbox"
                                    checked={ eyeFrame === "frame13" ? true : false }
                                    onChange={() => handleEyeFrameChange("frame13")} 
                                    value={eyeFrame}
                                />
                            </div>

                            <div className="column">
                                <p>Option 6:</p>
                                <img src={frame14} alt=""/>
                                <input
                                    name="frame14"
                                    type="checkbox"
                                    checked={ eyeFrame === "frame14" ? true : false }
                                    onChange={() => handleEyeFrameChange("frame14")} 
                                    value={eyeFrame}
                                />
                            </div>

                        </div>
                    </label>
                </div>


                {/* EYE BALL SELECTION */}
                <div className="form-section">
                    <label>
                        <h1>Eye Ball:</h1>
                        <div className="columns">
                            <div className="column">
                                <p>Option 1:</p>
                                <img src={ball0} alt=""/>
                                <input
                                    name="ball0"
                                    type="checkbox"
                                    checked={eyeBall === "ball0" ? true : false}
                                    onChange={() => handleEyeBallChange("ball0")} 
                                    value={eyeBall}
                                />
                            </div>

                            <div className="column">
                                <p>Option 2:</p>
                                <img src={ball1} alt=""/>
                                <input
                                    name="ball1"
                                    type="checkbox"
                                    checked={ eyeBall === "ball1" ? true : false }
                                    onChange={() => handleEyeBallChange("ball1")} 
                                    value={eyeBall}
                                />
                            </div>

                            <div className="column">
                                <p>Option 3:</p>
                                <img src={ball2} alt=""/>
                                <input
                                    name="ball2"
                                    type="checkbox"
                                    checked={ eyeBall === "ball2" ? true : false }
                                    onChange={() => handleEyeBallChange("ball2")} 
                                    value={eyeBall}
                                />
                            </div>

                            <div className="column">
                                <p>Option 4:</p>
                                <img src={ball14} alt=""/>
                                <input
                                    name="ball14"
                                    type="checkbox"
                                    checked={ eyeBall === "ball14" ? true : false }
                                    onChange={() => handleEyeBallChange("ball14")} 
                                    value={eyeBall}
                                />
                            </div>

                            <div className="column">
                                <p>Option 5:</p>
                                <img src={ball16} alt=""/>
                                <input
                                    name="ball16"
                                    type="checkbox"
                                    checked={ eyeBall === "ball16" ? true : false }
                                    onChange={() => handleEyeBallChange("ball16")} 
                                    value={eyeBall}
                                />
                            </div>

                            <div className="column">
                                <p>Option 6:</p>
                                <img src={ball18} alt=""/>
                                <input
                                    name="ball18"
                                    type="checkbox"
                                    checked={ eyeBall === "ball18" ? true : false }
                                    onChange={() => handleEyeBallChange("ball18")} 
                                    value={eyeBall}
                                />
                            </div>

                        </div>
                    </label>
                </div>

            </form>
            
            <div className="create-btn-section">
                    <button className="button is-primary" onClick={fetchQR}>Create QR Code</button>
            </div>

            {qrCode ? <div id="code-image" dangerouslySetInnerHTML={{__html: qrCode}} /> : ''}

        </div>
    )
}

export default QRForm;