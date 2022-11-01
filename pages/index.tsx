import Head from 'next/head'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {

  const [text, setText] = useState('');
  const [safeInput, setSafeInput] = useState(false);
  const [safeCookie, setSafeCookie] = useState(false);

  const router = useRouter()

  useEffect( () => {
    const inputData = localStorage.getItem("safeInput");
    if (inputData !== null) {
      setSafeInput(JSON.parse(inputData) as boolean);
    } else {
      insecureInput();
    }

    setCookie("insecureCookie", "IdontHaveHttpOnlyFlag");
    // const cookieData = localStorage.getItem("safeCookie");
    // if (cookieData !== null) {
    //   const cookieSafe = JSON.parse(cookieData) as boolean;
    //   setSafeCookie(cookieSafe)
    //   if (cookieSafe) {
    //     secureCookie();
    //   } else {
    //     insecureCookie();
    //   }
    // } else {
    //   insecureCookie();
    // }
  }, []);

  useEffect( () => {
    setText(router.query['text'] as string);
  }, [router])

  function secureInput() {
    localStorage.setItem("safeInput", "true"); 
    setSafeInput(true);
  }

  function insecureInput() {
    localStorage.setItem("safeInput", "false");
    setSafeInput(false);
  }

  // function secureCookie() {
  //   if(getCookie("insecureCookie"))
  //     deleteCookie("insecureCookie");
  //   setCookie("secureCookie", "IHaveHttpOnlyFlag", {httpOnly: true})
  //   localStorage.setItem("safeCookie", "true");
  // }

  // function insecureCookie() {
  //   if(getCookie("secureCookie"))
  //     deleteCookie("secureCookie");
  //   setCookie("insecureCookie", "IdontHaveHttpOnlyFlag");
  //   localStorage.setItem("safeCookie", "false");
  // }

  return (
    <div className=''>
      <Head>
        <title>Template by FM</title>
        <meta name="description" content="Template by FM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col py-10 text-center bg-gray-100 h-screen w-screen gap-y-10'>
        <h1 className='text-2xl '>Guys Welcome to my cool first website i made!!!</h1>

        <div>
          <p className='italic'>1. zadatak</p>
          <div className='container max-w-screen-md mx-auto bg-gray-400'>
            <h2 className='text-xl p-2'>Check out this ELEMENT!!! Its made from website query parameter text!!! I learned about urls yesterday!!</h2>
            <div className='flex flex-col'>
              {/* <input type="text" value={text} onChange={handleChange}></input> */}
              {!safeInput && <div className='py-5 bg-gray-300' dangerouslySetInnerHTML={{__html: text}}></div>}
              {safeInput && <div className='py-5 bg-gray-300'>{text}</div>}
              {/* <button className='bg-red-200' onClick={insecureCookie}>Set a insecure cookie</button>
              <button className='bg-green-200' onClick={secureCookie}>Set a secure cookie</button> */}
              <button className='bg-red-200' style={!safeInput ? {borderWidth: 3, borderColor: "red"} : {}} onClick={insecureInput}>Set a insecure input</button>
              <button className='bg-green-200' style={safeInput ? {borderWidth: 3, borderColor: "green"} : {}} onClick={secureInput}>Set a secure input</button>
            </div>
          </div>
        </div>

        
        <div>
          <p className='italic'>2. zadatak</p>
          <div className='container max-w-screen-md mx-auto bg-gray-400'>
            <h2 className='text-xl p-2'>Check out this ELEMENT!!! Its made from website query parameter text!!! I learned about urls yesterday!!</h2>
            <div className='flex flex-col'>
              {/* <input type="text" value={text} onChange={handleChange}></input> */}
              {!safeInput && <div className='py-5 bg-gray-300' dangerouslySetInnerHTML={{__html: text}}></div>}
              {safeInput && <div className='py-5 bg-gray-300'>{text}</div>}
              {/* <button className='bg-red-200' onClick={insecureCookie}>Set a insecure cookie</button>
              <button className='bg-green-200' onClick={secureCookie}>Set a secure cookie</button> */}
              <button className='bg-red-200' style={!safeInput ? {borderWidth: 3, borderColor: "red"} : {}} onClick={insecureInput}>Set a insecure input</button>
              <button className='bg-green-200' style={safeInput ? {borderWidth: 3, borderColor: "green"} : {}} onClick={secureInput}>Set a secure input</button>
            </div>
          </div>
        </div>

      </main>

      <footer>
      </footer>
    </div>
  )
}
