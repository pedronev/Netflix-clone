import Input from "@/components/Input";
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [date, setDate] = useState("");

  const [contador, setContador] = useState(10);

  const [variant, setVariant] = useState("login");

  const [chiste, setChiste] = useState("Aqui va a ir un chiste");

  const toogleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  function mostrarFecha() {
    alert("La fecha seleccionada es: " + date);
  }

  async function traerChiste() {
    try {
      await axios
        .get("https://api.chucknorris.io/jokes/random")
        .then((response) => {
          setChiste(response.data.value);
          console.log(response);
        });
    } catch (error) {
      alert(error);
    }
  }

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:max-w-xl rounded-md w-full">
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="username"
                  onChange={(event: any) => {
                    setName(event.target.value);
                  }}
                  value={name}
                  label="Nombre de Usuario"
                  type="username"
                />
              )}

              <div style={{ display: "flex", justifyItems: "space-between" }}>
                <Input
                  id="email"
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  label="Correo"
                  type="email"
                />
                <Input
                  id="password"
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  label="Contraseña"
                  type="password"
                />
              </div>

              <div style={{ display: "flex" }}>
                <Input
                  id="email"
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  label="Correo"
                  type="email"
                />
                <Input
                  id="password"
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  label="Contraseña"
                  type="password"
                />
                <Input
                  id="date"
                  onChange={(event: any) => {
                    console.log(event);
                    setDate(event.target.value);
                  }}
                  value={date}
                  label="Fecha"
                  type="date"
                />
              </div>
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Acceder" : "Registrarse"}
            </button>

            <button
              onClick={mostrarFecha}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              Mostrar Fecha
            </button>

            <button
              onClick={() => setContador(contador + 1)}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              Sumar la cuenta: {contador}
            </button>

            <p className="text-white">la cuenta es: {contador}</p>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-10 h-10 bg-white rounded-full flex items-center 
               justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="w-10 h-10 bg-white rounded-full flex items-center 
               justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "Primera vez usando Pitflix?"
                : "Ya tienes una cuenta?"}
              <span
                onClick={toogleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Crear una cuenta" : "Acceder"}
              </span>
            </p>
            <h2
              style={{ textAlign: "end" }}
              className="text-white text-4xl mb-8 font-semibold"
            >
              {variant === "login" ? "Iniciar Sesion" : "Registrarse"}
            </h2>

            <h2 className="text-white text-4xl mb-8 font-semibold">{chiste}</h2>

            <button
              onClick={traerChiste}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              Traeme un chiste de chuck norris
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
