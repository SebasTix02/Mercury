// import Layout from "../../components/layout";
// import { useEffect, useState,  } from "react";
// import { useNavigate } from "react-router-dom";
// import { Html5QrcodeScanner } from "html5-qrcode";

// export const QRScanner = () => {
//     const navigate = useNavigate()
//     // onClick={() => navigate("/categorias")}
    
//     const [result, setResult] = useState<any>(null)

//     useEffect(() => {
//         const scanner = new Html5QrcodeScanner('reader',
//             {
//                 qrbox:{
//                     width:200,
//                     height:200,
//                 },
//                 fps:5,
//             },
//             false
//         )
//         const success = (result:any) => {
//             scanner.clear()
//             setResult(result)
            
//         }
//         const error = (err:any) => {
//             console.warn(err)
//         }
//         scanner.render(success, error)
//     }, [])

//     useEffect(() => {
//         if (result) {
//             const option = result.substring(3)
//             navigate("")
//         }
//     }, [result, navigate])

//     return (
//         <Layout>
//             <div style={{ padding: '20px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
//                 <h1 style={{ marginBottom: '20px' }}>Escáner QR</h1>
//                 {result ?
//                     <div>El resultado: {result}</div>
//                 :
//                     <div id="reader" style={{width:'300px', height:'300px'}}></div>
//                 }
//             </div>
//         </Layout>
//     );
// }

import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";

export const QRScanner = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 200,
          height: 200,
        },
        fps: 5,
      },
      false
    );

    const success = (result:any) => {
      scanner.clear();
      setResult(result);
    };

    const error = (err:any) => {
      console.warn(err);
    };

    scanner.render(success, error);
  }, []);

  useEffect(() => {
    if (result) {
        const code = result.match(/\d+/g) || [];
        if (result.includes("computer")){
          navigate(`/computadores/${code}`);
        }else{
          navigate(`/bienes/${code}`);
        }
    }
  }, [result, navigate]);

  return (
    <Layout>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>Escáner QR</h1>
        {result ? (
          <div>El resultado: {result}</div>
        ) : (
          <div id="reader" style={{ width: '300px', height: '300px' }}></div>
        )}
      </div>
    </Layout>
  );
};
