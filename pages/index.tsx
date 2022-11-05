import Head from 'next/head'
import { setCookie } from 'cookies-next'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import axios from 'axios';

export default function Home() {

  const [text, setText] = useState('');
  const [safeInput, setSafeInput] = useState(false);
  const [safeRegister, setSafeRegister] = useState(false);
  const [safeLogin, setSafeLogin] = useState(false);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [usernameInfo, setUsernameInfo] = useState('');
  const [passwordInfo, setPasswordInfo] = useState('');
  const [registerInfo, setRegisterInfo] = useState('');

  const router = useRouter()
  const client = new PocketBase('http://127.0.0.1:8090');

  useEffect( () => {
    const inputData = localStorage.getItem("safeInput");
    if (inputData !== null) {
      setSafeInput(JSON.parse(inputData) as boolean);
    } else {
      insecureInput();
    }
    setCookie("insecureCookie", "IdontHaveHttpOnlyFlag");
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

  // async function createInsecureUser() {
  //   const data = {username: registerUsername, password: registerPassword};
  //   try {
  //     const record = await client.records.create('insecure_user', data);
  //     setRegisterUsername('');
  //     setRegisterPassword('');
  //     console.log("Created user: ", record);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function createInsecureUser() {
    const data = {
      username: registerUsername,
      password: registerPassword
    }
    axios.post('api/insecure/register', data).then(
      res => {
        setRegisterUsername('');
        setRegisterPassword('');
        setRegisterInfo('');
        alert("Profil je uspješno stvoren!");
      },
      res => {
        setRegisterInfo(res.response.data.registerInfo);
      }
    );
  }

  function createSecureUser() {
    if (registerPassword.length < 12) {
      const textShake = [
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)'},
        { transform: 'scale(1)'},
        { transform: 'scale(0.9)'},
        { transform: 'scale(1)' }
      ];
      const textTiming = {
        duration: 300,
        iterations: 2,
      };
      const condition = document.getElementById("passCondition")
      condition!.animate(textShake, textTiming);
      return;
    }
    const data = {
      username: registerUsername,
      password: registerPassword
    }
    axios.post('api/secure/register', data).then(
      res => {
        setRegisterUsername('');
        setRegisterPassword('');
        setRegisterInfo('');
        alert("Profil je uspješno stvoren!");
      },
      res => {
        setRegisterInfo(res.response.data.registerInfo);
      }
    );
  }

  // async function createSecureUser() {
  //   if (registerPassword.length < 12) {
  //     const textShake = [
  //       { transform: 'scale(1)' },
  //       { transform: 'scale(1.1)'},
  //       { transform: 'scale(1)'},
  //       { transform: 'scale(0.9)'},
  //       { transform: 'scale(1)' }
  //     ];
  //     const textTiming = {
  //       duration: 300,
  //       iterations: 2,
  //     };
  //     const condition = document.getElementById("passCondition")
  //     condition!.animate(textShake, textTiming);
  //     return;
  //   }
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(registerPassword, salt);
    // const data = {username: registerUsername, hash};
    // try {
    //   const record = await client.records.create('secure_user', data);
    //   setRegisterUsername('');
    //   setRegisterPassword('');
    //   console.log("Created user: ", record);
    // } catch (error) {
    //   console.error(error);
    // }
  // }

  // async function loginInsecureUser() {
  //   const records = await client.records.getFullList('insecure_user', 200, {
  //     sort: '-created',
  //   });
  //   const insecureUser = records.find(insecureUser => insecureUser.username == loginUsername);
  //   if (insecureUser === undefined) {
  //     setUsernameInfo('Nepostojano korisničko ime');
  //     setPasswordInfo('');
  //   }
  //   else if (insecureUser.password !== loginPassword) {
  //     setUsernameInfo('');
  //     setPasswordInfo('Netočna loznika za korisničko ime');
  //   } else {
  //     setUsernameInfo('');
  //     setPasswordInfo('');
  //     setLoginUsername('');
  //     setLoginPassword('');
  //     alert("Uspješna prijava!");
  //   }
  // }

  function loginInsecureUser() {
    const data = {
      username: loginUsername,
      password: loginPassword
    };
    axios.post('api/insecure/login', data).then(
      res => {
        setUsernameInfo('');
        setPasswordInfo('');
        setLoginUsername('');
        setLoginPassword('');
        alert("Uspješna prijava!");
      },
      res => {
        setUsernameInfo(res.response.data.usernameInfo);
        setPasswordInfo(res.response.data.passwordInfo);
      }
    );
  }

  function loginSecureUser() {
    const data = {
      username: loginUsername,
      password: loginPassword
    };
    axios.post('api/secure/login', data).then(
      res => {
        setUsernameInfo('');
        setPasswordInfo('');
        setLoginUsername('');
        setLoginPassword('');
        alert("Uspješna prijava!");
      },
      res => {
        setUsernameInfo('Netočno korisničko ime ili loznika');
        setPasswordInfo('');
      }
    );
  }

  // async function loginSecureUser() {
  //   const records = await client.records.getFullList('secure_user', 200, {
  //     sort: '-created',
  //   });
  //   const secureUser = records.find(secureUser => bcrypt.compareSync(loginPassword, secureUser.hash));
  //   if (secureUser === undefined) {
  //     setUsernameInfo('Netočno korisničko ime ili loznika');
  //     setPasswordInfo('');
  //   } else {
  //     setUsernameInfo('');
  //     setPasswordInfo('');
  //     setLoginUsername('');
  //     setLoginPassword('');
  //     alert("Uspješna prijava!");
  //   }
  // }

  function toSecureLogin() {
    setSafeLogin(true);
    setUsernameInfo('');
    setPasswordInfo('');
  }

  function toInsecureLogin() {
    setSafeLogin(false);
    setUsernameInfo('');
    setPasswordInfo('');
  }

  

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
            <h2 className='text-xl p-2'>Check out this ELEMENT!!! Its made from website query parameter text!!! I learned about urls {safeInput ? "2 days ago" : "yesterday"}!!</h2>
            <div className='flex flex-col'>
              {!safeInput && <div className='py-5 bg-gray-300' dangerouslySetInnerHTML={{__html: text}}></div>}
              {safeInput && <div className='py-5 bg-gray-300'>{text}</div>}
              <button className='bg-red-200' style={!safeInput ? {borderWidth: 2, borderColor: "red"} : {}} onClick={insecureInput}>Set a insecure input</button>
              <button className='bg-green-200' style={safeInput ? {borderWidth: 2, borderColor: "green"} : {}} onClick={secureInput}>Set a secure input</button>
            </div>
          </div>
        </div>

        
        <div>
          <p className='italic'>2. zadatak</p>
          <div className='container max-w-screen-md mx-auto bg-gray-400'>
            <h2 className='text-xl p-2'>Super cool registration {safeRegister ? <del>without</del> : "without"} the hassle of long passwords!!</h2>
            <div className='flex flex-col text-left bg-gray-300'>
              <ul className='flex px-2 mt-2'>
                <li className='w-1/5'>Korisničko ime:</li>
                <li className='w-2/5'><input className='w-full' type="text" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)}></input></li>
                <li className='w-2/5 pl-2'>{registerInfo}</li>
              </ul>
              <ul className='flex px-2 mt-2'>
                <li className='w-1/5'>Lozinka:</li>
                <li className='w-2/5'><input className='w-full' type={safeRegister ? "password" : "text"} value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}></input></li>
                <li id="passCondition" className='w-2/5 pl-2'>Uvjet: {safeRegister ? `Minimalno 12 znakova - ${registerPassword.length}/12` : "Nema"}</li>
              </ul>
              <button className="my-2 bg-blue-200 mx-auto p-2 rounded-xl border-2 border-blue-500" onClick={() => safeRegister ? createSecureUser() : createInsecureUser()}>Registriraj se!</button>
              <button className='bg-red-200'   style={!safeRegister ? {borderWidth: 2, borderColor: "red"}   : {}} onClick={() => setSafeRegister(false)}>Set a insecure register</button>
              <button className='bg-green-200' style={ safeRegister ? {borderWidth: 2, borderColor: "green"} : {}} onClick={() => setSafeRegister(true)}>Set a secure register</button>
            </div>
          </div>
          <div className='container max-w-screen-md mx-auto bg-gray-400'>
            <h2 className='text-xl p-2'>Super cool login which {safeLogin ? "doesn't remind hackers" : "reminds you"} of your login data!!</h2>
            <div className='flex flex-col text-left bg-gray-300'>
              <ul className='flex px-2 mt-2'>
                <li className='w-1/5'>Korisničko ime:</li>
                <li className='w-2/5'><input className='w-full' type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)}></input></li>
                <li id="userInfo" className='w-2/5 pl-2'>{usernameInfo}</li>
              </ul>
              <ul className='flex px-2 mt-2'>
                <li className='w-1/5'>Lozinka:</li>
                <li className='w-2/5'><input className='w-full' type={safeLogin ? "password" : "text"} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}></input></li>
                <li id="passInfo" className='w-2/5 pl-2'>{passwordInfo}</li>
              </ul>
              <button className="my-2 bg-blue-200 mx-auto p-2 rounded-xl border-2 border-blue-500" onClick={() => safeLogin ? loginSecureUser() : loginInsecureUser()}>Prijavi se!</button>
              <button className='bg-red-200'   style={!safeLogin ? {borderWidth: 2, borderColor: "red"}   : {}} onClick={toInsecureLogin}>Set a insecure login</button>
              <button className='bg-green-200' style={ safeLogin ? {borderWidth: 2, borderColor: "green"} : {}} onClick={toSecureLogin}>Set a secure login</button>
            </div>
          </div>
        </div>

      </main>

      <footer>
      </footer>
    </div>
  )
}
