import React ,{useRef, useState} from "react";
import SignaturePad from "react-signature-canvas"

export default function TestSignature(){
    let sigPad = useRef({});
    let [data, setData] = useState();

    function clear(){
        sigPad.current.clear();
    }
    function onChange (e){
        data = sigPad.current.toDataURL();
        console.log("Show file",data)
        setData(data)
    }

return(
    <div className={'signature'}>
        {/*<h1>Signature Example</h1>*/}
        <div className="clear" onClick={clear}>Reset</div>
        {/* <div onClick={save}>Save</div> */}

        <SignaturePad
        penColor = "black"
        backgroundColor="#fff"
        ref = {sigPad}
        penColor = "black"
        onChange={onChange}
        />
    </div>
);
}