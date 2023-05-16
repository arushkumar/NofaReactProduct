import React ,{useRef, useState} from "react";
import SignaturePad from "react-signature-canvas"

export default function TestSignature(){
    let sigPad = useRef({});
    let [data, setData] = useState();
    const[imageUrl, setImageUrl] = useState(null)

    function clear(){
        sigPad.current.clear();
    }
    function onChange (e){
        data = sigPad.current.toDataURL();
        console.log("Show file",data)
        setData(data)
    }
    function save (e){
        // data = sigPad.current.toDataURL();
        // console.log("Show file",data)
        // setData(data)
        setImageUrl(sigPad.current.getTrimmedCanvas().toDataURL('image/png'))

         console.log("Image123", imageUrl)
    }

return(
    <div className={'signature'}>
        {/*<h1>Signature Example</h1>*/}
        <div className="clear" onClick={clear}>Reset</div>
        <div onClick={save}>Save</div>

        <SignaturePad
        penColor = "black"
        backgroundColor="#fff"
        ref = {sigPad}        
        onChange={onChange}
       
        />
        {/* {console.log("Image", imageUrl)} */}

        {/* {imageUrl ? (
            <img
              src = {imageUrl}
              alt = "show siganature"
              style={{
                display: "block",
                border : "1px solid green",
                width : "150"
              }}
             />

        ): null} */}
    </div>
);
}